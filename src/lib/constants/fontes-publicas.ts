/**
 * Fontes públicas utilizadas na pesquisa documental Lex-Rocha.
 * Exibidas no site e nos relatórios para transparência e conferência pelo cliente/advogado.
 */

export type FontePublica = {
  nome: string;
  descricao: string;
  url: string;
  tipo: "jurisprudencia" | "legislacao" | "consumidor" | "dados_abertos";
};

export const FONTES_PESQUISA_PUBLICA: FontePublica[] = [
  {
    nome: "Jusbrasil — Pesquisa Jurídica",
    descricao:
      "Base de jurisprudência e decisões de tribunais (acesso público com limites; pesquisa manual pelo fundador).",
    url: "https://www.jusbrasil.com.br/pesquisa-juridica",
    tipo: "jurisprudencia",
  },
  {
    nome: "Portal CNJ / DataJud",
    descricao: "Dados e metadados processuais do Poder Judiciário brasileiro.",
    url: "https://www.cnj.jus.br/",
    tipo: "dados_abertos",
  },
  {
    nome: "STJ — Superior Tribunal de Justiça",
    descricao: "Jurisprudência e súmulas do STJ.",
    url: "https://www.stj.jus.br/",
    tipo: "jurisprudencia",
  },
  {
    nome: "STF — Supremo Tribunal Federal",
    descricao: "Decisões e repercussão geral quando aplicável.",
    url: "https://portal.stf.jus.br/",
    tipo: "jurisprudencia",
  },
  {
    nome: "Planalto — Legislação federal",
    descricao: "CDC, Marco Civil da Internet, LGPD e demais leis federais.",
    url: "https://www.planalto.gov.br/",
    tipo: "legislacao",
  },
  {
    nome: "Consumidor.gov.br",
    descricao: "Registros e orientações em relações de consumo, quando pertinente ao caso.",
    url: "https://www.consumidor.gov.br/",
    tipo: "consumidor",
  },
  {
    nome: "ANPD — Autoridade Nacional de Proteção de Dados",
    descricao: "Normas, orientações e contexto regulatório em proteção de dados pessoais.",
    url: "https://www.gov.br/anpd/pt-br",
    tipo: "legislacao",
  },
];

export const NOTA_FONTES_RELATORIO =
  "As referências abaixo foram consultadas em portais e bases públicas no momento da pesquisa. " +
  "Links e ementas devem ser conferidos pelo advogado antes de qualquer petição. " +
  "A inclusão de um precedente neste relatório não garante aplicabilidade automática ao caso concreto.";

/** Referência de mercado (honorários mínimos OAB — consulta presencial, 2025/2026) */
export const REFERENCIA_CONSULTA_ADVOCATICIA = {
  faixaMinima: 493,
  faixaMaximaComum: 600,
  fonteResumida:
    "Tabelas de referência da OAB (ex.: SP e RS, 2025/2026) para consulta jurídica presencial.",
  urlsReferencia: [
    "https://www.oabsp.org.br/",
    "https://www.oabrs.org.br/",
  ],
} as const;
