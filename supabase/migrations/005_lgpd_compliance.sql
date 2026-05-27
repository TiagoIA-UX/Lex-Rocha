-- LGPD / Marco Civil — consentimento, logs e direitos do titular

create table if not exists public.consent_log (
  id uuid primary key default gen_random_uuid(),
  session_id text not null,
  ip_hash text,
  user_agent_hash text,
  versao_politica text not null,
  cookies_necessarios boolean not null default true,
  cookies_analiticos boolean not null default false,
  data_consentimento timestamptz not null default now(),
  data_revogacao timestamptz,
  origem text not null default 'banner'
    check (origem in ('banner', 'configuracoes', 'api'))
);

create table if not exists public.access_log (
  id uuid primary key default gen_random_uuid(),
  ip_hash text not null,
  user_agent_hash text,
  rota text,
  metodo text,
  status_code int,
  created_at timestamptz not null default now()
);

create table if not exists public.direitos_lgpd (
  id uuid primary key default gen_random_uuid(),
  tipo text not null
    check (tipo in ('acesso', 'correcao', 'eliminacao', 'portabilidade', 'revogacao')),
  email_contato text,
  descricao text,
  status text not null default 'pendente'
    check (status in ('pendente', 'em_analise', 'concluido', 'recusado')),
  prazo_resposta timestamptz,
  data_resposta timestamptz,
  created_at timestamptz not null default now()
);

create index if not exists idx_consent_log_session on public.consent_log (session_id);
create index if not exists idx_consent_log_data on public.consent_log (data_consentimento desc);
create index if not exists idx_access_log_created on public.access_log (created_at desc);

alter table public.consent_log enable row level security;
alter table public.access_log enable row level security;
alter table public.direitos_lgpd enable row level security;

create policy "consent_log_service_only"
  on public.consent_log for all using (false) with check (false);

create policy "access_log_service_only"
  on public.access_log for all using (false) with check (false);

create policy "direitos_lgpd_service_only"
  on public.direitos_lgpd for all using (false) with check (false);

comment on table public.consent_log is 'Registro de consentimento de cookies (ANPD).';
comment on table public.access_log is 'Logs de acesso — retenção 6 meses (Marco Civil).';
