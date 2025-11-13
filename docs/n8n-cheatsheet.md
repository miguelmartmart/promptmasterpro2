# 📋 n8n + Neon PostgreSQL - Cheat Sheet

## 🚀 Configuración Rápida

### Credenciales para n8n:

```
┌────────────────────────────────────────────┐
│  Host: ep-lucky-leaf-abc8apus-pooler.     │
│        eu-west-2.aws.neon.tech             │
│  Database: neondb                          │
│  User: neondb_owner                        │
│  Password: npg_C74UplLehMdV                │
│  Port: 5432                                │
│  ☑️  Enable SSL                            │
│  ☐  SSH Tunnel (NO MARCAR)                │
└────────────────────────────────────────────┘
```

---

## ✅ Configuración Correcta

```
Connection Type: Standard/Direct
Host: ep-lucky-leaf-abc8apus-pooler.eu-west-2.aws.neon.tech
Database: neondb
User: neondb_owner
Port: 5432
SSL: ✅ ACTIVADO
SSH Tunnel: ❌ DESACTIVADO
```

---

## ❌ Errores Comunes

### Error: "Couldn't connect"
**Causa**: SSH Tunnel activado
**Solución**: Desactiva SSH Tunnel

### Error: "SSL required"
**Causa**: SSL desactivado
**Solución**: Activa "Enable SSL"

### Error: "Host not found"
**Causa**: Host incorrecto (127.0.0.1)
**Solución**: Usa el host de Neon

---

## 📝 Queries de Ejemplo

### Ver Datos
```sql
SELECT * FROM playing_with_neon LIMIT 10;
```

### Insertar
```sql
INSERT INTO playing_with_neon (name, value) 
VALUES ('test', 0.999) 
RETURNING *;
```

### Filtrar
```sql
SELECT * FROM playing_with_neon 
WHERE value > 0.5 
ORDER BY value DESC;
```

### Contar
```sql
SELECT COUNT(*) as total FROM playing_with_neon;
```

### Estadísticas
```sql
SELECT 
  COUNT(*) as total,
  AVG(value) as promedio,
  MIN(value) as minimo,
  MAX(value) as maximo
FROM playing_with_neon;
```

---

## 🔄 Workflows Comunes

### 1. Query Simple
```
Manual Trigger → Postgres → Output
```

### 2. Insert con Datos
```
Manual Trigger → Set → Postgres (INSERT) → Response
```

### 3. Automatización Diaria
```
Cron (daily) → Postgres (query) → Email/Slack
```

### 4. Webhook → Database
```
Webhook → Function → Postgres → HTTP Response
```

---

## 🛠️ PowerShell

### Conectar
```powershell
psql 'postgresql://neondb_owner:npg_C74UplLehMdV@ep-lucky-leaf-abc8apus-pooler.eu-west-2.aws.neon.tech/neondb?sslmode=require'
```

### Con Script
```powershell
.\scripts\connect-db.ps1
```

---

## 💻 Next.js/TypeScript

### Importar
```typescript
import { query } from '@/lib/db';
```

### Query
```typescript
const result = await query(
  'SELECT * FROM playing_with_neon LIMIT 10'
);
```

### Con Parámetros
```typescript
const result = await query(
  'SELECT * FROM table WHERE id = $1',
  [userId]
);
```

---

## 🔐 Variables de Entorno

### .env.local
```env
DATABASE_URL="postgresql://user:pass@host/db?sslmode=require"
STACK_AUTH_PROJECT_ID="bea8c741-74de-460a-af36-e771ef0eb5eb"
```

---

## 📞 Enlaces Rápidos

- [Neon Console](https://console.neon.tech)
- [n8n Docs](https://docs.n8n.io/)
- [Guía Completa](./README-n8n.md)

---

## ✅ Checklist

- [ ] SSL activado en n8n
- [ ] SSH Tunnel desactivado
- [ ] Test exitoso ✅
- [ ] Primer query funcionando

---

**Imprime esta hoja para referencia rápida** 📄
