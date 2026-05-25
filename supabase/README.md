# Supabase — Lex Rocha

## Passo a passo (Módulo 2)

### 1. Criar projeto

1. Acesse [supabase.com/dashboard](https://supabase.com/dashboard) → **New project**.
2. Copie em `.env.local`:
   - `NEXT_PUBLIC_SUPABASE_URL`
   - `NEXT_PUBLIC_SUPABASE_ANON_KEY`
   - `SUPABASE_SERVICE_ROLE_KEY` (Settings → API → service_role)

### 2. Executar migrations

No **SQL Editor**, cole e execute na ordem:

1. `migrations/001_initial_schema.sql` — tabelas, RLS, bucket `prints`
2. `migrations/002_promote_admin.sql` — após seu cadastro, troque o e-mail e execute

### 3. Auth

- Ative **Email** em Authentication → Providers.
- Crie sua conta em Authentication → Users (ou via app).
- Rode `002_promote_admin.sql` para papel `admin`.

### 4. Papéis

| Papel | Uso |
|-------|-----|
| `usuario` | Lesado — triagem e relatório |
| `escritorio` | Advogado parceiro — leads |
| `admin` | Tiago — painel completo |

Para parceiros: ao cadastrar, defina `raw_user_meta_data.role = 'escritorio'` ou atualize `profiles.role` manualmente.

### 5. Storage

Bucket `prints` é criado pela migration. Uploads de evidências no **Módulo 3** via API com service role.

Estrutura: `casos/{caso_id}/{arquivo}.jpg`

## Tabelas

- `profiles` — papéis de usuário
- `casos` — triagens (com `wizard_step` e status `rascunho`)
- `relatorios` — saída da Claude API
- `escritorios` — parceiros
- `leads` — distribuição para escritórios
