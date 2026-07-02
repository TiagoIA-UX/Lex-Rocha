#!/usr/bin/env node
/**
 * Testa fetch HTTP aos portais listados na home (camada retrieval).
 * Uso: node scripts/test-portais-retrieval.mjs
 */

const urls = [
  ["Planalto CDC (http)", "http://www.planalto.gov.br/ccivil_03/leis/l8078.htm"],
  ["Planalto CDC (https)", "https://www.planalto.gov.br/ccivil_03/leis/l8078.htm"],
  ["STJ", "https://www.stj.jus.br/"],
  ["CNJ", "https://www.cnj.jus.br/"],
  ["Jusbrasil", "https://www.jusbrasil.com.br/pesquisa-juridica"],
  ["Consumidor.gov", "https://www.consumidor.gov.br/"],
];

for (const [nome, url] of urls) {
  try {
    const r = await fetch(url, {
      signal: AbortSignal.timeout(15000),
      headers: {
        Accept: "text/html,application/xhtml+xml",
        "User-Agent": "LexRocha-Retrieval/1.0 (disponibilidade)",
      },
      redirect: "follow",
    });
    const buf = await r.arrayBuffer();
    const ok = r.ok && buf.byteLength > 100;
    console.log(`${ok ? "OK" : "WARN"} — ${nome}: HTTP ${r.status}, ${buf.byteLength} bytes`);
  } catch (e) {
    console.log(`FAIL — ${nome}: ${e instanceof Error ? e.message : String(e)}`);
  }
}
