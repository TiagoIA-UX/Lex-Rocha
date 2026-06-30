# Changelog

Todas as mudanças relevantes do projeto seguem [Semantic Versioning](https://semver.org/lang/pt-BR/) e este arquivo.

## [Unreleased]

## [1.1.1] - 2026-06-30

### Alterado

- Precedentes explicados em linguagem natural (o que aconteceu, o que o juiz decidiu, resultado)
- Aviso legal único na home (padrão de mercado); removidas repetições no hero, modelo, fontes e footer
- Modelo de relatório: amostra de casos com explicação clara em vez de lista de links
- Seção "O que os tribunais já decidiram" com cards de casos reais (TJMT, TJPR, TJMA, TJSP)
- Copy mais confiante: foco em esclarecer o caso, menos disclaimers repetidos

## [1.1.0] - 2026-06-30

### Adicionado

- Painel administrativo (`/admin`): relatórios, financeiro, solicitações e emissão de NFS-e
- Autenticação admin: sessão assinada (HMAC-SHA256) + login Google OAuth + allowlist por e-mail
- Integração NFS-e via Nuvem Fiscal (cliente de API, montagem do DPS e configuração)
- Exportação financeira/IR em CSV (`/api/admin/export-ir`) e botões no painel financeiro
- SignalHub BR: captação de leads em fontes públicas com scoring por IA e alertas no Telegram (serviço Python)
- Branding: novo emblema, banner, favicons e metadados sociais (OG/Twitter)
- Menu de navegação mobile (hambúrguer acessível) no cabeçalho
- Política comercial "sem cobrança quando não há precedente comparável" + cláusula nos Termos
- Protocolo Zero Bug e protocolo de testes por camada (governança de qualidade)
- `.env.local.example` consolidado com todas as variáveis do projeto
- Migrations `006_solicitacoes_stripe`, `007_fila_acompanhamento`, `008_nfse_faturacao`
- Prompt mestre de adaptação neurocomportamental e testes de estrutura de copy (`test:copy:estrutura`, `test:copy:all`)
- Suíte completa `test:all`, diagnóstico `test:supabase`, `COPY_CATEGORIAS_DIGITAL` e fonte ANPD

### Alterado

- Copy de planos: "analisamos o caso e apresentamos as opções" (Essencial/Padrão/Completo)
- Banner movido do topo da home para o card do Hero
- Cabeçalho com fundo navy em gradiente, logo com emblema e botão "Solicitar" em destaque dourado
- Copy pública alinhada ao nicho direito digital / consumo (hero, escopo, SEO, formulário)
- `AREAS_PROBLEMA` sincronizado com categorias digitais; banner de cookies via `COPY_SITE.cookies`
- Middleware: rotas B2C públicas sem refresh Supabase Auth; timeouts e retentativas de conexão

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
