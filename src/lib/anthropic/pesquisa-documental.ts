import Anthropic from "@anthropic-ai/sdk";

import {
  getModeloOrganizacaoInterno,
  getPromptSistemaPesquisa,
} from "@/lib/constants/pesquisa-documental.ip.server";
import {
  AVISO_LEGAL_RELATORIO,
  labelFundamento,
  type ResultadoTriagem,
} from "@/lib/constants/pesquisa-documental";
import type { PesquisaDocumentalInput } from "@/lib/validations/pesquisa-documental";

function montarPromptUsuario(dados: PesquisaDocumentalInput): string {
  const fundamentosTexto = dados.fundamentos
    .map((id) => labelFundamento(id))
    .join("\n- ");

  const t = dados.triagem;

  return `${getPromptSistemaPesquisa()}

DADOS:
Área: ${dados.area}
Resumo dos fatos: ${dados.fatos}
Precedentes pesquisados: ${dados.precedentes}
Fundamentos selecionados:
- ${fundamentosTexto}
Triagem interna: área ${t.classificacao_interna.area}, subárea ${t.classificacao_interna.subarea}, urgência ${t.classificacao_interna.grau_urgencia}, complexidade ${t.analise_fatores.complexidade}, faixa da causa ${t.analise_fatores.faixa_estimada_causa}, via interna ${t.analise_fatores.via_sugerida_referencia_interna}, risco prescricional ${t.analise_fatores.risco_prescricao_evidente ? "sim" : "não"}
Observações: ${dados.observacoes ?? "Nenhuma"}

Gere exatamente estas 4 seções:

1. RESUMO DOS FATOS
(3 a 4 parágrafos descrevendo cronologicamente os fatos relatados, linguagem objetiva e formal, sem julgamento)

2. PRECEDENTES JURISPRUDENCIAIS IDENTIFICADOS
(Para cada precedente fornecido: tribunal, data, valor se houver, resumo do decidido — sem inventar)

3. FUNDAMENTOS JURÍDICOS APLICÁVEIS
(Para cada fundamento selecionado: artigo, lei e relação com os fatos — sem opinar sobre resultado)

4. CONSIDERAÇÕES FINAIS
(Neutras. Contextualizar o caso no cenário identificado na pesquisa. Sem prever resultado ou recomendar ação)

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
    model: getModeloOrganizacaoInterno(),
    max_tokens: 4096,
    messages: [{ role: "user", content: prompt }],
  });

  const blocoTexto = response.content.find((b) => b.type === "text");
  if (!blocoTexto || blocoTexto.type !== "text") {
    throw new Error("Não foi possível gerar o texto do relatório. Tente novamente.");
  }

  return {
    conteudo: blocoTexto.text.trim(),
    modelo: getModeloOrganizacaoInterno(),
    tokens: {
      entrada: response.usage.input_tokens,
      saida: response.usage.output_tokens,
    },
  };
}

export type { ResultadoTriagem };
