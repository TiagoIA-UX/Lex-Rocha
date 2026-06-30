import { afterEach, beforeEach, describe, expect, it } from "vitest";

import {
  aliquotaIss,
  ambienteNfse,
  cMunPrestador,
  cTribNacPadrao,
  nuvemFiscalConfigurado,
  prestadorCnpj,
} from "@/lib/fiscal/config";

const ORIG = { ...process.env };

describe("fiscal/config", () => {
  beforeEach(() => {
    delete process.env.NUVEM_FISCAL_CLIENT_ID;
    delete process.env.NUVEM_FISCAL_CLIENT_SECRET;
    delete process.env.NUVEM_FISCAL_AMBIENTE;
    delete process.env.NFSE_PRESTADOR_CNPJ;
    delete process.env.NFSE_ALIQUOTA_ISS;
  });

  afterEach(() => {
    process.env = { ...ORIG };
  });

  it("ambiente padrão é homologação", () => {
    expect(ambienteNfse()).toBe("homologacao");
    process.env.NUVEM_FISCAL_AMBIENTE = "producao";
    expect(ambienteNfse()).toBe("producao");
  });

  it("nuvemFiscalConfigurado exige client id e secret", () => {
    expect(nuvemFiscalConfigurado()).toBe(false);
    process.env.NUVEM_FISCAL_CLIENT_ID = "id";
    expect(nuvemFiscalConfigurado()).toBe(false);
    process.env.NUVEM_FISCAL_CLIENT_SECRET = "secret";
    expect(nuvemFiscalConfigurado()).toBe(true);
  });

  it("prestadorCnpj limpa formatação e tem default", () => {
    expect(prestadorCnpj()).toBe("61699939000180");
    process.env.NFSE_PRESTADOR_CNPJ = "12.345.678/0001-90";
    expect(prestadorCnpj()).toBe("12345678000190");
  });

  it("aliquotaIss usa default 2 quando inválida", () => {
    expect(aliquotaIss()).toBe(2);
    process.env.NFSE_ALIQUOTA_ISS = "3.5";
    expect(aliquotaIss()).toBe(3.5);
  });

  it("códigos padrão de município e tributação", () => {
    expect(cMunPrestador()).toBe("3510500");
    expect(cTribNacPadrao()).toBe("1701");
  });
});
