import Link from "next/link";

import { Logo } from "@/components/atoms/logo";
import { SITE } from "@/lib/constants/site";

export const metadata = {
  title: "Política de privacidade",
};

export default function PrivacidadePage() {
  return (
    <div className="min-h-screen bg-background">
      <header className="border-b px-4 py-4 md:px-6">
        <Logo />
      </header>
      <article className="prose prose-slate mx-auto max-w-3xl px-4 py-12 md:px-6">
        <h1>Política de privacidade</h1>
        <p className="lead">
          {SITE.legalName} (CNPJ {SITE.cnpj}), operadora de {SITE.domain}.
        </p>
        <p>
          Coletamos dados informados na triagem (nome, e-mail, telefone,
          descrição do caso e evidências) para gerar relatório jurídico
          automatizado. Os dados são armazenados no Supabase com criptografia e
          políticas de acesso (RLS), em conformidade com a LGPD.
        </p>
        <p>
          Você pode solicitar exclusão ou correção pelo e-mail{" "}
          <a href={`mailto:${SITE.email}`}>{SITE.email}</a>.
        </p>
        <p className="text-sm text-muted-foreground">
          Documento provisório — versão completa na fase de produção.
        </p>
        <p>
          <Link href="/">← Voltar</Link>
        </p>
      </article>
    </div>
  );
}
