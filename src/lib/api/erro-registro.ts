/** Mensagem de erro de API — detalhe técnico só em desenvolvimento. */
export function mensagemErroRegistro(
  contexto: string,
  causa: string | undefined,
  fallbackPublico: string
): string {
  if (process.env.NODE_ENV === "development" && causa) {
    return `${contexto}: ${causa}`;
  }
  return fallbackPublico;
}
