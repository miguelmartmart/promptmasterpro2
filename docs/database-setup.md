# Configuración de Base de Datos PostgreSQL (Neon)

Este documento describe cómo conectarse a la base de datos PostgreSQL alojada en Neon desde diferentes entornos.

## Información de Conexión

### Credenciales de Neon
- **Host**: `ep-lucky-leaf-abc8apus-pooler.eu-west-2.aws.neon.tech`
- **Database**: `neondb`
- **User**: `neondb_owner`
- **Password**: `npg_C74UplLehMdV` (cambiar por tu contraseña real)
- **Puerto**: `5432` (predeterminado)
- **SSL Mode**: `require`
- **Channel Binding**: `require`

### Connection String Completa
```
postgresql://neondb_owner:npg_C74UplLehMdV@ep-lucky-leaf-abc8apus-pooler.eu-west-2.aws.neon.tech/neondb?sslmode=require&channel_binding=require
```

## 1. Conexión desde PowerShell (Windows)

### Requisitos Previos
1. Instalar PostgreSQL Client Tools (incluye `psql`)
   - Descargar desde: https://www.postgresql.org/download/windows/
   - O instalar solo el cliente usando Chocolatey: `choco install postgresql --params '/Password:tupassword'`

### Pasos para Conectar

#### Opción 1: Usando Connection String completa
```powershell
psql 'postgresql://neondb_owner:npg_C74UplLehMdV@ep-lucky-leaf-abc8apus-pooler.eu-west-2.aws.neon.tech/neondb?sslmode=require&channel_binding=require'
```

#### Opción 2: Usando parámetros individuales
```powershell
psql -h ep-lucky-leaf-abc8apus-pooler.eu-west-2.aws.neon.tech `
     -p 5432 `
     -U neondb_owner `
     -d neondb `
     --set=sslmode=require
```
*Nota: Te pedirá la contraseña interactivamente*

#### Opción 3: Usando variables de entorno
```powershell
$env:PGHOST="ep-lucky-leaf-abc8apus-pooler.eu-west-2.aws.neon.tech"
$env:PGPORT="5432"
$env:PGDATABASE="neondb"
$env:PGUSER="neondb_owner"
$env:PGPASSWORD="npg_C74UplLehMdV"
$env:PGSSLMODE="require"

psql
```

### Comandos Útiles en psql
```sql
-- Listar todas las bases de datos
\l

-- Listar todas las tablas
\dt

-- Describir una tabla
\d nombre_tabla

-- Ver la versión de PostgreSQL
SELECT version();

-- Salir de psql
\q
```

### Solución de Problemas (Windows)

**Error: "psql no se reconoce como comando"**
- Agregar PostgreSQL bin folder al PATH:
  ```powershell
  $env:Path += ";C:\Program Files\PostgreSQL\16\bin"
  ```
  O permanentemente desde: Panel de Control → Sistema → Variables de entorno

**Error de SSL/TLS**
- Asegúrate de usar `sslmode=require`
- Verifica que tu versión de psql soporte TLS 1.3

## 2. Conexión desde n8n

n8n es una herramienta de automatización de flujos de trabajo. Para conectar n8n a la base de datos Neon PostgreSQL:

### Configuración en n8n

1. **Crear nueva credencial PostgreSQL**
   - En n8n, ve a: Credentials → New Credential → Postgres

2. **Configuración de Conexión Directa** (Recomendado para Neon)

   ```
   Host: ep-lucky-leaf-abc8apus-pooler.eu-west-2.aws.neon.tech
   Database: neondb
   User: neondb_owner
   Password: npg_C74UplLehMdV
   Port: 5432
   SSL: Enabled (requerido)
   ```

   **Configuración SSL/TLS:**
   - ✅ Marcar "Use SSL"
   - ❌ NO marcar "Ignore SSL Issues" (esto es inseguro)
   - Dejar los campos de certificados vacíos (Neon usa certificados públicos válidos)

3. **Configuración Avanzada** (Opcional)
   - Maximum Number of Connections: `100` (o ajustar según necesidad)
   - Connection Timeout: `10000` (10 segundos)

### ⚠️ Importante: No usar SSH Tunnel para Neon

**Neon PostgreSQL NO requiere SSH Tunnel** porque:
- Ya proporciona conexión SSL/TLS segura directa
- El endpoint está expuesto de forma segura en internet
- SSH Tunnel solo es necesario para bases de datos sin SSL o en redes privadas

**Configuración INCORRECTA (no usar):**
```
❌ SSH Tunnel: Habilitado
❌ SSH Host: ssh.pythonanywhere.com
❌ SSH Port: 22
❌ SSH User: miguelmartmart
```

Esta configuración es para PythonAnywhere, NO para Neon. Elimínala.

### Configuración Correcta para n8n + Neon

```json
{
  "host": "ep-lucky-leaf-abc8apus-pooler.eu-west-2.aws.neon.tech",
  "database": "neondb",
  "user": "neondb_owner",
  "password": "npg_C74UplLehMdV",
  "port": 5432,
  "ssl": true,
  "allowUnauthorizedCerts": false,
  "connectionTimeoutMs": 10000
}
```

### Probar la Conexión en n8n

1. Después de configurar las credenciales, haz clic en "Test Credentials"
2. Debe mostrar: ✅ "Connection successful"
3. Si falla, verifica:
   - Las credenciales están correctas
   - SSL está habilitado
   - No hay SSH Tunnel configurado
   - Tu instancia de n8n tiene acceso a internet

### Ejemplo de Nodo PostgreSQL en n8n

