# Portfolio Redesign Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Rediseñar el portafolio de Christian Rangel migrando de CRA a Vite, implementando el diseño Editorial/Case Study con paleta ámbar+azul dual, y poblándolo con contenido 100% real extraído de CV Optimizer DB y repos personales.

**Architecture:** SPA React 18 + Vite + TypeScript + Tailwind desplegada en Vercel. Sin backend propio — solo una Vercel Serverless Function (`api/contact.ts`) para el formulario de contacto vía Resend. Contenido tipado en `src/data/` en lugar de hardcodeado en componentes. i18n EN/ES con i18next.

**Tech Stack:** React 18, Vite 5, TypeScript 5, Tailwind CSS 3, Framer Motion 12, i18next, Resend SDK, Vercel

**Spec de referencia:** `docs/superpowers/specs/2026-06-07-portfolio-redesign-design.md`

---

## Mapa de archivos

### Crear
```
api/contact.ts
src/main.tsx                    (reemplaza src/index.js)
src/data/projects.ts
src/data/tools.ts
src/data/experience.ts
src/data/skills.ts
src/sections/Tools.tsx
src/components/ProjectCard.tsx
src/components/FeaturedProjectCard.tsx
src/components/ToolCard.tsx
src/components/StatCard.tsx
src/components/StackPill.tsx
vite.config.ts
vercel.json
index.html                      (mover de public/ a raíz)
tsconfig.json                   (reemplazar)
tsconfig.node.json
```

### Modificar
```
package.json
tailwind.config.js → tailwind.config.ts
src/index.css
src/App.jsx → src/App.tsx
src/i18n.js → src/i18n.ts
src/components/Navbar.jsx → Navbar.tsx
src/sections/Hero.jsx → Hero.tsx
src/sections/About.jsx → About.tsx
src/sections/Projects.jsx → Projects.tsx
src/sections/Experience.jsx → Experience.tsx
src/sections/Skills.jsx → Skills.tsx
src/sections/Contact.jsx → Contact.tsx
src/locales/es/translation.json
src/locales/en/translation.json
```

### Eliminar
```
src/components/ParticlesBackground.jsx
src/components/SectionWrapper.jsx   (reemplazado inline)
src/components/Button.jsx           (reemplazado inline)
src/assets/blob.svg
src/assets/code-pattern.svg
```

---

## Task 1: Migrar CRA a Vite

**Files:**
- Modify: `package.json`
- Create: `vite.config.ts`, `tsconfig.json`, `tsconfig.node.json`, `index.html` (raíz), `src/main.tsx`
- Delete: `src/index.js` (o renombrar)

- [ ] **Step 1.1: Instalar dependencias Vite y eliminar CRA**

```bash
cd /Users/christian/herrramientas_personales/GitHub/portafolio
npm remove react-scripts react-tsparticles tsparticles
npm install --save-dev vite@^5.4.0 @vitejs/plugin-react@^4.3.0 @types/react@^18.3.0 @types/react-dom@^18.3.0
npm install resend@^4.0.0
```

- [ ] **Step 1.2: Actualizar `package.json` (scripts y limpieza)**

Reemplazar el bloque `"scripts"` y eliminar `"browserslist"`:

```json
{
  "name": "portafolio",
  "version": "0.2.0",
  "private": true,
  "type": "module",
  "dependencies": {
    "framer-motion": "^12.18.1",
    "i18next": "^23.11.5",
    "react": "^18.2.0",
    "react-dom": "^18.2.0",
    "react-i18next": "^13.5.0",
    "react-icons": "^5.5.0",
    "resend": "^4.0.0"
  },
  "devDependencies": {
    "@tailwindcss/aspect-ratio": "^0.4.2",
    "@tailwindcss/typography": "^0.5.16",
    "@types/react": "^18.3.0",
    "@types/react-dom": "^18.3.0",
    "@vitejs/plugin-react": "^4.3.0",
    "autoprefixer": "^10.4.0",
    "postcss": "^8.4.0",
    "tailwindcss": "^3.3.0",
    "typescript": "^5.5.0",
    "vite": "^5.4.0"
  },
  "scripts": {
    "dev": "vite",
    "build": "tsc && vite build",
    "preview": "vite preview"
  }
}
```

- [ ] **Step 1.3: Crear `vite.config.ts`**

```typescript
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  server: { port: 3000 },
})
```

- [ ] **Step 1.4: Crear `tsconfig.json`**

```json
{
  "compilerOptions": {
    "target": "ES2020",
    "useDefineForClassFields": true,
    "lib": ["ES2020", "DOM", "DOM.Iterable"],
    "module": "ESNext",
    "skipLibCheck": true,
    "moduleResolution": "bundler",
    "allowImportingTsExtensions": true,
    "resolveJsonModule": true,
    "isolatedModules": true,
    "noEmit": true,
    "jsx": "react-jsx",
    "strict": true,
    "noUnusedLocals": false,
    "noUnusedParameters": false,
    "noFallthroughCasesInSwitch": true
  },
  "include": ["src"],
  "references": [{ "path": "./tsconfig.node.json" }]
}
```

- [ ] **Step 1.5: Crear `tsconfig.node.json`**

```json
{
  "compilerOptions": {
    "composite": true,
    "skipLibCheck": true,
    "module": "ESNext",
    "moduleResolution": "bundler",
    "allowSyntheticDefaultImports": true,
    "strict": true
  },
  "include": ["vite.config.ts"]
}
```

- [ ] **Step 1.6: Crear `index.html` en la raíz del proyecto**

```html
<!DOCTYPE html>
<html lang="es">
  <head>
    <meta charset="UTF-8" />
    <link rel="icon" type="image/svg+xml" href="/favicon.ico" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <meta name="description" content="Christian Rangel — Backend Engineer potenciado por IA. Python, AWS, Django, FastAPI." />
    <title>Christian Rangel — Backend Engineer</title>
  </head>
  <body>
    <div id="root"></div>
    <script type="module" src="/src/main.tsx"></script>
  </body>
</html>
```

- [ ] **Step 1.7: Crear `src/main.tsx` (reemplaza `src/index.js`)**

```typescript
import React from 'react'
import ReactDOM from 'react-dom/client'
import './i18n'
import './index.css'
import App from './App'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
)
```

- [ ] **Step 1.8: Verificar que el servidor levanta**

```bash
npm run dev
```

Esperado: servidor en `http://localhost:3000` sin errores de compilación. Puede faltar contenido — lo importante es que Vite levanta.

- [ ] **Step 1.9: Commit**

```bash
git add -A
git commit -m "chore: migrate from CRA to Vite, add Resend dependency"
```

---

## Task 2: Sistema de diseño — Tailwind y CSS base

**Files:**
- Modify: `tailwind.config.js` → renombrar a `tailwind.config.ts`
- Modify: `src/index.css`
- Modify: `postcss.config.js`

- [ ] **Step 2.1: Reemplazar `tailwind.config.js` con versión TypeScript y nueva paleta**

Crear `tailwind.config.ts` (borrar `tailwind.config.js`):

```typescript
import type { Config } from 'tailwindcss'

export default {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        amber: {
          DEFAULT: '#f0a500',
          dim: 'rgba(240,165,0,0.10)',
          border: 'rgba(240,165,0,0.22)',
        },
        sky: {
          DEFAULT: '#38bdf8',
          dim: 'rgba(56,189,248,0.09)',
          border: 'rgba(56,189,248,0.22)',
        },
        surface: {
          DEFAULT: '#0d1117',
          2: '#161b22',
          deep: '#060810',
        },
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
      },
    },
  },
  plugins: [
    require('@tailwindcss/typography'),
    require('@tailwindcss/aspect-ratio'),
  ],
} satisfies Config
```

- [ ] **Step 2.2: Reemplazar `src/index.css`**

```css
@import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800;900&display=swap');

@tailwind base;
@tailwind components;
@tailwind utilities;

@layer base {
  html {
    scroll-behavior: smooth;
    font-family: 'Inter', sans-serif;
  }

  body {
    background-color: #060810;
    color: #e5e7eb;
  }

  ::-webkit-scrollbar { width: 6px; }
  ::-webkit-scrollbar-track { background: #060810; }
  ::-webkit-scrollbar-thumb { background: rgba(240,165,0,0.3); border-radius: 3px; }
}

@layer utilities {
  .text-amber { color: #f0a500; }
  .text-sky-accent { color: #38bdf8; }
  .bg-amber-dim { background-color: rgba(240,165,0,0.10); }
  .bg-sky-dim { background-color: rgba(56,189,248,0.09); }
  .border-amber { border-color: rgba(240,165,0,0.22); }
  .border-sky { border-color: rgba(56,189,248,0.22); }
}
```

- [ ] **Step 2.3: Verificar build no rompe por Tailwind**

```bash
npm run dev
```

Esperado: sin errores de PostCSS o Tailwind.

- [ ] **Step 2.4: Commit**

```bash
git add tailwind.config.ts src/index.css
git rm tailwind.config.js
git commit -m "chore: update design system, amber+sky palette, Inter font"
```

---

## Task 3: Capa de datos — TypeScript data files

**Files:**
- Create: `src/data/projects.ts`, `src/data/tools.ts`, `src/data/experience.ts`, `src/data/skills.ts`

- [ ] **Step 3.1: Crear `src/data/projects.ts`**

