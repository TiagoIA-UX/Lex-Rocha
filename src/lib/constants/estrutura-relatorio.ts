/** Estrutura padrão do relatório entregue (site + PDF) */

export const TITULO_RELATORIO_PDF = "Relatório de Pesquisa de Jurisprudência";

export const AVISO_DESTAQUE_PDF =
  "Pesquisa documental de jurisprudência pública. Não constitui consultoria jurídica, parecer ou petição. Decisões processuais cabem exclusivamente a advogado(a) habilitado(a) na OAB.";

export const SECOES_RELATORIO_ORDEM = [
  "DESTINATÁRIO E FINALIDADE",
  "RESUMO EXECUTIVO DOS FATOS",
  "LINHA DO TEMPO",
  "FUNDAMENTOS JURÍDICOS APLICÁVEIS",
  "PRECEDENTES JURISPRUDENCIAIS IDENTIFICADOS",
  "SÍNTESE PARA REUNIÃO COM ADVOGADO(A)",
] as const;

/** Aliases de seções antigas (relatórios já gerados) */
export const ALIASES_SECAO: Record<string, (typeof SECOES_RELATORIO_ORDEM)[number]> = {
  "RESUMO DOS FATOS": "RESUMO EXECUTIVO DOS FATOS",
  "PRECEDENTES JURISPRUDENCIAIS IDENTIFICADOS": "PRECEDENTES JURISPRUDENCIAIS IDENTIFICADOS",
  "FUNDAMENTOS JURÍDICOS APLICÁVEIS": "FUNDAMENTOS JURÍDICOS APLICÁVEIS",
  "CONSIDERAÇÕES FINAIS": "SÍNTESE PARA REUNIÃO COM ADVOGADO(A)",
};

export function textoDestinatarioFinalidade(referenciaInterna?: string): string {
  const ref = referenciaInterna?.trim()
    ? `identificado internamente como "${referenciaInterna.trim()}".`
    : "identificado pela referência deste relatório.";

  return (
    `Documento preparado para apoio informativo ao(à) advogado(a) que acompanhará o caso do cliente ${ref}\n\n` +
    "Finalidade: reunir fatos narrados pelo cliente, fundamentos frequentes em demandas similares e precedentes públicos com link para conferência — sem recomendação de estratégia ou prognóstico de êxito."
  );
}

export function normalizarTituloSecao(titulo: string): string {
  const limpo = titulo
    .replace(/^\d+\.\s*/, "")
    .replace(/\*+/g, "")
    .trim()
    .toUpperCase();
  return ALIASES_SECAO[limpo] ?? limpo;
}

export function parseSecoesRelatorio(conteudo: string): Map<string, string> {
  const mapa = new Map<string, string>();
  const texto = conteudo.replace(/^---[\s\S]*?---\s*/m, "").trim();

  const regex =
    /(?:^|\n)(?:\d+\.\s*)?([A-ZÁÉÍÓÚÃÕÂÊÔÇ][A-ZÁÉÍÓÚÃÕÂÊÔÇ0-9\s()\/\-–—]+?)\s*\n([\s\S]*?)(?=(?:\n(?:\d+\.\s*)?[A-ZÁÉÍÓÚÃÕÂÊÔÇ][A-ZÁÉÍÓÚÃÕÂÊÔÇ0-9\s()\/\-–—]{8,}\s*\n)|$)/g;

  let match: RegExpExecArray | null;
  while ((match = regex.exec(texto)) !== null) {
    const titulo = normalizarTituloSecao(match[1] ?? "");
    const corpo = (match[2] ?? "").trim();
    if (titulo.length >= 8 && corpo.length > 0) {
      mapa.set(titulo, corpo);
    }
  }

  if (mapa.size === 0) {
    mapa.set("CONTEÚDO DA PESQUISA", texto);
  }

  return mapa;
}

export function limparMarkdownPdf(texto: string): string {
  return texto
    .replace(/\*\*([^*]+)\*\*/g, "$1")
    .replace(/\*([^*]+)\*/g, "$1")
    .replace(/^---$/gm, "")
    .trim();
}
