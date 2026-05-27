/**
 * Textos públicos Lex-Rocha — fonte única de verdade.
 *
 * Estratégia de comunicação (neurocomportamental aplicada ao B2C jurídico):
 * - Clareza cognitiva: uma ideia por bloco; evitar defesas reativas (“não só X”).
 * - Hierarquia: valor → processo → prova social (metodologia) → investimento → ação.
 * - Confiança por transparência: escopo, preço e limites antes do clique.
 * - Redução de ansiedade: tom respeitoso, sem alarmismo nem promessa de êxito.
 * - Compromisso progressivo: modelo → solicitar → aprovar orçamento → pagamento.
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

export const COPY_SITE = {
  metadata: {
    defaultTitle: "Lex Rocha — Pesquisa Documental Jurídica",
    description:
      "Pesquisa de precedentes em portais públicos com organização documental em PDF para apoiar a consulta com advogado OAB. Escopo e valor confirmados antes da cobrança. CNPJ 61.699.939/0001-80.",
    ogDescription:
      "Pesquisa documental com referências verificáveis. Material informativo para discutir com seu advogado — sem substituir representação processual.",
    keywords: [
      "pesquisa jurisprudência",
      "precedentes públicos",
      "relatório documental",
      "direito do consumidor",
      "organização jurídica",
    ],
  },
  hero: {
    badge: "Pesquisa documental · fontes públicas",
    title: "Jurisprudência organizada",
    titleHighlight: "para a consulta com seu advogado.",
    lead:
      "Reunimos decisões e fundamentos em portais oficiais e entregamos um relatório estruturado em PDF — com referências que você e seu advogado podem conferir.",
    scope:
      "Consumo, trabalho, benefícios previdenciários, contratos e serviços digitais: o tema é definido no seu pedido, com escopo fechado antes do pagamento.",
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
      "Usamos portais públicos para pesquisar e organizar precedentes conforme o caso descrito na solicitação. Exemplos de áreas recorrentes:",
    lista: [
      "Relações de consumo e cobranças",
      "Contratos, cancelamentos e renovações",
      "Planos de saúde e negativas de cobertura",
      "Trabalho e benefícios (INSS)",
      "Contas e plataformas digitais",
      "Demais questões cíveis do cotidiano",
    ],
  },
  howItWorks: {
    eyebrow: "Processo",
    title: "Como funciona",
    description:
      "Três etapas objetivas — você sabe o que acontece em cada fase, sem surpresas na cobrança.",
    steps: [
      {
        title: "1. Solicitação e escopo",
        description:
          "Você descreve o caso. Respondemos com orçamento, prazo estimado e código de acompanhamento. A pesquisa só começa após sua aprovação.",
      },
      {
        title: "2. Pesquisa em fontes públicas",
        description:
          "Consultamos bases como tribunais, CNJ, legislação federal e repositórios de jurisprudência. Cada referência indica origem para conferência.",
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
      "Exemplo com dados fictícios (LGPD). O documento contratado contém apenas as informações que você autorizar.",
    cta: "Abrir modelo completo",
    pageTitle: "Modelo de relatório",
    pageIntro:
      "Visualize a estrutura da Pesquisa de Jurisprudência: organização de fatos, fundamentos e precedentes públicos. Não é petição nem parecer — material informativo para a reunião com seu advogado.",
    ctaSolicitar: "Solicitar pesquisa",
    ctaWhatsapp: "Dúvidas no WhatsApp",
    whatsappMensagem:
      "Olá! Vi o modelo de relatório em {domain} e gostaria de solicitar uma pesquisa.",
  },
  trust: {
    eyebrow: "Transparência",
    title: "Por que contratar a pesquisa documental",
    description:
      "Investimento previsível, metodologia rastreável e entrega pensada para reduzir retrabalho na primeira consulta advocatícia.",
    pillars: [
      {
        title: "Investimento definido no escopo",
        text: "Faixas de referência publicadas. O valor final é confirmado por escrito antes de qualquer cobrança.",
      },
      {
        title: "Prazo comunicado na fila",
        text: "Capacidade operacional limitada e previsível. Status consultável pelo código enviado após a solicitação.",
      },
      {
        title: "Fontes verificáveis",
        text: "Precedentes com link ou referência de origem pública. Sem orientação sobre qual ação propor.",
      },
      {
        title: "Feito para o advogado",
        text: "Fatos, fundamentos e jurisprudência já organizados — a reunião foca em estratégia, não em busca inicial.",
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
      "Ilustrações de legislação e jurisprudência. Cada relatório contratado cita apenas o que foi efetivamente pesquisado.",
  },
  parceiros: {
    eyebrow: "B2B",
    title: "Escritórios e investidores",
    description:
      "Lista de espera para parcerias de encaminhamento. Clientes chegam com pesquisa documental já organizada.",
    cards: [
      {
        title: "Leads com contexto",
        text: "Menos tempo de triagem inicial: precedentes e resumo do caso já estruturados.",
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
      "Envie a solicitação pelo formulário ou WhatsApp. Confirmamos escopo e valor antes de iniciar a pesquisa.",
    primary: "Solicitar pesquisa",
    whatsappMensagem:
      "Olá! Gostaria de solicitar uma Pesquisa de Jurisprudência — vim pelo site {domain}.",
  },
  footer: {
    about:
      "Pesquisa documental de precedentes em portais públicos. Material informativo para apoiar a consulta com advogado OAB — sem substituir representação processual.",
    whatsappMensagem:
      "Olá! Contato pelo site {domain} — Pesquisa de Jurisprudência.",
  },
  solicitar: {
    title: "Solicitar pesquisa",
    intro:
      "Descreva o caso com o nível de detalhe que tiver. Respondemos por e-mail com escopo, prazo e orçamento. A cobrança ocorre somente após sua aprovação.",
    sucessoTitulo: "Solicitação recebida",
    sucessoCorpo:
      "Entraremos em contato no e-mail informado com escopo, prazo e orçamento antes de iniciar a pesquisa.",
    placeholderDescricao:
      "Resuma o conflito, a parte envolvida e o que você já tentou resolver (sem incluir senhas ou dados bancários completos).",
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
} as const;

/** @deprecated Use COPY_SITE — mantido para imports legados */
export const COPY_LANDING = COPY_SITE;
