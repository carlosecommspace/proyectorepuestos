# AutoPartes - Sistema de Gestión de Solicitudes de Repuestos

Sistema web para registrar y analizar las partes de automóviles que los clientes solicitan y no están disponibles (por no venderlas o por falta de stock). Utiliza IA para normalizar los datos ingresados en lenguaje natural y generar reportes analíticos.

## Características

- **Registro en lenguaje natural**: Los vendedores describen la parte solicitada en lenguaje natural
- **Normalización con IA**: La IA extrae y estandariza marca, modelo, año, categoría, etc.
- **Fallback automático**: Si la IA no está disponible, usa normalización basada en reglas
- **Dos tipos de usuario**:
  - **Administrador**: acceso a todas las sedes, analítica, reportes y chat IA
  - **Vendedor (Regular)**: acceso solo a su sede, solo puede registrar solicitudes
- **Dashboard analítico**: gráficos por categoría, marca, sede, estado y tendencia mensual
- **Chat con IA**: consulta tendencias y obtén recomendaciones de compra
- **Multi-sede**: soporte para múltiples sedes con datos segregados

## Stack Tecnológico

- **Frontend**: Next.js 14, React, Tailwind CSS
- **Backend**: Next.js API Routes
- **Base de datos**: SQLite (via Prisma ORM + better-sqlite3)
- **Autenticación**: NextAuth.js con credenciales
- **IA**: Ollama (gratuito, local) u OpenAI-compatible API

## Instalación

```bash
# 1. Instalar dependencias
npm install

# 2. Generar cliente Prisma
npx prisma generate

# 3. Ejecutar migraciones
npx prisma migrate dev

# 4. Poblar la base de datos con datos iniciales
node prisma/seed.mjs

# 5. Iniciar el servidor de desarrollo
npm run dev
```

## Configuración de IA

### Opción 1: Ollama (Gratuito, Local)

1. Instalar [Ollama](https://ollama.ai)
2. Descargar un modelo: `ollama pull llama3`
3. Las variables de entorno por defecto ya apuntan a Ollama

### Opción 2: API OpenAI-compatible

Editar `.env`:
```
AI_PROVIDER="openai"
OPENAI_API_KEY="tu-api-key"
OPENAI_BASE_URL="https://api.openai.com/v1"
OPENAI_MODEL="gpt-3.5-turbo"
```

## Credenciales de Prueba

| Rol | Email | Contraseña |
|-----|-------|------------|
| Admin | admin@repuestos.com | admin123 |
| Vendedor Sede Principal | vendedor1@repuestos.com | vendedor123 |
| Vendedor Sede Sucursal | vendedor2@repuestos.com | vendedor123 |

## Estructura del Proyecto

```
src/
├── app/
│   ├── api/
│   │   ├── auth/[...nextauth]/  # Autenticación
│   │   ├── parts/               # CRUD de solicitudes
│   │   ├── sedes/               # Listado de sedes
│   │   └── ai/
│   │       ├── normalize/       # Normalización IA
│   │       ├── reports/         # Datos de reportes
│   │       └── chat/            # Chat analítico IA
│   ├── login/                   # Página de login
│   └── dashboard/
│       ├── parts/               # Registro de solicitudes
│       ├── analytics/           # Dashboard analítico (admin)
│       └── chat/                # Chat IA (admin)
├── components/
│   ├── Navbar.tsx
│   ├── PartRequestForm.tsx
│   ├── PartRequestList.tsx
│   └── Providers.tsx
├── lib/
│   ├── ai.ts                    # Integración IA (Ollama/OpenAI)
│   ├── auth.ts                  # Configuración NextAuth
│   ├── prisma.ts                # Cliente Prisma
│   └── session.ts               # Helpers de sesión
└── types/
    └── next-auth.d.ts           # Tipos de NextAuth
```
