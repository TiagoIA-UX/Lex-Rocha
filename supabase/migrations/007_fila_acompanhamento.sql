-- Fila de produção, código de acompanhamento e previsão de entrega

alter table public.solicitacoes_pesquisa
  add column if not exists codigo_acompanhamento text,
  add column if not exists previsao_entrega timestamptz,
  add column if not exists fila_status text not null default 'recebido',
  add column if not exists faixa_relatorio text,
  add column if not exists relatorio_id uuid references public.relatorios_pesquisa (id) on delete set null;

create unique index if not exists idx_solicitacoes_codigo
  on public.solicitacoes_pesquisa (codigo_acompanhamento)
  where codigo_acompanhamento is not null;

create index if not exists idx_solicitacoes_fila
  on public.solicitacoes_pesquisa (fila_status, previsao_entrega);

alter table public.relatorios_pesquisa
  add column if not exists codigo_acompanhamento text,
  add column if not exists previsao_entrega timestamptz,
  add column if not exists fila_status text not null default 'rascunho',
  add column if not exists solicitacao_id uuid references public.solicitacoes_pesquisa (id) on delete set null;

create unique index if not exists idx_relatorios_codigo
  on public.relatorios_pesquisa (codigo_acompanhamento)
  where codigo_acompanhamento is not null;

create index if not exists idx_relatorios_fila
  on public.relatorios_pesquisa (fila_status, previsao_entrega);

comment on column public.solicitacoes_pesquisa.fila_status is
  'recebido | orcamento | aguardando_pagamento | na_fila | em_producao | pronto | entregue | arquivada';

comment on column public.relatorios_pesquisa.fila_status is
  'rascunho | aguardando_pagamento | na_fila | em_producao | pronto | entregue | arquivado';
