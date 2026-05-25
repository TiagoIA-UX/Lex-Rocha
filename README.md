# Lex Rocha

**Lex Rocha Tecnologia Jurídica** — plataforma LegalTech de triagem jurídica inteligente com IA.

- **Domínio:** [lexrocha.com.br](https://lexrocha.com.br)
- **Fundador:** Tiago Aureliano da Rocha
- **CNPJ:** 61.699.939/0001-80

## Stack

| Camada | Tecnologia |
|--------|------------|
| Frontend | Next.js 14 (App Router), TypeScript, Tailwind, shadcn/ui |
| Backend | Supabase (PostgreSQL, Auth, Storage) |
| IA | Anthropic Claude API |
| E-mail | Resend |
| PDF | jsPDF + html2canvas (cliente) |
| Deploy | Vercel |

## Setup local

```bash
npm install
cp .env.local.example .env.local
# Preencha as variáveis do Supabase em .env.local
npm run dev
```

Abra [http://localhost:3000](http://localhost:3000).

## Estrutura de pastas

```
src/
├── app/              # Rotas App Router
├── components/
│   ├── ui/           # shadcn/ui
│   ├── atoms/
│   ├── molecules/
│   └── organisms/
├── hooks/
├── lib/
│   └── supabase/     # client, server, admin, middleware
└── types/
supabase/             # Migrations e docs do banco
```

## Variáveis de ambiente

Veja `.env.local.example` para a lista completa.

## Módulos de desenvolvimento

| # | Módulo | Status |
|---|--------|--------|
| 1 | Configuração inicial | ✅ Concluído |
| 2 | Schema Supabase + RLS | ✅ Ativo no Supabase |
| 3 | Landing page | ✅ Concluído |
| 4 | Wizard de triagem | Pendente |
| 4+ | Ver prompt mestre | Pendente |

## Deploy (Vercel)

1. Conecte o repositório GitHub à Vercel.
2. Configure as variáveis de ambiente no dashboard da Vercel.
3. Aponte o domínio `lexrocha.com.br` via DNS no Registro.br.

---

*Aguardar confirmação do fundador antes de avançar cada módulo.*
