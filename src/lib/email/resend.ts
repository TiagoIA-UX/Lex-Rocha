import { SITE } from "@/lib/constants/site";
import { formatarDataPrevisao } from "@/lib/pedidos/previsao-entrega";
import {
  mensagemNovaSolicitacao,
  mensagemPagamentoConfirmado,
  montarLinkWhatsApp,
  whatsappConfigurado,
} from "@/lib/whatsapp";

type EnviarEmailParams = {
  para: string | string[];
  assunto: string;
  texto: string;
  responderPara?: string;
};

export async function enviarEmailResend(params: EnviarEmailParams): Promise<boolean> {
  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) {
    console.warn("[email] RESEND_API_KEY ausente — e-mail não enviado.");
    return false;
  }

  const from = process.env.RESEND_FROM_EMAIL ?? SITE.email;
  const destinatarios = Array.isArray(params.para) ? params.para : [params.para];

  let res: Response;
  try {
    res = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from: `Lex Rocha <${from}>`,
        to: destinatarios,
        reply_to: params.responderPara,
        subject: params.assunto,
        text: params.texto,
      }),
      signal: AbortSignal.timeout(8000),
    });
  } catch (error) {
    console.error("[email] timeout/falha de rede no Resend", error);
    return false;
  }

  if (!res.ok) {
    const err = await res.text();
    console.error("[email] falha Resend", res.status, err);
    return false;
  }

  return true;
}

export async function alertarFundadorNovaSolicitacao(dados: {
  nome: string;
  email: string;
  area: string;
  codigo: string;
  previsao: Date;
}) {
  const base = (process.env.NEXT_PUBLIC_APP_URL ?? SITE.url).replace(/\/$/, "");
  return enviarEmailResend({
    para: SITE.email,
    responderPara: dados.email,
    assunto: `[Lex-Rocha] Nova solicitação — ${dados.nome}`,
    texto: [
      "Nova solicitação no formulário público.",
      "",
      `Nome: ${dados.nome}`,
      `E-mail: ${dados.email}`,
      `Área: ${dados.area}`,
      `Código de acompanhamento: ${dados.codigo}`,
      `Previsão de retorno (orçamento): ${formatarDataPrevisao(dados.previsao)}`,
      "",
      `Painel: ${base}/pesquisa-documental/fila`,
      `Acompanhar: ${base}/acompanhar/${dados.codigo}`,
      whatsappConfigurado()
        ? `\nWhatsApp (responder ao cliente): ${montarLinkWhatsApp(
            mensagemNovaSolicitacao({
              nome: dados.nome,
              email: dados.email,
              area: dados.area,
              codigo: dados.codigo,
            })
          )}`
        : "",
    ].join("\n"),
  });
}

export async function alertarFundadorPagamentoConfirmado(dados: {
  referencia: string;
  valor: number;
  codigo?: string;
  clienteEmail?: string;
}) {
  const base = (process.env.NEXT_PUBLIC_APP_URL ?? SITE.url).replace(/\/$/, "");
  return enviarEmailResend({
    para: SITE.email,
    assunto: `[Lex-Rocha] Pagamento confirmado — ${dados.referencia}`,
    texto: [
      "Pagamento confirmado (Stripe ou registro manual).",
      "",
      `Referência: ${dados.referencia}`,
      `Valor: R$ ${dados.valor.toFixed(2)}`,
      dados.codigo ? `Código acompanhamento: ${dados.codigo}` : null,
      dados.clienteEmail ? `Cliente: ${dados.clienteEmail}` : null,
      "",
      `Fila: ${base}/pesquisa-documental/fila`,
      whatsappConfigurado()
        ? `\nWhatsApp: ${montarLinkWhatsApp(
            mensagemPagamentoConfirmado({
              referencia: dados.referencia,
              valor: dados.valor,
              codigo: dados.codigo,
            })
          )}`
        : "",
    ]
      .filter(Boolean)
      .join("\n"),
  });
}

export async function emailClientePedidoNaFila(dados: {
  email: string;
  nome: string;
  codigo: string;
  previsao: Date;
  referencia?: string;
}) {
  const base = (process.env.NEXT_PUBLIC_APP_URL ?? SITE.url).replace(/\/$/, "");
  return enviarEmailResend({
    para: dados.email,
    responderPara: SITE.email,
    assunto: "Lex-Rocha — seu pedido entrou na fila de produção",
    texto: [
      `Olá, ${dados.nome.split(" ")[0]}!`,
      "",
      "Recebemos a confirmação do pagamento. Seu relatório entrou na fila de produção.",
      dados.referencia ? `Referência: ${dados.referencia}` : null,
      `Previsão de entrega: ${formatarDataPrevisao(dados.previsao)}`,
      "",
      `Acompanhe pelo site: ${base}/acompanhar/${dados.codigo}`,
      "",
      "Este material é pesquisa documental informativa — não substitui advogado.",
      "",
      SITE.name,
      SITE.email,
    ]
      .filter(Boolean)
      .join("\n"),
  });
}

export async function emailClienteSolicitacaoRecebida(dados: {
  email: string;
  nome: string;
  codigo: string;
  previsao: Date;
}) {
  const base = (process.env.NEXT_PUBLIC_APP_URL ?? SITE.url).replace(/\/$/, "");
  return enviarEmailResend({
    para: dados.email,
    responderPara: SITE.email,
    assunto: "Lex-Rocha — solicitação recebida",
    texto: [
      `Olá, ${dados.nome.split(" ")[0]}!`,
      "",
      "Recebemos sua solicitação de pesquisa de jurisprudência.",
      "Em breve entraremos em contato com escopo e orçamento.",
      "",
      `Código para acompanhar: ${dados.codigo}`,
      `Previsão para retorno do orçamento: ${formatarDataPrevisao(dados.previsao)}`,
      "",
      `${base}/acompanhar/${dados.codigo}`,
    ].join("\n"),
  });
}