```typescript
export interface Project {
  id: string
  emoji: string
  badge: string
  badgeColor: 'ai' | 'automation' | 'vision' | 'mobile' | 'graduation'
  tagKey: string       // i18n key para el tag de stack
  nameKey: string      // i18n key para el nombre
  descKey: string      // i18n key para descripción
  problemKey: string   // i18n key para el problema
  solutionKey: string  // i18n key para la solución
  stack: { label: string; color: 'amber' | 'sky' | 'gray' | 'purple' }[]
  github?: string
  demo?: string
  featured?: boolean
  featuredData?: {
    mobileScreens: string[]
    webPreview: string
    chips: string[]
  }
}

export const BADGE_STYLES: Record<Project['badgeColor'], string> = {
  ai: 'bg-sky-dim border border-sky text-sky-accent',
  automation: 'bg-sky-dim border border-sky text-sky-accent',
  vision: 'bg-emerald-500/10 border border-emerald-500/25 text-emerald-400',
  mobile: 'bg-sky-dim border border-sky text-sky-accent',
  graduation: 'bg-purple-500/10 border border-purple-500/25 text-purple-400',
}

export const projects: Project[] = [
  {
    id: 'cv-optimizer',
    emoji: '🧠',
    badge: 'IA · Agentes',
    badgeColor: 'ai',
    tagKey: 'projects.cvOptimizer.tag',
    nameKey: 'projects.cvOptimizer.name',
    descKey: 'projects.cvOptimizer.desc',
    problemKey: 'projects.cvOptimizer.problem',
    solutionKey: 'projects.cvOptimizer.solution',
    stack: [
      { label: 'Django 5', color: 'amber' },
      { label: 'HTMX', color: 'amber' },
      { label: 'SQLite', color: 'amber' },
      { label: 'Claude API', color: 'sky' },
      { label: 'Multi-agent', color: 'sky' },
      { label: 'WeasyPrint', color: 'gray' },
    ],
    github: 'https://github.com/Crispolein/cv_optimizer',
  },
  {
    id: 'job-hunter',
    emoji: '🔍',
    badge: 'Automatización',
    badgeColor: 'automation',
    tagKey: 'projects.jobHunter.tag',
    nameKey: 'projects.jobHunter.name',
    descKey: 'projects.jobHunter.desc',
    problemKey: 'projects.jobHunter.problem',
    solutionKey: 'projects.jobHunter.solution',
    stack: [
      { label: 'FastAPI', color: 'amber' },
      { label: 'Celery', color: 'amber' },
      { label: 'React', color: 'amber' },
      { label: 'OpenAI', color: 'sky' },
      { label: 'Redis', color: 'gray' },
      { label: 'PostgreSQL', color: 'gray' },
    ],
    github: 'https://github.com/Crispolein/BusquedaLaboral',
  },
  {
    id: 'tcg',
    emoji: '🃏',
    badge: 'Visión Comp.',
    badgeColor: 'vision',
    tagKey: 'projects.tcg.tag',
    nameKey: 'projects.tcg.name',
    descKey: 'projects.tcg.desc',
    problemKey: 'projects.tcg.problem',
    solutionKey: 'projects.tcg.solution',
    stack: [
      { label: 'Python', color: 'amber' },
      { label: 'Streamlit', color: 'amber' },
      { label: 'FastAPI', color: 'amber' },
      { label: 'OpenCV', color: 'sky' },
      { label: 'OCR', color: 'sky' },
      { label: 'React Native', color: 'gray' },
    ],
    github: 'https://github.com/Crispolein/scrapingpokemon',
  },
  {
    id: 'financial',
    emoji: '💸',
    badge: 'IA · Mobile',
    badgeColor: 'mobile',
    tagKey: 'projects.financial.tag',
    nameKey: 'projects.financial.name',
    descKey: 'projects.financial.desc',
    problemKey: 'projects.financial.problem',
    solutionKey: 'projects.financial.solution',
    stack: [
      { label: 'Flutter', color: 'purple' },
      { label: 'Riverpod', color: 'purple' },
      { label: 'OpenAI', color: 'sky' },
      { label: 'Firebase', color: 'gray' },
      { label: 'Cloud Functions', color: 'gray' },
    ],
    github: 'https://github.com/Crispolein/financial',
  },
  {
    id: 'noche-austral',
    emoji: '🌌',
    badge: 'Titulación',
    badgeColor: 'graduation',
    tagKey: 'projects.nocheAustral.tag',
    nameKey: 'projects.nocheAustral.name',
    descKey: 'projects.nocheAustral.desc',
    problemKey: 'projects.nocheAustral.problem',
    solutionKey: 'projects.nocheAustral.solution',
    stack: [
      { label: 'Flutter', color: 'purple' },
      { label: 'Dart', color: 'purple' },
      { label: 'Firebase', color: 'purple' },
      { label: 'Django', color: 'amber' },
      { label: 'PostgreSQL', color: 'amber' },
      { label: 'GCP App Engine', color: 'gray' },
    ],
    github: 'https://github.com/Crispolein/Astroapp',
    demo: 'https://github.com/Crispolein/Astroweb',
    featured: true,
    featuredData: {
      mobileScreens: ['🌙', '🛸', '🎮'],
      webPreview: '🌌',
      chips: ['16.000+ líneas Dart', 'Deploy GCP', 'Tesis titulación'],
    },
  },
]
```

- [ ] **Step 3.2: Crear `src/data/tools.ts`**

```typescript
export interface Tool {
  id: string
  icon: string
  nameKey: string
  descKey: string
  stack: { label: string; color: 'amber' | 'sky' | 'gray' }[]
}

export const tools: Tool[] = [
  {
    id: 'db-backup',
    icon: '🗄️',
    nameKey: 'tools.dbBackup.name',
    descKey: 'tools.dbBackup.desc',
    stack: [
      { label: 'Python', color: 'amber' },
      { label: 'PostgreSQL', color: 'amber' },
      { label: 'SSH', color: 'gray' },
      { label: 'Tkinter', color: 'gray' },
      { label: 'YAML', color: 'gray' },
    ],
  },
  {
    id: 'kml-validator',
    icon: '🗺️',
    nameKey: 'tools.kmlValidator.name',
    descKey: 'tools.kmlValidator.desc',
    stack: [
      { label: 'Python', color: 'amber' },
      { label: 'Tkinter', color: 'amber' },
      { label: 'XML', color: 'gray' },
      { label: 'Google Earth', color: 'gray' },
    ],
  },
  {
    id: 'user-manager',
    icon: '👥',
    nameKey: 'tools.userManager.name',
    descKey: 'tools.userManager.desc',
    stack: [
      { label: 'FastAPI', color: 'amber' },
      { label: 'Angular', color: 'amber' },
      { label: 'AWS CDK', color: 'sky' },
      { label: 'Cognito', color: 'sky' },
      { label: 'ECS Fargate', color: 'gray' },
    ],
  },
]
```

- [ ] **Step 3.3: Crear `src/data/experience.ts`**

```typescript
export interface Experience {
  id: string
  companyKey: string
  roleKey: string
  period: string
  active: boolean
  descKey: string
  metrics?: string[]
}

export const experiences: Experience[] = [
  {
    id: 'migtra',
    companyKey: 'experience.migtra.company',
    roleKey: 'experience.migtra.role',
    period: 'Enero 2024 — Presente',
    active: true,
    descKey: 'experience.migtra.desc',
    metrics: [
      '80 tickets/mes eliminados',
      '30 hrs/mes ahorradas',
      '6+ meses sin incidentes',
      '2 devs liderados',
    ],
  },
  {
    id: 'gesitech',
    companyKey: 'experience.gesitech.company',
    roleKey: 'experience.gesitech.role',
    period: 'Mayo 2025 — Febrero 2026',
    active: false,
    descKey: 'experience.gesitech.desc',
  },
  {
    id: 'noche-austral',
    companyKey: 'experience.nocheAustral.company',
    roleKey: 'experience.nocheAustral.role',
    period: 'Julio 2024 — Abril 2025',
    active: false,
    descKey: 'experience.nocheAustral.desc',
  },
  {
    id: 'pervasivemind',
    companyKey: 'experience.pervasivemind.company',
    roleKey: 'experience.pervasivemind.role',
    period: 'Noviembre 2023 — Febrero 2024',
    active: false,
    descKey: 'experience.pervasivemind.desc',
  },
]
```

- [ ] **Step 3.4: Crear `src/data/skills.ts`**

```typescript
export interface Skill {
  name: string
  level: number   // 0-100
  color: 'amber' | 'sky'
}

export interface SkillGroup {
  labelKey: string
  color: 'amber' | 'sky'
  skills: Skill[]
}

export const skillGroups: SkillGroup[] = [
  {
    labelKey: 'skills.groups.backend',
    color: 'amber',
    skills: [
      { name: 'Python', level: 92, color: 'amber' },
      { name: 'Django', level: 82, color: 'amber' },
      { name: 'FastAPI', level: 78, color: 'amber' },
      { name: 'PostgreSQL', level: 78, color: 'amber' },
      { name: 'Flask', level: 72, color: 'amber' },
      { name: 'DynamoDB', level: 65, color: 'amber' },
    ],
  },
  {
    labelKey: 'skills.groups.cloud',
    color: 'amber',
    skills: [
      { name: 'AWS', level: 78, color: 'amber' },
      { name: 'Git', level: 88, color: 'amber' },
      { name: 'Linux', level: 78, color: 'amber' },
      { name: 'Docker', level: 72, color: 'amber' },
      { name: 'GCP', level: 65, color: 'amber' },
      { name: 'AWS CDK', level: 60, color: 'amber' },
    ],
  },
  {
    labelKey: 'skills.groups.ai',
    color: 'sky',
    skills: [
      { name: 'Claude API', level: 85, color: 'sky' },
      { name: 'Flutter', level: 75, color: 'sky' },
      { name: 'Firebase', level: 72, color: 'sky' },
      { name: 'OpenAI', level: 70, color: 'sky' },
      { name: 'React', level: 68, color: 'sky' },
      { name: 'React Native', level: 62, color: 'sky' },
    ],
  },
]
```

