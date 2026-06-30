export type AmbienteNfse = "homologacao" | "producao";

export const NUVEM_FISCAL_AUTH_URL = "https://auth.nuvemfiscal.com.br/oauth/token";
export const NUVEM_FISCAL_API_URL = "https://api.nuvemfiscal.com.br";

export function ambienteNfse(): AmbienteNfse {
  return process.env.NUVEM_FISCAL_AMBIENTE?.trim() === "producao"
    ? "producao"
    : "homologacao";
}

function apenasDigitos(valor: string | undefined | null): string {
  return (valor ?? "").replace(/\D/g, "");
}

/** CNPJ do prestador (Lex Rocha) — somente dígitos. */
export function prestadorCnpj(): string {
  return apenasDigitos(process.env.NFSE_PRESTADOR_CNPJ) || "61699939000180";
}

/** Código IBGE do município do prestador. */
export function cMunPrestador(): string {
  return process.env.NFSE_CMUN_PRESTADOR?.trim() || "3510500";
}

/** Código de tributação nacional do serviço (item LC 116 sem ponto). */
export function cTribNacPadrao(): string {
  return process.env.NFSE_CTRIB_NAC?.trim() || "1701";
}

/** Alíquota de ISS em pontos percentuais (ex.: 2 = 2%). */
export function aliquotaIss(): number {
  const v = Number(process.env.NFSE_ALIQUOTA_ISS);
  return Number.isFinite(v) && v >= 0 ? v : 2;
}

export function descricaoServicoPadrao(): string {
  return (
    process.env.NFSE_DESCRICAO_SERVICO?.trim() ||
    "Pesquisa documental de precedentes em fontes públicas (relatório informativo)."
  );
}

export function nuvemFiscalConfigurado(): boolean {
  return Boolean(
    process.env.NUVEM_FISCAL_CLIENT_ID?.trim() &&
      process.env.NUVEM_FISCAL_CLIENT_SECRET?.trim()
  );
}
