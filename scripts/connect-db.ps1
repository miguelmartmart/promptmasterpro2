# PowerShell Script para Conectar a Neon PostgreSQL
# Uso: .\scripts\connect-db.ps1

<#
.SYNOPSIS
    Script para conectar a la base de datos PostgreSQL en Neon
.DESCRIPTION
    Este script configura las variables de entorno necesarias y conecta a la base de datos
    usando psql. Asegúrate de tener PostgreSQL Client Tools instalado.
.EXAMPLE
    .\scripts\connect-db.ps1
#>

# Colores para output
function Write-ColorOutput($ForegroundColor) {
    $fc = $host.UI.RawUI.ForegroundColor
    $host.UI.RawUI.ForegroundColor = $ForegroundColor
    if ($args) {
        Write-Output $args
    }
    $host.UI.RawUI.ForegroundColor = $fc
}

Write-ColorOutput Green "====================================="
Write-ColorOutput Green "  Neon PostgreSQL Connection Script  "
Write-ColorOutput Green "====================================="
Write-Output ""

# Verificar que psql está instalado
$psqlPath = Get-Command psql -ErrorAction SilentlyContinue
if (-not $psqlPath) {
    Write-ColorOutput Red "❌ Error: psql no está instalado o no está en el PATH"
    Write-Output ""
    Write-Output "Para instalar PostgreSQL Client Tools:"
    Write-Output "1. Visita: https://www.postgresql.org/download/windows/"
    Write-Output "2. O usa Chocolatey: choco install postgresql"
    Write-Output ""
    exit 1
}

Write-ColorOutput Green "✓ psql encontrado en: $($psqlPath.Source)"
Write-Output ""

# Leer credenciales del archivo .env.local si existe
$envFile = Join-Path $PSScriptRoot ".." ".env.local"
$connectionString = $null

if (Test-Path $envFile) {
    Write-Output "📄 Leyendo configuración de .env.local..."
    $envContent = Get-Content $envFile
    foreach ($line in $envContent) {
        if ($line -match '^DATABASE_URL="?([^"]+)"?') {
            $connectionString = $matches[1]
            break
        }
    }
}

# Si no se encuentra en .env.local, usar valores por defecto
if (-not $connectionString) {
    Write-ColorOutput Yellow "⚠️  No se encontró DATABASE_URL en .env.local"
    Write-Output "Usando valores de ejemplo. Actualiza con tus credenciales reales."
    Write-Output ""
    
    # Valores de ejemplo (CAMBIAR por los reales)
    $host = "ep-lucky-leaf-abc8apus-pooler.eu-west-2.aws.neon.tech"
    $database = "neondb"
    $user = "neondb_owner"
    $password = "npg_C74UplLehMdV"
    
    $connectionString = "postgresql://${user}:${password}@${host}/${database}?sslmode=require&channel_binding=require"
}

Write-Output "🔌 Conectando a la base de datos..."
Write-Output ""

# Intentar conexión
try {
    # Ejecutar psql con el connection string
    & psql $connectionString
} catch {
    Write-ColorOutput Red "❌ Error al conectar a la base de datos"
    Write-Output $_.Exception.Message
    Write-Output ""
    Write-Output "Verifica:"
    Write-Output "1. Las credenciales son correctas"
    Write-Output "2. Tienes acceso a internet"
    Write-Output "3. El firewall no bloquea la conexión"
    exit 1
}
