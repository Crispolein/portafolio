# Portfolio Redesign — Design Spec
**Fecha:** 2026-06-07  
**Autor:** Christian Rangel + Claude Code

---

## Contexto

El portafolio actual (React + create-react-app + Tailwind) tiene 10 meses sin actualizarse, solo 2 proyectos con links rotos (`#`), y un diseño que no refleja el trabajo real ni el posicionamiento correcto. El objetivo es reconstruirlo con contenido 100% real, un diseño editorial que funcione para reclutadores técnicos **y** para clientes no técnicos, y una arquitectura mantenible a largo plazo.

---

## Posicionamiento

**"Ingeniero Civil Informático, backend Python/AWS potenciado por IA"**

- Diferenciador: uso de IA generativa como parte nativa del flujo de desarrollo, no como herramienta ocasional
- Audiencia primaria: reclutadores técnicos de empresas
- Audiencia secundaria: clientes freelance no técnicos que buscan soluciones concretas
- Tono: directo, con métricas reales, sin inflación de logros

---

## Stack tecnológico

| Capa | Tecnología | Motivo |
|------|-----------|--------|
| Frontend | React 18 + Vite + TypeScript | Migrar desde create-react-app (deprecado). Vite es el estándar actual. |
| Estilos | Tailwind CSS 3 | Mantener stack existente, sin cambios. |
| Animaciones | Framer Motion | Ya en el proyecto, bien integrado. |
| i18n | i18next + react-i18next | Mantener soporte ES/EN existente. |
| Formulario | Resend API + Vercel Serverless Function | Un archivo `api/contact.ts`, API key como env var en Vercel. |
| Deploy | Vercel | Free tier, zero-config para React/Vite, preview por PR. |

---

## Diseño visual

### Paleta de color (dual semántica)

```
Ámbar  #f0a500  →  identidad personal, trabajo humano, backend
Cielo  #38bdf8  →  todo lo relacionado a IA, LLMs, ML
Fondo  #060810  →  negro azulado profundo
Sup-1  #0d1117  →  superficie principal (cards, secciones)
Sup-2  #161b22  →  superficie secundaria (inputs, elementos internos)
Borde  rgba(255,255,255,0.07)  →  separadores sutiles
Texto  #e5e7eb  →  texto principal
Muted  #6b7280  →  texto secundario
```

**Regla de aplicación:** Ámbar para el desarrollador (nombre, métricas de trabajo, skills de backend/cloud). Azul cielo exclusivamente para IA (badges de Claude API, OpenAI, LLM, tags de proyectos con IA). Esta distinción es intencional y visible.

### Tipografía
- Fuente: Inter (ya cargada). Mantener import existente.
- Headings hero: 48px, weight 900
- Section titles: 26px, weight 800
- Body: 14-15px, weight 400/600
- Labels/tags: 10-11px, uppercase, letter-spacing 2-3px

### Componentes clave

**Stat card** — mini tarjeta con número grande + label. Ámbar para métricas de trabajo, azul para proyectos/IA.

**Project card** — visual area (emoji/placeholder para screenshot) + badge de categoría + tag de stack + nombre + descripción + steps (Problema/Solución) + stack pills duales + links.

**Feature card** — ancho completo, dos columnas: contenido izquierda, pantallas/preview derecha. Solo para Noche Austral.

**Tool card** — más compacto, sin steps. Solo icon + nombre + descripción + stack pills.

**Timeline experience** — dot + line vertical + empresa (ámbar si activo, muted si pasado) + rol + período + descripción + metric chips.

**Skill bar** — nombre + barra de progreso. Ámbar para backend/cloud, azul cielo para IA/mobile.

---

## Estructura de secciones (SPA, scroll vertical)

