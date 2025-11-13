
# PromptCraft Pro

This is a NextJS starter for PromptCraft Pro, an application for managing and generating AI prompts.

To get started, take a look at `src/app/page.tsx`.

## 🗄️ Database Setup

This project uses PostgreSQL (Neon) as the database.

### 🎯 ¿Quieres conectar n8n a la base de datos?
👉 **[EMPIEZA AQUÍ - Guía de 3 minutos](./docs/README-n8n.md)** 👈

### 📖 Guías Detalladas:
- **[🚀 n8n - Configuración Paso a Paso](./docs/n8n-guia-rapida.md)** - Guía completa para principiantes
- **[📸 n8n - Configuración Visual](./docs/n8n-configuracion-visual.md)** - Diagramas y ejemplos visuales
- **[📚 Conexión desde PowerShell y Next.js](./docs/database-setup.md)** - Guía completa de desarrollo
- **[🔧 n8n - Workflows Avanzados](./docs/n8n-setup.md)** - Ejemplos de automatización

### Quick Start

1. Copy `.env.example` to `.env.local` and add your database credentials
2. Install dependencies: `npm install`
3. Test database connection: Visit `/api/health` after running dev server
4. Run development server: `npm run dev`

### Database Scripts

- `scripts/connect-db.ps1` - PowerShell script to connect to database
- `scripts/init-db.sql` - SQL initialization script

## Check-list final para PromptMaster Pro

- Solo usa cifrado provisto por Android / Google (HTTPS, TLS 1.3, Firebase, OAuth).
- No implementa ni exporta algoritmos criptográficos propios.
- No se distribuye a países embargados (la Play Store ya filtra, pero documéntalo).
- Cuestionario de Export Compliance completado y guardado.
- README interno con autoclasificación 5D992.c / Mass Market.

