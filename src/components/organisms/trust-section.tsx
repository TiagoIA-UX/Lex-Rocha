import { Building2, HeartHandshake, ShieldCheck, Sparkles } from "lucide-react";

import { SectionHeading } from "@/components/atoms/section-heading";
import { Card, CardContent } from "@/components/ui/card";

const pillars = [
  {
    icon: HeartHandshake,
    title: "Reciprocidade real",
    text: "Primeiros relatórios gratuitos na fase MVP. Você recebe valor antes de qualquer cobrança.",
  },
  {
    icon: ShieldCheck,
    title: "Transparência institucional",
    text: "CNPJ publicado, fundador identificado e políticas de privacidade claras. Sem números inventados.",
  },
  {
    icon: Building2,
    title: "Carteira de parceiros em construção",
    text: "Ainda não exibimos escritórios com OAB — estamos validando a qualidade dos leads antes de abrir a rede.",
  },
  {
    icon: Sparkles,
    title: "IA como apoio, não substituto",
    text: "A triagem orienta; a decisão estratégica continua com advogado habilitado quando você optar por seguir.",
  },
] as const;

export function TrustSection() {
  return (
    <section id="confianca" className="scroll-mt-20 bg-secondary/30 py-20">
      <div className="mx-auto max-w-6xl space-y-12 px-4 md:px-6">
        <SectionHeading
          eyebrow="Por que confiar"
          title="Construímos credibilidade com fatos, não com marketing vazio"
          description="Sem depoimentos fabricados nem contador inflado de casos. Honestidade é parte do produto."
        />
        <div className="grid gap-6 sm:grid-cols-2">
          {pillars.map((pillar) => (
            <Card key={pillar.title} className="bg-card/80">
              <CardContent className="flex gap-4 p-6">
                <div className="flex size-10 shrink-0 items-center justify-center rounded-lg bg-accent/15 text-accent">
                  <pillar.icon className="size-5" />
                </div>
                <div>
                  <h3 className="font-semibold text-primary">{pillar.title}</h3>
                  <p className="mt-1 text-sm leading-relaxed text-muted-foreground">
                    {pillar.text}
                  </p>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
