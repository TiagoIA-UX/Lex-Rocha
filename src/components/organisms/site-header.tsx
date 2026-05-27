import Link from "next/link";

import { Logo } from "@/components/atoms/logo";
import { Button } from "@/components/ui/button";
import { NAV_LINKS } from "@/lib/constants/site";

export function SiteHeader() {
  return (
    <header className="mobile-no-blur sticky top-0 z-50 border-b border-border/60 bg-background md:bg-background/90 md:backdrop-blur-md">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between gap-2 px-3 sm:gap-4 sm:px-4 md:px-6">
        <Logo showTagline />
        <nav className="hidden items-center gap-6 md:flex">
          {NAV_LINKS.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="text-sm font-medium text-foreground/85 transition-colors hover:text-primary"
            >
              {link.label}
            </Link>
          ))}
        </nav>
        <div className="flex items-center gap-1.5 sm:gap-2">
          <Button asChild variant="ghost" size="sm" className="hidden sm:inline-flex">
            <Link href="/acompanhar">Acompanhar</Link>
          </Button>
          <Button asChild variant="ghost" size="sm" className="hidden md:inline-flex">
            <Link href="/parceiro">Sou advogado</Link>
          </Button>
          <Button asChild size="sm" className="px-3 text-xs sm:px-4 sm:text-sm">
            <Link href="/solicitar">
              <span className="sm:hidden">Solicitar</span>
              <span className="hidden sm:inline">Solicitar pesquisa</span>
            </Link>
          </Button>
        </div>
      </div>
    </header>
  );
}
