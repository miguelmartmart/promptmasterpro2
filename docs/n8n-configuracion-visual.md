# 📸 Configuración Visual de n8n con Neon PostgreSQL

## 🎯 Configuración Correcta vs Incorrecta

### ✅ CONFIGURACIÓN CORRECTA

```
╔════════════════════════════════════════════════════════╗
║          n8n - PostgreSQL Credential                   ║
╠════════════════════════════════════════════════════════╣
║                                                        ║
║  Credential Name: Neon PostgreSQL                      ║
║                                                        ║
║  ┌──────────────────────────────────────────────┐    ║
║  │ Connection                                    │    ║
║  ├──────────────────────────────────────────────┤    ║
║  │ Host                                          │    ║
║  │ ep-lucky-leaf-abc8apus-pooler...neon.tech   │    ║
║  │                                               │    ║
║  │ Database                                      │    ║
║  │ neondb                                        │    ║
║  │                                               │    ║
║  │ User                                          │    ║
║  │ neondb_owner                                  │    ║
║  │                                               │    ║
║  │ Password                                      │    ║
║  │ ••••••••••••••••••••                         │    ║
║  │                                               │    ║
║  │ Port                                          │    ║
║  │ 5432                                          │    ║
║  └──────────────────────────────────────────────┘    ║
║                                                        ║
║  ┌──────────────────────────────────────────────┐    ║
║  │ SSL Options                                   │    ║
║  ├──────────────────────────────────────────────┤    ║
║  │ ☑️ Enable SSL                                 │    ║
║  │ ☐ Ignore SSL Issues                          │    ║
║  └──────────────────────────────────────────────┘    ║
║                                                        ║
║  ┌──────────────────────────────────────────────┐    ║
║  │ SSH Tunnel                                    │    ║
║  ├──────────────────────────────────────────────┤    ║
║  │ ☐ Use SSH Tunnel (DESACTIVADO)               │    ║
║  └──────────────────────────────────────────────┘    ║
║                                                        ║
║  [Test Credential]  [Save]                            ║
║                                                        ║
║  ✅ Connection successful                              ║
║                                                        ║
╚════════════════════════════════════════════════════════╝
```

---

### ✅ CONFIGURACIÓN ALTERNATIVA (Si la primera no funciona)

```
╔════════════════════════════════════════════════════════╗
║          n8n - PostgreSQL Credential                   ║
╠════════════════════════════════════════════════════════╣
║                                                        ║
║  Credential Name: Neon PostgreSQL                      ║
║                                                        ║
║  ┌──────────────────────────────────────────────┐    ║
║  │ Connection                                    │    ║
║  ├──────────────────────────────────────────────┤    ║
║  │ Host                                          │    ║
║  │ ep-lucky-leaf-abc8apus-pooler...neon.tech   │    ║
║  │                                               │    ║
║  │ Database                                      │    ║
║  │ neondb                                        │    ║
║  │                                               │    ║
║  │ User                                          │    ║
║  │ neondb_owner                                  │    ║
║  │                                               │    ║
║  │ Password                                      │    ║
║  │ ••••••••••••••••••••                         │    ║
║  │                                               │    ║
║  │ Port                                          │    ║
║  │ 5432                                          │    ║
║  └──────────────────────────────────────────────┘    ║
║                                                        ║
║  ┌──────────────────────────────────────────────┐    ║
║  │ SSL Options                                   │    ║
║  ├──────────────────────────────────────────────┤    ║
║  │ ☑️ Enable SSL                                 │    ║
║  │ ☑️ Ignore SSL Issues  ⬅️ ACTIVADO            │    ║
║  └──────────────────────────────────────────────┘    ║
║                                                        ║
║  ┌──────────────────────────────────────────────┐    ║
║  │ SSH Tunnel                                    │    ║
║  ├──────────────────────────────────────────────┤    ║
║  │ ☐ Use SSH Tunnel (DESACTIVADO)               │    ║
║  └──────────────────────────────────────────────┘    ║
║                                                        ║
║  [Test Credential]  [Save]                            ║
║                                                        ║
║  ✅ Connection successful                              ║
║                                                        ║
╚════════════════════════════════════════════════════════╝
```

**💡 Nota importante:**
- "Ignore SSL Issues" NO desactiva el cifrado SSL/TLS
- Solo omite la verificación del certificado
- La conexión sigue siendo segura y cifrada
- Esto es necesario en algunas versiones de n8n

---

### ❌ CONFIGURACIÓN INCORRECTA (No usar)

```
╔════════════════════════════════════════════════════════╗
║          n8n - PostgreSQL Credential                   ║
╠════════════════════════════════════════════════════════╣
║                                                        ║
║  ┌──────────────────────────────────────────────┐    ║
║  │ Connection                                    │    ║
║  ├──────────────────────────────────────────────┤    ║
║  │ Host                                          │    ║
║  │ 127.0.0.1  ❌ INCORRECTO                     │    ║
║  │                                               │    ║
║  │ Database                                      │    ║
║  │ miguelmartmart$jddc_test  ❌ INCORRECTO      │    ║
║  └──────────────────────────────────────────────┘    ║
║                                                        ║
║  ┌──────────────────────────────────────────────┐    ║
║  │ SSH Tunnel                                    │    ║
║  ├──────────────────────────────────────────────┤    ║
║  │ ☑️ Use SSH Tunnel  ❌ NO ACTIVAR              │    ║
║  │                                               │    ║
║  │ SSH Host                                      │    ║
║  │ ssh.pythonanywhere.com  ❌ INCORRECTO        │    ║
║  │                                               │    ║
║  │ SSH Port: 22                                  │    ║
║  │ SSH User: miguelmartmart                      │    ║
║  └──────────────────────────────────────────────┘    ║
║                                                        ║
║  ❌ Couldn't connect with these settings              ║
║                                                        ║
╚════════════════════════════════════════════════════════╝
```

