/** Constantes públicas do módulo (sem prompts — ver private/). */

import { z } from "zod";

import { REFERENCIA_CONSULTA_ADVOCATICIA } from "@/lib/constants/fontes-publicas";

export const NOME_SERVICO_PUBLICO = "Pesquisa de Jurisprudência";
export const NOME_SERVICO_ALTERNATIVO = "Análise de Precedentes Jurídicos";

export const AVISO_LEGAL_RELATORIO =
  "Este documento é um relatório de pesquisa documental de jurisprudência pública. Não constitui consultoria jurídica, parecer ou orientação legal.";

export const AVISO_LEGAL_TELA =
  "Organização de pesquisa em portais públicos. Não substitui advogado. Não é consultoria jurídica.";

export const NOTA_APROVACAO_CLIENTE =
  "O orçamento e o escopo são confirmados com o cliente após a descrição inicial do caso.";

export const CHAVE_PIX_CNPJ = "61.699.939/0001-80";

export const AREAS_PROBLEMA = [
  "Bloqueio/suspensão de conta digital",
  "Cancelamento indevido de serviço",
  "Cobrança indevida/cartão/banco",
  "Negativação indevida (SPC/Serasa)",
  "Falha em produto ou entrega",
  "Plano de saúde negando cobertura",
  "Demissão / direitos trabalhistas",
  "INSS / benefício negado",
  "Outro",
] as const;

export type AreaProblema = (typeof AREAS_PROBLEMA)[number];

export const FUNDAMENTOS_OPCOES = [
  { id: "cdc_14", label: "Art. 14 CDC — falha na prestação de serviço" },
  { id: "cdc_6", label: "Art. 6º CDC — informação adequada e clara" },
  { id: "cdc_42", label: "Art. 42 CDC — cobrança abusiva" },
  { id: "venire", label: "Venire contra factum proprium" },
  { id: "marco_20", label: "Art. 20 Marco Civil da Internet" },
  { id: "lgpd_20", label: "Art. 20 LGPD — explicação de critérios algorítmicos" },
  { id: "cpc_300", label: "Art. 300 CPC — tutela de urgência (liminar)" },
  { id: "cpc_537", label: "Art. 537 CPC — multa diária (astreintes)" },
  { id: "dano_moral_ipsa", label: "Dano moral presumido (in re ipsa)" },
  { id: "cerceamento", label: "Cerceamento do exercício profissional" },
] as const;

export type FundamentoId = (typeof FUNDAMENTOS_OPCOES)[number]["id"];

export function labelFundamento(id: FundamentoId): string {
  return FUNDAMENTOS_OPCOES.find((f) => f.id === id)?.label ?? id;
}

/** Valores de vitrine (site público). Orçamento detalhado em private/. */
export const PRECIFICACAO = {
  essencial: { label: "Essencial", valor: 49, descricao: "Até 2 precedentes", maxPrecedentes: 2 },
  padrao: { label: "Padrão", valor: 79, descricao: "3 a 5 precedentes", maxPrecedentes: 5 },
  completo: { label: "Completo", valor: 119, descricao: "6+ referências", maxPrecedentes: 99 },
} as const;

export const PRECIFICACAO_TEXTO_COMPARATIVO =
  `Referência OAB: R$ ${REFERENCIA_CONSULTA_ADVOCATICIA.faixaMinima}–${REFERENCIA_CONSULTA_ADVOCATICIA.faixaMaximaComum}. ` +
  "Lex-Rocha: organização de pesquisa em fontes públicas.";

export function formatarNumeroReferencia(numeroSequencial: number, ano = new Date().getFullYear()) {
  return `LR-${ano}-${String(numeroSequencial).padStart(4, "0")}`;
}

export function calcularValorSugerido(qtdPrecedentes: number, fundamentosCount: number): number {
  if (qtdPrecedentes > 5 || fundamentosCount >= 6) return PRECIFICACAO.completo.valor;
  if (qtdPrecedentes > 2) return PRECIFICACAO.padrao.valor;
  return PRECIFICACAO.essencial.valor;
}

export function labelFaixaPreco(valor: number): string {
  if (valor >= PRECIFICACAO.completo.valor) return PRECIFICACAO.completo.label;
  if (valor >= PRECIFICACAO.padrao.valor) return PRECIFICACAO.padrao.label;
  return PRECIFICACAO.essencial.label;
}

export const resultadoTriagemSchema = z.object({
  classificacao_interna: z.object({
    area: z.string(),
    subarea: z.string(),
    grau_urgencia: z.enum(["VERMELHO", "AMARELO", "VERDE"]),
  }),
  analise_fatores: z.object({
    complexidade: z.enum(["simples", "medio", "complexo"]),
    faixa_estimada_causa: z.enum(["BAIXO_VALOR", "MEDIO_VALOR", "ALTO_VALOR", "INDETERMINADO"]),
    via_sugerida_referencia_interna: z.string(),
    risco_prescricao_evidente: z.boolean(),
  }),
  resumo_estruturado_fatos: z.string(),
});

export type ResultadoTriagem = z.infer<typeof resultadoTriagemSchema>;
