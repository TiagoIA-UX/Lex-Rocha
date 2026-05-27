import Link from "next/link";
import { ExternalLink, Gavel } from "lucide-react";

import { SectionHeading } from "@/components/atoms/section-heading";
import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { COPY_SITE } from "@/lib/constants/copy-site";
import { PRECEDENTES } from "@/lib/data/precedentes";

export function PrecedentesSection() {
  const { precedentes } = COPY_SITE;

  return (
    <section id="precedentes" className="scroll-mt-20 py-20">
      <div className="mx-auto max-w-6xl space-y-12 px-4 md:px-6">
        <SectionHeading
          eyebrow={precedentes.eyebrow}
          title={precedentes.title}
          description={precedentes.description}
        />
        <div className="grid gap-4 md:grid-cols-2">
          {PRECEDENTES.map((item) => (
            <Card key={item.titulo} className="flex flex-col">
              <CardHeader className="pb-2">
                <div className="mb-2 flex items-center justify-between gap-2">
                  <Badge variant={item.tipo === "legislacao" ? "default" : "secondary"}>
                    {item.tipo === "legislacao" ? "Legislação" : "Jurisprudência"}
                  </Badge>
                  <Gavel className="size-4 text-muted-foreground" />
                </div>
                <CardTitle className="text-lg leading-snug">{item.titulo}</CardTitle>
                <CardDescription className="font-medium text-foreground/90">
                  {item.tribunal}
                </CardDescription>
              </CardHeader>
              <CardContent className="mt-auto space-y-4">
                <p className="text-sm leading-relaxed text-muted-foreground">
                  {item.resumo}
                </p>
                <Link
                  href={item.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1 text-sm font-medium text-primary hover:underline"
                >
                  Consultar fonte oficial
                  <ExternalLink className="size-3.5" />
                </Link>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
