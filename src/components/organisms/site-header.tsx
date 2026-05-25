import Link from "next/link";

import { Logo } from "@/components/atoms/logo";
import { Button } from "@/components/ui/button";
import { NAV_LINKS } from "@/lib/constants/site";

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-50 border-b border-border/60 bg-background/90 backdrop-blur-md">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between gap-4 px-4 md:px-6">
        <Logo showTagline />
        <nav className="hidden items-center gap-6 md:flex">
          {NAV_LINKS.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="text-sm font-medium text-muted-foreground transition-colors hover:text-primary"
            >
              {link.label}
            </Link>
          ))}
        </nav>
        <div className="flex items-center gap-2">
          <Button asChild variant="ghost" size="sm" className="hidden sm:inline-flex">
            <Link href="/parceiro">Sou advogado</Link>
          </Button>
          <Button asChild size="sm">
            <Link href="/triagem">Análise gratuita</Link>
          </Button>
        </div>
      </div>
    </header>
  );
}