- [ ] **Step 3.5: Commit**

```bash
git add src/data/
git commit -m "feat: add typed data layer for projects, tools, experience, skills"
```

---

## Task 4: Actualizar contenido i18n

**Files:**
- Modify: `src/locales/es/translation.json`, `src/locales/en/translation.json`
- Modify: `src/i18n.js` → `src/i18n.ts`

- [ ] **Step 4.1: Reemplazar `src/locales/es/translation.json`**

```json
{
  "nav": {
    "about": "Sobre mí",
    "projects": "Proyectos",
    "tools": "Herramientas",
    "experience": "Experiencia",
    "skills": "Skills",
    "contact": "Contacto"
  },
  "hero": {
    "badge": "Disponible · Ing. Civil Informático · Santiago, Chile",
    "title1": "Backend engineer",
    "title2": "potenciado por",
    "titleAi": "IA",
    "subtitle": "Python y AWS como base, inteligencia artificial como multiplicador. Tech lead con impacto cuantificable: <amber>80 tickets/mes eliminados</amber>, 6+ meses sin incidentes en producción, 2 desarrolladores liderados.",
    "cta": "Ver proyectos",
    "cv": "Descargar CV",
    "stat1": { "value": "80", "label": "tickets/mes elim." },
    "stat2": { "value": "6+", "label": "meses sin incid." },
    "stat3": { "value": "8", "label": "proyectos" }
  },
  "about": {
    "label": "Sobre mí",
    "title": "Quién soy",
    "bio": "Ingeniero Civil Informático (Universidad Autónoma de Chile, 2025) con foco en backend Python, servicios AWS y liderazgo técnico. En Migtra, en más de un año, pasé de desarrollador de soporte a Tech Lead de 2 desarrolladores junior. Mis automatizaciones eliminaron 80 tickets/mes y ahorraron 30 horas/mes al equipo. Uso IA generativa como parte del flujo desde el primer commit — no como curiosidad, sino como multiplicador real de productividad.",
    "diploma": "Diplomado en IA — Universidad Autónoma de Chile (en curso, 2026)",
    "cards": {
      "backend": { "title": "Python · Django · FastAPI · Flask", "sub": "Backend sólido, APIs REST, async, automatizaciones" },
      "cloud": { "title": "AWS · Docker · PostgreSQL · DynamoDB", "sub": "S3, EC2, Cognito, CloudWatch — uso productivo real" },
      "ai": { "title": "Claude API · LLMs · Agentes IA", "sub": "Integración real de IA en productos, no prototipos" },
      "mobile": { "title": "Flutter · Dart · Firebase", "sub": "Apps móviles cross-platform con backend cloud" }
    }
  },
  "projects": {
    "label": "Proyectos personales",
    "title": "Lo que construyo por iniciativa propia",
    "sub": "De la idea a producción — problemas reales, soluciones funcionales",
    "problemLabel": "Problema",
    "solutionLabel": "Solución",
    "github": "GitHub →",
    "demo": "Ver demo",
    "viewSite": "Ver sitio",
    "cvOptimizer": {
      "tag": "Django · HTMX · Claude API",
      "name": "CV Optimizer Pro",
      "desc": "Sistema multi-agente con Claude que actúa como reclutador senior, hiring manager y career coach. Extrae el perfil real mediante entrevista conversacional y genera CVs con credibilidad verificada.",
      "problem": "Los optimizadores de CV inflan logros con frases genéricas que un reclutador detecta en segundos.",
      "solution": "3 agentes Claude (reclutador, coach, auditor anti-exageración) + matching semántico de vacantes + Kanban de postulaciones."
    },
    "jobHunter": {
      "tag": "FastAPI · React · Celery",
      "name": "Job Hunter Platform",
      "desc": "Plataforma con 116+ endpoints REST que scrapea ofertas en ciclos de 6h desde 7 fuentes, aplica matching semántico y genera CVs en 4 estilos con dashboard en tiempo real.",
      "problem": "Buscar trabajo manualmente consume horas y los CVs genéricos tienen baja tasa de respuesta.",
      "solution": "Pipeline Celery + Redis para scraping asíncrono, ranking IA y dashboard React con métricas en tiempo real."
    },
    "tcg": {
      "tag": "Python · Streamlit · React Native",
      "name": "TCG Collection Manager",
      "desc": "Gestión de colección de cartas con scraping de precios, análisis de condición por visión computacional, OCR y app React Native para escanear cartas físicas desde cámara.",
      "problem": "Inventariar colecciones físicas es tedioso y los precios de cartas fluctúan constantemente.",
      "solution": "Dashboard Streamlit + scraping TCGPlayer + app móvil con OpenCV y Tesseract OCR para análisis de condición."
    },
    "financial": {
      "tag": "Flutter · Firebase · OpenAI",
      "name": "Family Finance",
      "desc": "App multi-plataforma de gestión de gastos familiares con análisis financiero por IA, entrada de gastos por voz vía webhooks y permisos por rol de familia. 80% completo, 11 pantallas.",
      "problem": "La gestión de gastos familiares está fragmentada y carece de análisis inteligente.",
      "solution": "Flutter multiplataforma con Riverpod, GPT-4o-mini para insights financieros y Cloud Functions para webhooks de voz (Google Assistant/Siri)."
    },
    "nocheAustral": {
      "tag": "Proyecto de Titulación · Plataforma completa",
      "name": "Noche Austral",
      "desc": "Plataforma completa de divulgación astronómica como proyecto de titulación: app Flutter (16.000+ líneas) + web CMS Django deployado en Google Cloud.",
      "problem": "La universidad necesitaba una plataforma de divulgación astronómica con app móvil y CMS web para gestión editorial.",
      "solution": "App Flutter con fases lunares, ISS tracker, APOD NASA, 3 juegos educativos y Firebase Auth. Web CMS Django con publicaciones, comentarios y deploy en GCP App Engine.",
      "mobileLabel": "App móvil",
      "webLabel": "Plataforma web",
      "appGithub": "App GitHub →",
      "webGithub": "Web GitHub →"
    }
  },
  "tools": {
    "label": "Herramientas profesionales",
    "title": "Construidas en contexto laboral real",
    "sub": "Utilidades internas que resuelven problemas operativos concretos — de idea a producción en días",
    "dbBackup": {
      "name": "DB Backup & Restore Tool",
      "desc": "CLI + GUI para clonado inteligente de bases PostgreSQL entre entornos. SSH tunneling, filtrado por fecha y presets de workflow. Modo dry-run para preview seguro antes de ejecutar."
    },
    "kmlValidator": {
      "name": "KML Validator Suite",
      "desc": "5 herramientas integradas para validar, comparar y analizar archivos KML de Google Earth. Detecta errores estructurales y genera archivos de debug visuales para diagnóstico."
    },
    "userManager": {
      "name": "User Manager v2",
      "desc": "Plataforma web para gestión centralizada de usuarios con AWS Cognito. Frontend Angular, backend FastAPI e infraestructura como código con AWS CDK — ECS Fargate + CloudFront."
    }
  },
  "experience": {
    "label": "Experiencia",
    "title": "Trayectoria profesional",
    "migtra": {
      "company": "Migtra",
      "role": "Backend Developer → Tech Lead",
      "desc": "Backend Python (2.7 y 3.10) sobre AWS para plataforma de telemetría GPS. Pasé de desarrollador de soporte a Tech Lead de 2 developers junior — inducción, code review, arquitectura y mentoring activo."
    },
    "gesitech": {
      "company": "Gesitech",
      "role": "Backend Developer",
      "desc": "Apps móviles Flutter/Dart con Firebase. Empresa de iniciativa personal, pausada para enfocarse en Migtra."
    },
    "nocheAustral": {
      "company": "Noche Austral · Proyecto Universitario",
      "role": "Full Stack Developer",
      "desc": "Plataforma completa de divulgación astronómica como proyecto de titulación: app Flutter + Firebase y web CMS Django deployado en GCP App Engine."
    },
    "pervasivemind": {
      "company": "PervasiveMind",
      "role": "Práctica — Data & Web Scraping",
      "desc": "Recopilación y procesamiento de datos de precios mediante web scraping. Python, BeautifulSoup, análisis de datos."
    }
  },
  "skills": {
    "label": "Skills",
    "title": "Tecnologías",
    "groups": {
      "backend": "Backend · Bases de datos",
      "cloud": "Cloud · DevOps",
      "ai": "IA · Mobile · Frontend"
    }
  },
  "contact": {
    "label": "Contacto",
    "title": "¿Hablamos?",
    "sub": "Abierto a oportunidades de empleo y proyectos freelance. Si tenés un problema de backend, automatización o integración de IA que resolver, escribime.",
    "name": "Tu nombre",
    "email": "Tu email",
    "message": "Mensaje...",
    "send": "Enviar mensaje",
    "sending": "Enviando...",
    "success": "¡Mensaje enviado! Te respondo pronto.",
    "error": "Error al enviar. Escribime directamente a chris.rangel.intriago@gmail.com"
  },
  "footer": {
    "made": "Hecho con React + Vite"
  }
}
```

- [ ] **Step 4.2: Crear `src/locales/en/translation.json`**

