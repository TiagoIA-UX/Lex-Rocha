"use client";

import { useEffect } from "react";

import { Button } from "@/components/ui/button";

export default function ErrorPage({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error("[app/error]", error);
  }, [error]);

  return (
    <main className="mx-auto flex min-h-[60vh] max-w-2xl flex-col items-center justify-center gap-4 px-4 py-16 text-center">
      <h1 className="font-serif text-3xl font-bold text-primary">Algo saiu do esperado</h1>
      <p className="text-muted-foreground">
        Ocorreu um erro ao carregar esta página. Você pode tentar novamente.
      </p>
      <Button type="button" onClick={reset}>
        Tentar novamente
      </Button>
    </main>
  );
}
