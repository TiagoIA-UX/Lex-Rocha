"use client";

import { useEffect } from "react";

export default function GlobalError({
  error,
}: {
  error: Error & { digest?: string };
}) {
  useEffect(() => {
    console.error("[app/global-error]", error);
  }, [error]);

  return (
    <html lang="pt-BR">
      <body>
        <main className="mx-auto flex min-h-screen max-w-2xl flex-col items-center justify-center gap-4 px-4 py-16 text-center">
          <h1 className="text-3xl font-bold">Erro inesperado</h1>
          <p>Recarregue a página para continuar.</p>
        </main>
      </body>
    </html>
  );
}