```json
{
  "nav": {
    "about": "About",
    "projects": "Projects",
    "tools": "Tools",
    "experience": "Experience",
    "skills": "Skills",
    "contact": "Contact"
  },
  "hero": {
    "badge": "Available · Computer Science Engineer · Santiago, Chile",
    "title1": "Backend engineer",
    "title2": "powered by",
    "titleAi": "AI",
    "subtitle": "Python and AWS as the foundation, artificial intelligence as the multiplier. Tech lead with measurable impact: <amber>80 tickets/month eliminated</amber>, 6+ months in production without incidents, 2 developers mentored.",
    "cta": "View projects",
    "cv": "Download CV",
    "stat1": { "value": "80", "label": "tickets/mo elim." },
    "stat2": { "value": "6+", "label": "months w/o incidents" },
    "stat3": { "value": "8", "label": "projects" }
  },
  "about": {
    "label": "About",
    "title": "Who I am",
    "bio": "Computer Science Engineer (Universidad Autónoma de Chile, 2025) focused on Python backend development, AWS services and technical leadership. At Migtra, over more than a year, I grew from support developer to Tech Lead of 2 junior developers. My automations eliminated 80 tickets/month and saved 30 hours/month for the team. I use generative AI as part of my workflow from the first commit — not as an occasional tool, but as a real productivity multiplier.",
    "diploma": "AI Diploma — Universidad Autónoma de Chile (in progress, 2026)",
    "cards": {
      "backend": { "title": "Python · Django · FastAPI · Flask", "sub": "Solid backend, REST APIs, async, automations" },
      "cloud": { "title": "AWS · Docker · PostgreSQL · DynamoDB", "sub": "S3, EC2, Cognito, CloudWatch — real productive use" },
      "ai": { "title": "Claude API · LLMs · AI Agents", "sub": "Real AI integration in products, not prototypes" },
      "mobile": { "title": "Flutter · Dart · Firebase", "sub": "Cross-platform mobile apps with cloud backend" }
    }
  },
  "projects": {
    "label": "Personal projects",
    "title": "What I build on my own initiative",
    "sub": "From idea to production — real problems, functional solutions",
    "problemLabel": "Problem",
    "solutionLabel": "Solution",
    "github": "GitHub →",
    "demo": "View demo",
    "viewSite": "View site",
    "cvOptimizer": {
      "tag": "Django · HTMX · Claude API",
      "name": "CV Optimizer Pro",
      "desc": "Multi-agent system with Claude acting as senior recruiter, hiring manager and career coach. Extracts the real profile through conversational interview and generates CVs with verified credibility.",
      "problem": "CV optimizers inflate achievements with generic phrases that a recruiter detects in seconds.",
      "solution": "3 Claude agents (recruiter, coach, anti-exaggeration auditor) + semantic job matching + application Kanban."
    },
    "jobHunter": {
      "tag": "FastAPI · React · Celery",
      "name": "Job Hunter Platform",
      "desc": "Platform with 116+ REST endpoints that scrapes job offers every 6h from 7 sources, applies semantic matching and generates CVs in 4 styles with real-time dashboard.",
      "problem": "Manual job searching consumes hours and generic CVs have low response rates.",
      "solution": "Celery + Redis pipeline for async scraping, AI ranking and React dashboard with real-time metrics."
    },
    "tcg": {
      "tag": "Python · Streamlit · React Native",
      "name": "TCG Collection Manager",
      "desc": "Card collection management with price scraping, computer vision condition analysis, OCR and React Native app to scan physical cards from camera.",
      "problem": "Inventorying physical card collections is tedious and card prices fluctuate constantly.",
      "solution": "Streamlit dashboard + TCGPlayer scraping + mobile app with OpenCV and Tesseract OCR for condition analysis."
    },
    "financial": {
      "tag": "Flutter · Firebase · OpenAI",
      "name": "Family Finance",
      "desc": "Multi-platform family expense management app with AI financial analysis, voice expense entry via webhooks and family role permissions. 80% complete, 11 screens.",
      "problem": "Family expense management is fragmented and lacks intelligent analysis.",
      "solution": "Multi-platform Flutter with Riverpod, GPT-4o-mini for financial insights and Cloud Functions for voice webhooks (Google Assistant/Siri)."
    },
    "nocheAustral": {
      "tag": "Graduation Project · Full Platform",
      "name": "Noche Austral",
      "desc": "Complete astronomy outreach platform as graduation project: Flutter app (16,000+ lines) + Django web CMS deployed on Google Cloud.",
      "problem": "The university needed an astronomy outreach platform with mobile app and web CMS for editorial management.",
      "solution": "Flutter app with moon phases, ISS tracker, NASA APOD, 3 educational games and Firebase Auth. Django CMS with articles, comments and GCP App Engine deploy.",
      "mobileLabel": "Mobile app",
      "webLabel": "Web platform",
      "appGithub": "App GitHub →",
      "webGithub": "Web GitHub →"
    }
  },
  "tools": {
    "label": "Professional tools",
    "title": "Built in real work context",
    "sub": "Internal utilities that solve concrete operational problems — from idea to production in days",
    "dbBackup": {
      "name": "DB Backup & Restore Tool",
      "desc": "CLI + GUI for intelligent PostgreSQL database cloning between environments. SSH tunneling, date filtering and workflow presets. Dry-run mode for safe preview before executing."
    },
    "kmlValidator": {
      "name": "KML Validator Suite",
      "desc": "5 integrated tools to validate, compare and analyze Google Earth KML files. Detects structural errors and generates visual debug files for diagnosis."
    },
    "userManager": {
      "name": "User Manager v2",
      "desc": "Web platform for centralized user management with AWS Cognito. Angular frontend, FastAPI backend and infrastructure as code with AWS CDK — ECS Fargate + CloudFront."
    }
  },
  "experience": {
    "label": "Experience",
    "title": "Career path",
    "migtra": {
      "company": "Migtra",
      "role": "Backend Developer → Tech Lead",
      "desc": "Python backend (2.7 and 3.10) on AWS for GPS telemetry platform. Grew from support developer to Tech Lead of 2 junior developers — onboarding, code review, architecture and active mentoring."
    },
    "gesitech": {
      "company": "Gesitech",
      "role": "Backend Developer",
      "desc": "Flutter/Dart mobile apps with Firebase. Personal company initiative, paused to focus on Migtra."
    },
    "nocheAustral": {
      "company": "Noche Austral · University Project",
      "role": "Full Stack Developer",
      "desc": "Complete astronomy outreach platform as graduation project: Flutter app + Firebase and Django web CMS deployed on GCP App Engine."
    },
    "pervasivemind": {
      "company": "PervasiveMind",
      "role": "Internship — Data & Web Scraping",
      "desc": "Price data collection and processing via web scraping. Python, BeautifulSoup, data analysis."
    }
  },
  "skills": {
    "label": "Skills",
    "title": "Technologies",
    "groups": {
      "backend": "Backend · Databases",
      "cloud": "Cloud · DevOps",
      "ai": "AI · Mobile · Frontend"
    }
  },
  "contact": {
    "label": "Contact",
    "title": "Let's talk?",
    "sub": "Open to job opportunities and freelance projects. If you have a backend, automation or AI integration problem to solve, reach out.",
    "name": "Your name",
    "email": "Your email",
    "message": "Message...",
    "send": "Send message",
    "sending": "Sending...",
    "success": "Message sent! I'll get back to you soon.",
    "error": "Error sending. Write me directly at chris.rangel.intriago@gmail.com"
  },
  "footer": {
    "made": "Built with React + Vite"
  }
}
```

- [ ] **Step 4.3: Renombrar `src/i18n.js` a `src/i18n.ts`**

```typescript
import i18n from 'i18next'
import { initReactI18next } from 'react-i18next'
import enTranslation from './locales/en/translation.json'
import esTranslation from './locales/es/translation.json'

i18n.use(initReactI18next).init({
  resources: {
    en: { translation: enTranslation },
    es: { translation: esTranslation },
  },
  lng: 'es',
  fallbackLng: 'es',
  interpolation: { escapeValue: false },
})

export default i18n
```

- [ ] **Step 4.4: Commit**

```bash
git add src/locales/ src/i18n.ts
git rm src/i18n.js
git commit -m "feat: update i18n content with real data, ES and EN"
```

---

## Task 5: Componentes base

**Files:**
- Create: `src/components/StackPill.tsx`, `src/components/StatCard.tsx`
- Modify: `src/components/Navbar.tsx` (reescribir desde cero)

- [ ] **Step 5.1: Crear `src/components/StackPill.tsx`**

```typescript
interface StackPillProps {
  label: string
  color: 'amber' | 'sky' | 'gray' | 'purple'
}

const colorMap = {
  amber: 'bg-amber-dim border border-amber text-amber',
  sky: 'bg-sky-dim border border-sky text-sky-accent',
  gray: 'bg-white/[0.04] border border-white/[0.07] text-[#6b7280]',
  purple: 'bg-purple-500/[0.08] border border-purple-500/20 text-purple-400',
}

export default function StackPill({ label, color }: StackPillProps) {
  return (
    <span className={`px-2 py-1 rounded text-[11px] font-mono ${colorMap[color]}`}>
      {label}
    </span>
  )
}
```

- [ ] **Step 5.2: Crear `src/components/StatCard.tsx`**

```typescript
interface StatCardProps {
  value: string
  label: string
  variant: 'amber' | 'sky'
}

export default function StatCard({ value, label, variant }: StatCardProps) {
  const isAmber = variant === 'amber'
  return (
    <div className={`rounded-xl p-4 text-center ${
      isAmber
        ? 'bg-amber-dim border border-amber'
        : 'bg-sky-dim border border-sky'
    }`}>
      <div className={`text-3xl font-black leading-none ${isAmber ? 'text-amber' : 'text-sky-accent'}`}>
        {value}
      </div>
      <div className={`text-[10px] uppercase tracking-widest mt-1 text-[#6b7280]`}>
        {label}
      </div>
    </div>
  )
}
```

- [ ] **Step 5.3: Reescribir `src/components/Navbar.tsx`**

```typescript
import { useState } from 'react'
import { useTranslation } from 'react-i18next'

