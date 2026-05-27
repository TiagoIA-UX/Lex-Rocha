import { SITE } from "@/lib/constants/site";

export const VERSAO_POLITICA_PRIVACIDADE = "v1.1-2026-05-26";
export const DATA_PUBLICACAO_POLITICA = "25 de maio de 2026";

export const DPO = {
  nome: SITE.founder,
  email: SITE.email,
  prazoRespostaDias: 15,
} as const;

export const CONSENT_COOKIE_NAME = "lex_rocha_consent";
export const SESSION_COOKIE_NAME = "lex_rocha_sid";

export const TEXTO_JURISDICAO_BRASILEIRA =
  "Este serviço fornece pesquisa de jurisprudência de tribunais brasileiros com base na legislação nacional. Os precedentes e fundamentos referenciados aplicam-se a questões sob jurisdição brasileira. Não nos responsabilizamos por questões de direito estrangeiro ou internacional.";
