import Link from "next/link";
import { Briefcase, CheckCircle2 } from "lucide-react";

import { Logo } from "@/components/atoms/logo";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { SITE } from "@/lib/constants/site";

export const metadata = {
  title: "Lista de espera — Escritórios parceiros",
  description:
    "Cadastre-se na lista de espera da Lex Rocha. Carteira de leads qualificados em direito do consumidor digital em breve.",
};

export default function ParceiroPage() {
  return (
    <div className="min-h-screen bg-background">
      <header className="border-b px-4 py-4 md:px-6">
        <Logo showTagline />
      </header>
      <main className="mx-auto max-w-2xl px-4 py-12 md:px-6 md:py-16">
        <Badge variant="accent" className="mb-4">
          Rede em construção
        </Badge>
        <h1 className="font-serif text-3xl font-bold text-primary md:text-4xl">
          Lista de espera para escritórios parceiros
        </h1>
        <p className="mt-4 text-lg text-muted-foreground">
          Ainda não exibimos parceiros com OAB na plataforma. Estamos validando a
          qualidade dos relatórios e da triagem antes de abrir a{" "}
          <strong>carteira de leads qualificados</strong>.
        </p>

        <Card className="mt-8">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 font-serif">
              <Briefcase className="size-5 text-accent" />
              O que virá para parceiros
            </CardTitle>
            <CardDescription>
              Planos previstos (Fase 2): R$ 297–997/mês conforme volume de leads.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-3">
            {[
              "Leads com relatório de viabilidade gerado por IA",
              "Casos de consumidor digital pré-filtrados",
              "Dashboard com métricas de conversão",
            ].map((item) => (
              <p key={item} className="flex items-start gap-2 text-sm">
                <CheckCircle2 className="mt-0.5 size-4 shrink-0 text-accent" />
                {item}
              </p>
            ))}
          </CardContent>
        </Card>

        <div className="mt-8 rounded-lg border bg-secondary/40 p-6 text-center">
          <p className="text-sm text-muted-foreground">
            Cadastro de parceiros com autenticação Supabase será habilitado no{" "}
            <strong>Módulo 6</strong>. Por enquanto, entre em contato:
          </p>
          <Button asChild className="mt-4" size="lg">
            <a href={`mailto:${SITE.email}?subject=Lista%20de%20espera%20parceiro%20Lex%20Rocha`}>
              Solicitar vaga na lista de espera
            </a>
          </Button>
        </div>

        <p className="mt-8 text-center text-sm text-muted-foreground">
          <Link href="/" className="text-primary underline-offset-4 hover:underline">
            ← Voltar ao início
          </Link>
        </p>
      </main>
    </div>
  );
}