const NAV_KEYS = ['about', 'projects', 'tools', 'experience', 'skills'] as const

export default function Navbar() {
  const { t, i18n } = useTranslation()
  const [menuOpen, setMenuOpen] = useState(false)

  const toggleLang = () =>
    i18n.changeLanguage(i18n.language === 'es' ? 'en' : 'es')

  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })
    setMenuOpen(false)
  }

  return (
    <nav className="sticky top-0 z-50 flex justify-between items-center px-8 py-4
                    bg-[rgba(6,8,16,0.90)] backdrop-blur-md border-b border-white/[0.07]">
      <span className="font-black text-base text-amber tracking-wide">
        Christian Rangel
      </span>

      {/* Desktop links */}
      <div className="hidden md:flex gap-6 items-center text-[13px] text-[#6b7280]">
        {NAV_KEYS.map(key => (
          <button
            key={key}
            onClick={() => scrollTo(key)}
            className="hover:text-white transition-colors"
          >
            {t(`nav.${key}`)}
          </button>
        ))}
        <button
          onClick={() => scrollTo('contact')}
          className="border border-amber text-amber px-4 py-1.5 rounded-md text-[12px]
                     hover:bg-amber-dim transition-colors"
        >
          {t('nav.contact')}
        </button>
        <button
          onClick={toggleLang}
          className="border border-white/[0.1] text-[#6b7280] px-3 py-1 rounded text-[11px]
                     hover:text-white transition-colors"
        >
          {i18n.language === 'es' ? 'EN' : 'ES'}
        </button>
      </div>

      {/* Mobile hamburger */}
      <button
        className="md:hidden text-[#6b7280] hover:text-white"
        onClick={() => setMenuOpen(v => !v)}
      >
        {menuOpen ? '✕' : '☰'}
      </button>

      {/* Mobile menu */}
      {menuOpen && (
        <div className="absolute top-full left-0 right-0 bg-[#0d1117] border-b border-white/[0.07]
                        flex flex-col gap-4 px-8 py-6 md:hidden">
          {NAV_KEYS.map(key => (
            <button
              key={key}
              onClick={() => scrollTo(key)}
              className="text-left text-[14px] text-[#6b7280] hover:text-white"
            >
              {t(`nav.${key}`)}
            </button>
          ))}
          <button
            onClick={() => scrollTo('contact')}
            className="text-left text-amber text-[14px]"
          >
            {t('nav.contact')}
          </button>
          <button onClick={toggleLang} className="text-left text-[12px] text-[#6b7280]">
            {i18n.language === 'es' ? 'Switch to EN' : 'Cambiar a ES'}
          </button>
        </div>
      )}
    </nav>
  )
}
```

- [ ] **Step 5.4: Commit**

```bash
git add src/components/
git commit -m "feat: add StackPill, StatCard components, rewrite Navbar"
```

---

## Task 6: Sección Hero

**Files:**
- Modify: `src/sections/Hero.tsx` (reescribir)

- [ ] **Step 6.1: Reescribir `src/sections/Hero.tsx`**

```typescript
import { motion } from 'framer-motion'
import { useTranslation } from 'react-i18next'
import StatCard from '../components/StatCard'
import StackPill from '../components/StackPill'

const STACK_PILLS = [
  { label: 'python', color: 'amber' as const },
  { label: 'django', color: 'amber' as const },
  { label: 'fastapi', color: 'amber' as const },
  { label: 'postgresql', color: 'amber' as const },
  { label: 'flutter', color: 'amber' as const },
  { label: 'aws', color: 'gray' as const },
  { label: 'docker', color: 'gray' as const },
  { label: 'linux', color: 'gray' as const },
  { label: 'claude api', color: 'sky' as const },
  { label: 'llm integration', color: 'sky' as const },
]

