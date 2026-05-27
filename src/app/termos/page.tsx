import Link from "next/link";

import { LegalDocLayout } from "@/components/legal/legal-doc-layout";
import { TEXTO_JURISDICAO_BRASILEIRA } from "@/lib/constants/lgpd";
import { SITE } from "@/lib/constants/site";

export const metadata = {
  title: "Termos de uso",
};

export default function TermosPage() {
  return (
    <LegalDocLayout title="Termos de uso">
      <p>
        A {SITE.name} oferece <strong>pesquisa e organização documental</strong> de
        jurisprudência pública, com referência a portais como Jusbrasil, CNJ e tribunais.
        Não substitui consulta com advogado habilitado na OAB nem constitui relação
        advocatícia.
      </p>
      <p>
        Valores e escopo são combinados com o cliente antes da pesquisa. O orçamento só
        é confirmado após essa etapa.
      </p>
      <p>{TEXTO_JURISDICAO_BRASILEIRA}</p>
      <p>
        Privacidade: <Link href="/privacidade">Política de Privacidade</Link> ·{" "}
        <Link href="/cookies">Política de Cookies</Link>
      </p>
      <p>
        Dúvidas: <a href={`mailto:${SITE.email}`}>{SITE.email}</a>
      </p>
    </LegalDocLayout>
  );
}
