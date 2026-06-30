/**
 * Modelo ilustrativo — dados 100% fictícios / anonimizados (LGPD).
 * Mesma estrutura de seções do PDF entregue ao cliente.
 */

import { TITULO_RELATORIO_PDF } from "@/lib/constants/estrutura-relatorio";

export const MODELO_RELATORIO_META = {
  referencia: "REL-2026-042",
  dataEmissao: "maio de 2026",
  area: "Prestação de serviços digitais — suspensão de conta",
  titulo: TITULO_RELATORIO_PDF,
  aviso: "Modelo ilustrativo com dados fictícios — não representa um caso real.",
} as const;

export const MODELO_RELATORIO_SECOES = [
  {
    titulo: "Destinatário e finalidade",
    corpo: `Documento preparado para apoio informativo ao(à) advogado(a) que acompanhará o caso do cliente identificado internamente como **Cliente A.P.**\n\nFinalidade: reunir fatos narrados pelo cliente, fundamentos frequentes em demandas similares e precedentes públicos com link para conferência — sem recomendação de estratégia ou prognóstico de êxito.`,
  },
  {
    titulo: "Resumo executivo dos fatos (narrativa do cliente)",
    corpo: `Profissional autônomo relata suspensão reiterada de conta em plataforma digital de comunicação, após uso de funcionalidades oficiais do próprio serviço (incluindo vinculação a perfil corporativo).\n\nApós recurso interno, o fornecedor teria reconhecido ausência de irregularidade e restabelecido o acesso, com nova suspensão em seguida. Cliente alega prejuízo à atividade profissional. **Dados pessoais, capturas e identificadores permanecem apenas no dossiê contratual — não reproduzidos neste modelo público.**`,
  },
  {
    titulo: "Linha do tempo (organização cronológica)",
    corpo: `1. Bloqueio inicial após tentativa de pareamento de dispositivo.\n2. Análise interna da plataforma com resultado favorável ao usuário.\n3. Reativação seguida de novo bloqueio automático.\n4. Migração entre modalidades do aplicativo sem cessação do problema.\n5. Início de registro de provas (capturas) para eventual instrução — armazenadas sob sigilo contratual.`,
  },
  {
    titulo: "Fundamentos jurídicos frequentes em casos similares (referência bibliográfica)",
    corpo: `• Art. 14 do CDC — falha na prestação de serviço.\n• Princípio do *venire contra factum proprium* (comportamento contraditório).\n• Art. 20 do Marco Civil da Internet — responsabilização e defesa do usuário.\n• Art. 20 da LGPD — explicação de decisões automatizadas, quando aplicável.\n• Tutela de urgência e astreintes (arts. 300 e 537 do CPC) — citados em jurisprudência, não avaliados neste relatório.`,
  },
  {
    titulo: "Casos semelhantes já decididos (amostra)",
    corpo: `**TJMT (2026) — bloqueio de WhatsApp Business**\nO que aconteceu: profissional teve a conta comercial bloqueada sem explicação clara.\nO que o juiz decidiu: suspender o serviço sem motivo adequado é falha na prestação e viola a boa-fé do consumidor.\nResultado: indenização de R$ 10 mil por danos morais.\nFonte: tjmt.jus.br (notícia institucional, mar/2026)\n\n**TJPR (2025) — plataforma digital**\nO que aconteceu: usuário contestou restrição de acesso em serviço contratado.\nO que o juiz decidiu: o fornecedor deve manter o serviço disponível; interrupção abusiva não é permitida.\nResultado: obrigação de fazer — restabelecer o acesso.\nFonte: jurisprudência pública TJPR\n\n**TJMA (2024) — conta em rede social**\nO que aconteceu: perfil bloqueado sem aviso prévio eficaz.\nO que o juiz decidiu: bloqueio sem contraditório fere direitos do consumidor digital.\nResultado: restabelecimento da conta e danos morais.\nFonte: tjma.jus.br\n\nNo relatório contratado, selecionamos os casos mais próximos dos seus fatos — com data, tribunal e link para conferência.`,
  },
  {
    titulo: "Síntese para reunião com advogado(a)",
    corpo: `Há decisões públicas em que tribunais reconheceram falha quando plataformas bloqueiam contas sem motivação clara — especialmente após a própria empresa admitir que não havia infração.\n\n**O que você leva na consulta:** fatos organizados, fundamentos frequentes (CDC, Marco Civil) e precedentes explicados em linguagem clara, com fontes para o advogado(a) aprofundar a estratégia.`,
  },
] as const;
