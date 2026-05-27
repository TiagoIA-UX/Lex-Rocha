# Módulo 1 — Pesquisa documental (Produto B2C)

Ferramenta interna para o fundador organizar precedentes públicos pesquisados manualmente.

## Acesso

- Site público: `/`
- Workspace interno: `/pesquisa-documental`
- Login (produção): `/pesquisa-documental/acesso` — requer `WORKSPACE_SECRET` no `.env`

## Setup Supabase

Execute no SQL Editor, nesta ordem:

1. `supabase/migrations/003_modulo_a_pesquisa_documental.sql`
2. `supabase/migrations/004_v3_triagem_groq.sql`
3. `supabase/migrations/005_lgpd_compliance.sql`
4. `supabase/migrations/006_solicitacoes_stripe.sql`
5. `supabase/migrations/007_fila_acompanhamento.sql`

## Fluxo completo

1. Referência interna + área + fatos (sem PII)
2. Agravantes + estimativa de causa (referência interna)
3. **Classificar caso** (Groq) → semáforo vermelho/amarelo/verde
4. **Confirmar e gerar relatório** (Claude) → 4 seções + aviso legal
5. Preview → **Baixar PDF**
6. **Salvar** → Supabase + modal de pagamento PIX

## Precificação do relatório

| Faixa | Valor | Critério |
|-------|-------|----------|
| Essencial | R$ 49 | até 2 precedentes |
| Padrão | R$ 79 | 3–5 precedentes |
| Completo | R$ 119 | 6+ ou urgência vermelha |

PIX: CNPJ 61.699.939/0001-80

## Variáveis de ambiente

- `ANTHROPIC_API_KEY` — relatório
- `GROQ_API_KEY` — triagem
- `WORKSPACE_SECRET` — proteção do workspace (obrigatório em produção)
- Supabase + `NEXT_PUBLIC_APP_URL`

## Dev local

```powershell
.\scripts\iniciar-dev.ps1
```

---

# Módulo 2 — Triagem para escritórios (Produto B2B)

**Status: aguardando confirmação do fundador.**

Escopo previsto: triagem de petições para escritórios (consumidor, trabalhista, previdenciário).  
Modelo: assinatura mensal R$ 300–800. Sem comissão por caso.

Não iniciar desenvolvimento até o Módulo 1 estar em produção e gerando receita.
