"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

type Props = {
  relatorioId: string;
  nomeSugerido: string | null;
  emailSugerido: string | null;
  valorSugerido: number | null;
  jaEmitida: { numero: string | null; status: string | null; pdfUrl: string | null } | null;
};

const campoCls =
  "w-full rounded-lg border border-slate-300 px-3 py-2 text-sm";

export function NfseEmissao({
  relatorioId,
  nomeSugerido,
  emailSugerido,
  valorSugerido,
  jaEmitida,
}: Props) {
  const router = useRouter();
  const [form, setForm] = useState({
    nome: nomeSugerido ?? "",
    email: emailSugerido ?? "",
    documento: "",
    cMun: "3510500",
    cep: "",
    logradouro: "",
    numero: "",
    bairro: "",
    complemento: "",
    valor: valorSugerido != null ? String(valorSugerido) : "",
  });
  const [carregando, setCarregando] = useState(false);
  const [msg, setMsg] = useState<{ tipo: "ok" | "erro"; texto: string } | null>(null);

  function set(campo: keyof typeof form, valor: string) {
    setForm((f) => ({ ...f, [campo]: valor }));
  }

  async function emitir() {
    setCarregando(true);
    setMsg(null);
    const doc = form.documento.replace(/\D/g, "");
    const ehCnpj = doc.length > 11;
    try {
      const res = await fetch(`/api/admin/relatorios/${relatorioId}/nfse`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          valor: form.valor.trim() === "" ? undefined : Number(form.valor),
          tomador: {
            nome: form.nome,
            email: form.email || undefined,
            cpf: ehCnpj ? undefined : doc,
            cnpj: ehCnpj ? doc : undefined,
            cMun: form.cMun,
            cep: form.cep,
            logradouro: form.logradouro,
            numero: form.numero,
            bairro: form.bairro,
            complemento: form.complemento || undefined,
          },
        }),
      });
      const data = (await res.json()) as { erro?: string };
      if (!res.ok) {
        setMsg({ tipo: "erro", texto: data.erro ?? "Falha ao emitir." });
        return;
      }
      setMsg({ tipo: "ok", texto: "NFS-e enviada para processamento." });
      router.refresh();
    } catch {
      setMsg({ tipo: "erro", texto: "Erro de rede." });
    } finally {
      setCarregando(false);
    }
  }

  if (jaEmitida && jaEmitida.status) {
    return (
      <div className="space-y-3 rounded-xl border border-slate-200 bg-white p-5">
        <h2 className="text-sm font-semibold text-slate-800">NFS-e</h2>
        <p className="text-sm text-slate-700">
          Status: <span className="font-medium">{jaEmitida.status}</span>
          {jaEmitida.numero ? ` · nº ${jaEmitida.numero}` : ""}
        </p>
        {jaEmitida.pdfUrl ? (
          <a
            href={jaEmitida.pdfUrl}
            target="_blank"
            rel="noreferrer"
            className="inline-block text-sm font-medium text-slate-900 underline underline-offset-4"
          >
            Abrir PDF
          </a>
        ) : null}
      </div>
    );
  }

  return (
    <div className="space-y-3 rounded-xl border border-slate-200 bg-white p-5">
      <h2 className="text-sm font-semibold text-slate-800">Emitir NFS-e</h2>
      <p className="text-xs text-slate-500">
        Dados fiscais do tomador (exigidos pela prefeitura).
      </p>

      <input className={campoCls} placeholder="Nome / Razão social" value={form.nome} onChange={(e) => set("nome", e.target.value)} />
      <input className={campoCls} placeholder="CPF ou CNPJ" value={form.documento} onChange={(e) => set("documento", e.target.value)} />
      <input className={campoCls} type="email" placeholder="E-mail (opcional)" value={form.email} onChange={(e) => set("email", e.target.value)} />

      <div className="grid grid-cols-2 gap-2">
        <input className={campoCls} placeholder="Cód. município (IBGE)" value={form.cMun} onChange={(e) => set("cMun", e.target.value)} />
        <input className={campoCls} placeholder="CEP" value={form.cep} onChange={(e) => set("cep", e.target.value)} />
      </div>

      <input className={campoCls} placeholder="Logradouro" value={form.logradouro} onChange={(e) => set("logradouro", e.target.value)} />

      <div className="grid grid-cols-2 gap-2">
        <input className={campoCls} placeholder="Número" value={form.numero} onChange={(e) => set("numero", e.target.value)} />
        <input className={campoCls} placeholder="Bairro" value={form.bairro} onChange={(e) => set("bairro", e.target.value)} />
      </div>

      <input className={campoCls} placeholder="Complemento (opcional)" value={form.complemento} onChange={(e) => set("complemento", e.target.value)} />
      <input className={campoCls} type="number" placeholder="Valor (R$)" value={form.valor} onChange={(e) => set("valor", e.target.value)} />

      <button
        type="button"
        onClick={emitir}
        disabled={carregando}
        className="w-full rounded-lg bg-slate-900 px-4 py-2 text-sm font-medium text-white transition hover:bg-slate-700 disabled:opacity-50"
      >
        {carregando ? "Emitindo…" : "Emitir NFS-e"}
      </button>

      {msg ? (
        <p className={msg.tipo === "ok" ? "text-sm font-medium text-green-700" : "text-sm font-medium text-red-700"}>
          {msg.texto}
        </p>
      ) : null}
    </div>
  );
}
