"use client";

import Link from "next/link";
import { useState } from "react";

import { WhatsAppButton } from "@/components/atoms/whatsapp-button";
import { Button } from "@/components/ui/button";
import { mensagemClienteAcompanhar } from "@/lib/whatsapp";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { COPY_SITE } from "@/lib/constants/copy-site";
import {
  AREAS_PROBLEMA,
  AVISO_LEGAL_TELA,
  NOME_SERVICO_PUBLICO,
  PRECIFICACAO,
} from "@/lib/constants/pesquisa-documental";

type FormState = {
  nome: string;
  email: string;
  telefone: string;
  area: (typeof AREAS_PROBLEMA)[number];
  descricao: string;
  consentimento: boolean;
};

const estadoInicial: FormState = {
  nome: "",
  email: "",
  telefone: "",
  area: AREAS_PROBLEMA[0],
  descricao: "",
  consentimento: false,
};

const { solicitar: copySolicitar } = COPY_SITE;

export function SolicitarPesquisaForm() {
  const [form, setForm] = useState<FormState>(estadoInicial);
  const [enviando, setEnviando] = useState(false);
  const [erro, setErro] = useState<string | null>(null);
  const [enviado, setEnviado] = useState(false);
  const [codigoAcompanhamento, setCodigoAcompanhamento] = useState<string | null>(null);
  const [previsaoEntrega, setPrevisaoEntrega] = useState<string | null>(null);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setErro(null);
    setEnviando(true);

    try {
      const res = await fetch("/api/pesquisa-documental/solicitar", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
        signal: AbortSignal.timeout(20_000),
      });
      const json = (await res.json()) as {
        erro?: string;
        codigoAcompanhamento?: string;
        previsaoEntrega?: string;
      };
      if (!res.ok) throw new Error(json.erro ?? "Falha ao enviar.");
      setCodigoAcompanhamento(json.codigoAcompanhamento ?? null);
      setPrevisaoEntrega(json.previsaoEntrega ?? null);
      setEnviado(true);
    } catch (err) {
      if (err instanceof Error && err.name === "TimeoutError") {
        setErro("A conexão demorou demais. Verifique sua internet e tente novamente.");
      } else {
        setErro(err instanceof Error ? err.message : "Erro inesperado.");
      }
    } finally {
      setEnviando(false);
    }
  }

  if (enviado) {
    return (
      <Card className="border-primary/30">
        <CardHeader>
          <CardTitle className="text-xl text-primary">{copySolicitar.sucessoTitulo}</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4 text-muted-foreground">
          <p>
            Obrigado, {form.nome.split(" ")[0]}! {copySolicitar.sucessoCorpo} (
            <strong className="text-foreground">{form.email}</strong>).
          </p>
          {codigoAcompanhamento && (
            <div className="rounded-lg border border-primary/30 bg-primary/5 p-4 text-sm">
              <p className="font-medium text-primary">Código de acompanhamento</p>
              <p className="mt-1 font-mono text-lg tracking-widest">{codigoAcompanhamento}</p>
              {previsaoEntrega && (
                <p className="mt-2 text-muted-foreground">
                  Previsão para retorno do orçamento:{" "}
                  {new Date(previsaoEntrega).toLocaleDateString("pt-BR", {
                    weekday: "long",
                    day: "2-digit",
                    month: "long",
                  })}
                </p>
              )}
              <div className="mt-4 flex flex-wrap gap-2">
                <Button asChild size="sm">
                  <Link href={`/acompanhar/${codigoAcompanhamento}`}>Acompanhar pelo site</Link>
                </Button>
                <WhatsAppButton
                  mensagem={mensagemClienteAcompanhar(codigoAcompanhamento)}
                  size="sm"
                >
                  Enviar código no WhatsApp
                </WhatsAppButton>
              </div>
            </div>
          )}
          <Button asChild variant="outline">
            <Link href="/">Voltar ao início</Link>
          </Button>
        </CardContent>
      </Card>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">{NOME_SERVICO_PUBLICO}</CardTitle>
          <p className="text-sm text-muted-foreground">{AVISO_LEGAL_TELA}</p>
        </CardHeader>
        <CardContent className="space-y-4">
          <label className="block space-y-1 text-sm">
            <span className="font-medium">Seu nome</span>
            <input
              required
              className="w-full rounded-md border border-input bg-background px-3 py-2"
              value={form.nome}
              onChange={(e) => setForm((p) => ({ ...p, nome: e.target.value }))}
            />
          </label>

          <label className="block space-y-1 text-sm">
            <span className="font-medium">E-mail</span>
            <input
              required
              type="email"
              className="w-full rounded-md border border-input bg-background px-3 py-2"
              value={form.email}
              onChange={(e) => setForm((p) => ({ ...p, email: e.target.value }))}
            />
          </label>

          <label className="block space-y-1 text-sm">
            <span className="font-medium">Telefone / WhatsApp (opcional)</span>
            <input
              type="tel"
              className="w-full rounded-md border border-input bg-background px-3 py-2"
              value={form.telefone}
              onChange={(e) => setForm((p) => ({ ...p, telefone: e.target.value }))}
            />
          </label>

          <label className="block space-y-1 text-sm">
            <span className="font-medium">Área do problema</span>
            <select
              className="w-full rounded-md border border-input bg-background px-3 py-2"
              value={form.area}
              onChange={(e) =>
                setForm((p) => ({ ...p, area: e.target.value as FormState["area"] }))
              }
            >
              {AREAS_PROBLEMA.map((a) => (
                <option key={a} value={a}>
                  {a}
                </option>
              ))}
            </select>
          </label>

          <label className="block space-y-1 text-sm">
            <span className="font-medium">Descreva o caso</span>
            <textarea
              required
              minLength={30}
              className="min-h-[140px] w-full rounded-md border border-input bg-background px-3 py-2"
              value={form.descricao}
              onChange={(e) => setForm((p) => ({ ...p, descricao: e.target.value }))}
              placeholder={copySolicitar.placeholderDescricao}
            />
          </label>

          <label className="flex items-start gap-2 text-sm">
            <input
              required
              type="checkbox"
              checked={form.consentimento}
              onChange={(e) => setForm((p) => ({ ...p, consentimento: e.target.checked }))}
              className="mt-1"
            />
            <span>
              Li e concordo com a{" "}
              <Link href="/privacidade" className="text-primary underline">
                Política de Privacidade
              </Link>{" "}
              para tratamento dos meus dados nesta solicitação.
            </span>
          </label>
        </CardContent>
      </Card>

      <Card>
        <CardContent className="space-y-2 pt-6 text-sm text-muted-foreground">
          <p>
            {copySolicitar.referenciaValores} Essencial R$ {PRECIFICACAO.essencial.valor} ·
            Padrão R$ {PRECIFICACAO.padrao.valor} · Completo R${" "}
            {PRECIFICACAO.completo.valor}.
          </p>
        </CardContent>
      </Card>

      {erro && (
        <Card className="border-destructive/50 bg-destructive/5">
          <CardContent className="pt-6 text-sm text-destructive">{erro}</CardContent>
        </Card>
      )}

      <Button type="submit" size="lg" disabled={enviando} className="w-full sm:w-auto">
        {enviando ? "Enviando…" : "Enviar solicitação"}
      </Button>
    </form>
  );
}
