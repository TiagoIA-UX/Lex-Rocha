/** Módulo 1 — Pesquisa de jurisprudência (constantes e textos legais) */

import { z } from "zod";

import { REFERENCIA_CONSULTA_ADVOCATICIA } from "@/lib/constants/fontes-publicas";

export const NOME_SERVICO_PUBLICO = "Pesquisa de Jurisprudência";
export const NOME_SERVICO_ALTERNATIVO = "Análise de Precedentes Jurídicos";

export const AVISO_LEGAL_RELATORIO =
  "Este documento é um relatório de pesquisa documental de jurisprudência pública. Não constitui consultoria jurídica, parecer ou orientação legal. Os precedentes listados foram identificados em sistemas públicos de jurisprudência. Qualquer decisão sobre medidas judiciais deve ser tomada exclusivamente por advogado habilitado na OAB.";

export const AVISO_LEGAL_TELA =
  "Organização de pesquisa em portais públicos. Não substitui advogado. Não é consultoria jurídica. Valor e entrega conforme orçamento aprovado com o cliente.";

export const NOTA_APROVACAO_CLIENTE =
  "O orçamento e o escopo são confirmados com o cliente após a descrição inicial do caso. Só após essa combinação é iniciada a pesquisa em fontes públicas.";

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

export const PRECIFICACAO = {
  essencial: {
    label: "Essencial",
    valor: 49,
    descricao: "Até 2 precedentes públicos organizados + síntese dos fatos",
    maxPrecedentes: 2,
  },
  padrao: {
    label: "Padrão",
    valor: 79,
    descricao: "3 a 5 precedentes + relação com fundamentos selecionados",
    maxPrecedentes: 5,
  },
  completo: {
    label: "Completo",
    valor: 119,
    descricao: "6 ou mais referências, urgência ou múltiplas teses",
    maxPrecedentes: 99,
  },
} as const;

export const PRECIFICACAO_TEXTO_COMPARATIVO =
  `Consultas presenciais com advogado costumam seguir a tabela OAB (referência a partir de R$ ${REFERENCIA_CONSULTA_ADVOCATICIA.faixaMinima}). ` +
  "No Lex Rocha você contrata apenas a pesquisa documental em fontes públicas — relatório estruturado para a primeira reunião com seu advogado.";

export function formatarNumeroReferencia(
  numeroSequencial: number,
  ano = new Date().getFullYear()
): string {
  return `REL-${ano}-${String(numeroSequencial).padStart(3, "0")}`;
}

export function sugerirValorRelatorio(
  precedentesTexto: string,
  fundamentosCount: number
): number {
  const qtd = precedentesTexto
    .split(/\n/)
    .map((l) => l.trim())
    .filter(Boolean).length;

  if (qtd > 5 || fundamentosCount >= 6) return PRECIFICACAO.completo.valor;
  if (qtd > 2) return PRECIFICACAO.padrao.valor;
  return PRECIFICACAO.essencial.valor;
}

export function labelFaixaPreco(valor: number): string {
  if (valor >= PRECIFICACAO.completo.valor) return PRECIFICACAO.completo.label;
  if (valor >= PRECIFICACAO.padrao.valor) return PRECIFICACAO.padrao.label;
  return PRECIFICACAO.essencial.label;
}

export const MODELO_ORGANIZACAO_INTERNO = "claude-sonnet-4-20250514";

export const PROMPT_CLASSIFICADOR_TRIAGEM = `Você é um motor analítico de triagem e priorização de fluxo de trabalho para um workspace jurídico.
Sua função é processar apenas o texto fornecido pelo operador e extrair metadados estruturados para organização de fila interna.

DIRETRIZES DE COMPLIANCE E SEGURANÇA:
1. Você NÃO atua como advogado ou consultor. Nunca utilize termos como "recomendo entrar com ação", "o cliente deve processar" ou "direito garantido".
2. Você NÃO deve sugerir, inventar, ou listar artigos de leis, súmulas ou fundamentos jurídicos.
3. Foque a análise estritamente nas informações fornecidas no texto do caso.
4. O campo "via_sugerida_referencia_interna" serve apenas para catalogação estatística interna de fluxo.
5. Escreva tudo em português brasileiro, tom neutro e técnico.

Retorne APENAS JSON válido com esta estrutura:
{
  "classificacao_interna": {
    "area": string,
    "subarea": string,
    "grau_urgencia": "VERMELHO" | "AMARELO" | "VERDE"
  },
  "analise_fatores": {
    "complexidade": "simples" | "medio" | "complexo",
    "faixa_estimada_causa": "BAIXO_VALOR" | "MEDIO_VALOR" | "ALTO_VALOR" | "INDETERMINADO",
    "via_sugerida_referencia_interna": string,
    "risco_prescricao_evidente": boolean
  },
  "resumo_estruturado_fatos": string
}

Área informada pelo operador: {area}
Resumo dos fatos: {fatos_resumo}

Não inclua markdown. Não inclua texto fora do JSON.`;

export const resultadoTriagemSchema = z.object({
  classificacao_interna: z.object({
    area: z.string(),
    subarea: z.string(),
    grau_urgencia: z.enum(["VERMELHO", "AMARELO", "VERDE"]),
  }),
  analise_fatores: z.object({
    complexidade: z.enum(["simples", "medio", "complexo"]),
    faixa_estimada_causa: z.enum([
      "BAIXO_VALOR",
      "MEDIO_VALOR",
      "ALTO_VALOR",
      "INDETERMINADO",
    ]),
    via_sugerida_referencia_interna: z.string(),
    risco_prescricao_evidente: z.boolean(),
  }),
  resumo_estruturado_fatos: z.string(),
});

export type ResultadoTriagem = z.infer<typeof resultadoTriagemSchema>;

export const PROMPT_SISTEMA_PESQUISA = `Você é um assistente de pesquisa documental jurídica.
Organize as informações abaixo em um relatório formal, claro e objetivo.

REGRAS ABSOLUTAS:
- NÃO invente precedentes, leis ou fatos não informados
- NÃO emita opiniões sobre resultado da causa
- NÃO use linguagem de consultoria ("recomendo", "deve", "vai ganhar")
- Use linguagem formal e acessível
- Cite apenas os precedentes que foram fornecidos`;
