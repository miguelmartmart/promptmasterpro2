# 🚀 Guía Rápida: Conectar n8n con Neon PostgreSQL

## ✅ Paso 1: Abrir n8n y Crear Credencial

1. Abre tu n8n en el navegador
2. Haz clic en **"Settings"** (⚙️ arriba a la derecha)
3. Selecciona **"Credentials"** en el menú lateral
4. Haz clic en **"+ New Credential"**
5. Busca y selecciona **"Postgres"**

---

## ✅ Paso 2: Configurar la Conexión

### ⚠️ IMPORTANTE: NO uses SSH Tunnel con Neon

Completa SOLO estos campos:

```
┌─────────────────────────────────────────────────────────────┐
│ Connection Type: Standard                                    │
├─────────────────────────────────────────────────────────────┤
│ Host: ep-lucky-leaf-abc8apus-pooler.eu-west-2.aws.neon.tech│
│ Database: neondb                                             │
│ User: neondb_owner                                           │
│ Password: npg_C74UplLehMdV                                   │
│ Port: 5432                                                   │
├─────────────────────────────────────────────────────────────┤
│ ☑️ Enable SSL (OBLIGATORIO)                                  │
│ ☐ Ignore SSL Issues (NO MARCAR)                            │
├─────────────────────────────────────────────────────────────┤
│ Maximum Connections: 100                                     │
│ Connection Timeout: 10000                                    │
└─────────────────────────────────────────────────────────────┘
```

### 🔴 ELIMINAR estas configuraciones si aparecen:

```
❌ SSH Tunnel: NO ACTIVAR
❌ SSH Host: (dejar vacío)
❌ SSH Port: (dejar vacío)
❌ SSH User: (dejar vacío)
❌ SSH Password: (dejar vacío)
```

**¿Por qué?** Neon ya tiene SSL/TLS integrado, NO necesita SSH Tunnel.

---

## ✅ Paso 3: Probar la Conexión

1. Haz clic en el botón **"Test Credentials"** (abajo)
2. Debe aparecer: ✅ **"Connection successful"**

### 🔴 Si aparece error:

**Error: "Couldn't connect with these settings"**

Verifica:
- ☑️ ¿SSL está activado?
- ☑️ ¿SSH Tunnel está DESACTIVADO?
- ☑️ ¿El host es el correcto? (debe ser `ep-lucky-leaf-abc8apus-pooler...`)
- ☑️ ¿Las credenciales son correctas?

---

## ✅ Paso 4: Guardar la Credencial

1. Dale un nombre: **"Neon PostgreSQL"** o **"Base de Datos Principal"**
2. Haz clic en **"Save"**

---

## ✅ Paso 5: Usar en un Workflow

### Crear tu primer workflow con la base de datos:

1. **Crear nuevo workflow**
   - Haz clic en **"+ New Workflow"**

2. **Agregar nodo Manual Trigger**
   - Arrastra o busca **"Manual Trigger"**

3. **Agregar nodo Postgres**
   - Haz clic en **"+"** después del trigger
   - Busca **"Postgres"**
   - Selecciónalo

4. **Configurar el nodo Postgres:**

   ```
   Credential: Neon PostgreSQL (la que creaste)
   Operation: Execute Query
   Query: SELECT * FROM playing_with_neon LIMIT 5;
   ```

5. **Ejecutar**
   - Haz clic en **"Execute Node"** (o "Test workflow")
   - Debes ver los resultados de la base de datos

---

## 📋 Valores de Configuración Rápidos (Copia y Pega)

Para tu base de datos Neon:

| Campo | Valor |
|-------|-------|
| **Host** | `ep-lucky-leaf-abc8apus-pooler.eu-west-2.aws.neon.tech` |
| **Database** | `neondb` |
| **User** | `neondb_owner` |
| **Password** | `npg_C74UplLehMdV` |
| **Port** | `5432` |
| **SSL** | ✅ Activado |
| **SSH Tunnel** | ❌ Desactivado |

---

## 🎯 Ejemplo: Query Simple

```sql
-- Ver todos los datos
SELECT * FROM playing_with_neon;

-- Ver solo 5 registros
SELECT * FROM playing_with_neon LIMIT 5;

-- Filtrar por valor
SELECT * FROM playing_with_neon WHERE value > 0.5;

-- Contar registros
SELECT COUNT(*) as total FROM playing_with_neon;
```

---

## 🎯 Ejemplo: Insertar Datos desde n8n

**Workflow:**
1. Manual Trigger
2. Set Node (define los datos)
3. Postgres Node (inserta)

**Configuración del Postgres Node:**

```
Operation: Execute Query
Query: 
INSERT INTO playing_with_neon (name, value)
VALUES ($1, $2)
RETURNING *;

Query Parameters: 
{
  "bindings": [
    "{{ $json.name }}",
    "{{ $json.value }}"
  ]
}
```

---

## 🎯 Ejemplo: Automatización Diaria

**Workflow que se ejecuta cada día:**

1. **Cron Node**
   ```
   Mode: Every Day
   Hour: 9
   Minute: 0
   ```

