# Changelog

Todas as mudanças relevantes do projeto seguem [Semantic Versioning](https://semver.org/lang/pt-BR/) e este arquivo.

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
