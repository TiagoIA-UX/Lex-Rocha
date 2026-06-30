import { NextResponse } from "next/server";

import { nuvemFiscalConfigurado } from "@/lib/fiscal/config";
import { montarDpsPesquisa } from "@/lib/fiscal/dps";
import { emitirNfseDps } from "@/lib/fiscal/nuvem-fiscal";
import { adminAutenticado } from "@/lib/security/admin-guard";
import { createAdminClient } from "@/lib/supabase/admin";
import type { Database } from "@/types/database";

export const runtime = "nodejs";

type Params = { params: { id: string } };
type RelatorioUpdate = Database["public"]["Tables"]["relatorios_pesquisa"]["Update"];

type CorpoEmissao = {
  valor?: number;
  tomador?: {
    nome?: string;
    email?: string;
    cpf?: string;
    cnpj?: string;
    cMun?: string;
    cep?: string;
    logradouro?: string;
    numero?: string;
    bairro?: string;
    complemento?: string;
  };
};

export async function POST(request: Request, { params }: Params) {
  if (!(await adminAutenticado(request))) {
    return NextResponse.json({ erro: "Não autorizado." }, { status: 401 });
  }

  if (!nuvemFiscalConfigurado()) {
    return NextResponse.json(
      { erro: "Nuvem Fiscal não configurada (NUVEM_FISCAL_CLIENT_ID / SECRET)." },
      { status: 500 }
    );
  }

  let corpo: CorpoEmissao;
  try {
    corpo = (await request.json()) as CorpoEmissao;
  } catch {
    return NextResponse.json({ erro: "JSON inválido." }, { status: 400 });
  }

  const t = corpo.tomador;
  if (!t?.nome || !t.cMun || !t.cep || !t.logradouro || !t.numero || !t.bairro) {
    return NextResponse.json(
      { erro: "Dados do tomador incompletos (nome e endereço completo são obrigatórios)." },
      { status: 400 }
    );
  }

  const supabase = createAdminClient();
  const { data: rel, error } = await supabase
    .from("relatorios_pesquisa")
    .select("id, valor_cobrado, valor_estimado, nfse_status")
    .eq("id", params.id)
    .maybeSingle();

  if (error) return NextResponse.json({ erro: error.message }, { status: 500 });
  if (!rel) return NextResponse.json({ erro: "Relatório não encontrado." }, { status: 404 });

  if (rel.nfse_status === "autorizada") {
    return NextResponse.json(
      { erro: "NFS-e já emitida para este relatório." },
      { status: 409 }
    );
  }

  const valor = corpo.valor ?? rel.valor_cobrado ?? rel.valor_estimado ?? 0;

  let resultado;
  try {
    const pedido = montarDpsPesquisa({
      valor,
      tomador: {
        nome: t.nome,
        email: t.email,
        cpf: t.cpf,
        cnpj: t.cnpj,
        endereco: {
          cMun: t.cMun,
          cep: t.cep,
          logradouro: t.logradouro,
          numero: t.numero,
          bairro: t.bairro,
          complemento: t.complemento,
        },
      },
    });
    resultado = await emitirNfseDps(pedido);
  } catch (e) {
    const msg = e instanceof Error ? e.message : "Falha ao emitir NFS-e.";
    return NextResponse.json({ erro: msg }, { status: 502 });
  }

  const update: RelatorioUpdate = {
    nfse_id: resultado.id,
    nfse_numero: resultado.numero,
    nfse_status: resultado.status ?? "processando",
    nfse_pdf_url: resultado.pdfUrl,
    nfse_emitida_em: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  };

  const { data: atualizado, error: errUpd } = await supabase
    .from("relatorios_pesquisa")
    .update(update)
    .eq("id", params.id)
    .select("id, nfse_id, nfse_numero, nfse_status, nfse_pdf_url, nfse_emitida_em")
    .maybeSingle();

  if (errUpd) return NextResponse.json({ erro: errUpd.message }, { status: 500 });

  return NextResponse.json({ relatorio: atualizado, nfse: resultado });
}
