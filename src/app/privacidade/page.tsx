import Link from "next/link";

import { DireitosLgpdForm } from "@/components/legal/direitos-lgpd-form";
import { LegalDocLayout } from "@/components/legal/legal-doc-layout";
import {
  DATA_PUBLICACAO_POLITICA,
  DPO,
  TEXTO_JURISDICAO_BRASILEIRA,
  VERSAO_POLITICA_PRIVACIDADE,
} from "@/lib/constants/lgpd";
import { SITE } from "@/lib/constants/site";

export const metadata = {
  title: "Política de privacidade",
};

export default function PrivacidadePage() {
  return (
    <LegalDocLayout title="Política de privacidade">
      <p className="lead">
        Versão {VERSAO_POLITICA_PRIVACIDADE} · Última atualização: {DATA_PUBLICACAO_POLITICA}
      </p>

      <h2>1. Quem somos (controlador)</h2>
      <p>
        <strong>{SITE.legalName}</strong> — CNPJ {SITE.cnpj}
        <br />
        Encarregado de dados (DPO): {DPO.nome}
        <br />
        E-mail para exercício de direitos:{" "}
        <a href={`mailto:${DPO.email}`}>{DPO.email}</a>
        <br />
        Prazo de resposta: até {DPO.prazoRespostaDias} dias (art. 18, LGPD).
      </p>

      <h2>2. Quais dados coletamos</h2>
      <ul>
        <li>
          <strong>Cadastro público:</strong> não há cadastro de clientes finais no site.
        </li>
        <li>
          <strong>Sessão e segurança:</strong> identificador de sessão, hashes de IP e
          navegador (nunca IP em texto claro), horário de acesso.
        </li>
        <li>
          <strong>Formulário interno:</strong> resumo de fatos e referência interna, por
          design sem nome, CPF ou RG do cliente final.
        </li>
        <li>
          <strong>Cookies:</strong> conforme a{" "}
          <Link href="/cookies">Política de Cookies</Link>.
        </li>
        <li>
          <strong>Contato:</strong> e-mail quando você nos escreve para solicitar pesquisa
          ou direitos LGPD.
        </li>
      </ul>

      <h2>3. Finalidades e bases legais</h2>
      <ul>
        <li>
          Pesquisa documental e relatórios — execução de contrato / legítimo interesse.
        </li>
        <li>Logs de acesso — cumprimento de obrigação legal (Marco Civil, 6 meses).</li>
        <li>Cookies necessários — legítimo interesse.</li>
        <li>Cookies analíticos — consentimento.</li>
      </ul>

      <h2>4. Compartilhamento e transferência internacional</h2>
      <p>Podemos usar os seguintes operadores (servidores podem estar nos EUA):</p>
      <ul>
        <li>Supabase Inc. — banco de dados (DPA contratual).</li>
        <li>Anthropic PBC — organização de relatório (texto sem PII do cliente final).</li>
        <li>Groq Inc. — classificação interna (apenas texto sem dados pessoais).</li>
        <li>Vercel Inc. — hospedagem (DPA contratual).</li>
        <li>Resend Inc. — e-mail transacional, quando utilizado.</li>
      </ul>
      <p>
        Não vendemos dados nem compartilhamos com anunciantes. Transferências internacionais
        seguem garantias da Resolução CD/ANPD nº 19/2024 (cláusulas contratuais padrão com
        cada fornecedor).
      </p>

      <h2>5. Retenção</h2>
      <ul>
        <li>Logs de acesso: 6 meses.</li>
        <li>Relatórios: durante o contrato + 90 dias, salvo obrigação legal.</li>
        <li>Registro de consentimento de cookies: 2 anos.</li>
        <li>Após encerramento: eliminação em até 30 dias, quando aplicável.</li>
      </ul>

      <h2>6. Direitos do titular (art. 18 LGPD)</h2>
      <p>Você pode solicitar: confirmação, acesso, correção, anonimização, bloqueio,
        eliminação, portabilidade e revogação de consentimento.</p>
      <p>
        Como exercer: envie e-mail para{" "}
        <a href={`mailto:${DPO.email}?subject=Direitos%20LGPD`}>{DPO.email}</a> com assunto
        &quot;Direitos LGPD — [seu nome]&quot;. Resposta em até {DPO.prazoRespostaDias}{" "}
        dias.
      </p>

      <h2>7. Segurança e incidentes</h2>
      <p>
        Criptografia em trânsito (TLS), criptografia em repouso no provedor de banco de
        dados, acesso restrito por políticas de segurança (RLS). Em incidente relevante:
        comunicação à ANPD em até 3 dias úteis e aviso aos afetados quando necessário
        (Resolução CD/ANPD nº 15/2024).
      </p>

      <h2>8. Uso de tecnologia de processamento automatizado</h2>
      <p>
        O sistema utiliza processamento automatizado para classificação interna de fila e
        organização de relatórios. Os textos enviados para classificação não devem conter
        dados pessoais identificáveis do cliente final. Toda entrega ao cliente é revisada
        pelo operador humano ({SITE.founder}) antes da conclusão. Logs de uso são mantidos
        para auditoria (Portaria ANPD nº 5/2024).
      </p>

      <h2>9. Jurisdição do serviço</h2>
      <p>{TEXTO_JURISDICAO_BRASILEIRA}</p>

      <h2>10. Atualizações</h2>
      <p>
        Alterações relevantes serão comunicadas por aviso no site ou e-mail, com
        antecedência mínima de 15 dias quando exigido.
      </p>

      <DireitosLgpdForm />
    </LegalDocLayout>
  );
}
