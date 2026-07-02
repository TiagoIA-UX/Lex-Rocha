import type { FundamentoId } from "@/lib/constants/pesquisa-documental";

/** Hosts ou sufixos de domínio permitidos para fetch de retrieval (fontes públicas). */
export const DOMINIOS_RETRIEVAL_PERMITIDOS = [
  "jusbrasil.com.br",
  "planalto.gov.br",
  "cnj.jus.br",
  "stj.jus.br",
  "stf.jus.br",
  "portal.stf.jus.br",
  "consumidor.gov.br",
  "gov.br",
  "jus.br",
] as const;

/** Timeout de rede para consulta a fonte pública (ms). */
export const RETRIEVAL_FETCH_TIMEOUT_MS = 15_000;

/** Tamanho máximo do corpo HTML/texto retornado por fonte (bytes). */
export const RETRIEVAL_MAX_CORPO_BYTES = 512_000;

/** URLs oficiais de legislação federal vinculadas aos fundamentos do workspace. */
export const LEGISLACAO_POR_FUNDAMENTO: Record<
  FundamentoId,
  { titulo: string; url: string; artigoRef: string }
> = {
  cdc_14: {
    titulo: "CDC — Lei 8.078/1990",
    url: "http://www.planalto.gov.br/ccivil_03/leis/l8078.htm",
    artigoRef: "Art. 14",
  },
  cdc_6: {
    titulo: "CDC — Lei 8.078/1990",
    url: "http://www.planalto.gov.br/ccivil_03/leis/l8078.htm",
    artigoRef: "Art. 6º",
  },
  cdc_42: {
    titulo: "CDC — Lei 8.078/1990",
    url: "http://www.planalto.gov.br/ccivil_03/leis/l8078.htm",
    artigoRef: "Art. 42",
  },
  venire: {
    titulo: "CDC — Lei 8.078/1990 (boa-fé objetiva)",
    url: "http://www.planalto.gov.br/ccivil_03/leis/l8078.htm",
    artigoRef: "Art. 4º, III",
  },
  marco_20: {
    titulo: "Marco Civil da Internet — Lei 12.965/2014",
    url: "http://www.planalto.gov.br/ccivil_03/_ato2011-2014/2014/lei/l12965.htm",
    artigoRef: "Art. 20",
  },
  lgpd_20: {
    titulo: "LGPD — Lei 13.709/2018",
    url: "http://www.planalto.gov.br/ccivil_03/_ato2015-2018/2018/lei/l13709.htm",
    artigoRef: "Art. 20",
  },
  cpc_300: {
    titulo: "CPC — Lei 13.105/2015",
    url: "http://www.planalto.gov.br/ccivil_03/_ato2015-2018/2015/lei/l13105.htm",
    artigoRef: "Art. 300",
  },
  cpc_537: {
    titulo: "CPC — Lei 13.105/2015",
    url: "http://www.planalto.gov.br/ccivil_03/_ato2015-2018/2015/lei/l13105.htm",
    artigoRef: "Art. 537",
  },
  dano_moral_ipsa: {
    titulo: "CDC — Lei 8.078/1990",
    url: "http://www.planalto.gov.br/ccivil_03/leis/l8078.htm",
    artigoRef: "Arts. 6º, VI e 14 (dano moral)",
  },
  cerceamento: {
    titulo: "CDC — Lei 8.078/1990",
    url: "http://www.planalto.gov.br/ccivil_03/leis/l8078.htm",
    artigoRef: "Art. 39 (práticas abusivas)",
  },
};
