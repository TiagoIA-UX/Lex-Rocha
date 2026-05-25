import Link from "next/link";

import { Logo } from "@/components/atoms/logo";
import { SITE } from "@/lib/constants/site";

const legalLinks = [
  { href: "/privacidade", label: "Política de privacidade" },
  { href: "/termos", label: "Termos de uso" },
] as const;

export function SiteFooter() {
  const year = new Date().getFullYear();

  return (
    <footer className="border-t bg-primary text-primary-foreground">
      <div className="mx-auto max-w-6xl px-4 py-12 md:px-6">
        <div className="grid gap-10 md:grid-cols-3">
          <div className="space-y-4">
            <Logo className="[&_span]:text-primary-foreground" />
            <p className="text-sm text-primary-foreground/80">
              Triagem jurídica inteligente para direito do consumidor digital.
              Bloqueios indevidos, falhas de serviço e LGPD.
            </p>
          </div>
          <div>
            <h3 className="mb-3 text-sm font-semibold uppercase tracking-wider">
              Contato
            </h3>
            <ul className="space-y-2 text-sm text-primary-foreground/80">
              <li>{SITE.legalName}</li>
              <li>CNPJ {SITE.cnpj}</li>
              <li>
                {SITE.city}/{SITE.state}
              </li>
              <li>
                <a
                  href={`mailto:${SITE.email}`}
                  className="underline-offset-4 hover:underline"
                >
                  {SITE.email}
                </a>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="mb-3 text-sm font-semibold uppercase tracking-wider">
              Legal
            </h3>
            <ul className="space-y-2 text-sm">
              {legalLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-primary-foreground/80 underline-offset-4 hover:underline"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
        <div className="mt-10 border-t border-primary-foreground/20 pt-6 text-center text-xs text-primary-foreground/60">
          © {year} {SITE.legalName}. Todos os direitos reservados. ·{" "}
          {SITE.domain}
        </div>
      </div>
    </footer>
  );
}