export default function Hero() {
  const { t } = useTranslation()

  return (
    <>
      {/* Hero */}
      <section
        id="hero"
        className="px-8 py-20 border-b border-white/[0.07]"
        style={{
          background:
            'radial-gradient(ellipse 80% 60% at 50% -10%, rgba(240,165,0,0.07) 0%, transparent 70%), linear-gradient(180deg, #0d1117 0%, #060810 100%)',
        }}
      >
        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-[1fr_auto] gap-10 items-center">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            {/* Badge */}
            <div className="flex items-center gap-2 text-[11px] text-amber uppercase tracking-[3px] mb-5">
              <span className="w-2 h-2 rounded-full bg-green-400 shadow-[0_0_8px_#4ade80]" />
              {t('hero.badge')}
            </div>

            {/* Title */}
            <h1 className="text-5xl font-black leading-[1.1] mb-4 text-white">
              {t('hero.title1')}
              <br />
              <span className="text-amber">
                {t('hero.title2')}{' '}
                <span className="text-sky-accent">{t('hero.titleAi')}</span>
              </span>
            </h1>

            {/* Subtitle */}
            <p className="text-[15px] text-[#9ca3af] max-w-[460px] leading-[1.75] mb-7">
              {t('hero.subtitle')
                .split('<amber>')
                .flatMap((part, i) => {
                  if (i === 0) return [part]
                  const [highlight, rest] = part.split('</amber>')
                  return [
                    <strong key={i} className="text-amber font-semibold">{highlight}</strong>,
                    rest,
                  ]
                })}
            </p>

            {/* CTAs */}
            <div className="flex gap-3">
              <button
                onClick={() => document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' })}
                className="bg-amber text-black px-5 py-2.5 rounded-lg text-[13px] font-bold
                           hover:bg-amber/90 transition-colors"
              >
                {t('hero.cta')}
              </button>
              <a
                href="/Christian_Rangel_CV.pdf"
                download
                className="border border-sky text-sky-accent px-5 py-2.5 rounded-lg text-[13px]
                           hover:bg-sky-dim transition-colors"
              >
                {t('hero.cv')}
              </a>
            </div>
          </motion.div>

          {/* Stats */}
          <motion.div
            className="flex flex-col gap-3 min-w-[120px]"
            initial={{ opacity: 0, x: 24 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <StatCard value={t('hero.stat1.value')} label={t('hero.stat1.label')} variant="amber" />
            <StatCard value={t('hero.stat2.value')} label={t('hero.stat2.label')} variant="amber" />
            <StatCard value={t('hero.stat3.value')} label={t('hero.stat3.label')} variant="sky" />
          </motion.div>
        </div>
      </section>

      {/* Stack strip */}
      <div className="px-8 py-3.5 border-b border-white/[0.07] bg-[#0d1117] flex items-center gap-3 flex-wrap">
        <span className="text-[10px] text-[#6b7280] uppercase tracking-[2px] whitespace-nowrap">Stack</span>
        <div className="w-px h-4 bg-white/[0.07]" />
        <div className="flex gap-1.5 flex-wrap">
          {STACK_PILLS.map(p => (
            <StackPill key={p.label} label={p.label} color={p.color} />
          ))}
        </div>
      </div>
    </>
  )
}
```

- [ ] **Step 6.2: Verificar en browser**

```bash
npm run dev
```

Navegar a `http://localhost:3000`. El hero debe mostrar título, subtítulo con "80 tickets/mes eliminados" en ámbar, stat cards y stack strip.

- [ ] **Step 6.3: Commit**

```bash
git add src/sections/Hero.tsx
git commit -m "feat: rewrite Hero section with amber+sky design and real metrics"
```

---

## Task 7: Sección About

**Files:**
- Modify: `src/sections/About.tsx`

- [ ] **Step 7.1: Reescribir `src/sections/About.tsx`**

```typescript
import { motion } from 'framer-motion'
import { useTranslation } from 'react-i18next'

const ABOUT_CARDS = [
  { key: 'backend', icon: '🐍', borderColor: 'border-l-amber' },
  { key: 'cloud',   icon: '☁️', borderColor: 'border-l-amber' },
  { key: 'ai',      icon: '🤖', borderColor: 'border-l-sky',   titleClass: 'text-sky-accent' },
  { key: 'mobile',  icon: '📱', borderColor: 'border-l-amber' },
] as const

export default function About() {
  const { t } = useTranslation()

  return (
    <section id="about" className="px-8 py-16 border-b border-white/[0.07]">
      <div className="max-w-6xl mx-auto">
        <p className="text-[10px] text-amber uppercase tracking-[3px] mb-2">{t('about.label')}</p>
        <h2 className="text-3xl font-black mb-10 text-white">{t('about.title')}</h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
          {/* Bio */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <p className="text-[15px] text-[#9ca3af] leading-[1.85]">{t('about.bio')}</p>
            <div className="inline-flex items-center gap-2 mt-4 px-3 py-1.5 rounded-md
                            bg-sky-dim border border-sky text-sky-accent text-[12px]">
              🎓 {t('about.diploma')}
            </div>
          </motion.div>

          {/* Cards */}
          <div className="flex flex-col gap-3">
            {ABOUT_CARDS.map(({ key, icon, borderColor, titleClass }, i) => (
              <motion.div
                key={key}
                className={`bg-[#161b22] border border-white/[0.07] border-l-2 ${borderColor}
                            rounded-lg px-4 py-3.5 flex gap-4 items-start`}
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.08 }}
              >
                <span className="text-xl mt-0.5 flex-shrink-0">{icon}</span>
                <div>
                  <div className={`text-[13px] font-bold mb-0.5 ${titleClass ?? 'text-white'}`}>
                    {t(`about.cards.${key}.title`)}
                  </div>
                  <div className="text-[12px] text-[#6b7280]">
                    {t(`about.cards.${key}.sub`)}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
```

- [ ] **Step 7.2: Commit**

```bash
git add src/sections/About.tsx
git commit -m "feat: rewrite About section with real bio and cert badge"
```

---

## Task 8: Componentes de proyecto y sección Projects

**Files:**
- Create: `src/components/ProjectCard.tsx`, `src/components/FeaturedProjectCard.tsx`
- Modify: `src/sections/Projects.tsx`

- [ ] **Step 8.1: Crear `src/components/ProjectCard.tsx`**

```typescript
import { useTranslation } from 'react-i18next'
import { motion } from 'framer-motion'
import type { Project } from '../data/projects'
import { BADGE_STYLES } from '../data/projects'
import StackPill from './StackPill'

export default function ProjectCard({ project, index }: { project: Project; index: number }) {
  const { t } = useTranslation()

  return (
    <motion.div
      className="bg-[#0d1117] border border-white/[0.07] rounded-xl overflow-hidden
                 hover:border-amber transition-colors duration-200"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.4, delay: index * 0.08 }}
    >
      {/* Visual */}
      <div className="h-28 bg-gradient-to-br from-amber-dim to-transparent border-b border-amber
                      flex items-center justify-center text-5xl relative">
        {project.emoji}
        <span className={`absolute top-2 right-2 text-[10px] px-2 py-0.5 rounded-full font-bold
                          ${BADGE_STYLES[project.badgeColor]}`}>
          {project.badge}
        </span>
      </div>

      {/* Body */}
      <div className="p-5">
        <p className="text-[10px] text-amber uppercase tracking-[2px] mb-2">
          {t(project.tagKey)}
        </p>
        <h3 className="text-[17px] font-black text-white mb-2">{t(project.nameKey)}</h3>
        <p className="text-[13px] text-[#6b7280] leading-[1.65] mb-4">{t(project.descKey)}</p>

        {/* Steps */}
        <div className="flex flex-col gap-2 mb-4">
          {[
            { label: t('projects.problemLabel'), key: project.problemKey, letter: 'P' },
            { label: t('projects.solutionLabel'), key: project.solutionKey, letter: 'S' },
          ].map(({ key, letter }) => (
            <div key={letter} className="flex gap-2 items-start">
              <span className="min-w-[20px] h-5 bg-amber-dim border border-amber rounded
                               flex items-center justify-center text-[10px] font-bold text-amber
                               flex-shrink-0 mt-0.5">
                {letter}
              </span>
              <span className="text-[12px] text-[#6b7280] leading-[1.5]">{t(key)}</span>
            </div>
          ))}
        </div>

        {/* Stack */}
        <div className="flex gap-1.5 flex-wrap mb-4">
          {project.stack.map(s => (
            <StackPill key={s.label} label={s.label} color={s.color} />
          ))}
        </div>

        {/* Links */}
        <div className="flex gap-2">
          {project.github && (
            <a href={project.github} target="_blank" rel="noreferrer"
               className="px-3.5 py-1.5 rounded-md text-[12px] font-semibold
                          border border-white/[0.1] text-[#6b7280] hover:text-white transition-colors">
              {t('projects.github')}
            </a>
          )}
          {project.demo && (
            <a href={project.demo} target="_blank" rel="noreferrer"
               className="px-3.5 py-1.5 rounded-md text-[12px] font-semibold
                          bg-amber-dim border border-amber text-amber hover:bg-amber/20 transition-colors">
              {t('projects.demo')}
            </a>
          )}
        </div>
      </div>
    </motion.div>
  )
}
```

- [ ] **Step 8.2: Crear `src/components/FeaturedProjectCard.tsx`**

```typescript
import { useTranslation } from 'react-i18next'
import { motion } from 'framer-motion'
import type { Project } from '../data/projects'
import StackPill from './StackPill'

export default function FeaturedProjectCard({ project }: { project: Project }) {
  const { t } = useTranslation()
  const fd = project.featuredData!

  return (
    <motion.div
      className="col-span-2 bg-[#0d1117] border border-white/[0.07] rounded-xl overflow-hidden
                 hover:border-purple-500/30 transition-colors duration-200"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
    >
      <div className="grid grid-cols-1 md:grid-cols-2">
        {/* Left */}
        <div className="p-7 md:border-r border-white/[0.07]">
          <p className="text-[10px] text-sky-accent uppercase tracking-[2px] mb-2">
            {t(project.tagKey)}
          </p>
          <h3 className="text-xl font-black text-white mb-3">{t(project.nameKey)}</h3>
          <p className="text-[13px] text-[#6b7280] leading-[1.65] mb-4">{t(project.descKey)}</p>

          <div className="flex flex-col gap-2 mb-4">
            {[
              { letter: 'M', key: 'projects.nocheAustral.mobileLabel', desc: project.solutionKey },
            ].map(() => null)}
            <div className="flex gap-2 items-start">
              <span className="min-w-[20px] h-5 bg-sky-dim border border-sky rounded
                               flex items-center justify-center text-[10px] font-bold text-sky-accent
                               flex-shrink-0 mt-0.5">M</span>
              <span className="text-[12px] text-[#6b7280] leading-[1.5]">
                <strong className="text-white">{t('projects.nocheAustral.mobileLabel')}:</strong>{' '}
                {t('projects.nocheAustral.solution').split('. ')[0]}.
              </span>
            </div>
            <div className="flex gap-2 items-start">
              <span className="min-w-[20px] h-5 bg-sky-dim border border-sky rounded
                               flex items-center justify-center text-[10px] font-bold text-sky-accent
                               flex-shrink-0 mt-0.5">W</span>
              <span className="text-[12px] text-[#6b7280] leading-[1.5]">
                <strong className="text-white">{t('projects.nocheAustral.webLabel')}:</strong>{' '}
                {t('projects.nocheAustral.solution').split('. ')[1]}.
              </span>
            </div>
          </div>

          <div className="flex gap-1.5 flex-wrap mb-5">
            {project.stack.map(s => (
              <StackPill key={s.label} label={s.label} color={s.color} />
            ))}
          </div>

          <div className="flex gap-2 flex-wrap">
            {project.github && (
              <a href={project.github} target="_blank" rel="noreferrer"
                 className="px-3.5 py-1.5 rounded-md text-[12px] font-semibold
                            border border-white/[0.1] text-[#6b7280] hover:text-white transition-colors">
                {t('projects.nocheAustral.appGithub')}
              </a>
            )}
            {project.demo && (
              <a href={project.demo} target="_blank" rel="noreferrer"
                 className="px-3.5 py-1.5 rounded-md text-[12px] font-semibold
                            border border-white/[0.1] text-[#6b7280] hover:text-white transition-colors">
                {t('projects.nocheAustral.webGithub')}
              </a>
            )}
          </div>
        </div>

        {/* Right — screens */}
        <div className="p-7">
          <p className="text-[10px] text-[#6b7280] uppercase tracking-[2px] mb-3">
            {t('projects.nocheAustral.mobileLabel')}
          </p>
          <div className="grid grid-cols-3 gap-2 mb-4">
            {fd.mobileScreens.map((emoji, i) => (
              <div key={i}
                   className="bg-[#161b22] border border-white/[0.07] rounded-lg
                              aspect-[9/16] flex items-center justify-center text-2xl">
                {emoji}
              </div>
            ))}
          </div>
          <p className="text-[10px] text-[#6b7280] uppercase tracking-[2px] mb-2">
            {t('projects.nocheAustral.webLabel')}
          </p>
          <div className="bg-[#161b22] border border-white/[0.07] rounded-lg h-20
                          flex items-center justify-center text-2xl mb-3">
            {fd.webPreview}
          </div>
          <div className="flex gap-2 flex-wrap">
            {fd.chips.map(chip => (
              <span key={chip}
                    className="bg-purple-500/[0.08] border border-purple-500/20 text-purple-400
                               px-2.5 py-1 rounded text-[11px] font-semibold">
                {chip}
              </span>
            ))}
          </div>
        </div>
      </div>
    </motion.div>
  )
}
```

- [ ] **Step 8.3: Reescribir `src/sections/Projects.tsx`**

```typescript
import { useTranslation } from 'react-i18next'
import { projects } from '../data/projects'
import ProjectCard from '../components/ProjectCard'
import FeaturedProjectCard from '../components/FeaturedProjectCard'

export default function Projects() {
  const { t } = useTranslation()
  const regular = projects.filter(p => !p.featured)
  const featured = projects.find(p => p.featured)!

  return (
    <section id="projects" className="px-8 py-16 border-b border-white/[0.07]">
      <div className="max-w-6xl mx-auto">
        <p className="text-[10px] text-amber uppercase tracking-[3px] mb-2">{t('projects.label')}</p>
        <h2 className="text-3xl font-black text-white mb-2">{t('projects.title')}</h2>
        <p className="text-[14px] text-[#6b7280] mb-10">{t('projects.sub')}</p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {regular.map((p, i) => (
            <ProjectCard key={p.id} project={p} index={i} />
          ))}
          <FeaturedProjectCard project={featured} />
        </div>
      </div>
    </section>
  )
}
```

- [ ] **Step 8.4: Verificar en browser que los 5 proyectos aparecen**

```bash
npm run dev
```

Esperado: 4 tarjetas regulares + 1 featured (Noche Austral) de ancho completo.

- [ ] **Step 8.5: Commit**

```bash
git add src/components/ProjectCard.tsx src/components/FeaturedProjectCard.tsx src/sections/Projects.tsx
git commit -m "feat: add ProjectCard, FeaturedProjectCard, rewrite Projects section"
```

---

## Task 9: Sección Tools

**Files:**
- Create: `src/components/ToolCard.tsx`, `src/sections/Tools.tsx`

- [ ] **Step 9.1: Crear `src/components/ToolCard.tsx`**

```typescript
import { useTranslation } from 'react-i18next'
import { motion } from 'framer-motion'
import type { Tool } from '../data/tools'
import StackPill from './StackPill'

export default function ToolCard({ tool, index }: { tool: Tool; index: number }) {
  const { t } = useTranslation()

  return (
    <motion.div
      className="bg-[#0d1117] border border-white/[0.07] rounded-xl p-5
                 hover:border-white/[0.14] transition-colors duration-200"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.4, delay: index * 0.1 }}
    >
      <div className="text-3xl mb-3">{tool.icon}</div>
      <h3 className="text-[15px] font-bold text-white mb-2">{t(tool.nameKey)}</h3>
      <p className="text-[12px] text-[#6b7280] leading-[1.65] mb-3">{t(tool.descKey)}</p>
      <div className="flex gap-1.5 flex-wrap">
        {tool.stack.map(s => (
          <StackPill key={s.label} label={s.label} color={s.color} />
        ))}
      </div>
    </motion.div>
  )
}
```

- [ ] **Step 9.2: Crear `src/sections/Tools.tsx`**

```typescript
import { useTranslation } from 'react-i18next'
import { tools } from '../data/tools'
import ToolCard from '../components/ToolCard'

export default function Tools() {
  const { t } = useTranslation()

  return (
    <section id="tools" className="px-8 py-16 border-b border-white/[0.07] bg-[#0a0c12]">
      <div className="max-w-6xl mx-auto">
        <p className="text-[10px] text-amber uppercase tracking-[3px] mb-2">{t('tools.label')}</p>
        <h2 className="text-3xl font-black text-white mb-2">{t('tools.title')}</h2>
        <p className="text-[14px] text-[#6b7280] mb-10">{t('tools.sub')}</p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {tools.map((tool, i) => (
            <ToolCard key={tool.id} tool={tool} index={i} />
          ))}
        </div>
      </div>
    </section>
  )
}
```

- [ ] **Step 9.3: Commit**

```bash
git add src/components/ToolCard.tsx src/sections/Tools.tsx
git commit -m "feat: add Tools section with professional tools"
```

---

## Task 10: Sección Experience

**Files:**
- Modify: `src/sections/Experience.tsx`

- [ ] **Step 10.1: Reescribir `src/sections/Experience.tsx`**

```typescript
import { useTranslation } from 'react-i18next'
import { motion } from 'framer-motion'
import { experiences } from '../data/experience'

export default function Experience() {
  const { t } = useTranslation()

  return (
    <section id="experience" className="px-8 py-16 border-b border-white/[0.07]">
      <div className="max-w-6xl mx-auto">
        <p className="text-[10px] text-amber uppercase tracking-[3px] mb-2">{t('experience.label')}</p>
        <h2 className="text-3xl font-black text-white mb-10">{t('experience.title')}</h2>

        <div className="flex flex-col">
          {experiences.map((exp, i) => (
            <motion.div
              key={exp.id}
              className="grid grid-cols-[auto_1fr] gap-5 py-6 border-b border-white/[0.07] last:border-0"
              initial={{ opacity: 0, x: -16 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: i * 0.08 }}
            >
              {/* Dot + line */}
              <div className="flex flex-col items-center pt-1">
                <div className={`w-2.5 h-2.5 rounded-full flex-shrink-0 ${
                  exp.active ? 'bg-amber shadow-[0_0_8px_rgba(240,165,0,0.5)]' : 'bg-[#6b7280]'
                }`} />
                {i < experiences.length - 1 && (
                  <div className="w-px flex-1 bg-white/[0.07] mt-1.5" />
                )}
              </div>

              {/* Content */}
              <div>
                <p className={`text-[11px] font-bold uppercase tracking-[1px] mb-0.5 ${
                  exp.active ? 'text-amber' : 'text-[#6b7280]'
                }`}>
                  {t(exp.companyKey)}
                </p>
                <h3 className="text-[15px] font-black text-white mb-1">{t(exp.roleKey)}</h3>
                <p className="text-[11px] text-[#6b7280] mb-2">{exp.period}</p>
                <p className="text-[13px] text-[#6b7280] leading-[1.65]">{t(exp.descKey)}</p>

                {exp.metrics && (
                  <div className="flex gap-2 flex-wrap mt-3">
                    {exp.metrics.map(m => (
                      <span key={m}
                            className="bg-amber-dim border border-amber text-amber
                                       px-2.5 py-1 rounded text-[11px] font-semibold">
                        {m}
                      </span>
                    ))}
                  </div>
                )}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
```

- [ ] **Step 10.2: Commit**

```bash
git add src/sections/Experience.tsx
git commit -m "feat: rewrite Experience section with timeline and metric chips"
```

---

## Task 11: Sección Skills

**Files:**
- Modify: `src/sections/Skills.tsx`

- [ ] **Step 11.1: Reescribir `src/sections/Skills.tsx`**

```typescript
import { useTranslation } from 'react-i18next'
import { motion } from 'framer-motion'
import { skillGroups } from '../data/skills'

export default function Skills() {
  const { t } = useTranslation()

  return (
    <section id="skills" className="px-8 py-16 border-b border-white/[0.07] bg-[#0d1117]">
      <div className="max-w-6xl mx-auto">
        <p className="text-[10px] text-amber uppercase tracking-[3px] mb-2">{t('skills.label')}</p>
        <h2 className="text-3xl font-black text-white mb-10">{t('skills.title')}</h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {skillGroups.map((group, gi) => (
            <div key={group.labelKey}>
              <p className={`text-[10px] uppercase tracking-[2px] mb-4 ${
                group.color === 'sky' ? 'text-sky-accent' : 'text-amber'
              }`}>
                {t(group.labelKey)}
              </p>
              <div className="flex flex-col gap-3">
                {group.skills.map((skill, si) => (
                  <motion.div
                    key={skill.name}
                    className="flex items-center gap-3"
                    initial={{ opacity: 0, x: -12 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.3, delay: gi * 0.1 + si * 0.04 }}
                  >
                    <span className="text-[13px] text-white min-w-[90px]">{skill.name}</span>
                    <div className="flex-1 h-1 bg-white/[0.06] rounded-full overflow-hidden">
                      <motion.div
                        className={`h-full rounded-full ${skill.color === 'sky' ? 'bg-sky-accent' : 'bg-amber'}`}
                        initial={{ width: 0 }}
                        whileInView={{ width: `${skill.level}%` }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6, delay: gi * 0.1 + si * 0.04 }}
                      />
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
```

- [ ] **Step 11.2: Commit**

```bash
git add src/sections/Skills.tsx
git commit -m "feat: rewrite Skills section with animated dual-color bars"
```

---

## Task 12: Formulario de contacto + API Resend

**Files:**
- Create: `api/contact.ts`, `vercel.json`
- Modify: `src/sections/Contact.tsx`

- [ ] **Step 12.1: Crear `api/contact.ts`**

```typescript
import type { VercelRequest, VercelResponse } from '@vercel/node'
import { Resend } from 'resend'

const resend = new Resend(process.env.RESEND_API_KEY)

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' })
  }

  const { name, email, message } = req.body as {
    name: string
    email: string
    message: string
  }

  if (!name || !email || !message) {
    return res.status(400).json({ error: 'Missing fields' })
  }

  try {
    await resend.emails.send({
      from: 'Portfolio <onboarding@resend.dev>',
      to: 'chris.rangel.intriago@gmail.com',
      replyTo: email,
      subject: `Contacto portafolio — ${name}`,
      html: `
        <h2>Nuevo mensaje desde el portafolio</h2>
        <p><strong>Nombre:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Mensaje:</strong></p>
        <p>${message.replace(/\n/g, '<br/>')}</p>
      `,
    })
    return res.status(200).json({ ok: true })
  } catch (err) {
    console.error('Resend error:', err)
    return res.status(500).json({ error: 'Failed to send email' })
  }
}
```

- [ ] **Step 12.2: Crear `vercel.json`**

```json
{
  "rewrites": [
    { "source": "/((?!api/).*)", "destination": "/index.html" }
  ]
}
```

- [ ] **Step 12.3: Reescribir `src/sections/Contact.tsx`**

```typescript
import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { motion } from 'framer-motion'

type FormState = 'idle' | 'sending' | 'success' | 'error'

export default function Contact() {
  const { t } = useTranslation()
  const [form, setForm] = useState({ name: '', email: '', message: '' })
  const [state, setState] = useState<FormState>('idle')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setState('sending')
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      })
      if (!res.ok) throw new Error()
      setState('success')
      setForm({ name: '', email: '', message: '' })
    } catch {
      setState('error')
    }
  }

  const inputClass = `w-full bg-[#161b22] border border-white/[0.07] text-white
                      px-4 py-3 rounded-lg text-[14px] outline-none
                      focus:border-amber/40 transition-colors placeholder:text-[#4b5563]`

  return (
    <section id="contact" className="px-8 py-16"
             style={{ background: 'radial-gradient(ellipse 60% 50% at 50% 100%, rgba(240,165,0,0.05), transparent)' }}>
      <div className="max-w-6xl mx-auto">
        <p className="text-[10px] text-amber uppercase tracking-[3px] mb-2">{t('contact.label')}</p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-start">
          {/* Left */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl font-black text-white mb-3">{t('contact.title')}</h2>
            <p className="text-[15px] text-[#6b7280] leading-[1.7] mb-6">{t('contact.sub')}</p>

            <div className="flex flex-col gap-3">
              {[
                { icon: '📧', text: 'chris.rangel.intriago@gmail.com', href: 'mailto:chris.rangel.intriago@gmail.com', variant: 'amber' },
                { icon: '💼', text: 'linkedin.com/in/christianrangelintriago', href: 'https://cl.linkedin.com/in/christian-elias-rangel-intriago-85a8a1293', variant: 'sky' },
                { icon: '🐙', text: 'github.com/Crispolein', href: 'https://github.com/Crispolein', variant: 'amber' },
              ].map(({ icon, text, href, variant }) => (
                <a key={href} href={href} target="_blank" rel="noreferrer"
                   className="flex items-center gap-3 text-[14px] text-[#6b7280] hover:text-white transition-colors group">
                  <span className={`w-9 h-9 rounded-lg flex items-center justify-center text-base flex-shrink-0 ${
                    variant === 'amber'
                      ? 'bg-amber-dim border border-amber'
                      : 'bg-sky-dim border border-sky'
                  }`}>
                    {icon}
                  </span>
                  {text}
                </a>
              ))}
            </div>
          </motion.div>

          {/* Form */}
          <motion.form
            onSubmit={handleSubmit}
            className="flex flex-col gap-3"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
          >
            <input
              className={inputClass}
              placeholder={t('contact.name')}
              value={form.name}
              onChange={e => setForm(f => ({ ...f, name: e.target.value }))}
              required
            />
            <input
              type="email"
              className={inputClass}
              placeholder={t('contact.email')}
              value={form.email}
              onChange={e => setForm(f => ({ ...f, email: e.target.value }))}
              required
            />
            <textarea
              className={`${inputClass} min-h-[110px] resize-y`}
              placeholder={t('contact.message')}
              value={form.message}
              onChange={e => setForm(f => ({ ...f, message: e.target.value }))}
              required
            />

            <button
              type="submit"
              disabled={state === 'sending'}
              className="w-full bg-amber text-black py-3 rounded-lg font-bold text-[14px]
                         hover:bg-amber/90 disabled:opacity-60 transition-colors"
            >
              {state === 'sending' ? t('contact.sending') : t('contact.send')}
            </button>

            {state === 'success' && (
              <p className="text-green-400 text-[13px] text-center">{t('contact.success')}</p>
            )}
            {state === 'error' && (
              <p className="text-red-400 text-[13px] text-center">{t('contact.error')}</p>
            )}
          </motion.form>
        </div>
      </div>
    </section>
  )
}
```

- [ ] **Step 12.4: Instalar tipos de Vercel para la función**

```bash
npm install --save-dev @vercel/node
```

- [ ] **Step 12.5: Commit**

```bash
git add api/contact.ts vercel.json src/sections/Contact.tsx
git commit -m "feat: add Resend contact API and rewrite Contact section"
```

---

## Task 13: Ensamblar App y limpiar archivos obsoletos

**Files:**
- Modify: `src/App.tsx`
- Delete: `src/components/ParticlesBackground.jsx`, `src/components/SectionWrapper.jsx`, `src/components/Button.jsx`
- Delete: `src/assets/blob.svg`, `src/assets/code-pattern.svg`
- Delete: `src/sections/Skills.jsx` (si existe .jsx sobrando), etc.

- [ ] **Step 13.1: Reescribir `src/App.tsx`**

```typescript
import './i18n'
import Navbar from './components/Navbar'
import Hero from './sections/Hero'
import About from './sections/About'
import Projects from './sections/Projects'
import Tools from './sections/Tools'
import Experience from './sections/Experience'
import Skills from './sections/Skills'
import Contact from './sections/Contact'

export default function App() {
  return (
    <div className="min-h-screen" style={{ background: '#060810', color: '#e5e7eb' }}>
      <Navbar />
      <main>
        <Hero />
        <About />
        <Projects />
        <Tools />
        <Experience />
        <Skills />
        <Contact />
      </main>
      <footer className="px-8 py-6 border-t border-white/[0.07] flex justify-between items-center text-[12px] text-[#6b7280]">
        <span className="font-black text-amber">Christian Rangel</span>
        <span>Ing. Civil Informático · Backend Python · AWS · IA — 2025</span>
        <span>Hecho con React + Vite</span>
      </footer>
    </div>
  )
}
```

- [ ] **Step 13.2: Eliminar archivos obsoletos**

```bash
git rm src/components/ParticlesBackground.jsx 2>/dev/null || true
git rm src/components/SectionWrapper.jsx 2>/dev/null || true
git rm src/components/Button.jsx 2>/dev/null || true
git rm src/assets/blob.svg 2>/dev/null || true
git rm src/assets/code-pattern.svg 2>/dev/null || true
# Eliminar versiones .jsx de secciones si quedaron duplicadas
git rm src/sections/Hero.jsx 2>/dev/null || true
git rm src/sections/About.jsx 2>/dev/null || true
git rm src/sections/Projects.jsx 2>/dev/null || true
git rm src/sections/Experience.jsx 2>/dev/null || true
git rm src/sections/Skills.jsx 2>/dev/null || true
git rm src/sections/Contact.jsx 2>/dev/null || true
git rm src/components/Navbar.jsx 2>/dev/null || true
git rm src/index.js 2>/dev/null || true
```

- [ ] **Step 13.3: Verificar build completo sin errores TypeScript**

```bash
npm run build
```

Esperado: `dist/` generado sin errores. Si hay errores de tipo, corregirlos antes de continuar.

- [ ] **Step 13.4: Verificar en browser — scroll completo**

```bash
npm run dev
```

Verificar:
- Navbar sticky funcional con scroll
- Toggle ES/EN cambia todo el texto
- Hero con métricas reales
- 5 proyectos + Noche Austral featured
- 3 herramientas profesionales
- Timeline de experiencia con metric chips en Migtra
- Skill bars animadas al scroll
- Formulario de contacto (sin enviar aún — requiere Vercel)
- Footer

- [ ] **Step 13.5: Commit final**

```bash
git add -A
git commit -m "feat: assemble complete portfolio redesign, remove obsolete files"
```

---

## Task 14: Deploy en Vercel

**Files:** Solo configuración externa, no hay archivos de código.

- [ ] **Step 14.1: Crear cuenta Resend y obtener API key**

1. Ir a [resend.com](https://resend.com) → crear cuenta gratuita
2. Dashboard → API Keys → Create API Key
3. Copiar la key (`re_xxxxxxxxx`)
4. En el primer uso, Resend requiere verificar un dominio o usar `onboarding@resend.dev` como remitente (el free tier permite esto)

- [ ] **Step 14.2: Conectar repo a Vercel**

1. Ir a [vercel.com](https://vercel.com) → New Project
2. Import git repository: `Crispolein/portafolio`
3. Framework preset: **Vite** (Vercel lo detecta automáticamente)
4. Root directory: `.` (raíz)
5. Build command: `npm run build`
6. Output directory: `dist`

- [ ] **Step 14.3: Agregar variable de entorno en Vercel**

En el dashboard de Vercel → Settings → Environment Variables:
```
RESEND_API_KEY = re_xxxxxxxxx
```
Aplicar a Production, Preview y Development.

- [ ] **Step 14.4: Deploy**

```bash
git push origin main
```

Vercel detecta el push y despliega automáticamente. URL pública disponible en ~60 segundos.

- [ ] **Step 14.5: Verificar formulario en producción**

Ir a la URL pública de Vercel → sección Contacto → enviar mensaje de prueba → confirmar llegada a `chris.rangel.intriago@gmail.com`.

- [ ] **Step 14.6: Commit de documentación final**

```bash
git add docs/
git commit -m "docs: add portfolio redesign spec and implementation plan"
git push origin main
```

---

## Auto-revisión del plan

**Cobertura del spec:**
- ✅ Migración CRA → Vite (Task 1)
- ✅ Paleta ámbar + sky con semántica dual (Task 2)
- ✅ Datos tipados en `src/data/` (Task 3)
- ✅ i18n ES/EN con contenido real (Task 4)
- ✅ Navbar responsive con toggle de idioma (Task 5)
- ✅ Hero con métricas reales de CV Optimizer DB (Task 6)
- ✅ About con bio real + badge Diplomado IA (Task 7)
- ✅ 5 proyectos reales: CV Optimizer, Job Hunter, TCG, Financial, Noche Austral featured (Task 8)
- ✅ 3 herramientas profesionales adaptadas (Task 9)
- ✅ Timeline de experiencia con fechas correctas (Task 10)
- ✅ Skills con barras animadas duales (Task 11)
- ✅ Resend + Vercel serverless function (Task 12)
- ✅ App ensamblada, obsoletos eliminados (Task 13)
- ✅ Deploy Vercel + env vars (Task 14)

**Posibles issues a tener en cuenta durante ejecución:**
- Los archivos `.jsx` existentes se reescriben como `.tsx`. Si TypeScript encuentra tipos implícitos `any` en imports de `react-icons`, agregar `@ts-expect-error` o tipar explícitamente.
- `resend@^4.0.0` requiere Node 18+ en Vercel (default actual es Node 20, sin problema).
- La serverless function en `api/contact.ts` solo funciona en Vercel — en desarrollo local el formulario mostrará error (esperado). Para testear localmente instalar `vercel` CLI y usar `vercel dev`.
