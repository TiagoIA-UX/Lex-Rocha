import { describe, expect, it } from "vitest";

import { montarDpsPesquisa, type Tomador } from "@/lib/fiscal/dps";

const enderecoOk = {
  cMun: "3510500",
  cep: "11660-000",
  logradouro: "Rua das Flores",
  numero: "100",
  bairro: "Centro",
};

const tomadorCpf: Tomador = {
  nome: "Maria Souza",
  email: "maria@exemplo.com",
  cpf: "123.456.789-00",
  endereco: enderecoOk,
};

describe("fiscal/dps", () => {
  it("monta DPS com CPF, limpando formatação", () => {
    const dps = montarDpsPesquisa({
      tomador: tomadorCpf,
      valor: 79,
      emissao: new Date("2026-06-30T12:00:00Z"),
    });

    expect(dps.provedor).toBe("padrao");
    expect(dps.infDPS.toma.CPF).toBe("12345678900");
    expect(dps.infDPS.toma.CNPJ).toBeUndefined();
    expect(dps.infDPS.toma.end.endNac.CEP).toBe("11660000");
    expect(dps.infDPS.dCompet).toBe("2026-06-30");
    expect(dps.infDPS.valores.vServPrest.vServ).toBe(79);
    expect(dps.infDPS.valores.trib.tribMun.tribISSQN).toBe(1);
    expect(dps.infDPS.prest.CNPJ).toBe("61699939000180");
  });

  it("monta DPS com CNPJ", () => {
    const dps = montarDpsPesquisa({
      tomador: { nome: "Empresa X", cnpj: "12.345.678/0001-90", endereco: enderecoOk },
      valor: 119,
    });
    expect(dps.infDPS.toma.CNPJ).toBe("12345678000190");
    expect(dps.infDPS.toma.CPF).toBeUndefined();
  });

  it("rejeita valor zero ou negativo", () => {
    expect(() => montarDpsPesquisa({ tomador: tomadorCpf, valor: 0 })).toThrow();
    expect(() => montarDpsPesquisa({ tomador: tomadorCpf, valor: -5 })).toThrow();
  });

  it("rejeita tomador sem documento", () => {
    expect(() =>
      montarDpsPesquisa({
        tomador: { nome: "Sem Doc", endereco: enderecoOk },
        valor: 49,
      })
    ).toThrow(/CPF ou CNPJ/);
  });

  it("rejeita tomador com CPF e CNPJ ao mesmo tempo", () => {
    expect(() =>
      montarDpsPesquisa({
        tomador: { nome: "Ambos", cpf: "12345678900", cnpj: "12345678000190", endereco: enderecoOk },
        valor: 49,
      })
    ).toThrow(/apenas CPF ou apenas CNPJ/);
  });

  it("rejeita endereço incompleto", () => {
    expect(() =>
      montarDpsPesquisa({
        tomador: {
          nome: "Maria",
          cpf: "12345678900",
          endereco: { cMun: "3510500", cep: "", logradouro: "Rua", numero: "1", bairro: "Centro" },
        },
        valor: 49,
      })
    ).toThrow(/Endereço/);
  });
});
