/**
 * Modelo ilustrativo — dados 100% fictícios / anonimizados (LGPD).
 * Mesma estrutura de seções do PDF entregue ao cliente.
 */

import { AVISO_DESTAQUE_PDF, TITULO_RELATORIO_PDF } from "@/lib/constants/estrutura-relatorio";

export const MODELO_RELATORIO_META = {
  referencia: "REL-2026-042",
  dataEmissao: "maio de 2026",
  area: "Prestação de serviços digitais — suspensão de conta",
  titulo: TITULO_RELATORIO_PDF,
  aviso: `MODELO ILUSTRATIVO — ${AVISO_DESTAQUE_PDF}`,
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
    titulo: "Precedentes públicos pesquisados (amostra)",
    corpo: `Amostra de decisões e notícias de tribunais brasileiros em temas afins (serviços digitais e relação de consumo). O relatório contratado trará os precedentes selecionados para o seu caso, com ementa ou resumo e data.\n\n• TJMT — indenização por suspensão indevida de conta em serviço de mensagens (2025/2026)\n  https://www.tjmt.jus.br/noticias/2026/3/bloqueio-sem-justificativa-no-whatsapp-business-gera-indenizacao-r-10-mil\n\n• TJ-PR — obrigação de fazer em plataforma digital (2025)\n  https://www.jusbrasil.com.br/jurisprudencia/tj-pr/5237350680/inteiro-teor-5237350696\n\n• TJMA — restabelecimento de conta e danos morais\n  https://www.tjma.jus.br/midia/portal/noticia/514425/meta-e-condenada-a-restabelecer-whatsapp-de-usuaria-bloqueado-indevidamente\n\n(Links públicos para conferência — sem garantia de aplicabilidade ao seu caso.)`,
  },
  {
    titulo: "Síntese para reunião com advogado(a)",
    corpo: `O conjunto documental sugere **relevância jurisprudencial crescente** em bloqueios sem motivação clara, especialmente quando há comunicação da própria plataforma reconhecendo inexistência de infração.\n\n**O que este relatório não faz:** indicar se deve ajuizar ação, valor da causa, pedidos ou probabilidade de liminar. Essas conclusões são etapa privativa da advocacia.\n\n**O que você ganha:** horas de pesquisa já organizadas, linguagem clara e referências clicáveis para a primeira consulta ser mais produtiva.`,
  },
] as const;
