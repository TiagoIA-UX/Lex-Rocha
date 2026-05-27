#!/usr/bin/env node
/**
 * Testes de integração locais (requer `npm run dev` em outro terminal).
 * Uso: node scripts/test-integracao.mjs
 */

const BASE = process.env.TEST_BASE_URL ?? "http://localhost:3000";
const TIMEOUT_MS = Number(process.env.TEST_TIMEOUT_MS ?? 15_000);

async function req(path, options = {}) {
  const url = `${BASE}${path}`;
  const res = await fetch(url, {
    ...options,
    signal: AbortSignal.timeout(TIMEOUT_MS),
  });
  let body;
  try {
    body = await res.json();
  } catch {
    body = null;
  }
  return { ok: res.ok, status: res.status, body };
}

function log(nome, passou, detalhe = "") {
  console.log(`${passou ? "✓" : "✗"} ${nome}${detalhe ? ` — ${detalhe}` : ""}`);
}

async function verificarServidor() {
  try {
    const res = await fetch(BASE, { signal: AbortSignal.timeout(TIMEOUT_MS) });
    return res.ok || res.status < 500;
  } catch {
    return false;
  }
}

async function main() {
  console.log(`\nTestes Lex-Rocha → ${BASE}\n`);

  if (!(await verificarServidor())) {
    console.error(
      `✗ Servidor indisponível em ${BASE} (timeout ${TIMEOUT_MS}ms).\n` +
        "  Inicie em outro terminal: npm run dev   (ou npm run build && npm run start)\n"
    );
    process.exit(1);
  }

  const rotasPublicas = [
    "/",
    "/solicitar",
    "/acompanhar",
    "/modelo-relatorio",
    "/parceiro",
    "/privacidade",
    "/termos",
    "/cookies",
  ];

  for (const rota of rotasPublicas) {
    const r = await req(rota);
    log(`GET ${rota}`, r.ok, `status ${r.status}`);
  }

  const triagemRedirect = await fetch(`${BASE}/triagem`, {
    redirect: "manual",
    signal: AbortSignal.timeout(TIMEOUT_MS),
  });
  log(
    "Redirect /triagem → /solicitar",
    triagemRedirect.status === 308 || triagemRedirect.status === 307,
    `status ${triagemRedirect.status}`
  );

  const previsaoMod = await import("../src/lib/pedidos/previsao-entrega.ts").catch(() => null);
  if (previsaoMod?.calcularPrevisaoEntrega) {
    const d = previsaoMod.calcularPrevisaoEntrega({ posicaoNaFila: 3, faixa: "padrao" });
    log("Cálculo previsão entrega", d instanceof Date, d.toISOString().slice(0, 10));
  }

  const capacidadeMod = await import("../src/lib/pedidos/capacidade.ts").catch(() => null);
  if (capacidadeMod?.capacidadeResumo) {
    const c = capacidadeMod.capacidadeResumo(4);
    log(
      "Capacidade operacional",
      c.maxRelatoriosPorDia === 3,
      `${c.maxRelatoriosPorDia} rel/dia, fila alta=${c.filaAlta}`
    );
  }

  const solicitar = await req("/api/pesquisa-documental/solicitar", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      nome: "Teste Automático",
      email: "teste@example.com",
      area: "Outro",
      descricao:
        "Descrição de teste automatizado com mais de trinta caracteres para validação.",
      consentimento: true,
    }),
  });
  log(
    "POST /solicitar",
    solicitar.ok,
    solicitar.ok
      ? `código ${solicitar.body?.codigoAcompanhamento}`
      : solicitar.body?.erro ?? `status ${solicitar.status}`
  );

  const codigo = solicitar.body?.codigoAcompanhamento;
  if (codigo) {
    const acompanhar = await req(`/api/pedidos/acompanhar?codigo=${codigo}`);
    log("GET /acompanhar", acompanhar.ok, acompanhar.body?.statusLabel);
  }

  const acompanhar404 = await req("/api/pedidos/acompanhar?codigo=ZZZZZZZZ");
  log("Acompanhar código inválido → 404", acompanhar404.status === 404);

  const testes = await req("/api/pedidos/testes");
  log(
    "Diagnóstico workspace /testes",
    testes.status === 200 || testes.status === 401,
    testes.status === 401 ? "protegido (OK)" : JSON.stringify(testes.body?.checks ?? {}).slice(0, 80)
  );

  console.log("\nStripe/webhook e e-mail real exigem chaves + stripe listen.\n");
}

main().catch((e) => {
  if (e?.name === "TimeoutError" || e?.code === "UND_ERR_HEADERS_TIMEOUT") {
    console.error(
      `✗ Timeout ao conectar em ${BASE}. Reinicie o dev server (npm run dev) e tente de novo.`
    );
  } else {
    console.error(e);
  }
  process.exit(1);
});
