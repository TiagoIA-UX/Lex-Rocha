/**
 * Governança de copy — lista única para testes (espelha copy-site.ts).
 * Ao alterar COPY_PROIBIDO em copy-site.ts, atualize aqui também.
 */

export const COPY_PROIBIDO = [
  "MVP — primeiros relatórios gratuitos",
  "Saiba se você tem direito",
  "Bloqueado no WhatsApp",
  "estamos aqui para ajudar",
  "não só bloqueios",
  "momento de stress",
  "Fui lesado",
  "análise gratuita",
  "inteligência artificial",
];

/** Chaves obrigatórias de COPY_SITE (camada 1) */
export const COPY_SITE_KEYS = [
  "metadata",
  "hero",
  "areas",
  "howItWorks",
  "modelo",
  "trust",
  "fontes",
  "precos",
  "precedentes",
  "parceiros",
  "cta",
  "footer",
  "solicitar",
  "acompanhar",
  "parceiro",
  "whatsappFloat",
  "cookies",
  "avisoLegal",
];

/** Termos de nicho TI que devem aparecer na fonte única */
export const COPY_NICHO_TI_TERMOS = [
  "LGPD",
  "plataforma",
  "digital",
];

/** Componentes que devem importar COPY_SITE */
export const COMPONENTES_COPY_SITE = [
  "hero-section.tsx",
  "areas-atendidas-section.tsx",
  "how-it-works-section.tsx",
  "modelo-relatorio-section.tsx",
  "trust-section.tsx",
  "fontes-publicas-section.tsx",
  "precos-pesquisa-section.tsx",
  "precedentes-section.tsx",
  "partners-waitlist-section.tsx",
  "cta-banner.tsx",
  "site-footer.tsx",
  "aviso-legal-site.tsx",
  "whatsapp-float.tsx",
  "solicitar-pesquisa-form.tsx",
  "cookie-consent-banner.tsx",
];
