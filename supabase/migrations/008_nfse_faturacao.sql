-- Faturação NFS-e (Nuvem Fiscal) — resultado da emissão por relatório

alter table public.relatorios_pesquisa
  add column if not exists nfse_id text,
  add column if not exists nfse_numero text,
  add column if not exists nfse_status text,
  add column if not exists nfse_pdf_url text,
  add column if not exists nfse_emitida_em timestamptz;

create index if not exists idx_relatorios_nfse_status
  on public.relatorios_pesquisa (nfse_status)
  where nfse_status is not null;

comment on column public.relatorios_pesquisa.nfse_id is
  'ID da NFS-e na Nuvem Fiscal';
comment on column public.relatorios_pesquisa.nfse_status is
  'Status retornado pela Nuvem Fiscal (ex.: processando | autorizada | erro)';
