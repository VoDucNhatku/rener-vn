# Windows equivalent of the Makefile:  .\scripts\dev.ps1 setup|api|worker|web|dev|test|seed|eval
param([Parameter(Mandatory = $true)][string]$Target)
$ErrorActionPreference = "Stop"
$root = Split-Path -Parent $PSScriptRoot
$api = Join-Path $root "apps\api"
$py = Join-Path $api ".venv\Scripts\python.exe"

switch ($Target) {
  "setup" {
    python -m venv (Join-Path $api ".venv")
    & $py -m pip install -e "$api[dev]"
    Push-Location $api; & $py -m app.cli init-db; Pop-Location
    Push-Location (Join-Path $root "apps\web"); npm install; Pop-Location
  }
  "api"    { Push-Location $api; & $py -m uvicorn app.main:app --reload --port 8000; Pop-Location }
  "worker" { Push-Location $api; & $py -m app.worker.run; Pop-Location }
  "web"    { Push-Location (Join-Path $root "apps\web"); npm run dev; Pop-Location }
  "dev" {
    Start-Process powershell -ArgumentList "-NoExit", "-File", $PSCommandPath, "api"
    Start-Process powershell -ArgumentList "-NoExit", "-File", $PSCommandPath, "worker"
    & $PSCommandPath web
  }
  "test"   { Push-Location $api; & $py -m pytest; Pop-Location }
  "seed"   { Push-Location $api; & $py -m app.cli seed; Pop-Location }
  "eval"   { & $py (Join-Path $root "eval\run_eval.py") --split dev --methods regex,llm,hybrid }
  default  { throw "Unknown target $Target" }
}
