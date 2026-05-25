import Link from "next/link";
import { ArrowRight } from "lucide-react";

import { Button } from "@/components/ui/button";

export function CtaBanner() {
  return (
    <section className="py-20">
      <div className="mx-auto max-w-4xl px-4 text-center md:px-6">
        <h2 className="font-serif text-3xl font-bold text-primary md:text-4xl">
          Pronto para entender seu caso?
        </h2>
        <p className="mx-auto mt-4 max-w-2xl text-lg text-muted-foreground">
          Leva poucos minutos. Seus dados são protegidos e o relatório inicial é
          gratuito nesta fase.
        </p>
        <Button asChild size="lg" className="mt-8 gap-2">
          <Link href="/triagem">
            Iniciar triagem gratuita
            <ArrowRight className="size-4" />
          </Link>
        </Button>
      </div>
    </section>
  );
}
