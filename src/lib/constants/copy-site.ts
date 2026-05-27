/**
 * Textos públicos Lex-Rocha — fonte única de verdade.
 *
 * Estratégia (neurocomportamental · ver docs/PROMPT_ADAPTACAO_NEUROCOMPORTAMENTAL.md):
 * - Clareza cognitiva: uma ideia por bloco.
 * - Hierarquia: valor → processo → metodologia → investimento → ação.
 * - Confiança: escopo, preço e limites antes do clique.
 * - Compromisso progressivo: modelo → solicitar → orçamento → pagamento.
 * - Vertical TI: LGPD, plataformas, consumo e contratos digitais (demanda A1–A4).
 *
 * Regras .cursorrules: sem consultoria, sem prometer resultado, sem “gratuito”/MVP.
 */

/** Frases banidas em produção (auditoria / testes). */
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
] as const;

/** Categorias do nicho digital — alinhadas ao formulário e à seção Escopo */
export const COPY_CATEGORIAS_DIGITAL = [
  { id: "A1", label: "LGPD, vazamento e uso indevido de dados" },
  { id: "A2", label: "Contas, apps e plataformas digitais" },
  { id: "A3", label: "Consumo digital (apps, fintech, marketplaces)" },
  { id: "A4", label: "Contratos digitais, SaaS e cancelamentos" },
  { id: "B1", label: "Trabalho com uso de tecnologia (apps, monitoramento)" },
  { id: "B2", label: "Planos de saúde e negativas de cobertura" },
  { id: "C", label: "Demais questões cíveis com uso de tecnologia" },
] as const;

