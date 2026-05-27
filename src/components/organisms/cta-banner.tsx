import Link from "next/link";
import { ArrowRight } from "lucide-react";

import { WhatsAppButton } from "@/components/atoms/whatsapp-button";
import { Button } from "@/components/ui/button";
import { copyComSite } from "@/lib/constants/copy-helpers";
import { COPY_SITE } from "@/lib/constants/copy-site";

export function CtaBanner() {
  const { cta } = COPY_SITE;
  const msg = copyComSite(cta.whatsappMensagem);

  return (
    <section className="py-20">
      <div className="mx-auto max-w-4xl px-4 text-center md:px-6">
        <h2 className="font-serif text-3xl font-bold text-primary md:text-4xl">{cta.title}</h2>
        <p className="mx-auto mt-4 max-w-2xl text-lg text-muted-foreground">{cta.description}</p>
        <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
          <Button asChild size="lg" className="gap-2">
            <Link href="/solicitar">
              {cta.primary}
              <ArrowRight className="size-4" />
            </Link>
          </Button>
          <WhatsAppButton mensagem={msg} size="lg">
            WhatsApp
          </WhatsAppButton>
        </div>
      </div>
    </section>
  );
}
