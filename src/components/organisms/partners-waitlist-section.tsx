import Link from "next/link";
import { Briefcase, MapPin, Users } from "lucide-react";

import { SectionHeading } from "@/components/atoms/section-heading";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

export function PartnersWaitlistSection() {
  return (
    <section id="parceiros" className="scroll-mt-20 border-y bg-primary py-20 text-primary-foreground">
      <div className="mx-auto max-w-6xl space-y-10 px-4 md:px-6">
        <SectionHeading
          eyebrow="Rede de parceiros"
          title="Carteira de escritórios em formação"
          description="Ainda não temos parceiros com OAB listados publicamente. Estamos construindo confiança com relatórios de qualidade antes de distribuir leads qualificados."
          className="[&_h2]:text-primary-foreground [&_p]:text-primary-foreground/80 [&_span]:text-accent"
        />
        <div className="grid gap-6 md:grid-cols-3">
          <Card className="border-primary-foreground/10 bg-primary-foreground/5 text-primary-foreground">
            <CardContent className="space-y-3 p-6">
              <Users className="size-8 text-accent" />
              <h3 className="font-semibold">Leads qualificados</h3>
              <p className="text-sm text-primary-foreground/75">
                Futura carteira com casos pré-triados por IA, com relatório e
                viabilidade indicada.
              </p>
            </CardContent>
          </Card>
          <Card className="border-primary-foreground/10 bg-primary-foreground/5 text-primary-foreground">
            <CardContent className="space-y-3 p-6">
              <MapPin className="size-8 text-accent" />
              <h3 className="font-semibold">Vagas por região</h3>
              <p className="text-sm text-primary-foreground/75">
                Escassez real: número limitado de parceiros por cidade e
                especialidade na abertura da rede.
              </p>
            </CardContent>
          </Card>
          <Card className="border-primary-foreground/10 bg-primary-foreground/5 text-primary-foreground">
            <CardContent className="space-y-3 p-6">
              <Briefcase className="size-8 text-accent" />
              <h3 className="font-semibold">Lista de espera</h3>
              <p className="text-sm text-primary-foreground/75">
                Advogados com OAB ativa podem se cadastrar agora para prioridade
                quando a rede abrir.
              </p>
            </CardContent>
          </Card>
        </div>
        <div className="flex flex-col items-center gap-4 text-center">
          <Badge
            variant="outline"
            className="border-accent/50 bg-accent/10 text-primary-foreground"
          >
            Fase MVP — parceiros em validação
          </Badge>
          <Button
            asChild
            size="lg"
            variant="secondary"
            className="bg-accent text-accent-foreground hover:bg-accent/90"
          >
            <Link href="/parceiro">Entrar na lista de espera</Link>
          </Button>
        </div>
      </div>
    </section>
  );
}
