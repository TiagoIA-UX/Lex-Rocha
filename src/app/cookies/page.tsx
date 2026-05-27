import Link from "next/link";

import { CookiePreferencesPanel } from "@/components/legal/cookie-preferences-panel";
import { LegalDocLayout } from "@/components/legal/legal-doc-layout";
import { DATA_PUBLICACAO_POLITICA, VERSAO_POLITICA_PRIVACIDADE } from "@/lib/constants/lgpd";

export const metadata = {
  title: "Política de cookies",
};

export default function CookiesPage() {
  return (
    <LegalDocLayout title="Política de cookies">
      <p className="lead">
        Versão {VERSAO_POLITICA_PRIVACIDADE} · {DATA_PUBLICACAO_POLITICA}
      </p>

      <p>
        Esta política descreve como o Lex-Rocha utiliza cookies e tecnologias similares,
        em conformidade com a LGPD e o guia da ANPD sobre cookies.
      </p>

      <h2>1. O que são cookies</h2>
      <p>
        Cookies são pequenos arquivos armazenados no seu navegador para lembrar preferências
        e apoiar funcionalidades do site.
      </p>

      <h2>2. Categorias utilizadas</h2>
      <h3>Necessários (sem consentimento)</h3>
      <ul>
        <li>Identificador de sessão e segurança.</li>
        <li>Registro da sua escolha de cookies.</li>
        <li>Preferências essenciais de navegação.</li>
      </ul>

      <h3>Analíticos (com consentimento)</h3>
      <ul>
        <li>Métricas de uso agregadas (ex.: Vercel Analytics), se habilitado.</li>
        <li>Desativados por padrão até você aceitar.</li>
      </ul>

      <p>
        <strong>Não utilizamos</strong> cookies de marketing ou publicidade comportamental.
      </p>

      <h2>3. Como gerenciar</h2>
      <p>
        No primeiro acesso, você pode <strong>Aceitar todos</strong>,{" "}
        <strong>Rejeitar todos</strong> (exceto necessários) ou{" "}
        <strong>Gerenciar preferências</strong> com o mesmo destaque visual — conforme
        exigência da ANPD.
      </p>
      <p>
        Você pode alterar sua escolha a qualquer momento nesta página ou pelo link
        &quot;Gerenciar cookies&quot; no rodapé.
      </p>

      <CookiePreferencesPanel />

      <h2>4. Registro do consentimento</h2>
      <p>
        Registramos data/hora, versão desta política e categorias aceitas (armazenamento
        com identificadores hasheados, sem IP em texto claro).
      </p>

      <h2>5. Mais informações</h2>
      <p>
        Consulte a{" "}
        <Link href="/privacidade">Política de Privacidade</Link> para dados pessoais,
        operadores e direitos do titular.
      </p>
    </LegalDocLayout>
  );
}
