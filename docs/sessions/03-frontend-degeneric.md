# Sesión 03 — Frontend: des-genericizar

**Estado:** Completada — 2026-07-12

## Objetivo

Eliminar los marcadores visuales de "sitio generado por IA" manteniendo la estructura del rediseño de junio 2026 y el sistema semántico de color (ámbar = humano/backend, cielo = IA), que es la decisión de diseño real del sitio y se conserva.

Al ejecutar esta sesión, **invocar la skill `frontend-design`** antes de tocar código.

## Evidencia (auditoría 2026-07-12 — 13 hallazgos, ordenados por impacto)

Severidad alta:

1. **Emojis como placeholders visuales** donde el visitante espera producto real: `src/data/projects.ts` (🧠🔍🃏🤖💸🌌 por proyecto) y `src/components/FeaturedProjectCard.tsx:79-93` (mobileScreens `['🌙','🛸','🎮']`, webPreview `'🌌'` — en el proyecto flagship que SÍ tiene repos públicos). Es el marcador más reconocible de "IA sin assets reales".
2. **Skill bars con porcentajes inventados**: `src/data/skills.ts:18-47` (Python 92%, AWS 78%…), render en `src/sections/Skills.tsx:32-41`. Nadie puede defender por qué 78 y no 80.
3. **Fórmula Problema/Solución con badges "P"/"S" idéntica en los 6 proyectos**: `src/components/ProjectCard.tsx:37-54`.
4. **Emojis como sistema de iconografía**: `src/sections/About.tsx:5-8,30` (🐍☁️🤖📱🎓), `src/sections/Contact.tsx:34-36` (📧💼🐙), `src/data/tools.ts:12,25,37` (🗄️🗺️👥), `src/components/Navbar.tsx:58` (☰/✕).
5. **Mismo fade-in-up de framer-motion en 7+ bloques** (opacity 0→1 + offset 12-24px, delay = index*0.08): Hero, About, ProjectCard, FeaturedProjectCard, Experience, Skills, Contact.

Severidad media: hex de superficie calcados de GitHub dark (`#060810/#0d1117/#161b22` en `src/index.css:14` y `tailwind.config.ts:18-22`) + glow/backdrop-blur de template SaaS; eyebrow uppercase `text-[10-11px] tracking-[2-3px]` repetido verbatim en las 7 secciones; tres lenguajes visuales distintos para métricas (StatCard, pills, barras); Inter como única tipografía (default de todo scaffold IA); acento morado fuera del sistema dual (`projects.ts:28`, `StackPill.tsx:10`, `FeaturedProjectCard.tsx:13,97`).

Severidad baja: footer "Hecho con React + Vite" (`src/App.tsx:23-27`); misma card shell en 4 componentes.

## Assets disponibles (verificados)

En `/Users/christian/herrramientas_personales/portfolio/`:

| Proyecto | Asset | Calidad |
|---|---|---|
| cv_optimizer | `screenshots/cv_optimizer/{hero,onboarding,tracker}.png` (1200×890) + `videos/cv_optimizer_demo.mp4` (7.6 s, 75 KB) | Buena. hero/onboarding muestran nombre y email propios de Christian — dato propio, publicable. |
| Noche Austral | `screenshots/astroweb/{hero,admin}.png` (tema claro "NocheAustral") + `screenshots/astronomia/hero.png` (tema oscuro "AstroNexo") — misma app en 2 iteraciones | Buena |
| portafolio | `screenshots/portafolio/*` | Solo para comparación antes/después |

**No usar** (rotos, ver sesión 05): busqueda_laboral, scrapingpokemon, financial. **No autorizados aún**: capturas de herramientas Migtra (usermanager, kml, chunksdownload, comparacion_assets).

## Prerequisitos

- Sesión 02 completada (el copy nuevo define qué muestran las cards).
- Working tree limpio; rama nueva recomendada.

## Checklist

### 1. Screenshots reales (máximo impacto)

- [x] Copiar assets buenos a `public/screenshots/` (optimizar peso: < 200 KB por imagen; `sips` o `squoosh`).
- [x] `ProjectCard` y `FeaturedProjectCard`: prop opcional `image`/`video`; con video, `<video muted loop playsInline>` reproducido en hover (el mp4 de cv_optimizer pesa 75 KB).
- [x] cv-optimizer: screenshot hero + video hover. Noche Austral (featured): reemplazar los 4 emojis por capturas reales de astroweb/astronomia.
- [x] Cards sin asset (job-hunter, tcg, pokemontcgai, financial): **quitar el área visual por completo** (layout compacto), nunca dejar emoji.

### 2. Iconografía

