export type Precedente = {
  titulo: string;
  tribunal: string;
  resumo: string;
  href: string;
  tipo: "legislacao" | "jurisprudencia";
};

/** Fontes públicas verificáveis — legislação e temas recorrentes nos tribunais */
export const PRECEDENTES: Precedente[] = [
  {
    titulo: "Código de Defesa do Consumidor (CDC)",
    tribunal: "Lei nº 8.078/1990",
    resumo:
      "Relações de consumo em serviços digitais: responsabilidade do fornecedor, vício do serviço e reparação de danos.",
    href: "https://www.planalto.gov.br/ccivil_03/leis/l8078.htm",
    tipo: "legislacao",
  },
  {
    titulo: "Marco Civil da Internet",
    tribunal: "Lei nº 12.965/2014",
    resumo:
      "Direitos e deveres na internet, guarda de registros, privacidade e responsabilização de provedores.",
    href: "https://www.planalto.gov.br/ccivil_03/_ato2011-2014/2014/lei/l12965.htm",
    tipo: "legislacao",
  },
  {
    titulo: "Lei Geral de Proteção de Dados (LGPD)",
    tribunal: "Lei nº 13.709/2018",
    resumo:
      "Tratamento de dados pessoais, bases legais e direitos do titular em plataformas digitais.",
    href: "https://www.planalto.gov.br/ccivil_03/_ato2015-2018/2018/lei/l13709.htm",
    tipo: "legislacao",
  },
  {
    titulo: "Lei de Software (programas de computador)",
    tribunal: "Lei nº 9.609/1998",
    resumo:
      "Proteção de programas de computador, licenciamento e titularidade em relações de trabalho e contratos de desenvolvimento.",
    href: "https://www.planalto.gov.br/ccivil_03/leis/l9609.htm",
    tipo: "legislacao",
  },
  {
    titulo: "Tema: bloqueio de contas em plataformas digitais",
    tribunal: "Tribunais estaduais e STJ",
    resumo:
      "Restabelecimento de perfis e contas, falha na moderação e responsabilidade de provedores — decisões atualizadas nos sites dos tribunais.",
    href: "https://www.stj.jus.br/sites/portalp/Inicio",
    tipo: "jurisprudencia",
  },
  {
    titulo: "Tema: dano moral em proteção de dados",
    tribunal: "STJ e tribunais estaduais",
    resumo:
      "Discussão sobre vazamento de dados, nexo causal e indenização — com distinções entre dados sensíveis e comuns.",
    href: "https://www.stj.jus.br/",
    tipo: "jurisprudencia",
  },
];
