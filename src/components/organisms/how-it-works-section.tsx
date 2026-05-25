import { ClipboardList, FileSearch, Send } from "lucide-react";

import { SectionHeading } from "@/components/atoms/section-heading";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

const steps = [
  {
    icon: ClipboardList,
    title: "1. Conte o que aconteceu",
    description:
      "Wizard guiado em poucos minutos: plataforma, descrição do caso, data e evidências (prints).",
  },
  {
    icon: FileSearch,
    title: "2. IA analisa viabilidade",
    description:
      "Nossa IA cruza seu relato com fundamentos do CDC, Marco Civil, LGPD e temas jurisprudenciais.",
  },
  {
    icon: Send,
    title: "3. Receba seu relatório",
    description:
      "Relatório em markdown com viabilidade, pedidos sugeridos e orientações de provas — download em PDF.",
  },
] as const;

export function HowItWorksSection() {
  return (
    <section id="como-funciona" className="scroll-mt-20 bg-background py-20">
      <div className="mx-auto max-w-6xl space-y-12 px-4 md:px-6">
        <SectionHeading
          eyebrow="Como funciona"
          title="Três passos. Sem juridiquês desnecessário."
          description="Projetado para quem nunca entrou com processo — mas precisa de clareza agora."
        />
        <div className="grid gap-6 md:grid-cols-3">
          {steps.map((step) => (
            <Card key={step.title} className="border-border/80">
              <CardHeader>
                <div className="mb-2 flex size-11 items-center justify-center rounded-lg bg-primary text-primary-foreground">
                  <step.icon className="size-5" />
                </div>
                <CardTitle className="font-serif text-xl">{step.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-base leading-relaxed">
                  {step.description}
                </CardDescription>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
