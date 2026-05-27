import { NextResponse } from "next/server";
import { ZodError } from "zod";

import { gerarRelatorioPesquisaDocumental } from "@/lib/anthropic/pesquisa-documental";
import { pesquisaDocumentalSchema } from "@/lib/validations/pesquisa-documental";

export const runtime = "nodejs";
export const maxDuration = 60;

export async function POST(request: Request) {
  try {
    const body: unknown = await request.json();
    const dados = pesquisaDocumentalSchema.parse(body);

    const { conteudo, modelo, tokens } = await gerarRelatorioPesquisaDocumental(dados);

    return NextResponse.json({
      conteudoGerado: conteudo,
      modeloIa: modelo,
      tokens,
    });
  } catch (error) {
    console.error("[pesquisa-documental/gerar]", error);

    if (error instanceof ZodError) {
      return NextResponse.json(
        { erro: "Dados do formulário inválidos. Execute a triagem antes de gerar o relatório." },
        { status: 400 }
      );
    }

    const mensagem =
      error instanceof Error
        ? error.message
        : "Não foi possível gerar o relatório. Tente novamente.";

    return NextResponse.json({ erro: mensagem }, { status: 500 });
  }
}