**⚠️ Esta configuración es para PythonAnywhere, NO para Neon!**

---

## 🔄 Flujo de Conexión

```
┌─────────────┐                    ┌──────────────┐
│             │   Internet         │              │
│     n8n     │ ══════════════════>│ Neon Cloud   │
│             │   SSL/TLS          │  PostgreSQL  │
│             │   (Puerto 5432)    │              │
└─────────────┘                    └──────────────┘
     ✅ Conexión Directa
     ✅ Cifrado SSL
     ✅ Sin SSH Tunnel
```

---

## 📝 Datos a Copiar y Pegar

### Para la configuración de n8n:

**Host:**
```
ep-lucky-leaf-abc8apus-pooler.eu-west-2.aws.neon.tech
```

**Database:**
```
neondb
```

**User:**
```
neondb_owner
```

**Password:**
```
npg_C74UplLehMdV
```

**Port:**
```
5432
```

---

## 🎬 Pasos con Capturas de Pantalla (Descripción)

### Paso 1: Abrir Credentials
![Paso 1](descripción: Haz clic en Settings → Credentials)
- En la esquina superior derecha, icono de engranaje
- Selecciona "Credentials" del menú

### Paso 2: Nueva Credencial
![Paso 2](descripción: Busca "Postgres")
- Botón "+ New Credential"
- Busca "Postgres" en el buscador
- Selecciona "Postgres"

### Paso 3: Completar Formulario
![Paso 3](descripción: Completa los campos)
- Host: pega el endpoint de Neon
- Database: neondb
- User: neondb_owner
- Password: tu contraseña
- Port: 5432

### Paso 4: Activar SSL
![Paso 4](descripción: Marca Enable SSL)
- Scroll hacia abajo
- ☑️ Marca "Enable SSL"
- ☐ NO marques "Ignore SSL Issues"

### Paso 5: NO activar SSH Tunnel
![Paso 5](descripción: SSH Tunnel debe estar desactivado)
- Scroll hacia abajo más
- ☐ "Use SSH Tunnel" debe estar DESMARCADO
- Si está marcado, desmárcalo

### Paso 6: Probar Conexión
![Paso 6](descripción: Test Credential exitoso)
- Botón "Test Credential" en la parte inferior
- Debe mostrar: ✅ "Connection successful"

### Paso 7: Guardar
![Paso 7](descripción: Guarda la credencial)
- Botón "Save"
- Dale un nombre descriptivo

---

## 🧪 Probar la Conexión en Workflow

### Workflow de Prueba Simple:

```
┌─────────────────┐     ┌─────────────────┐
│ Manual Trigger  │────>│   Postgres      │
│                 │     │   SELECT *      │
│  Click here     │     │   FROM table    │
└─────────────────┘     └─────────────────┘
```

### Query de Prueba:

```sql
SELECT * FROM playing_with_neon LIMIT 5;
```

### Resultado Esperado:

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

---

## 🚨 Errores Comunes y Soluciones

### Error 1: "Couldn't connect with these settings"

```
Causa: SSH Tunnel activado
Solución: 
1. Ve a la configuración de la credencial
2. Busca "SSH Tunnel"
3. ☐ Desmarca "Use SSH Tunnel"
4. Guarda y prueba de nuevo
```

### Error 2: "SSL connection required"

```
Causa: SSL desactivado
Solución:
1. Ve a la configuración de la credencial
2. Busca "SSL Options"
3. ☑️ Marca "Enable SSL"
4. Guarda y prueba de nuevo
```

### Error 3: "Host not found"

```
Causa: Host incorrecto (probablemente 127.0.0.1 o localhost)
Solución:
1. Copia el host correcto de arriba
2. Pega en el campo Host
3. Debe ser: ep-lucky-leaf-abc8apus-pooler...
```

---

## 📊 Comparación: Neon vs PythonAnywhere

| Característica | Neon PostgreSQL | PythonAnywhere |
|----------------|-----------------|----------------|
| **Host** | `ep-lucky-leaf...neon.tech` | `ssh.pythonanywhere.com` |
| **Puerto** | 5432 (PostgreSQL) | 22 (SSH) |
| **SSL/TLS** | ✅ Directo | ❌ Requiere SSH Tunnel |
| **SSH Tunnel** | ❌ NO necesario | ✅ Requerido |
| **Conexión** | Directa por internet | A través de túnel SSH |

**Tu base de datos es Neon, no PythonAnywhere.**

---

## ✅ Checklist Final

Marca cada item cuando lo completes:

- [ ] Abrí n8n en mi navegador
- [ ] Creé nueva credencial Postgres
- [ ] Copié y pegué el Host correcto de Neon
- [ ] Usé database: `neondb`
- [ ] Usé user: `neondb_owner`
- [ ] Puse mi contraseña
- [ ] Puerto es 5432
- [ ] SSL está ACTIVADO ☑️
- [ ] SSH Tunnel está DESACTIVADO ☐
- [ ] Probé la conexión - ✅ exitosa
- [ ] Guardé la credencial
- [ ] Creé un workflow de prueba
- [ ] Ejecuté un SELECT y vi resultados

---

## 🎉 ¡Éxito!

Si completaste todos los checks, tu n8n está conectado correctamente a Neon PostgreSQL.

**Siguiente paso:** Explora los ejemplos en [n8n-setup.md](./n8n-setup.md) para crear workflows más avanzados.
