-- Módulo A — Pesquisa documental (B2C / ferramenta interna Tiago)
-- Tabelas separadas de public.relatorios (vinculado a casos de triagem)

create sequence if not exists public.relatorios_pesquisa_numero_seq;

create table if not exists public.relatorios_pesquisa (
  id uuid primary key default gen_random_uuid(),
  numero_sequencial integer not null default nextval('public.relatorios_pesquisa_numero_seq'),
  nome_cliente text,
  area text not null,
  fatos text not null,
  precedentes text,
  fundamentos text[] not null default '{}',
  valor_estimado numeric(12, 2),
  observacoes text,
  conteudo_gerado text,
  pdf_url text,
  status text not null default 'rascunho'
    check (status in ('rascunho', 'gerado', 'entregue', 'arquivado')),
  modelo_ia text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.pagamentos_pesquisa (
  id uuid primary key default gen_random_uuid(),
  relatorio_id uuid not null references public.relatorios_pesquisa (id) on delete cascade,
  valor numeric(12, 2) not null,
  forma_pagamento text default 'pix'
    check (forma_pagamento in ('pix', 'link', 'outro', 'pendente')),
  status text not null default 'pendente'
    check (status in ('pendente', 'pago', 'cancelado')),
  created_at timestamptz not null default now()
);

create index if not exists idx_relatorios_pesquisa_status on public.relatorios_pesquisa (status);
create index if not exists idx_relatorios_pesquisa_created on public.relatorios_pesquisa (created_at desc);
create index if not exists idx_pagamentos_pesquisa_relatorio on public.pagamentos_pesquisa (relatorio_id);

drop trigger if exists trg_relatorios_pesquisa_updated_at on public.relatorios_pesquisa;
create trigger trg_relatorios_pesquisa_updated_at
  before update on public.relatorios_pesquisa
  for each row execute function public.set_updated_at();

alter table public.relatorios_pesquisa enable row level security;
alter table public.pagamentos_pesquisa enable row level security;

-- Sem login nesta fase: inserts via service role nas API Routes.
-- Políticas restritivas para anon/authenticated até auth do Tiago.

create policy "relatorios_pesquisa_service_only"
  on public.relatorios_pesquisa
  for all
  using (false)
  with check (false);

create policy "pagamentos_pesquisa_service_only"
  on public.pagamentos_pesquisa
  for all
  using (false)
  with check (false);

comment on table public.relatorios_pesquisa is
  'Relatórios de pesquisa documental de precedentes públicos (Módulo A).';
