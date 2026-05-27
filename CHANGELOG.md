# Changelog

Todas as mudanças relevantes do projeto seguem [Semantic Versioning](https://semver.org/lang/pt-BR/) e este arquivo.

## [Unreleased]

### Adicionado

- Prompt mestre de adaptação neurocomportamental: `docs/PROMPT_ADAPTACAO_NEUROCOMPORTAMENTAL.md`
- Testes de estrutura de copy: `npm run test:copy:estrutura`, `npm run test:copy:all`
- `COPY_CATEGORIAS_DIGITAL` e taxonomia nicho TI (LGPD, plataformas, consumo digital)
- Fonte ANPD em `fontes-publicas.ts`; precedentes Lei 9.609/98 e dano moral em dados

### Alterado

- Copy pública alinhada ao nicho direito digital / TI (hero, escopo, SEO, formulário)
- `AREAS_PROBLEMA` sincronizado com categorias digitais
- Banner de cookies usando `COPY_SITE.cookies`
- Middleware: rotas B2C públicas sem refresh Supabase Auth (menos latência)
- Supabase admin com fetch timeout; formulário `/solicitar` com timeout de 20s
- API solicitar: uma leitura de fila + código em paralelo (menos round-trips)

## [1.0.0] - 2026-05-27

### Adicionado

- Módulo A — Pesquisa de Jurisprudência B2C: `/solicitar`, `/acompanhar`, `/modelo-relatorio`
- Workspace interno `/pesquisa-documental` com triagem, fila e geração de relatório
- Integração Stripe (checkout + webhook), e-mails Resend, LGPD (consentimento, direitos, access-log)
- Fonte única de copy pública em `src/lib/constants/copy-site.ts`
- Redirect permanente `/triagem` → `/solicitar`
- Script `npm run test:integracao` para rotas e API locais

### Alterado

- Landing e páginas públicas com tom profissional (clareza cognitiva, transparência de escopo e preço)
- Remoção de textos reativos da conversa anterior (ex.: “não só bloqueios”, tom confrontativo)
- Hero simplificado: valor → escopo → aviso legal → CTAs
- Modelo de relatório com narrativa genérica (serviços digitais), sem foco em FAQ informal

### Removido

- Página pública `/triagem` (substituída por `/solicitar`)

## [0.1.0] - 2026-05-26

### Adicionado

- Landing inicial e estrutura Next.js 14 do projeto Lex Rocha
