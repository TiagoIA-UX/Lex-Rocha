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
        Os valores e o escopo são apresentados ao cliente <strong>antes de qualquer
        pagamento</strong>, para que decida qual opção é a ideal para o seu caso. Nenhum
        valor é cobrado sem essa apresentação prévia e a respectiva confirmação.
      </p>
      <p>
        <strong>Casos sem precedente comparável.</strong> Se a pesquisa não localizar, nos
        portais públicos consultados, decisão judicial semelhante ao caso já julgada no
        Brasil, <strong>não haverá cobrança</strong>. Ainda assim, o cliente recebe o material
        efetivamente pesquisado e os fundamentos legais aplicáveis, com o cenário explicado de
        forma clara. A ausência de precedente comparável é uma constatação da pesquisa
        documental e <strong>não constitui avaliação de mérito, parecer, aconselhamento
        jurídico nem garantia de qualquer resultado</strong>.
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
