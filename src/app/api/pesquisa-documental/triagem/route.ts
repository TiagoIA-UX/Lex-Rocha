import { NextResponse } from "next/server";
import { ZodError } from "zod";

import { classificarCasoTriagem } from "@/lib/groq/triagem";
import { createAdminClient } from "@/lib/supabase/admin";
import { triagemInputSchema } from "@/lib/validations/pesquisa-documental";

export const runtime = "nodejs";
export const maxDuration = 30;

export async function POST(request: Request) {
  try {
    const body: unknown = await request.json();
    const dados = triagemInputSchema.parse(body);

    const { resultado, modelo, tokens } = await classificarCasoTriagem({
      area: dados.area,
      fatosResumo: dados.fatos,
    });

    try {
      const supabase = createAdminClient();
      await supabase.from("log_ia").insert({
        api_usada: "groq",
        modelo,
        tokens_entrada: tokens?.entrada ?? null,
        tokens_saida: tokens?.saida ?? null,
      });
    } catch {
      // auditoria opcional — não bloqueia triagem
    }

    return NextResponse.json({
      triagem: resultado,
      modelo,
      tokens,
    });
  } catch (error) {
    console.error("[pesquisa-documental/triagem]", error);

    if (error instanceof ZodError) {
      return NextResponse.json(
        { erro: "Dados inválidos. Revise área e resumo dos fatos." },
        { status: 400 }
      );
    }

    const mensagem =
      error instanceof Error ? error.message : "Falha na classificação do caso.";

    return NextResponse.json({ erro: mensagem }, { status: 500 });
  }
}
