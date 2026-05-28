#!/usr/bin/env node
/**
 * Diagnóstico direto do Supabase (REST + service role).
 * Confirma migrations 006/007 mesmo após SQL Editor — útil quando o app retorna erro genérico.
 * Uso: npm run test:supabase
 */

import { loadEnvLocal } from "./load-env-local.mjs";

loadEnvLocal();

const url = process.env.NEXT_PUBLIC_SUPABASE_URL?.replace(/\/$/, "");
const key = process.env.SUPABASE_SERVICE_ROLE_KEY;

let falhas = 0;

function ok(msg) {
  console.log(`OK — ${msg}`);
}

function fail(msg) {
  console.error(`FAIL — ${msg}`);
  falhas += 1;
}

async function rest(path, options = {}, tentativa = 0) {
  const maxTentativas = 4;
  try {
    const res = await fetch(`${url}/rest/v1/${path}`, {
      ...options,
      headers: {
        apikey: key,
        Authorization: `Bearer ${key}`,
        "Content-Type": "application/json",
        ...(options.headers ?? {}),
      },
      signal: AbortSignal.timeout(30_000),
    });
    const text = await res.text();
    let body;
    try {
      body = text ? JSON.parse(text) : null;
    } catch {
      body = text;
    }

    const schemaCache =
      res.status === 503 &&
      (body?.code === "PGRST002" ||
        String(body?.message ?? "").includes("schema cache"));

    if (schemaCache && tentativa < maxTentativas) {
      await new Promise((r) => setTimeout(r, 2000 * (tentativa + 1)));
      return rest(path, options, tentativa + 1);
    }

    return { status: res.status, body };
  } catch (error) {
    if (tentativa < maxTentativas) {
      await new Promise((r) => setTimeout(r, 1500 * (tentativa + 1)));
      return rest(path, options, tentativa + 1);
    }
    throw error;
  }
}

console.log("\n=== Supabase (service role) ===\n");

if (!url || !key) {
  fail("NEXT_PUBLIC_SUPABASE_URL ou SUPABASE_SERVICE_ROLE_KEY ausente em .env.local");
  process.exit(1);
}

ok(`Projeto: ${url.replace(/https:\/\/([^.]+).*/, "$1…")}`);

let sol;
try {
  sol = await rest(
    "solicitacoes_pesquisa?select=id,codigo_acompanhamento,fila_status,previsao_entrega&limit=1"
  );
} catch (e) {
  fail(`SELECT solicitacoes_pesquisa — ${e instanceof Error ? e.name : "erro"} (timeout/rede)`);
  sol = { status: 0, body: null };
}
if (sol.status === 200) {
  ok("Tabela solicitacoes_pesquisa + colunas 007 (codigo, fila_status, previsao)");
} else if (sol.status !== 0) {
  fail(`SELECT solicitacoes_pesquisa — HTTP ${sol.status}: ${JSON.stringify(sol.body).slice(0, 180)}`);
}

let rel;
try {
  rel = await rest("relatorios_pesquisa?select=id,codigo_acompanhamento,fila_status&limit=1");
} catch (e) {
  fail(`SELECT relatorios_pesquisa — ${e instanceof Error ? e.name : "erro"} (timeout/rede)`);
  rel = { status: 0, body: null };
}
if (rel.status === 200) {
  ok("Tabela relatorios_pesquisa + colunas 007");
} else if (rel.status !== 0) {
  fail(`SELECT relatorios_pesquisa — HTTP ${rel.status}: ${JSON.stringify(rel.body).slice(0, 180)}`);
}

if (sol.status !== 200) {
  console.error("\n  Pulando INSERT de teste — sem conexão estável com o Supabase.\n");
} else {
const codigoTeste = `TST${Date.now().toString(36).slice(-6).toUpperCase()}`;
const previsao = new Date(Date.now() + 3 * 24 * 60 * 60 * 1000).toISOString();

let ins;
try {
  ins = await rest("solicitacoes_pesquisa", {
  method: "POST",
  headers: { Prefer: "return=representation" },
  body: JSON.stringify({
    nome: "Diagnóstico Automático",
    email: "diag-automatico@lexrocha.local",
    area: "Outro",
    descricao:
      "Registro de teste automatizado com mais de trinta caracteres para validar insert.",
    status: "nova",
    fila_status: "recebido",
    codigo_acompanhamento: codigoTeste,
    previsao_entrega: previsao,
    faixa_relatorio: "padrao",
  }),
  });
} catch (e) {
  fail(`INSERT solicitacao — ${e instanceof Error ? e.name : "erro"} (timeout/rede)`);
  ins = { status: 0, body: null };
}

if (ins.status === 201 && Array.isArray(ins.body) && ins.body[0]?.id) {
  ok(`INSERT + RETURN (${codigoTeste})`);
  try {
    const del = await rest(`solicitacoes_pesquisa?id=eq.${ins.body[0].id}`, { method: "DELETE" });
    if (del.status >= 200 && del.status < 300) ok("DELETE registro de teste");
    else fail(`DELETE teste — HTTP ${del.status}`);
  } catch (e) {
    fail(`DELETE teste — ${e instanceof Error ? e.name : "erro"}`);
  }
} else if (ins.status !== 0) {
  fail(`INSERT solicitacao — HTTP ${ins.status}: ${JSON.stringify(ins.body).slice(0, 280)}`);
  if (ins.body?.message?.includes("column")) {
    console.error("\n  Dica: confira se 007 rodou no MESMO projeto do .env.local (URL).");
  }
}
}

if (falhas > 0) {
  console.error(
    "\n  Se as 7 migrations já rodaram no SQL Editor:\n" +
      "  • Confira se NEXT_PUBLIC_SUPABASE_URL aponta para o MESMO projeto\n" +
      "  • Veja no Dashboard se o projeto não está pausado (free tier)\n" +
      "  • Prefira região sa-east-1; teste a rede (VPN/firewall)\n" +
      "  • HTTP 503 PGRST002 = projeto acordando; aguarde 1 min e rode de novo\n"
  );
}

console.log(
  falhas === 0
    ? "\n✓ Supabase OK — migrations aplicadas neste projeto.\n"
    : `\n✗ ${falhas} falha(s) Supabase.\n`
);
process.exit(falhas ? 1 : 0);
