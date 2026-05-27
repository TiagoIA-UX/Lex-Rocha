# Prompt mestre — Adaptação neurocomportamental (Lex-Rocha)

**Versão:** 1.0 · **Uso:** Cursor Agent / revisão humana PhD·MBA·DBA  
**Produto:** Pesquisa de Jurisprudência (B2C) — **não** consultoria jurídica  
**Vertical prioritária:** Direito digital / tecnologia da informação (LGPD, plataformas, consumo digital)

---

## 1. Objetivo executivo (camada estratégica — DBA)

Reposicionar toda a comunicação pública para:

1. **Reduzir carga cognitiva** do visitante em situação de conflito (conta bloqueada, vazamento, cobrança).
2. **Aumentar confiança por transparência** (escopo, preço, limites **antes** do clique).
3. **Ativar compromisso progressivo** (modelo → solicitar → orçamento → pagamento).
4. **Capturar demanda do nicho TI** sem prometer resultado nem atuar como advogado.

**KPIs de copy (qualitativos):** clareza em 1 leitura por bloco; zero frases proibidas; coerência entre landing, formulário, PDF e e-mails.

---

## 2. Framework neurocomportamental (camada acadêmica — PhD)

| Princípio | Aplicação Lex-Rocha | Evitar |
|-----------|---------------------|--------|
| **Carga cognitiva (Sweller)** | Uma ideia por parágrafo; listas curtas; etapas numeradas | Blocos densos, jargão sem glossário |
| **Aversão à perda (Kahneman)** | “Organize precedentes **antes** da consulta paga” | “Você vai perder o processo” |
| **Efeito primazia** | Hero: valor + limite legal nos primeiros 3 segundos | Abrir com história da empresa |
| **Prova social epistêmica** | Fontes públicas, links, modelo ilustrativo | “Milhares de clientes satisfeitos” sem dado |
| **Compromisso progressivo (Cialdini)** | CTA secundário = modelo; primário = solicitar | Pedir pagamento na home |
| **Autoridade calibrada** | Metodologia, CNPJ, fila, OAB | “Especialistas garantem vitória” |
| **Incerteza regulatória** | “Material informativo”; “advogado OAB” | “Saiba se tem direito” |
| **Fluência processual** | “Três etapas”, código de acompanhamento | Processo com 7+ passos visíveis |

---

## 3. Arquitetura de camadas (camada operacional — MBA)

Execute **sempre nesta ordem**. Após cada camada, rode os testes indicados.

```
Camada 0 — Governança
  .cursorrules, COPY_PROIBIDO, CHANGELOG
  Teste: npm run test:copy

Camada 1 — Fonte única de copy pública
  src/lib/constants/copy-site.ts
  Teste: npm run test:copy:estrutura

Camada 2 — Constantes de domínio
  pesquisa-documental.ts (áreas, avisos, preços)
  fontes-publicas.ts, precedentes.ts, modelo-relatorio-demo.ts
  Teste: npm run test:copy:estrutura

Camada 3 — Componentes (organisms / molecules)
  hero, areas, how-it-works, trust, modelo, precos, cta, footer, solicitar-form
  Teste: npm run test:copy && npm run lint

Camada 4 — Páginas App Router
  page.tsx, solicitar, modelo-relatorio, acompanhar, parceiro, layout metadata
  Teste: npm run build

Camada 5 — APIs e comunicações
  resend.ts, whatsapp/sender.ts (tom alinhado, sem IA no texto ao cliente)
  Teste: npm run test:integracao (se servidor disponível)

Camada 6 — PDF e workspace interno
  estrutura-relatorio.ts, relatorio-pesquisa.ts, workspace (avisos legais)
  Teste: revisão manual + build

Camada 7 — Validação ponta a ponta
  npm run test:copy:all && npm run build
```

---

## 4. Prompt de execução (copiar para o Agent)

```text
Você adapta a comunicação pública do Lex-Rocha seguindo docs/PROMPT_ADAPTACAO_NEUROCOMPORTAMENTAL.md.

CONTEXTO DE NEGÓCIO:
- Serviço: pesquisa documental de precedentes em portais públicos (PDF).
- Público: cidadão com conflito digital + advogado que precisa de pesquisa organizada.
- Vertical TI: LGPD/vazamento, plataformas (banimento), consumo digital, contratos SaaS (B2C).

REGRAS INEGOCIÁVEIS (.cursorrules):
- Nunca: consultoria, "recomendo", "vai ganhar", IA no site/PDF, MVP/gratuito.
- Sempre: aviso informativo, advogado OAB, escopo antes da cobrança.

NEUROCOMPORTAMENTAL (aplicar em cada bloco):
1. Título = benefício verificável (não slogan vazio).
2. Corpo = 1 ideia + 1 prova (fonte, processo ou preço).
3. CTA = verbo + próximo passo único.
4. Reduzir ansiedade: prazo, código, orçamento prévio.

EXECUÇÃO:
1. Editar apenas copy-site.ts e constantes relacionadas (camadas 1–2).
2. Garantir alinhamento AREAS_PROBLEMA ↔ areas.lista.
3. Incluir keywords SEO: LGPD, plataformas digitais, direito digital, precedentes.
4. Rodar: npm run test:copy:all && npm run lint && npm run build
5. Reportar camada a camada: o que mudou, testes OK/FAIL.

NÃO alterar: lógica Stripe, RLS Supabase, triagem Groq, rotas de API.
```

---

## 5. Taxonomia do nicho TI (categorias de copy)

Use estas categorias na seção **Escopo** e no formulário **Área do caso**:

| ID | Categoria | Gatilho neurocomportamental | Exemplo de dor |
|----|-----------|----------------------------|----------------|
| A1 | LGPD e privacidade | Segurança + controle | Vazamento, fraude após vazamento |
| A2 | Plataformas digitais | Restauração de status | Conta bloqueada, banimento |
| A3 | Consumo digital | Justiça procedural | Cobrança app, falha de serviço |
| A4 | Contratos digitais / SaaS | Previsibilidade | Cancelamento, SLA, ERP |
| B1 | Trabalho + tecnologia | Proteção patrimonial | App motorista, monitoramento |
| B2 | Planos de saúde (digital) | Acesso a serviço | Negativa telemedicina |
| C | Outros cíveis com TI | Porta de entrada ampla | Demais casos |

**Ordem de exibição:** A1 → A2 → A3 → A4 → B1 → B2 → C (demanda alta no topo).

---

## 6. Checklist de qualidade por bloco

Para cada string em `COPY_SITE`:

- [ ] Legível em mobile (≤ 120 caracteres por frase quando possível)
- [ ] Sem negação defensiva (“não só X”)
- [ ] Sem promessa de êxito ou “direito garantido”
- [ ] Placeholders `{domain}`, `{essencial}` documentados
- [ ] Coerente com `.cursorrules` e `COPY_PROIBIDO`
- [ ] Alinhado à vertical TI quando for escopo/áreas/SEO

---

## 7. Comandos de validação

```bash
npm run test:copy          # frases proibidas
npm run test:copy:estrutura # árvore COPY_SITE + nicho TI + formulário
npm run test:copy:all      # ambos
npm run lint
npm run build
```

---

## 8. Manutenção

- Toda alteração de copy público: **somente** `copy-site.ts` (e constantes de domínio vinculadas).
- Atualizar este documento quando abrir nova vertical (ex.: previdenciário puro).
- Versionar no CHANGELOG em `[Unreleased]` ou release SemVer conforme `docs/SEMVER.md`.