2. **Postgres Node**
   ```
   Query: 
   SELECT COUNT(*) as total, 
          AVG(value) as average 
   FROM playing_with_neon;
   ```

3. **Email Node** (opcional)
   - Envía los resultados por email

---

## ❓ Preguntas Frecuentes

### ¿Necesito instalar algo en mi computadora?
No, n8n se conecta directamente por internet.

### ¿Es segura la conexión?
Sí, usa SSL/TLS automáticamente (por eso marcamos "Enable SSL").

### ¿Qué es SSH Tunnel y por qué NO lo uso?
SSH Tunnel es para bases de datos en redes privadas. Neon ya está en internet de forma segura, no lo necesitas.

### ¿Puedo usar esto con n8n Cloud?
Sí, funciona igual en n8n Cloud y n8n self-hosted.

### ¿Cómo obtengo mis propias credenciales?
Las credenciales mostradas son de ejemplo. Obtén las tuyas en:
1. Abre [Neon Console](https://console.neon.tech)
2. Selecciona tu proyecto
3. Ve a **Dashboard** → **Connection Details**

---

## 🆘 Solución de Problemas

### ⚠️ "Couldn't connect with these settings" (Error más común)

Si ves este error después de configurar todo correctamente, prueba estas soluciones **EN ESTE ORDEN**:

#### Solución 1: Verificar configuración básica
- ✅ Host correcto: `ep-lucky-leaf-abc8apus-pooler.eu-west-2.aws.neon.tech`
- ✅ Puerto: `5432`
- ✅ Database: `neondb`
- ✅ User: `neondb_owner`
- ✅ Password correcta (sin espacios extra)
- ❌ SSH Tunnel: DESACTIVADO (debe estar sin marcar)

#### Solución 2: Probar con "Ignore SSL Issues"
A veces, dependiendo de la versión de n8n o la configuración de red, es necesario activar temporalmente esta opción:

1. Marca **☑️ Ignore SSL Issues (Insecure)**
2. Haz clic en **"Test Credential"**
3. Si funciona ✅, guarda la credencial así

**Nota:** Aunque dice "Insecure", la conexión sigue siendo segura porque Neon usa SSL/TLS. Esta opción solo omite la verificación del certificado, no desactiva el cifrado.

#### Solución 3: Verificar configuración SSL
Si la Solución 2 no funciona, intenta estas combinaciones:

**Opción A** (más común):
```
☑️ Enable SSL
☑️ Ignore SSL Issues
```

**Opción B** (alternativa):
```
☐ Enable SSL (desactivado)
☐ Ignore SSL Issues (desactivado)
```

#### Solución 4: Aumentar timeout
- Connection Timeout: `15000` (15 segundos)
- Vuelve a probar

#### Solución 5: Verificar desde consola
Prueba conectar desde otro lugar para confirmar que las credenciales funcionan:

```bash
# Desde terminal Linux/Mac/Windows (con psql instalado)
psql '******ep-lucky-leaf-abc8apus-pooler.eu-west-2.aws.neon.tech/neondb?sslmode=require'
```

Si esto funciona pero n8n no, el problema es específico de n8n.

#### Solución 6: Usar connection string directa (n8n Cloud/Enterprise)
En lugar de campos separados, algunas versiones de n8n permiten usar connection string:

```
postgresql://neondb_owner:npg_C74UplLehMdV@ep-lucky-leaf-abc8apus-pooler.eu-west-2.aws.neon.tech:5432/neondb?sslmode=require
```

### "Connection timeout"
- Verifica tu conexión a internet
- Aumenta Connection Timeout a 15000ms
- Verifica que tu firewall no bloquee el puerto 5432

### "SSL connection required"
- Asegúrate de marcar "Enable SSL"
- Si no funciona, prueba con "Ignore SSL Issues" activado

### "Authentication failed"
- Verifica usuario y password
- Copia y pega desde Neon Console para evitar errores
- Asegúrate de no tener espacios antes/después del password

### "Host not found"
- Verifica que el host sea exactamente el de Neon
- No uses `localhost` ni `127.0.0.1`
- Verifica que tengas acceso a internet

### "No testing function found for this credential"
- Este mensaje es normal en algunas versiones de n8n
- Ignora este mensaje y prueba usar la credencial en un workflow
- Si el workflow funciona, la credencial está bien configurada

---

## 📚 Recursos Adicionales

- [Documentación completa de n8n](./n8n-setup.md)
- [Guía de conexión desde PowerShell](./database-setup.md)
- [Documentación oficial de n8n](https://docs.n8n.io/)
- [Documentación de Neon](https://neon.tech/docs)

---

## ✅ Checklist de Verificación

Antes de cerrar esta guía, verifica:

- [ ] Credencial creada con nombre descriptivo
- [ ] SSL activado
- [ ] SSH Tunnel desactivado
- [ ] Test de conexión exitoso (✅ Connection successful)
- [ ] Primer workflow creado y ejecutado
- [ ] Puedes ver datos de la tabla `playing_with_neon`

**¡Listo! Ya tienes n8n conectado a tu base de datos Neon PostgreSQL.** 🎉
