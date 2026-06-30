import {
  NUVEM_FISCAL_API_URL,
  NUVEM_FISCAL_AUTH_URL,
} from "@/lib/fiscal/config";
import type { NfseDpsPedido } from "@/lib/fiscal/dps";

export type ResultadoNfse = {
  id: string | null;
  numero: string | null;
  status: string | null;
  pdfUrl: string | null;
};

/** Corpo (x-www-form-urlencoded) para o fluxo client_credentials. */
export function montarCorpoToken(
  clientId: string,
  clientSecret: string,
  scope = "nfse"
): string {
  return new URLSearchParams({
    grant_type: "client_credentials",
    client_id: clientId,
    client_secret: clientSecret,
    scope,
  }).toString();
}

/** Normaliza a resposta da Nuvem Fiscal para o formato persistido. */
export function extrairResultadoNfse(data: Record<string, unknown>): ResultadoNfse {
  const str = (v: unknown): string | null => (v != null && v !== "" ? String(v) : null);
  return {
    id: str(data.id),
    numero: str(data.numero),
    status: str(data.status),
    pdfUrl: str(data.url) ?? str((data as { url_danfse?: unknown }).url_danfse),
  };
}

let tokenCache: { token: string; expiraEm: number } | null = null;

export async function obterTokenNuvemFiscal(): Promise<string> {
  const clientId = process.env.NUVEM_FISCAL_CLIENT_ID?.trim();
  const clientSecret = process.env.NUVEM_FISCAL_CLIENT_SECRET?.trim();
  if (!clientId || !clientSecret) {
    throw new Error("Nuvem Fiscal não configurada (CLIENT_ID / CLIENT_SECRET).");
  }

  if (tokenCache && tokenCache.expiraEm > Date.now() + 30_000) {
    return tokenCache.token;
  }

  const res = await fetch(NUVEM_FISCAL_AUTH_URL, {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: montarCorpoToken(clientId, clientSecret),
    signal: AbortSignal.timeout(10_000),
  });

  if (!res.ok) {
    const txt = await res.text();
    throw new Error(`Nuvem Fiscal token ${res.status}: ${txt.slice(0, 200)}`);
  }

  const data = (await res.json()) as { access_token?: string; expires_in?: number };
  if (!data.access_token) {
    throw new Error("Nuvem Fiscal: access_token ausente na resposta.");
  }

  tokenCache = {
    token: data.access_token,
    expiraEm: Date.now() + (data.expires_in ?? 3600) * 1000,
  };
  return data.access_token;
}

export async function emitirNfseDps(pedido: NfseDpsPedido): Promise<ResultadoNfse> {
  const token = await obterTokenNuvemFiscal();

  const res = await fetch(`${NUVEM_FISCAL_API_URL}/nfse/dps`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(pedido),
    signal: AbortSignal.timeout(30_000),
  });

  const data = (await res.json().catch(() => ({}))) as Record<string, unknown>;

  if (!res.ok) {
    const erro = data.error as { message?: string } | undefined;
    const msg = erro?.message ?? (typeof data.message === "string" ? data.message : JSON.stringify(data));
    throw new Error(`Nuvem Fiscal NFS-e ${res.status}: ${String(msg).slice(0, 300)}`);
  }

  return extrairResultadoNfse(data);
}

/** Apenas para testes — limpa o cache de token em memória. */
export function _limparCacheToken(): void {
  tokenCache = null;
}
