/**
 * Valida no HTML da home se os mitigadores do bug mobile (Chrome/Android)
 * estão presentes após o build de produção.
 */
const BASE = process.env.BASE_URL ?? "http://localhost:3000";

const res = await fetch(`${BASE}/`);
if (!res.ok) {
  console.error(`FAIL: HTTP ${res.status}`);
  process.exit(1);
}

const html = await res.text();

const blurContexts = [...html.matchAll(/class="([^"]*blur-2xl[^"]*)"/g)].map((m) => m[1]);
const allBlurMdOnly =
  blurContexts.length === 0 ||
  blurContexts.every((c) => c.includes("hidden") && c.includes("md:block"));

const checks = [
  { name: "HTTP 200", ok: res.status === 200 },
  { name: "gpu-safe-section presente", ok: html.includes("gpu-safe-section") },
  { name: "mobile-no-blur no layout", ok: html.includes("mobile-no-blur") },
  { name: "main com overflow-x-hidden", ok: html.includes('class="overflow-x-hidden"') || html.includes("overflow-x-hidden") },
  {
    name: "gradiente radial só em md+ (hidden md:block)",
    ok:
      html.includes("radial-gradient") &&
      /hidden[\s\S]{0,120}md:block/.test(
        html.slice(html.indexOf("radial-gradient") - 200, html.indexOf("radial-gradient") + 200)
      ),
  },
  { name: "blur-2xl só com hidden md:block", ok: allBlurMdOnly },
  { name: "Escopo sem bg-card/50", ok: !html.includes("bg-card/50") },
  {
    name: "cards Escopo com bg-card sólido",
    ok: html.includes("bg-card px-4 py-3"),
  },
];

console.log(`URL: ${BASE}/\n`);
if (blurContexts.length) {
  console.log("Classes com blur-2xl:", blurContexts.join(" | "));
} else {
  console.log("Nenhuma classe blur-2xl no HTML (ok).");
}

let failed = 0;
for (const c of checks) {
  console.log(`${c.ok ? "OK" : "FAIL"} — ${c.name}`);
  if (!c.ok) failed++;
}

const idx = html.indexOf("Temas que pesquisamos");
if (idx !== -1) {
  const snippet = html.slice(idx, idx + 500).replace(/\s+/g, " ");
  console.log("\nTrecho Escopo:", snippet.slice(0, 280) + "…");
}

process.exit(failed ? 1 : 0);
