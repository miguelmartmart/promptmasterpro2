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

### "Connection timeout"
- Verifica tu conexión a internet
- Aumenta Connection Timeout a 15000ms

### "SSL connection required"
- Asegúrate de marcar "Enable SSL"

### "Authentication failed"
- Verifica usuario y password
- Copia y pega desde Neon Console para evitar errores

### "Host not found"
- Verifica que el host sea exactamente el de Neon
- No uses `localhost` ni `127.0.0.1`

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
