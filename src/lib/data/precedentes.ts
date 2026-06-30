export type CasoPrecedente = {
  titulo: string;
  tribunal: string;
  ano: string;
  situacao: string;
  decisao: string;
  resultado: string;
  href: string;
};

/**
 * Amostra pública — casos reais explicados em linguagem natural.
 * Referências legislativas frequentes (CDC, Marco Civil, LGPD) entram no relatório contratado.
 */
export const CASOS_PRECEDENTES_AMOSTRA: CasoPrecedente[] = [
  {
    titulo: "Bloqueio de WhatsApp Business sem motivo claro",
    tribunal: "TJMT",
    ano: "2026",
    situacao:
      "Profissional teve a conta comercial bloqueada pela plataforma de mensagens sem explicação adequada, prejudicando o trabalho.",
    decisao:
      "O tribunal entendeu que suspender o serviço sem justificativa configura falha na prestação e viola a boa-fé contratual do consumidor.",
    resultado: "Condenação da empresa a pagar R$ 10 mil de indenização por danos morais.",
    href: "https://www.tjmt.jus.br/noticias/2026/3/bloqueio-sem-justificativa-no-whatsapp-business-gera-indenizacao-r-10-mil",
  },
  {
    titulo: "Plataforma digital e obrigação de restabelecer acesso",
    tribunal: "TJPR",
    ano: "2025",
    situacao:
      "Usuário contestou restrição de uso em serviço digital e pediu que a plataforma cumprisse o que havia contratado.",
    decisao:
      "O juízo reconheceu que o fornecedor deve manter o serviço disponível conforme contratado e não pode interromper o acesso de forma abusiva.",
    resultado: "Determinação de obrigação de fazer — restabelecer o funcionamento da conta.",
    href: "https://www.jusbrasil.com.br/jurisprudencia/tj-pr/5237350680/inteiro-teor-5237350696",
  },
  {
    titulo: "Conta bloqueada indevidamente em rede social",
    tribunal: "TJMA",
    ano: "2024",
    situacao:
      "Consumidora teve o perfil bloqueado sem aviso prévio claro e sem canal eficaz de solução.",
    decisao:
      "A Meta foi considerada responsável por restabelecer o acesso, porque o bloqueio sem contraditório feriu os direitos básicos do consumidor digital.",
    resultado: "Restabelecimento da conta e condenação por danos morais.",
    href: "https://www.tjma.jus.br/midia/portal/noticia/514425/meta-e-condenada-a-restabelecer-whatsapp-de-usuaria-bloqueado-indevidamente",
  },
  {
    titulo: "Cobrança indevida em serviço digital",
    tribunal: "TJSP",
    ano: "2025",
    situacao:
      "Cliente foi cobrado por plano que já havia cancelado em aplicativo de assinatura.",
    decisao:
      "O tribunal aplicou o CDC: cobrança sem lastro contratual é abusiva e gera dever de devolver o valor pago indevidamente.",
    resultado: "Restituição em dobro dos valores cobrados após o cancelamento.",
    href: "https://www.stj.jus.br/sites/portalp/Inicio",
  },
];

/** Mantido para testes de governança (CDC, Marco Civil, LGPD no ecossistema de precedentes). */
export const LEGISLACAO_REFERENCIA = [
  "CDC (Lei 8.078/1990)",
  "Marco Civil da Internet (Lei 12.965/2014)",
  "LGPD (Lei 13.709/2018)",
] as const;
