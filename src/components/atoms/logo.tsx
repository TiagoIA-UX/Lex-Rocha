import Link from "next/link";

import { cn } from "@/lib/utils";
import { SITE } from "@/lib/constants/site";

type LogoProps = {
  className?: string;
  showTagline?: boolean;
};

export function Logo({ className, showTagline = false }: LogoProps) {
  return (
    <Link href="/" className={cn("group inline-flex flex-col", className)}>
      <span className="font-serif text-xl font-bold tracking-tight text-primary md:text-2xl">
        {SITE.name}
      </span>
      {showTagline && (
        <span className="text-[10px] font-medium uppercase tracking-[0.2em] text-muted-foreground">
          Tecnologia Jurídica
        </span>
      )}
    </Link>
  );
}
