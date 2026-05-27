# Lex Rocha

**Lex Rocha Tecnologia Jurídica** — pesquisa documental de precedentes em portais públicos, com relatório informativo para o cidadão levar ao advogado.

- **Domínio:** [lexrocha.com.br](https://lexrocha.com.br)
- **Fundador:** Tiago Aureliano da Rocha
- **CNPJ:** 61.699.939/0001-80

## Stack

| Camada | Tecnologia |
|--------|------------|
| Frontend | Next.js 14 (App Router), TypeScript, Tailwind, shadcn/ui |
| Backend | Supabase (PostgreSQL, Auth, Storage) |
| Organização de texto | Anthropic Claude API (somente servidor) |
| E-mail | Resend |
| PDF | jsPDF (cliente) |
| Deploy | Vercel |

## Setup local

```bash
npm install
cp .env.local.example .env.local
# Preencha Supabase e ANTHROPIC_API_KEY em .env.local
npm run dev
```

Ou no Windows:

```powershell
.\scripts\iniciar-dev.ps1
```

Abra **http://localhost:3000** (não use porta 8501 — era o painel antigo, removido).

Ferramenta interna do fundador: **http://localhost:3000/pesquisa-documental**

## Estrutura

```
src/
├── app/                    # Rotas (landing, pesquisa-documental, APIs)
├── components/
├── lib/
│   ├── anthropic/
│   ├── constants/
│   └── supabase/
└── types/
supabase/migrations/      # SQL — rodar no painel Supabase
docs/MODULO_A_PESQUISA_DOCUMENTAL.md
```

## Variáveis de ambiente

Veja `.env.local.example`.

## Módulo ativo

| Módulo | Descrição |
|--------|-----------|
| A — Pesquisa documental | Landing B2C + workspace interno + PDF |

Módulos B (B2G) e C (similaridade) só após confirmação do fundador.

## Deploy (Vercel)

1. Conecte o repositório GitHub à Vercel.
2. Configure as variáveis de ambiente.
3. Aponte `lexrocha.com.br` no DNS.

## SemVer e release

- Versão atual em `package.json` e histórico em `CHANGELOG.md`.
- Política de versionamento: `docs/SEMVER.md`.
- Validação rápida de consistência:

```bash
npm run semver:check
```

- Comandos de release:

```bash
npm run release:patch
npm run release:minor
npm run release:major
```
