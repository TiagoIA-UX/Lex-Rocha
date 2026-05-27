/** Fetch com timeout para integrações server-side (Supabase, APIs externas). */
export function fetchWithTimeout(
  input: RequestInfo | URL,
  init?: RequestInit & { timeoutMs?: number }
): Promise<Response> {
  const timeoutMs = init?.timeoutMs ?? 12_000;
  const rest = { ...init };
  delete rest.timeoutMs;
  return fetch(input, {
    ...rest,
    signal: rest.signal ?? AbortSignal.timeout(timeoutMs),
  });
}