export const COPY_SITE = {
  metadata: {
    defaultTitle: "Lex Rocha — Pesquisa Documental Jurídica",
    description:
      "Pesquisa de precedentes em portais públicos sobre LGPD, plataformas digitais e consumo online. Relatório em PDF para a consulta com advogado OAB. Escopo e valor confirmados antes da cobrança. CNPJ 61.699.939/0001-80.",
    ogDescription:
      "Precedentes organizados em fontes públicas verificáveis. Material informativo para discutir com seu advogado — sem substituir representação processual.",
    keywords: [
      "pesquisa jurisprudência",
      "direito digital",
      "LGPD precedentes",
      "conta bloqueada plataforma",
      "precedentes públicos",
      "relatório documental",
      "direito do consumidor digital",
      "organização jurídica",
    ],
  },
  hero: {
    badge: "Pesquisa documental · direito digital e consumo",
    title: "Precedentes organizados",
    titleHighlight: "para levar à consulta com seu advogado.",
    lead:
      "Consultamos tribunais e bases públicas sobre o seu caso — LGPD, plataformas, apps e contratos digitais — e entregamos um PDF com referências que você e seu advogado podem conferir.",
    scope:
      "O tema é definido na sua solicitação. Orçamento e escopo fechados por escrito antes de qualquer cobrança.",
    disclaimer:
      "Material informativo. Não substitui advogado inscrito na OAB nem indica probabilidade de êxito em processo.",
    ctaPrimary: "Solicitar pesquisa",
    ctaSecondary: "Ver modelo do relatório",
    ctaWhatsapp: "WhatsApp",
    footnote: "A partir de R$ {essencial} · orçamento aprovado antes da cobrança · código de acompanhamento",
    whatsappMensagem:
      "Olá! Acessei o site {domain} e gostaria de solicitar uma Pesquisa de Jurisprudência.",
  },
  areas: {
    eyebrow: "Escopo",
    title: "Temas que pesquisamos em portais públicos",
    description:
      "Priorizamos demandas digitais em alta no Judiciário brasileiro. A lista abaixo orienta o pedido — o escopo final segue o que você descrever na solicitação:",
    lista: COPY_CATEGORIAS_DIGITAL.map((c) => c.label),
  },
  howItWorks: {
    eyebrow: "Processo",
    title: "Como funciona",
    description:
      "Três etapas — você sabe o que acontece em cada fase, sem surpresa na cobrança.",
    steps: [
      {
        title: "1. Solicitação e escopo",
        description:
          "Você descreve o caso (ex.: conta bloqueada, vazamento de dados). Respondemos com orçamento, prazo e código de acompanhamento. A pesquisa só começa após sua aprovação.",
      },
      {
        title: "2. Pesquisa em fontes públicas",
        description:
          "Consultamos tribunais, CNJ, legislação federal (CDC, Marco Civil, LGPD) e repositórios de jurisprudência. Cada referência indica origem para conferência.",
      },
      {
        title: "3. Entrega do relatório",
        description:
          "PDF com fatos organizados, linha do tempo, fundamentos indicados e links de precedentes — linguagem clara para a reunião com o advogado.",
      },
    ],
  },
  modelo: {
    eyebrow: "Formato",
    title: "Modelo ilustrativo do relatório",
    description:
      "Exemplo com dados fictícios (conta digital / LGPD). O documento contratado contém apenas o que você autorizar.",
    cta: "Abrir modelo completo",
    pageTitle: "Modelo de relatório",
    pageIntro:
      "Veja a estrutura da pesquisa: fatos, fundamentos e precedentes públicos. Não é petição nem parecer — material informativo para a reunião com seu advogado.",
    ctaSolicitar: "Solicitar pesquisa",
    ctaWhatsapp: "Dúvidas no WhatsApp",
    whatsappMensagem:
      "Olá! Vi o modelo de relatório em {domain} e gostaria de solicitar uma pesquisa.",
  },
  trust: {
    eyebrow: "Transparência",
    title: "Por que contratar a pesquisa documental",
    description:
      "Investimento previsível, metodologia rastreável e entrega pensada para a primeira consulta advocatícia ser mais objetiva.",
    pillars: [
      {
        title: "Investimento definido no escopo",
        text: "Faixas publicadas na página de valores. O valor final é confirmado por escrito antes de qualquer cobrança.",
      },
      {
        title: "Prazo comunicado na fila",
        text: "Capacidade operacional limitada. Status consultável pelo código enviado após a solicitação.",
      },
      {
        title: "Fontes verificáveis",
        text: "Precedentes com link ou referência pública. Sem orientação sobre qual ação propor.",
      },
      {
        title: "Foco em conflitos digitais",
        text: "Experiência recorrente em LGPD, plataformas e consumo online — fatos e jurisprudência já organizados para o advogado.",
      },
      {
        title: "Rede de parceiros (futuro)",
        text: "Programa em estruturação para encaminhamento a escritórios, após validação do formato do relatório.",
      },
    ],
  },
  fontes: {
    eyebrow: "Metodologia",
    title: "Fontes públicas utilizadas",
    description:
      "Toda pesquisa aponta referências conferíveis pelo cliente ou pelo advogado responsável pelo caso.",
  },
  precos: {
    eyebrow: "Valores",
    title: "Investimento por faixa de escopo",
    description:
      "Referências para planejamento. O orçamento definitivo é confirmado por escrito antes da pesquisa.",
    linkModelo: "Ver modelo ilustrativo (dados fictícios)",
  },
  precedentes: {
    eyebrow: "Referência",
    title: "Exemplos de fundamentos consultados",
    description:
      "Ilustrações de legislação e temas recorrentes em tribunais. Cada relatório contratado cita apenas o que foi efetivamente pesquisado.",
  },
  parceiros: {
    eyebrow: "B2B",
    title: "Escritórios e investidores",
    description:
      "Lista de espera para parcerias de encaminhamento. Clientes chegam com pesquisa documental já organizada.",
    cards: [
      {
        title: "Leads com contexto",
        text: "Menos triagem inicial: precedentes e resumo do caso já estruturados em conflitos digitais.",
      },
      {
        title: "Vagas por região",
        text: "Rede em formação, com limite de parceiros por cidade e especialidade na abertura.",
      },
      {
        title: "Manifestar interesse",
        text: "Advogados com OAB ativa e investidores do setor jurídico podem entrar na lista de espera.",
      },
    ],
    badge: "Parcerias em estruturação",
    cta: "Lista de espera",
  },
  cta: {
    title: "Próximo passo: descrever seu caso",
    description:
      "Formulário ou WhatsApp. Confirmamos escopo e valor antes de iniciar a pesquisa em portais públicos.",
    primary: "Solicitar pesquisa",
    whatsappMensagem:
      "Olá! Gostaria de solicitar uma Pesquisa de Jurisprudência — vim pelo site {domain}.",
  },
  footer: {
    about:
      "Pesquisa documental de precedentes em portais públicos, com ênfase em direito digital e consumo online. Material informativo para apoiar a consulta com advogado OAB.",
    whatsappMensagem:
      "Olá! Contato pelo site {domain} — Pesquisa de Jurisprudência.",
  },
  solicitar: {
    title: "Solicitar pesquisa",
    intro:
      "Descreva o conflito com o detalhe que tiver (conta bloqueada, vazamento, cobrança em app, etc.). Respondemos por e-mail com escopo, prazo e orçamento. Cobrança somente após sua aprovação.",
    sucessoTitulo: "Solicitação recebida",
    sucessoCorpo:
      "Entraremos em contato no e-mail informado com escopo, prazo e orçamento antes de iniciar a pesquisa.",
    placeholderDescricao:
      "Resuma o que aconteceu, a plataforma ou empresa envolvida e o que você já tentou (sem senhas nem dados bancários completos).",
    referenciaValores:
      "Faixas de referência: Essencial, Padrão e Completo. O valor final depende do escopo confirmado por escrito.",
  },
  acompanhar: {
    title: "Acompanhar pedido",
    intro:
      "Informe o código enviado por e-mail após a solicitação ou a confirmação de pagamento.",
  },
  parceiro: {
    badge: "Rede em construção",
    title: "Lista de espera — escritórios parceiros",
    intro:
      "Validamos o formato dos relatórios antes de abrir a carteira de encaminhamento. Cadastre interesse para ser contactado na abertura da rede.",
  },
  whatsappFloat: {
    mensagem:
      "Olá! Acessei {domain} e gostaria de informações sobre Pesquisa de Jurisprudência.",
    label: "Falar no WhatsApp",
  },
  cookies: {
    dialogLabel: "Preferências de cookies",
    title: "Cookies e privacidade",
  },
} as const;

/** @deprecated Use COPY_SITE — mantido para imports legados */
export const COPY_LANDING = COPY_SITE;
