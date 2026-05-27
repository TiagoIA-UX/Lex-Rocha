-- Solicitações B2C públicas + rastreio Stripe Checkout

do $$
begin
  if exists (
    select 1
    from information_schema.tables
    where table_schema = 'public'
      and table_name = 'pagamentos_pesquisa'
  ) then
    alter table public.pagamentos_pesquisa
      add column if not exists stripe_session_id text;

    create index if not exists idx_pagamentos_stripe_session
      on public.pagamentos_pesquisa (stripe_session_id)
      where stripe_session_id is not null;
  else
    raise notice 'Tabela public.pagamentos_pesquisa não existe. Execute a migration 003 antes da 006.';
  end if;
end
$$;

create table if not exists public.solicitacoes_pesquisa (
  id uuid primary key default gen_random_uuid(),
  nome text not null,
  email text not null,
  telefone text,
  area text not null,
  descricao text not null,
  status text not null default 'nova'
    check (status in ('nova', 'em_contato', 'convertida', 'arquivada')),
  created_at timestamptz not null default now()
);

create index if not exists idx_solicitacoes_status
  on public.solicitacoes_pesquisa (status, created_at desc);

alter table public.solicitacoes_pesquisa enable row level security;

create policy "solicitacoes_pesquisa_service_only"
  on public.solicitacoes_pesquisa
  for all
  using (false)
  with check (false);

comment on table public.solicitacoes_pesquisa is
  'Pedidos de pesquisa enviados pelo formulário público (B2C).';
