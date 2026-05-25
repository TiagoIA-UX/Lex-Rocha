import Image from "next/image";
import Link from "next/link";
import { AlertTriangle, ArrowRight, Scale } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { SITE } from "@/lib/constants/site";

export function HeroSection() {
  return (
    <section className="relative overflow-hidden border-b bg-gradient-to-b from-background via-background to-secondary/40">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-accent/10 via-transparent to-transparent" />
      <div className="relative mx-auto grid max-w-6xl gap-10 px-4 py-16 md:grid-cols-2 md:items-center md:px-6 md:py-24">
        <div className="space-y-6">
          <Badge variant="accent" className="gap-1">
            <Scale className="size-3.5" />
            MVP — primeiros relatórios gratuitos
          </Badge>
          <h1 className="font-serif text-4xl font-bold leading-tight tracking-tight text-primary md:text-5xl lg:text-[3.25rem]">
            Bloqueado no WhatsApp ou em outra plataforma?{" "}
            <span className="text-accent">Saiba se você tem direito.</span>
          </h1>
          <p className="max-w-xl text-lg text-muted-foreground">
            Triagem jurídica com inteligência artificial, fundamentada no CDC,
            Marco Civil e LGPD. Relatório estruturado gratuito na fase de
            validação — sem promessas vazias, com transparência total.
          </p>
          <div className="flex items-start gap-2 rounded-lg border border-accent/30 bg-accent/5 p-3 text-sm text-foreground">
            <AlertTriangle className="mt-0.5 size-4 shrink-0 text-accent" />
            <p>
              <strong>Urgência real:</strong> prazos para acionar judicialmente
              podem estar correndo. Quanto antes você organizar as provas,
              melhor.
            </p>
          </div>
          <div className="flex flex-col gap-3 sm:flex-row sm:flex-wrap">
            <Button asChild size="lg" className="gap-2">
              <Link href="/triagem">
                Fui lesado — quero análise gratuita
                <ArrowRight className="size-4" />
              </Link>
            </Button>
            <Button asChild variant="outline" size="lg">
              <Link href="/parceiro">Sou advogado — lista de espera</Link>
            </Button>
          </div>
          <p className="text-xs text-muted-foreground">
            Consulta jurídica presencial costuma custar{" "}
            <span className="line-through">R$ 300–500</span>. Na fase MVP, a
            triagem inicial é gratuita.
          </p>
        </div>
        <div className="relative mx-auto w-full max-w-md">
          <div className="absolute -inset-4 rounded-3xl bg-gradient-to-br from-primary/20 to-accent/20 blur-2xl" />
          <div className="relative overflow-hidden rounded-2xl border bg-card shadow-xl">
            <Image
              src="/images/founder/tiago-rocha.jpg"
              alt={`${SITE.founder}, fundador da ${SITE.name}`}
              width={800}
              height={920}
              className="h-auto w-full object-cover object-top"
              priority
            />
            <div className="border-t bg-card p-4">
              <p className="font-semibold text-primary">{SITE.founder}</p>
              <p className="text-sm text-muted-foreground">
                {SITE.founderTitle} · {SITE.legalName}
              </p>
              <p className="mt-1 text-xs text-muted-foreground">
                Caraguatatuba/SP · CNPJ {SITE.cnpj}
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
