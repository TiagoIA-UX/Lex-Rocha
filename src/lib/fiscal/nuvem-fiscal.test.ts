import { describe, expect, it } from "vitest";

import { extrairResultadoNfse, montarCorpoToken } from "@/lib/fiscal/nuvem-fiscal";

describe("fiscal/nuvem-fiscal", () => {
  it("monta corpo do token com client_credentials e scope", () => {
    const corpo = montarCorpoToken("meu-id", "meu-secret");
    const params = new URLSearchParams(corpo);
    expect(params.get("grant_type")).toBe("client_credentials");
    expect(params.get("client_id")).toBe("meu-id");
    expect(params.get("client_secret")).toBe("meu-secret");
    expect(params.get("scope")).toBe("nfse");
  });

  it("permite scope customizado", () => {
    const corpo = montarCorpoToken("id", "secret", "nfse cnpj");
    expect(new URLSearchParams(corpo).get("scope")).toBe("nfse cnpj");
  });

  it("extrai resultado da NFS-e emitida", () => {
    const r = extrairResultadoNfse({
      id: "nfse_abc123",
      status: "autorizada",
      numero: "42",
      url: "https://exemplo/nfse.pdf",
    });
    expect(r.id).toBe("nfse_abc123");
    expect(r.status).toBe("autorizada");
    expect(r.numero).toBe("42");
    expect(r.pdfUrl).toBe("https://exemplo/nfse.pdf");
  });

  it("lida com resposta sem campos opcionais", () => {
    const r = extrairResultadoNfse({ id: "nfse_x", status: "pendente" });
    expect(r.id).toBe("nfse_x");
    expect(r.numero).toBeNull();
    expect(r.pdfUrl).toBeNull();
  });
});
