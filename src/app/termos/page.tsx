import Link from "next/link";

import { Logo } from "@/components/atoms/logo";
import { SITE } from "@/lib/constants/site";

export const metadata = {
  title: "Termos de uso",
};

export default function TermosPage() {
  return (
    <div className="min-h-screen bg-background">
      <header className="border-b px-4 py-4 md:px-6">
        <Logo />
      </header>
      <article className="prose prose-slate mx-auto max-w-3xl px-4 py-12 md:px-6">
        <h1>Termos de uso</h1>
        <p>
          A {SITE.name} oferece <strong>triagem jurídica informativa</strong> com
          apoio de inteligência artificial. Não substitui consulta com advogado
          habilitado nem constitui relação advocatícia.
        </p>
        <p>
          Na fase MVP, relatórios iniciais são gratuitos. Cobrança e planos
          comerciais serão comunicados previamente.
        </p>
        <p>
          Dúvidas: <a href={`mailto:${SITE.email}`}>{SITE.email}</a>
        </p>
        <p>
          <Link href="/">← Voltar</Link>
        </p>
      </article>
    </div>
  );
}
