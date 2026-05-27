# SemVer no Lex Rocha

Este projeto segue [Semantic Versioning 2.0.0](https://semver.org/lang/pt-BR/).

## Regra de incremento

- `PATCH` (`x.y.Z`): correcao de bug, ajuste de copy, melhoria sem quebrar comportamento publico.
- `MINOR` (`x.Y.z`): nova funcionalidade retrocompativel (nova rota, novo endpoint, novo fluxo opcional).
- `MAJOR` (`X.y.z`): mudanca incompativel (quebra de contrato de API, remocao de rota sem redirect, alteracao obrigatoria de payload).

## Checklist de release

1. Atualizar `CHANGELOG.md` com a nova secao de versao.
2. Garantir build e testes locais:
   - `npm run build`
   - `npm run test:copy`
   - `npm run test:integracao`
3. Validar SemVer:
   - `npm run semver:check`
4. Criar a versao:
   - `npm run release:patch` ou
   - `npm run release:minor` ou
   - `npm run release:major`

> Os comandos `npm version` atualizam `package.json`, criam commit de versao e tag git local.
