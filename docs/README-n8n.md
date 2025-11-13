# 🎯 Cómo Configurar n8n con tu Base de Datos Neon PostgreSQL

## 📋 Resumen Ejecutivo de 3 Minutos

### ¿Qué necesitas?
1. Acceso a n8n (cloud o self-hosted)
2. Las credenciales de tu base de datos Neon

### ¿Qué NO necesitas?
❌ SSH Tunnel (Neon ya tiene SSL/TLS)
❌ PythonAnywhere (eso es otro servicio)
❌ Configuración especial de firewall

---

## 🚀 Configuración en 5 Pasos

### 1️⃣ Abre n8n
- Ve a tu n8n en el navegador
- Haz clic en **Settings** (⚙️)

### 2️⃣ Crea Credencial
- **Credentials** → **+ New Credential**
- Busca y selecciona: **"Postgres"**

### 3️⃣ Completa SOLO estos campos

```
Host: ep-lucky-leaf-abc8apus-pooler.eu-west-2.aws.neon.tech
Database: neondb
User: neondb_owner
Password: npg_C74UplLehMdV
Port: 5432

☑️ Enable SSL
☐ SSH Tunnel (NO ACTIVAR)
```

### 4️⃣ Prueba la Conexión
- Botón **"Test Credential"**
- Debe decir: ✅ **"Connection successful"**

### 5️⃣ ¡Listo! Úsalo en tu workflow
```sql
SELECT * FROM playing_with_neon LIMIT 5;
```

---

## 📚 Guías Detalladas

### Para principiantes:
👉 **[Guía Rápida](./n8n-guia-rapida.md)** - Paso a paso con explicaciones

### Para visuales:
👉 **[Configuración Visual](./n8n-configuracion-visual.md)** - Diagramas y comparaciones

### Para avanzados:
👉 **[Guía Completa](./n8n-setup.md)** - Workflows y ejemplos complejos

### Para desarrolladores:
👉 **[Database Setup](./database-setup.md)** - PowerShell, API, y Next.js

---

## ❓ FAQ Rápido

**P: ¿Por qué me dice "Couldn't connect"?**
R: Probablemente tienes SSH Tunnel activado. Desactívalo.

**P: ¿Necesito SSH Tunnel?**
R: NO. Neon ya tiene SSL/TLS directo.

**P: ¿Qué es PythonAnywhere?**
R: Otro servicio diferente. No lo necesitas para Neon.

**P: ¿Es seguro sin SSH?**
R: Sí, Neon usa SSL/TLS (cifrado de grado empresarial).

**P: ¿Funciona en n8n Cloud?**
R: Sí, funciona igual en Cloud y Self-hosted.

---

## 🆘 Ayuda Rápida

### Si tienes error "Couldn't connect with these settings":
1. ✅ Verifica que SSL esté activado
2. ❌ Desactiva SSH Tunnel completamente
3. 📋 Copia y pega el Host exacto (no escribas a mano)
4. 🔑 Verifica usuario y contraseña sin espacios extra
5. 🔧 **Si sigue sin funcionar:** Prueba activar "☑️ Ignore SSL Issues"
   - Aunque dice "Insecure", la conexión sigue cifrada con SSL/TLS
   - Esto solo omite la verificación del certificado, no el cifrado
   - Es necesario en algunas versiones de n8n

### Si necesitas tus propias credenciales:
1. Ve a [Neon Console](https://console.neon.tech)
2. Selecciona tu proyecto
3. Dashboard → **Connection Details**
4. Copia el connection string

---

## ✅ Checklist de Verificación

- [ ] Credencial creada en n8n
- [ ] Host copiado de Neon (no localhost)
- [ ] SSL activado ☑️
- [ ] SSH Tunnel desactivado ☐
- [ ] Test exitoso ✅
- [ ] Workflow de prueba funcionando

---

## 🎉 ¡Todo Listo!

Si completaste el checklist, ya puedes usar PostgreSQL en tus workflows de n8n.

**Próximo paso:** Crea tu primer workflow automatizado con datos reales.

---

## 📞 Recursos

- [Neon Console](https://console.neon.tech)
- [n8n Cloud](https://n8n.io)
- [Documentación Neon](https://neon.tech/docs)
- [Documentación n8n](https://docs.n8n.io/)
