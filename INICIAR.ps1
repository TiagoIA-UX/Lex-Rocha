#Requires -Version 5.1
<#
.SYNOPSIS
  Inicia o ecossistema Brasil completo: site + SignalHub-BR.

.EXAMPLE
  .\INICIAR.ps1
  Site http://localhost:3000 + bot Telegram em janela separada
#>
$ErrorActionPreference = "Stop"
$Root = $PSScriptRoot
$Hub = Join-Path $Root "signalhub-br"
$SiteUrl = "http://localhost:3000"

function Ensure-NodeModules {
    if (-not (Test-Path (Join-Path $Root "node_modules"))) {
        Write-Host "A instalar dependencias npm..." -ForegroundColor Yellow
        Push-Location $Root
        try { npm install } finally { Pop-Location }
    }
}

function Clear-DevPorts {
    foreach ($port in 3000, 3001, 3002) {
        $conns = Get-NetTCPConnection -LocalPort $port -State Listen -ErrorAction SilentlyContinue
        foreach ($c in $conns) {
            Stop-Process -Id $c.OwningProcess -Force -ErrorAction SilentlyContinue
        }
    }
}

function Test-SignalHubBR {
    $envFile = Join-Path $Hub ".env"
    $kw = Join-Path $Hub "config\keywords.yaml"
    $vr = Join-Path $Hub "config\varredura.yaml"
    if (-not (Test-Path $envFile)) {
        Write-Host "AVISO: Copie signalhub-br\.env.example para signalhub-br\.env" -ForegroundColor Yellow
        return $false
    }
    if (-not (Test-Path $kw)) {
        Write-Host "AVISO: Falta signalhub-br\config\keywords.yaml" -ForegroundColor Yellow
        return $false
    }
    if (-not (Test-Path $vr)) {
        Write-Host "AVISO: Falta signalhub-br\config\varredura.yaml" -ForegroundColor Yellow
        return $false
    }
    return $true
}

function Start-SignalHubBR {
    $title = "SignalHub-BR"
    $cmd = "Set-Location -LiteralPath '$Root'; python signalhub-br\hub.py"
    Start-Process powershell -ArgumentList @(
        "-NoExit", "-Command",
        "[Console]::OutputEncoding = [Text.UTF8Encoding]::UTF8; `$Host.UI.RawUI.WindowTitle = '$title'; $cmd"
    ) | Out-Null
    Write-Host "SignalHub-BR: janela separada (varredura + Telegram)" -ForegroundColor Green
}

Write-Host ""
Write-Host " Lex Rocha — Brasil (site + bot)" -ForegroundColor Cyan
Write-Host " Site:  $SiteUrl"
Write-Host " Bot:   SignalHub-BR (pt-BR)"
Write-Host ""

Ensure-NodeModules
Clear-DevPorts

if (Test-SignalHubBR) {
    Start-SignalHubBR
} else {
    Write-Host "Bot nao iniciado — corrija a configuracao acima." -ForegroundColor Yellow
}

$nextDir = Join-Path $Root ".next"
if (Test-Path $nextDir) {
    Remove-Item $nextDir -Recurse -Force
}

Start-Process $SiteUrl | Out-Null
Write-Host "Site: a iniciar nesta janela (Ctrl+C para parar o site; feche a outra janela para o bot)" -ForegroundColor DarkGray
Write-Host ""

Set-Location $Root
npm run dev