```
Navbar (sticky)
  Logo "Christian Rangel" · Links · CTA Contacto · Toggle ES/EN

Hero
  Badge "Disponible · Ing. Civil Informático · Santiago, Chile"
  H1: "Backend engineer / potenciado por IA"
  Subtítulo con métricas reales
  CTAs: "Ver proyectos" + "Descargar CV"
  Stats: 80 tickets/mes | 6+ meses sin incidentes | 8 proyectos

Stack strip
  Label "Stack" + pills duales (ámbar = backend, azul = IA)

Sobre mí
  Párrafo bio real (datos CV Optimizer DB)
  Diploma en IA badge (azul)
  4 about-cards con border-left colored

Proyectos personales
  Grid 2 columnas:
  - CV Optimizer Pro (Django + HTMX + Claude API)
  - Job Hunter Platform (FastAPI + React + Celery)
  - TCG Collection Manager (Python + OpenCV + React Native)
  - Family Finance (Flutter + Firebase + OpenAI)
  - Noche Austral (featured, ancho completo, 2 columnas)

Herramientas profesionales
  Grid 3 columnas (fondo #0a0c12 para diferenciar visualmente):
  - DB Backup & Restore Tool
  - KML Validator Suite
  - User Manager v2

Experiencia
  Timeline vertical:
  - Migtra: Enero 2025 → Presente (Tech Lead, metric chips)
  - Gesitech: Mayo 2025 → Febrero 2025 (empresa personal, pausada)
  - Noche Austral: Julio 2024 → Abril 2025 (proyecto titulación)
  - PervasiveMind: Noviembre 2023 → Febrero 2024 (práctica)

Skills
  3 columnas con barras:
  - Backend/DB: Python, Django, FastAPI, PostgreSQL, Flask, DynamoDB
  - Cloud/DevOps: AWS, Docker, Linux, GCP, Git, AWS CDK
  - IA/Mobile/Frontend: Claude API, Flutter, Firebase, React, OpenAI, React Native

Contacto
  2 columnas: copy + links (email, LinkedIn, GitHub) | formulario
  Formulario → POST /api/contact → Resend → chris.rangel.intriago@gmail.com

Footer
```

---

## Contenido real

### Hero subtitle
> "Python y AWS como base, inteligencia artificial como multiplicador. Tech lead con impacto cuantificable: 80 tickets/mes eliminados, 6+ meses sin incidentes en producción, 2 desarrolladores liderados."

### Bio (Sobre mí)
> "Ingeniero Civil Informático (Universidad Autónoma de Chile, 2025) con foco en backend Python, servicios AWS y liderazgo técnico. En Migtra, en más de un año, pasé de desarrollador de soporte a Tech Lead de 2 desarrolladores junior. Mis automatizaciones eliminaron 80 tickets/mes y ahorraron 30 horas/mes al equipo. Domino sistemas complejos en tiempo récord — menos de 6 meses para convertirme en referente técnico del sistema GPS más crítico de la empresa. Uso IA generativa como parte del flujo desde el primer commit — no como curiosidad, sino como multiplicador real de productividad."

### Proyectos — datos clave

| Proyecto | Categoría badge | Problema | Solución | Stack principal |
|---------|----------------|----------|----------|-----------------|
| CV Optimizer Pro | IA · Agentes | CVs inflados con frases genéricas que reclutadores detectan | 3 agentes Claude (reclutador, coach, auditor) + matching semántico + Kanban | Django 5, HTMX, Claude API, WeasyPrint |
| Job Hunter Platform | Automatización | Búsqueda manual consume horas; CVs genéricos tienen baja respuesta | Pipeline Celery, scraping 7 fuentes cada 6h, 116+ endpoints, CVs en 4 estilos | FastAPI, Celery, React, OpenAI, Redis, PostgreSQL |
| TCG Collection Manager | Visión Comp. | Inventariar cartas físicas es tedioso, precios fluctúan | Dashboard Streamlit + app React Native con OpenCV y OCR Tesseract | Python, Streamlit, FastAPI, OpenCV, React Native |
| Family Finance | IA · Mobile | Gestión de gastos familiares fragmentada, sin análisis inteligente | Flutter multi-plataforma, 11 pantallas, análisis GPT-4o-mini, entrada por voz via webhooks | Flutter, Riverpod, Firebase, OpenAI, Cloud Functions |
| Noche Austral | Titulación | Universidad necesitaba plataforma de divulgación astronómica | App Flutter (16k+ líneas): fases lunares, ISS tracker, 3 juegos, APOD. Web CMS Django en GCP. | Flutter, Firebase, Django, PostgreSQL, GCP App Engine |

### Herramientas profesionales — datos clave

