-- V3 — triagem Groq + referência interna + log de APIs

alter table public.relatorios_pesquisa
  add column if not exists referencia_interna text,
  add column if not exists complexidade text,
  add column if not exists valor_estimado_min numeric(12, 2),
  add column if not exists valor_estimado_max numeric(12, 2),
  add column if not exists urgente boolean default false,
  add column if not exists motivo_urgencia text,
  add column if not exists via_sugerida text,
  add column if not exists prazo_prescricional_anos smallint,
  add column if not exists valor_cobrado numeric(12, 2);

create table if not exists public.log_ia (
  id uuid primary key default gen_random_uuid(),
  relatorio_id uuid references public.relatorios_pesquisa (id) on delete set null,
  api_usada text not null check (api_usada in ('groq', 'claude')),
  modelo text,
  tokens_entrada int,
  tokens_saida int,
  created_at timestamptz not null default now()
);

create index if not exists idx_log_ia_relatorio on public.log_ia (relatorio_id);

alter table public.log_ia enable row level security;

create policy "log_ia_service_only"
  on public.log_ia
  for all
  using (false)
  with check (false);
