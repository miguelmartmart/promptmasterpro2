# Guía de Configuración n8n con Neon PostgreSQL

Esta guía detalla cómo configurar n8n para conectarse a tu base de datos Neon PostgreSQL.

## Tabla de Contenidos
1. [Prerrequisitos](#prerrequisitos)
2. [Configuración de Credenciales](#configuración-de-credenciales)
3. [Solución de Problemas](#solución-de-problemas)
4. [Ejemplos de Uso](#ejemplos-de-uso)

## Prerrequisitos

- Instancia de n8n funcionando (cloud o self-hosted)
- Credenciales de acceso a Neon PostgreSQL
- Acceso a internet desde tu instancia n8n

## Configuración de Credenciales

### Paso 1: Crear Nueva Credencial

1. Abre tu instancia de n8n
2. Ve a: **Settings** → **Credentials** → **New Credential**
3. Busca y selecciona: **Postgres**

### Paso 2: Configuración de Conexión Directa

⚠️ **IMPORTANTE**: Neon PostgreSQL NO requiere SSH Tunnel

#### Configuración Correcta:

```
Connection Type: Direct Connection
Host: ep-lucky-leaf-abc8apus-pooler.eu-west-2.aws.neon.tech
Database: neondb
User: neondb_owner
Password: npg_C74UplLehMdV
Port: 5432
```

#### Configuración SSL:
- ✅ **Enable SSL**: Activado (obligatorio)
- ❌ **Ignore SSL Issues**: NO activar (es inseguro)

#### Configuración Avanzada (Opcional):
```
Maximum Number of Connections: 100
Connection Timeout (ms): 10000
```

### Paso 3: Eliminar Configuración SSH Tunnel

Si ves configuración de SSH Tunnel como esta:

```
❌ SSH Tunnel: Enabled
❌ SSH Host: ssh.pythonanywhere.com
❌ SSH Port: 22
❌ SSH User: miguelmartmart
```

**ELIMÍNALA COMPLETAMENTE**. Esta configuración es para otro servicio (PythonAnywhere) y causará errores de conexión.

### Paso 4: Probar la Conexión

1. Haz clic en el botón **"Test Credentials"**
2. Debes ver: ✅ **"Connection successful"**
3. Si falla, consulta la sección de Solución de Problemas

## Solución de Problemas

### Error: "Couldn't connect with these settings"

#### Causa 1: SSH Tunnel Configurado
**Solución**: Elimina toda la configuración de SSH Tunnel. Neon NO lo necesita.

#### Causa 2: SSL Deshabilitado
**Solución**: Asegúrate de que "Enable SSL" esté activado.

#### Causa 3: Host Incorrecto
**Solución**: Verifica que el host sea el endpoint de Neon, no `127.0.0.1` o `localhost`.

```
✅ Correcto: ep-lucky-leaf-abc8apus-pooler.eu-west-2.aws.neon.tech
❌ Incorrecto: 127.0.0.1
❌ Incorrecto: localhost
❌ Incorrecto: ssh.pythonanywhere.com
```

#### Causa 4: Credenciales Incorrectas
**Solución**: Verifica usuario y contraseña en Neon Console.

#### Causa 5: Firewall/Red
**Solución**: Asegúrate de que n8n tiene acceso a internet y puede conectar al puerto 5432.

### Error: "SSL connection required"

**Solución**: Verifica que SSL esté habilitado en la configuración de credenciales.

### Error: "Connection timeout"

**Soluciones**:
1. Verifica tu conexión a internet
2. Aumenta el Connection Timeout a 15000ms (15 segundos)
3. Verifica que el endpoint de Neon esté operativo

## Ejemplos de Uso

### Ejemplo 1: Query Simple

1. Agrega un nodo **Postgres** a tu workflow
2. Selecciona la credencial creada
3. Configura:
   ```
   Operation: Execute Query
   Query: SELECT * FROM playing_with_neon LIMIT 10;
   ```
4. Ejecuta el nodo

**Salida esperada**:
```json
[
  {
    "id": 1,
    "name": "c4ca4238a0",
    "value": 0.5487
  },
  {
    "id": 2,
    "name": "c81e728d9d",
    "value": 0.7293
  }
]
```

### Ejemplo 2: Insert Data

```
Operation: Execute Query
Query: 
INSERT INTO playing_with_neon (name, value) 
VALUES ('test_from_n8n', 0.999)
RETURNING *;
```

### Ejemplo 3: Query Parametrizada

```
Operation: Execute Query
Query: 
SELECT * FROM playing_with_neon 
WHERE value > $1 
ORDER BY value DESC;

Parameters (JSON): ["0.5"]
```

### Ejemplo 4: Join con Transformación

**Workflow sugerido**:
1. **Postgres Node**: Query data
2. **Function Node**: Transform data
3. **HTTP Request Node**: Send to API
4. **Postgres Node**: Update records

**Query inicial**:
```sql
SELECT id, name, value, 
       CASE 
         WHEN value > 0.7 THEN 'high'
         WHEN value > 0.3 THEN 'medium'
         ELSE 'low'
       END as category
FROM playing_with_neon;
```

### Ejemplo 5: Scheduled Backup

**Workflow**:
1. **Cron Node**: Cada día a las 2 AM
2. **Postgres Node**: Export data
   ```sql
   SELECT * FROM playing_with_neon;
   ```
3. **Convert to File Node**: JSON to CSV
4. **Google Drive/Dropbox Node**: Save backup

## Configuración JSON Completa

Para importar en n8n, usa esta configuración:

```json
{
  "credentials": {
    "postgres": {
      "name": "Neon PostgreSQL",
      "data": {
        "host": "ep-lucky-leaf-abc8apus-pooler.eu-west-2.aws.neon.tech",
        "database": "neondb",
        "user": "neondb_owner",
        "password": "npg_C74UplLehMdV",
        "port": 5432,
        "ssl": true,
        "allowUnauthorizedCerts": false,
        "connectionTimeoutMs": 10000,
        "sshTunnel": false
      }
    }
  }
}
```

## Mejores Prácticas

### Seguridad
1. 🔒 **Nunca** compartas credenciales en workflows públicos
2. 🔒 Usa variables de entorno en n8n para passwords
3. 🔒 Rota contraseñas periódicamente

### Performance
1. ⚡ Usa conexiones pooling (automático en Neon)
2. ⚡ Limita resultados con `LIMIT` en queries grandes
3. ⚡ Indexa columnas frecuentemente consultadas

### Mantenimiento
1. 📊 Monitorea uso de conexiones en Neon Console
2. 📊 Revisa logs de errores en n8n
3. 📊 Implementa retry logic para queries críticas

## Workflows de Ejemplo

### Workflow: Sync Data to Google Sheets

```
1. Schedule Trigger (daily)
   ↓
2. Postgres (Query data)
   ↓
3. Google Sheets (Clear & Insert)
```

### Workflow: Process Webhooks to Database

```
1. Webhook (Receive POST)
   ↓
2. Function (Validate & Transform)
   ↓
3. Postgres (Insert data)
   ↓
4. HTTP Response (Send confirmation)
```

### Workflow: Database Monitor & Alert

```
1. Schedule Trigger (every 5 minutes)
   ↓
2. Postgres (Check health)
   ↓
3. IF (anomaly detected)
   ↓
4. Slack/Email (Send alert)
```

## Recursos Adicionales

- [n8n Postgres Node Docs](https://docs.n8n.io/integrations/builtin/app-nodes/n8n-nodes-base.postgres/)
- [Neon Documentation](https://neon.tech/docs)
- [n8n Community Forum](https://community.n8n.io/)

## Soporte

Si tienes problemas:
1. Verifica la [documentación oficial de Neon](https://neon.tech/docs)
2. Consulta el [foro de n8n](https://community.n8n.io/)
3. Revisa los logs en Neon Console → Monitoring
