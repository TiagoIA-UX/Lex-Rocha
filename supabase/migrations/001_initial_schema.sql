-- Lex Rocha — Schema inicial + RLS
-- Execute no SQL Editor do Supabase Dashboard (Módulo 2)

-- Extensões
create extension if not exists "pgcrypto";

-- Perfis de usuário (papéis: usuario | escritorio | admin)
create table if not exists public.profiles (
  id uuid primary key references auth.users (id) on delete cascade,
  role text not null default 'usuario'
    check (role in ('usuario', 'escritorio', 'admin')),
  nome text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

-- Casos de triagem enviados pelos usuários
create table if not exists public.casos (
  id uuid primary key default gen_random_uuid(),
  user_id uuid references auth.users (id) on delete set null,
  nome text not null,
  email text not null,
  telefone text,
  plataforma text not null,
  descricao text not null,
  data_ocorrencia date,
  tentativas_anteriores text,
  prints_urls text[] default '{}',
  status text not null default 'pendente'
    check (status in ('pendente', 'em_analise', 'concluido', 'descartado', 'rascunho')),
  wizard_step smallint default 1 check (wizard_step between 1 and 4),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

-- Relatórios gerados pela Claude API
create table if not exists public.relatorios (
  id uuid primary key default gen_random_uuid(),
  caso_id uuid not null references public.casos (id) on delete cascade,
  conteudo_markdown text not null,
  viabilidade text check (viabilidade in ('alta', 'media', 'baixa')),
  fundamentos text[] default '{}',
  precedentes text[] default '{}',
  pedidos_sugeridos text[] default '{}',
  pdf_url text,
  aprovado_por_admin boolean not null default false,
  created_at timestamptz not null default now()
);

-- Escritórios de advocacia parceiros
create table if not exists public.escritorios (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null unique references auth.users (id) on delete cascade,
  nome text not null,
  oab text,
  especialidades text[] default '{}',
  cidade text,
  estado char(2),
  email text not null,
  telefone text,
  plano text not null default 'gratuito'
    check (plano in ('gratuito', 'basico', 'profissional', 'premium')),
  ativo boolean not null default true,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

-- Leads distribuídos para escritórios
create table if not exists public.leads (
  id uuid primary key default gen_random_uuid(),
  relatorio_id uuid not null references public.relatorios (id) on delete cascade,
  escritorio_id uuid not null references public.escritorios (id) on delete cascade,
  status text not null default 'novo'
    check (status in ('novo', 'em_analise', 'convertido', 'descartado')),
  visualizado_em timestamptz,
  created_at timestamptz not null default now(),
  unique (relatorio_id, escritorio_id)
);

-- Índices
create index if not exists idx_casos_user_id on public.casos (user_id);
create index if not exists idx_casos_status on public.casos (status);
create index if not exists idx_casos_email on public.casos (email);
create index if not exists idx_relatorios_caso_id on public.relatorios (caso_id);
create index if not exists idx_leads_escritorio_id on public.leads (escritorio_id);
create index if not exists idx_leads_status on public.leads (status);

-- updated_at automático
create or replace function public.set_updated_at()
returns trigger
language plpgsql
as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

drop trigger if exists trg_profiles_updated_at on public.profiles;
create trigger trg_profiles_updated_at
  before update on public.profiles
  for each row execute function public.set_updated_at();

drop trigger if exists trg_casos_updated_at on public.casos;
create trigger trg_casos_updated_at
  before update on public.casos
  for each row execute function public.set_updated_at();

drop trigger if exists trg_escritorios_updated_at on public.escritorios;
create trigger trg_escritorios_updated_at
  before update on public.escritorios
  for each row execute function public.set_updated_at();

-- Criar perfil ao registrar usuário
create or replace function public.handle_new_user()
returns trigger
language plpgsql
security definer
set search_path = public
as $$
begin
  insert into public.profiles (id, role, nome)
  values (
    new.id,
    coalesce(new.raw_user_meta_data ->> 'role', 'usuario'),
    coalesce(new.raw_user_meta_data ->> 'nome', new.email)
  );
  return new;
end;
$$;

drop trigger if exists on_auth_user_created on auth.users;
create trigger on_auth_user_created
  after insert on auth.users
  for each row execute function public.handle_new_user();

-- Helpers RLS
create or replace function public.is_admin()
returns boolean
language sql
stable
security definer
set search_path = public
as $$
  select exists (
    select 1 from public.profiles
    where id = auth.uid() and role = 'admin'
  );
$$;

create or replace function public.is_escritorio()
returns boolean
language sql
stable
security definer
set search_path = public
as $$
  select exists (
    select 1 from public.profiles
    where id = auth.uid() and role = 'escritorio'
  );
$$;

create or replace function public.my_escritorio_id()
returns uuid
language sql
stable
security definer
set search_path = public
as $$
  select id from public.escritorios where user_id = auth.uid() limit 1;
$$;

-- RLS
alter table public.profiles enable row level security;
alter table public.casos enable row level security;
alter table public.relatorios enable row level security;
alter table public.escritorios enable row level security;
alter table public.leads enable row level security;

-- profiles
drop policy if exists "profiles_select_own_or_admin" on public.profiles;
create policy "profiles_select_own_or_admin"
  on public.profiles for select
  using (id = auth.uid() or public.is_admin());

drop policy if exists "profiles_update_own_or_admin" on public.profiles;
create policy "profiles_update_own_or_admin"
  on public.profiles for update
  using (id = auth.uid() or public.is_admin());

-- casos
drop policy if exists "casos_insert_anon_or_auth" on public.casos;
create policy "casos_insert_anon_or_auth"
  on public.casos for insert
  with check (
    user_id is null
    or user_id = auth.uid()
    or public.is_admin()
  );

drop policy if exists "casos_select_own_or_admin" on public.casos;
create policy "casos_select_own_or_admin"
  on public.casos for select
  using (
    user_id = auth.uid()
    or email = (auth.jwt() ->> 'email')
    or public.is_admin()
  );

drop policy if exists "casos_update_own_or_admin" on public.casos;
create policy "casos_update_own_or_admin"
  on public.casos for update
  using (
    user_id = auth.uid()
    or public.is_admin()
  );

-- relatorios
drop policy if exists "relatorios_select_related" on public.relatorios;
create policy "relatorios_select_related"
  on public.relatorios for select
  using (
    public.is_admin()
    or exists (
      select 1 from public.casos c
      where c.id = relatorios.caso_id
        and (c.user_id = auth.uid() or c.email = (auth.jwt() ->> 'email'))
    )
    or exists (
      select 1 from public.leads l
      where l.relatorio_id = relatorios.id
        and l.escritorio_id = public.my_escritorio_id()
    )
  );

drop policy if exists "relatorios_insert_admin_service" on public.relatorios;
create policy "relatorios_insert_admin_service"
  on public.relatorios for insert
  with check (public.is_admin());

drop policy if exists "relatorios_update_admin" on public.relatorios;
create policy "relatorios_update_admin"
  on public.relatorios for update
  using (public.is_admin());

-- escritorios
drop policy if exists "escritorios_select_public_active" on public.escritorios;
create policy "escritorios_select_public_active"
  on public.escritorios for select
  using (ativo = true or user_id = auth.uid() or public.is_admin());

drop policy if exists "escritorios_insert_own" on public.escritorios;
create policy "escritorios_insert_own"
  on public.escritorios for insert
  with check (user_id = auth.uid() or public.is_admin());

drop policy if exists "escritorios_update_own_or_admin" on public.escritorios;
create policy "escritorios_update_own_or_admin"
  on public.escritorios for update
  using (user_id = auth.uid() or public.is_admin());

-- leads
drop policy if exists "leads_select_escritorio_or_admin" on public.leads;
create policy "leads_select_escritorio_or_admin"
  on public.leads for select
  using (
    escritorio_id = public.my_escritorio_id()
    or public.is_admin()
  );

drop policy if exists "leads_update_escritorio_or_admin" on public.leads;
create policy "leads_update_escritorio_or_admin"
  on public.leads for update
  using (
    escritorio_id = public.my_escritorio_id()
    or public.is_admin()
  );

drop policy if exists "leads_insert_admin" on public.leads;
create policy "leads_insert_admin"
  on public.leads for insert
  with check (public.is_admin());

-- Storage: bucket prints
-- Uploads no Módulo 3 via API Route com service role (signed URL).
-- Estrutura de pasta: casos/{caso_id}/{arquivo}

insert into storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
values (
  'prints',
  'prints',
  false,
  5242880,
  array['image/jpeg', 'image/png', 'image/webp', 'image/gif']
)
on conflict (id) do nothing;

drop policy if exists "prints_select_admin_escritorio" on storage.objects;
create policy "prints_select_admin_escritorio"
  on storage.objects for select
  to authenticated
  using (
    bucket_id = 'prints'
    and (public.is_admin() or public.is_escritorio())
  );

drop policy if exists "prints_all_admin" on storage.objects;
create policy "prints_all_admin"
  on storage.objects for all
  to authenticated
  using (bucket_id = 'prints' and public.is_admin())
  with check (bucket_id = 'prints' and public.is_admin());

-- Promover fundador a admin (substitua pelo e-mail do Tiago após cadastro)
-- update public.profiles set role = 'admin' where id = (
--   select id from auth.users where email = 'tiago@lexrocha.com.br'
-- );
