export const SITE = {
  name: "Lex Rocha",
  legalName: "Lex Rocha Tecnologia Jurídica",
  domain: "lexrocha.com.br",
  url: process.env.NEXT_PUBLIC_APP_URL ?? "https://lexrocha.com.br",
  cnpj: "61.699.939/0001-80",
  founder: "Tiago Aureliano da Rocha",
  founderTitle: "Fundador",
  city: "Caraguatatuba",
  state: "SP",
  email: "contato@lexrocha.com.br",
  whatsapp: "", // preencher quando disponível
} as const;

export const NAV_LINKS = [
  { href: "#como-funciona", label: "Como funciona" },
  { href: "#precedentes", label: "Precedentes" },
  { href: "#confianca", label: "Por que confiar" },
  { href: "#parceiros", label: "Parceiros" },
] as const;
