export const SITE = {
  name: "Lex Rocha",
  legalName: "Lex Rocha",
  serviceName: "Pesquisa de Jurisprudência",
  founderRole: "Pesquisador de Jurisprudência",
  domain: "lexrocha.com.br",
  url: process.env.NEXT_PUBLIC_APP_URL ?? "https://lexrocha.com.br",
  cnpj: "61.699.939/0001-80",
  founder: "Tiago Aureliano da Rocha",
  founderTitle: "Fundador",
  city: "Caraguatatuba",
  state: "SP",
  email: process.env.CONTACT_EMAIL ?? "contato@lexrocha.com.br",
  whatsapp: process.env.NEXT_PUBLIC_WHATSAPP_NUMBER ?? "5512996887993",
} as const;

export const NAV_LINKS = [
  { href: "#como-funciona", label: "Como funciona" },
  { href: "/modelo-relatorio", label: "Modelo do relatório" },
  { href: "#fontes", label: "Fontes públicas" },
  { href: "#precos", label: "Valores" },
  { href: "#parceiros", label: "Parceiros" },
] as const;