1. Agregar nodo "Postgres"
2. Seleccionar la credencial creada
3. Configurar operación:
   ```
   Operation: Execute Query
   Query: SELECT * FROM playing_with_neon LIMIT 10;
   ```

## 3. Configuración en la Aplicación Next.js

### Instalar Dependencias

```bash
npm install pg
npm install --save-dev @types/pg
```

### Variables de Entorno (.env.local)

Crear archivo `.env.local` en la raíz del proyecto:

```env
# Neon PostgreSQL Database
DATABASE_URL="postgresql://neondb_owner:npg_C74UplLehMdV@ep-lucky-leaf-abc8apus-pooler.eu-west-2.aws.neon.tech/neondb?sslmode=require"
POSTGRES_PRISMA_URL="postgresql://neondb_owner:npg_C74UplLehMdV@ep-lucky-leaf-abc8apus-pooler.eu-west-2.aws.neon.tech/neondb?sslmode=require&pgbouncer=true&connect_timeout=15"
POSTGRES_URL_NON_POOLING="postgresql://neondb_owner:npg_C74UplLehMdV@ep-lucky-leaf-abc8apus-pooler.eu-west-2.aws.neon.tech/neondb?sslmode=require"

# Stack Auth (integrado con Neon)
STACK_AUTH_PROJECT_ID="bea8c741-74de-460a-af36-e771ef0eb5eb"
STACK_AUTH_JWKS_URL="https://api.stack-auth.com/api/v1/projects/bea8c741-74de-460a-af36-e771ef0eb5eb/.well-known/jwks.json"
```

### Crear Cliente de Base de Datos

Archivo: `src/lib/db.ts`

```typescript
import { Pool } from 'pg';

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: {
    rejectUnauthorized: true
  },
  max: 20,
  idleTimeoutMillis: 30000,
  connectionTimeoutMillis: 10000,
});

export async function query(text: string, params?: any[]) {
  const start = Date.now();
  const res = await pool.query(text, params);
  const duration = Date.now() - start;
  console.log('Executed query', { text, duration, rows: res.rowCount });
  return res;
}

export async function getClient() {
  const client = await pool.connect();
  return client;
}

export default pool;
```

### Ejemplo de Uso en API Route

Archivo: `src/app/api/prompts/route.ts`

```typescript
import { NextResponse } from 'next/server';
import { query } from '@/lib/db';

export async function GET() {
  try {
    const result = await query('SELECT * FROM playing_with_neon LIMIT 10');
    return NextResponse.json({ prompts: result.rows });
  } catch (error) {
    console.error('Database error:', error);
    return NextResponse.json(
      { error: 'Failed to fetch prompts' },
      { status: 500 }
    );
  }
}
```

## 4. Seguridad y Mejores Prácticas

### Protección de Credenciales

1. **Nunca** commitees archivos `.env` al repositorio
2. Usa `.env.local` para desarrollo local
3. Configura variables de entorno en tu plataforma de hosting (Vercel, etc.)

### Gestión de Secretos

```bash
# Para Vercel
vercel env add DATABASE_URL

# Para otros hosts, usa su panel de configuración
```

### Rotación de Contraseñas

1. Ve a Neon Console → Settings → Connection Details
2. Regenera la contraseña si es necesario
3. Actualiza todas las configuraciones (PowerShell, n8n, app)

### Monitoreo

- Monitorea el uso de conexiones en Neon Dashboard
- Configura alertas para límites de conexión
- Revisa logs de queries lentas

## 5. Inicialización de Base de Datos

### Script de Prueba

```sql
-- Crear tabla de ejemplo (ya incluida en Neon)
CREATE TABLE IF NOT EXISTS playing_with_neon(
  id SERIAL PRIMARY KEY,
  name TEXT NOT NULL,
  value REAL
);

-- Insertar datos de prueba
INSERT INTO playing_with_neon(name, value)
  SELECT LEFT(md5(i::TEXT), 10), random()
  FROM generate_series(1, 10) s(i);

-- Verificar
SELECT * FROM playing_with_neon;
```

### Ejecutar desde PowerShell

```powershell
# Guardar script en archivo
$script = @"
SELECT * FROM playing_with_neon;
"@
$script | Out-File -FilePath test.sql -Encoding UTF8

# Ejecutar
psql 'postgresql://neondb_owner:npg_C74UplLehMdV@ep-lucky-leaf-abc8apus-pooler.eu-west-2.aws.neon.tech/neondb?sslmode=require&channel_binding=require' -f test.sql
```

## Recursos Adicionales

- [Documentación de Neon](https://neon.tech/docs)
- [PostgreSQL Documentation](https://www.postgresql.org/docs/)
- [n8n Postgres Node](https://docs.n8n.io/integrations/builtin/app-nodes/n8n-nodes-base.postgres/)
- [Node.js pg Library](https://node-postgres.com/)

## Solución de Problemas Comunes

### Error: "Connection timeout"
- Verifica tu conexión a internet
- Comprueba que el endpoint de Neon esté accesible
- Revisa configuración de firewall/proxy

### Error: "SSL connection required"
- Asegúrate de incluir `sslmode=require` en connection string
- Verifica que el cliente soporte SSL/TLS

### Error: "Password authentication failed"
- Verifica que las credenciales sean correctas
- Regenera la contraseña en Neon Console si es necesario

### Error en n8n: "Couldn't connect with these settings"
- **Elimina** cualquier configuración de SSH Tunnel
- Verifica que SSL esté habilitado
- Asegúrate de usar el hostname correcto de Neon (no 127.0.0.1 o localhost)
