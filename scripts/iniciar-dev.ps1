# Lex-Rocha — sobe o site Next.js (porta 3000)
$Root = Split-Path -Parent $PSScriptRoot
Set-Location $Root

foreach ($port in 3000, 3001, 3002) {
  $conns = Get-NetTCPConnection -LocalPort $port -State Listen -ErrorAction SilentlyContinue
  foreach ($c in $conns) {
    Stop-Process -Id $c.OwningProcess -Force -ErrorAction SilentlyContinue
  }
}

if (Test-Path .next) {
  Remove-Item -Recurse -Force .next
}

Write-Host "Lex-Rocha" -ForegroundColor Cyan
Write-Host "  Site publico:      http://localhost:3000" -ForegroundColor Green
Write-Host "  Ferramenta interna: http://localhost:3000/pesquisa-documental" -ForegroundColor DarkGray
Write-Host ""

npm run dev
