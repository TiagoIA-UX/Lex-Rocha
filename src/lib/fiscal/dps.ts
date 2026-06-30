import type { AmbienteNfse } from "@/lib/fiscal/config";
import {
  aliquotaIss,
  ambienteNfse,
  cTribNacPadrao,
  descricaoServicoPadrao,
  prestadorCnpj,
} from "@/lib/fiscal/config";

export type EnderecoTomador = {
  cMun: string;
  cep: string;
  logradouro: string;
  numero: string;
  bairro: string;
  complemento?: string | null;
};

export type Tomador = {
  nome: string;
  email?: string | null;
  cpf?: string | null;
  cnpj?: string | null;
  endereco: EnderecoTomador;
};

export type MontarDpsInput = {
  tomador: Tomador;
  valor: number;
  competencia?: Date;
  emissao?: Date;
};

export type NfseDpsPedido = {
  provedor: "padrao";
  ambiente: AmbienteNfse;
  infDPS: {
    dhEmi: string;
    dCompet: string;
    prest: { CNPJ: string };
    toma: {
      CPF?: string;
      CNPJ?: string;
      xNome: string;
      email?: string;
      end: {
        endNac: { cMun: string; CEP: string };
        xLgr: string;
        nro: string;
        xBairro: string;
        xCpl?: string;
      };
    };
    serv: { cServ: { cTribNac: string; xDescServ: string } };
    valores: {
      vServPrest: { vServ: number };
      trib: { tribMun: { tribISSQN: number; pAliq: number } };
    };
  };
};

function apenasDigitos(valor: string): string {
  return valor.replace(/\D/g, "");
}

/**
 * Monta o pedido de emissão de NFS-e (DPS) para o serviço de pesquisa documental.
 * Tributação ISSQN = 1 (operação tributável — serviço prestado no Brasil).
 */
export function montarDpsPesquisa(input: MontarDpsInput): NfseDpsPedido {
  const { tomador, valor } = input;

  if (!(valor > 0)) {
    throw new Error("Valor do serviço deve ser maior que zero.");
  }
  if (!tomador.nome?.trim()) {
    throw new Error("Nome do tomador é obrigatório.");
  }

  const cpf = tomador.cpf ? apenasDigitos(tomador.cpf) : "";
  const cnpj = tomador.cnpj ? apenasDigitos(tomador.cnpj) : "";
  if (!cpf && !cnpj) {
    throw new Error("Informe CPF ou CNPJ do tomador.");
  }
  if (cpf && cnpj) {
    throw new Error("Informe apenas CPF ou apenas CNPJ do tomador.");
  }

  const end = tomador.endereco;
  if (!end?.cMun?.trim() || !end.cep?.trim() || !end.logradouro?.trim() || !end.numero?.trim() || !end.bairro?.trim()) {
    throw new Error("Endereço do tomador incompleto (município, CEP, logradouro, número e bairro são obrigatórios).");
  }

  const emissao = input.emissao ?? new Date();
  const competencia = input.competencia ?? emissao;

  return {
    provedor: "padrao",
    ambiente: ambienteNfse(),
    infDPS: {
      dhEmi: emissao.toISOString(),
      dCompet: competencia.toISOString().slice(0, 10),
      prest: { CNPJ: prestadorCnpj() },
      toma: {
        ...(cpf ? { CPF: cpf } : { CNPJ: cnpj }),
        xNome: tomador.nome.trim(),
        ...(tomador.email?.trim() ? { email: tomador.email.trim() } : {}),
        end: {
          endNac: { cMun: end.cMun.trim(), CEP: apenasDigitos(end.cep) },
          xLgr: end.logradouro.trim(),
          nro: end.numero.trim(),
          xBairro: end.bairro.trim(),
          ...(end.complemento?.trim() ? { xCpl: end.complemento.trim() } : {}),
        },
      },
      serv: {
        cServ: {
          cTribNac: cTribNacPadrao(),
          xDescServ: descricaoServicoPadrao(),
        },
      },
      valores: {
        vServPrest: { vServ: Number(valor.toFixed(2)) },
        trib: { tribMun: { tribISSQN: 1, pAliq: aliquotaIss() } },
      },
    },
  };
}
