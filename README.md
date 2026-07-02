# Lex Rocha

**Pesquisa documental informativa** em fontes públicas brasileiras — direito do consumidor e relações digitais.

| Campo | Valor |
|-------|--------|
| **Titular** | Tiago Aureliano da Rocha |
| **CNPJ (MEI)** | 61.699.939/0001-80 |
| **Site** | [lexrocha.com.br](https://lexrocha.com.br) |
| **Licença** | [LICENSE](./LICENSE) — software proprietário |
| **Versão** | Ver [CHANGELOG.md](./CHANGELOG.md) |

> **© 2026 Tiago Aureliano da Rocha — Lex Rocha, prestação de serviços (CNPJ 61.699.939/0001-80).**  
> Todos os direitos reservados. Uso, cópia e redistribuição do código somente com autorização expressa do titular.

## Repositório

**GitHub:** [github.com/TiagoIA-UX/Lex-Rocha](https://github.com/TiagoIA-UX/Lex-Rocha)

Prompts de produção, taxonomias e materiais estratégicos ficam em `private/` — **não versionados** (propriedade intelectual).

## Stack

- Next.js 14 · Supabase · Stripe · Groq (triagem) · Claude (relatórios) · Nuvem Fiscal (NFS-e)

## Desenvolvimento local

```bash
cp .env.local.example .env.local
# Preencha credenciais (Supabase, GROQ_API_KEY, ANTHROPIC_API_KEY, etc.)

npm install
npm run dev
```

Validação:

```bash
npm test && npm run lint && npm run build
```