| Tool | Descripción real |
|------|-----------------|
| DB Backup & Restore | CLI + GUI Tkinter para clonar PostgreSQL entre entornos. SSH tunneling, filtrado por fecha, presets, dry-run. |
| KML Validator Suite | 5 herramientas integradas: comparador, verificador, analizador de warnings, validador de direcciones, buscador de links. |
| User Manager v2 | FastAPI + Angular + AWS CDK. ECS Fargate + CloudFront. Gestión de usuarios AWS Cognito con infraestructura como código. |

### Experiencia — períodos correctos

| Empresa | Rol | Período |
|---------|-----|---------|
| Migtra | Backend Developer → Tech Lead | Enero 2025 — Presente |
| Gesitech | Backend Developer | Mayo 2025 — Febrero 2026 (empresa personal, pausada) |
| Noche Austral | Full Stack Developer | Julio 2024 — Abril 2025 |
| PervasiveMind | Práctica — Data & Scraping | Noviembre 2023 — Febrero 2024 |

---

## Arquitectura de archivos (post-migración a Vite)

```
portafolio/
├── api/
│   └── contact.ts              ← Vercel serverless function (Resend)
├── src/
│   ├── components/
│   │   ├── Navbar.tsx
│   │   ├── Button.tsx
│   │   └── SectionWrapper.tsx
│   ├── sections/
│   │   ├── Hero.tsx
│   │   ├── About.tsx
│   │   ├── Projects.tsx
│   │   ├── Tools.tsx
│   │   ├── Experience.tsx
│   │   ├── Skills.tsx
│   │   └── Contact.tsx
│   ├── data/
│   │   ├── projects.ts         ← datos reales de proyectos
│   │   ├── tools.ts            ← herramientas profesionales
│   │   ├── experience.ts       ← historial laboral real
│   │   └── skills.ts           ← skills con niveles reales
│   ├── locales/
│   │   ├── en/translation.json
│   │   └── es/translation.json
│   ├── styles/
│   │   └── index.css
│   ├── App.tsx
│   ├── i18n.ts
│   └── main.tsx               ← entry point Vite (reemplaza index.js)
├── public/
│   └── Christian_Rangel_CV.pdf
├── index.html                 ← root HTML (Vite style)
├── vite.config.ts
├── tailwind.config.ts
├── tsconfig.json
├── vercel.json                ← rewrites para SPA + functions directory
└── package.json
```

---

## Formulario de contacto — implementación

```typescript
// api/contact.ts — Vercel serverless function
import { Resend } from 'resend'

const resend = new Resend(process.env.RESEND_API_KEY)

export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).end()
  const { name, email, message } = req.body
  await resend.emails.send({
    from: 'portfolio@tudominio.com',
    to: 'chris.rangel.intriago@gmail.com',
    subject: `Contacto portafolio — ${name}`,
    html: `<p><b>De:</b> ${name} (${email})</p><p>${message}</p>`
  })
  res.status(200).json({ ok: true })
}
```

Variables de entorno en Vercel: `RESEND_API_KEY`

`vercel.json` necesario para que Vite SPA funcione con la serverless function:
```json
{
  "rewrites": [{ "source": "/((?!api/).*)", "destination": "/index.html" }]
}
```

---

## Screenshots / demos

Los placeholders (emojis) en las project cards están diseñados para ser reemplazados por capturas reales. Cuando los proyectos estén levantados localmente, se pueden generar con Playwright (`/skills/playwright`). Las tarjetas mantienen su diseño y proporción con o sin imágenes reales.

---

## Internacionalización

Mantener el sistema i18next existente. Todo el copy va en `locales/es/translation.json` y `locales/en/translation.json`. Las strings de proyectos, bio y experiencia van en los archivos de datos (`src/data/`) tipados en TypeScript, no hardcodeadas en componentes.

---

## Verificación post-implementación

1. `npm run dev` — el sitio levanta sin errores en localhost
2. Scrollear todas las secciones — sin saltos, animaciones suaves
3. Toggle ES/EN — todo el copy cambia correctamente
4. Formulario de contacto — enviar mensaje de prueba, confirmar llegada al email
5. `npm run build` — build sin errores ni warnings de TypeScript
6. Deploy en Vercel — conectar repo, agregar `RESEND_API_KEY` en env vars, verificar URL pública
7. Mobile responsive — revisar en viewport 375px y 768px
8. CV download — link funcional al PDF en `/public/`
