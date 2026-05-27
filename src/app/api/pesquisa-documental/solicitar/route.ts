import { NextResponse } from "next/server";
import { ZodError } from "zod";

import {
  alertarFundadorNovaSolicitacao,
  emailClienteSolicitacaoRecebida,
} from "@/lib/email/resend";
import { garantirCodigoUnico, snapshotFila } from "@/lib/pedidos/fila-service";
import { createAdminClient } from "@/lib/supabase/admin";
import { solicitacaoPesquisaSchema } from "@/lib/validations/solicitacao";

export const runtime = "nodejs";

export async function POST(request: Request) {
  try {
    const body: unknown = await request.json();
    const dados = solicitacaoPesquisaSchema.parse(body);
    const supabase = createAdminClient();

    const [{ posicaoFila, previsao }, codigo] = await Promise.all([
      snapshotFila("padrao"),
      garantirCodigoUnico("solicitacoes_pesquisa"),
    ]);

    const { data, error } = await supabase
      .from("solicitacoes_pesquisa")
      .insert({
        nome: dados.nome,
        email: dados.email,
        telefone: dados.telefone ?? null,
        area: dados.area,
        descricao: dados.descricao,
        status: "nova",
        fila_status: "recebido",
        codigo_acompanhamento: codigo,
        previsao_entrega: previsao.toISOString(),
        faixa_relatorio: "padrao",
      })
      .select("id")
      .single();

    if (error || !data) {
      console.error("[pesquisa-documental/solicitar]", error);
      return NextResponse.json(
        {
          erro:
            "Não foi possível registrar a solicitação. Execute as migrations 006 e 007 no Supabase.",
        },
        { status: 500 }
      );
    }

    // Não bloquear a resposta do formulário por integração de e-mail externa.
    void Promise.allSettled([
      alertarFundadorNovaSolicitacao({
        nome: dados.nome,
        email: dados.email,
        area: dados.area,
        codigo,
        previsao,
      }),
      emailClienteSolicitacaoRecebida({
        nome: dados.nome,
        email: dados.email,
        codigo,
        previsao,
      }),
    ]);

    return NextResponse.json({
      id: data.id,
      ok: true,
      codigoAcompanhamento: codigo,
      previsaoEntrega: previsao.toISOString(),
      posicaoFila,
    });
  } catch (error) {
    console.error("[pesquisa-documental/solicitar]", error);

    if (error instanceof ZodError) {
      const msg = error.issues[0]?.message ?? "Dados inválidos.";
      return NextResponse.json({ erro: msg }, { status: 400 });
    }

    return NextResponse.json({ erro: "Erro ao enviar solicitação." }, { status: 500 });
  }
}
