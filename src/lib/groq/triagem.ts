import {
  PROMPT_CLASSIFICADOR_TRIAGEM,
  type ResultadoTriagem,
  resultadoTriagemSchema,
} from "@/lib/constants/pesquisa-documental";
import { contemDadosPessoais } from "@/lib/validations/pesquisa-documental";

const GROQ_URL = "https://api.groq.com/openai/v1/chat/completions";
const MODELO_TRIAGEM = process.env.GROQ_MODEL ?? "llama-3.3-70b-versatile";

export async function classificarCasoTriagem(input: {
  area: string;
  fatosResumo: string;
}): Promise<{ resultado: ResultadoTriagem; modelo: string; tokens?: { entrada: number; saida: number } }> {
  const apiKey = process.env.GROQ_API_KEY;
  if (!apiKey) {
    throw new Error("GROQ_API_KEY não configurada. Adicione em .env.local.");
  }

  if (contemDadosPessoais(input.fatosResumo)) {
    throw new Error(
      "O resumo dos fatos parece conter dados pessoais (CPF, e-mail, etc.). Remova antes da triagem — use apenas referência interna no campo próprio."
    );
  }

  const prompt = PROMPT_CLASSIFICADOR_TRIAGEM.replace("{area}", input.area).replace(
    "{fatos_resumo}",
    input.fatosResumo
  );

  const modelo = MODELO_TRIAGEM;

  const res = await fetch(GROQ_URL, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${apiKey}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      model: modelo,
      temperature: 0.1,
      max_tokens: 512,
      messages: [
        {
          role: "system",
          content:
            "Você retorna apenas JSON válido, sem markdown, sem explicações.",
        },
        { role: "user", content: prompt },
      ],
    }),
  });

  if (!res.ok) {
    const err = await res.text();
    throw new Error(`Groq API: ${res.status} — ${err.slice(0, 200)}`);
  }

  const data = (await res.json()) as {
    choices?: { message?: { content?: string } }[];
    usage?: { prompt_tokens?: number; completion_tokens?: number };
  };

  const raw = data.choices?.[0]?.message?.content?.trim() ?? "";
  const jsonStr = raw.replace(/^```json\s*/i, "").replace(/```\s*$/i, "");

  let parsed: unknown;
  try {
    parsed = JSON.parse(jsonStr);
  } catch {
    throw new Error("Triagem: resposta inválida da API. Tente novamente.");
  }

  const resultado = resultadoTriagemSchema.parse(parsed);

  return {
    resultado,
    modelo,
    tokens: {
      entrada: data.usage?.prompt_tokens ?? 0,
      saida: data.usage?.completion_tokens ?? 0,
    },
  };
}
