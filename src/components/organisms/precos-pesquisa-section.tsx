import Link from "next/link";

import { SectionHeading } from "@/components/atoms/section-heading";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { COPY_SITE } from "@/lib/constants/copy-site";
import {
  NOTA_APROVACAO_CLIENTE,
  PRECIFICACAO,
  PRECIFICACAO_TEXTO_COMPARATIVO,
} from "@/lib/constants/pesquisa-documental";
import { SITE } from "@/lib/constants/site";

export function PrecosPesquisaSection() {
  const { precos } = COPY_SITE;
  const planos = [
    PRECIFICACAO.essencial,
    PRECIFICACAO.padrao,
    PRECIFICACAO.completo,
  ];

  return (
    <section id="precos" className="scroll-mt-20 py-20">
      <div className="mx-auto max-w-6xl space-y-10 px-4 md:px-6">
        <SectionHeading
          eyebrow={precos.eyebrow}
          title={precos.title}
          description={precos.description}
        />
        <p className="text-sm">
          <Link href="/modelo-relatorio" className="font-medium text-primary underline">
            {precos.linkModelo}
          </Link>
        </p>
        <p className="text-sm text-muted-foreground">{PRECIFICACAO_TEXTO_COMPARATIVO}</p>
        <p className="text-sm text-muted-foreground">{NOTA_APROVACAO_CLIENTE}</p>
        <div className="grid gap-6 md:grid-cols-3">
          {planos.map((plano) => (
            <Card key={plano.label} className="flex flex-col">
              <CardHeader>
                <CardTitle className="font-serif text-xl">{plano.label}</CardTitle>
                <p className="font-serif text-3xl font-bold text-primary">
                  R$ {plano.valor}
                </p>
                <CardDescription>{plano.descricao}</CardDescription>
              </CardHeader>
              <CardContent className="mt-auto text-xs text-muted-foreground">
                Pagamento via PIX (CNPJ {SITE.cnpj}) ou combinação acordada.
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