- [x] Crear `src/components/Icons.tsx` con SVG inline monocromos stroke (copiar paths de lucide, licencia MIT) — sin dependencia nueva.
- [x] Sustituir todos los emojis de About, Contact, `tools.ts`, Navbar (☰/✕) y los `emoji` de `projects.ts` que sobrevivan.

### 3. Skills sin porcentajes

- [x] `skills.ts`: eliminar `level`; agrupar por categoría con nivel cualitativo de 3 valores ("Uso diario" / "Cómodo" / "Aprendiendo").
- [x] `Skills.tsx`: eliminar barras; reusar `StackPill` existente agrupado, con el nivel como texto secundario.

### 4. Animaciones

- [x] Conservar solo la entrada del hero (`Hero.tsx:42-45,84-88`).
- [x] Quitar los `motion.*` clonados de About, ProjectCard, FeaturedProjectCard, Experience, Skills, Contact (render estático).

### 5. Paleta y superficie

- [x] Desplazar los hex de superficie para no calcar GitHub dark (ajustar tono/luminosidad en `tailwind.config.ts:18-22` e `index.css:14`); mantener contraste AA.
- [x] Eliminar el acento `purple`: `graduation` → estilo ámbar en `BADGE_STYLES` (`projects.ts:28`), quitar opción `purple` de `StackPill.tsx:10` y los usos en `FeaturedProjectCard.tsx:13,97`.
- [x] Reducir el combo glow + backdrop-blur (radial del hero `Hero.tsx:36-39`, blur del navbar).

### 6. Tipografía y detalles

- [x] Agregar familia display para h1/h2 (segunda familia en el import existente de Google Fonts en `index.css:1`; candidata: Space Grotesk). Inter queda para body. Compatible con la CSP de sesión 01 (fonts.googleapis ya permitido).
- [x] Romper el eyebrow uppercase en 2-3 secciones (quitar o integrar inline con el título).
- [x] Eliminar el scaffold visual P/S de `ProjectCard.tsx:37-54` (el copy ya viene reescrito de la sesión 02).
- [x] Footer (`App.tsx:23-27`): quitar "Hecho con React + Vite"; poner fecha de última actualización + link al repo del portafolio.
- [x] (Opcional, baja) Unificar lenguaje de métricas en pills; evaluar si StatCard del hero se mantiene como formato exclusivo del hero.

## Verificación

```bash
npm run build                                        # sin errores ni warnings TS
grep -rnE "🧠|🔍|🃏|🤖|💸|🌌|🐍|☁️|📱|🎓|📧|💼|🐙|🗄️|🗺️|👥" src/ && echo "FALLO: emojis" || echo OK
grep -rn "level:" src/data/skills.ts && echo "FALLO: %" || echo OK
grep -rn "purple" src/ && echo "FALLO: morado" || echo OK
npm run dev                                          # revisar en 375px y 768px; toggle ES/EN
```

Capturar screenshot de hero y grid de proyectos y compararlos contra `/Users/christian/herrramientas_personales/portfolio/screenshots/portafolio/{hero,projects}.png` (estado anterior).

Peso: total de imágenes por vista < 1 MB; `loading="lazy"` en imágenes bajo el fold.

## Fuera de alcance

- Regenerar assets rotos (sesión 05).
- Secciones nuevas (testimonios, blog, GitHub activity, diagramas de arquitectura) — candidatas futuras en sesión 05.
- Cambiar layout general o posicionamiento.

## Notas de ejecución (2026-07-12)

- Display font elegida: **Bricolage Grotesque** (no Space Grotesk — demasiado convergente con estética IA); Inter se mantiene en body según decisión ratificada.
- Paleta de superficie: grafito cálido `#0a0908 / #121110 / #1a1816` (coherente con identidad ámbar=humano), neutros stone (`muted #78716c`); tokens `surface/surface-2/surface-deep/muted` en tailwind.config.
- Extra sobre el plan: badges de categoría y chips del featured estaban hardcodeados en español — movidos a claves i18n (`projects.*.badge`, `projects.nocheAustral.chip1-4`).
- Verificado ejecutando: `tsc --noEmit` y `npm run build` limpios; greps de emojis/level/purple/hex-GitHub/motion = 0; screenshots full-page desktop ES y EN (0 errores de página) y mobile 375px; peso de screenshots ≈ 520 KB.
- **Decisión posterior de Christian (2026-07-12)**: los proyectos quedan SIN screenshots por ahora — se retiraron las refs de `projects.ts` y `public/screenshots/` no se versiona. El soporte `image`/`video` en ProjectCard y `screens` opcional en FeaturedProjectCard queda listo; para reactivar, copiar los assets (siguen en `herrramientas_personales/portfolio/screenshots/`) y reponer los campos.
