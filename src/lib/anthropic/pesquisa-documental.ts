import Anthropic from "@anthropic-ai/sdk";

import {
  AVISO_LEGAL_RELATORIO,
  labelFundamento,
  MODELO_ORGANIZACAO_INTERNO,
  PROMPT_SISTEMA_PESQUISA,
  type ResultadoTriagem,
} from "@/lib/constants/pesquisa-documental";
import type { PesquisaDocumentalInput } from "@/lib/validations/pesquisa-documental";

function montarPromptUsuario(dados: PesquisaDocumentalInput): string {
  const fundamentosTexto = dados.fundamentos
    .map((id) => labelFundamento(id))
    .join("\n- ");

  const t = dados.triagem;

  return `${PROMPT_SISTEMA_PESQUISA}

DADOS:
Área: ${dados.area}
Resumo dos fatos: ${dados.fatos}
Precedentes pesquisados: ${dados.precedentes}
Fundamentos selecionados:
- ${fundamentosTexto}
Triagem interna: área ${t.classificacao_interna.area}, subárea ${t.classificacao_interna.subarea}, urgência ${t.classificacao_interna.grau_urgencia}, complexidade ${t.analise_fatores.complexidade}, faixa da causa ${t.analise_fatores.faixa_estimada_causa}, via interna ${t.analise_fatores.via_sugerida_referencia_interna}, risco prescricional ${t.analise_fatores.risco_prescricao_evidente ? "sim" : "não"}
Observações: ${dados.observacoes ?? "Nenhuma"}

Gere exatamente estas 5 seções (títulos em MAIÚSCULAS, nesta ordem, sem markdown):

1. RESUMO EXECUTIVO DOS FATOS
(3 a 4 parágrafos, linguagem objetiva e formal, sem julgamento)

2. LINHA DO TEMPO
(Lista numerada com marcos cronológicos dos fatos relatados)

3. FUNDAMENTOS JURÍDICOS APLICÁVEIS
(Para cada fundamento selecionado: artigo, lei e relação com os fatos — sem opinar sobre resultado)

4. PRECEDENTES JURISPRUDENCIAIS IDENTIFICADOS
(Para cada precedente fornecido: tribunal, data, resumo e link quando houver — sem inventar)

5. SÍNTESE PARA REUNIÃO COM ADVOGADO(A)
(Contexto neutro do cenário jurisprudencial. Deixe claro o que o relatório NÃO faz: não indica se deve ajuizar ação, pedidos ou probabilidade de êxito)

Termine com exatamente este texto:
---
${AVISO_LEGAL_RELATORIO}`;
}

export async function gerarRelatorioPesquisaDocumental(
  dados: PesquisaDocumentalInput
): Promise<{ conteudo: string; modelo: string; tokens?: { entrada: number; saida: number } }> {
  const apiKey = process.env.ANTHROPIC_API_KEY;
  if (!apiKey) {
    throw new Error("ANTHROPIC_API_KEY não configurada. Adicione em .env.local.");
  }

  const client = new Anthropic({ apiKey });
  const prompt = montarPromptUsuario(dados);

  const response = await client.messages.create({
    model: MODELO_ORGANIZACAO_INTERNO,
    max_tokens: 4096,
    messages: [{ role: "user", content: prompt }],
  });

  const blocoTexto = response.content.find((b) => b.type === "text");
  if (!blocoTexto || blocoTexto.type !== "text") {
    throw new Error("Não foi possível gerar o texto do relatório. Tente novamente.");
  }

  return {
    conteudo: blocoTexto.text.trim(),
    modelo: MODELO_ORGANIZACAO_INTERNO,
    tokens: {
      entrada: response.usage.input_tokens,
      saida: response.usage.output_tokens,
    },
  };
}

export type { ResultadoTriagem };
