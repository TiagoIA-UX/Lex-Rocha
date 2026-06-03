# Propriedade intelectual — Lex Rocha

**Titular:** Tiago Aureliano da Rocha · CNPJ 61.699.939/0001-80

## Não commitar

| Artefato | Local |
|----------|--------|
| Prompts Groq / Claude | `private/pesquisa-documental.ip.json` |
| Prompt Cursor | `.cursorrules` → mover para `private/` |
| Runbooks | `docs/` |
| Credenciais | `.env.local` |

## Setup

```powershell
copy private\pesquisa-documental.ip.example.json private\pesquisa-documental.ip.json
# Edite com seus prompts reais
```

O código carrega prompts apenas em servidor (`pesquisa-documental.ip.server.ts`).
