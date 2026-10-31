# Tareas del rediseño Fusión

Contexto obligatorio antes de cada tarea: `DESIGN.md`, `PRODUCT.md`, `design.md` y `MEMORY.md` de este change, y la lámina de `ref/` que nombre la tarea. Todo texto visible sale de `t()`. TDD: el test de la tarea se escribe primero y se ve fallar. Commits en español, sin atribución de IA.

Mientras el loop avanza, los componentes viejos siguen en el árbol hasta que la tarea que los reemplaza los borra. Si un cambio de tipos rompe un componente viejo, la tarea que lo deja sin callers lo borra; está en sus files.

- [x] T1 — Harness de tests: Vitest + Testing Library + Playwright · owner: claude · files: package.json, package-lock.json, tsconfig.json, .gitignore, vitest.config.ts, src/test/setup.ts, src/test/smoke.test.tsx, playwright.config.ts, e2e/smoke.spec.ts · verification: `npm run test && npx playwright test e2e/smoke.spec.ts`
  - Dev deps exactas: vitest, jsdom, @testing-library/react, @testing-library/jest-dom, @testing-library/user-event, @playwright/test, @axe-core/playwright. Ninguna otra.
  - Scripts: `"test": "vitest run"`, `"test:e2e": "playwright test"`.
  - `vitest.config.ts`: environment jsdom, setupFiles `src/test/setup.ts`, include `src/**/*.test.{ts,tsx}`, sin globals. `setup.ts` importa `@testing-library/jest-dom/vitest` y el `src/i18n.ts` real.
  - `tsconfig.json`: los tests de `src` compilan con `tsc` en `npm run build`; agrega solo lo necesario para los tipos de jest-dom y excluye `e2e` y los configs de test si hace falta.
  - `.gitignore`: `playwright-report/`, `test-results/`, `blob-report/`.
  - `playwright.config.ts`: solo chromium, `testDir: 'e2e'`, webServer `npm run build && npx vite preview --port 4173 --strictPort`, baseURL `http://localhost:4173`. Si falta el navegador, `npx playwright install chromium`.
  - `smoke.test.tsx` renderiza `<App />` y espera un heading de nivel 1. `smoke.spec.ts` abre `/` y espera un `h1` visible.

- [x] T2 — Tokens, tipografías, reveal y reduced motion · owner: claude · files: tailwind.config.ts, src/index.css, index.html, src/styles/tokens.test.ts · verification: `npx vitest run src/styles && npm run build`
  - dep T1.
  - Tokens de `DESIGN.md` como CSS vars en `:root` de `src/index.css` y mapeados en `tailwind.config.ts` con los mismos nombres: bg, term, line, txt, mut, amb, amb-hi, cy, ok. Reemplaza la paleta vieja.
  - `fontFamily.sans` Archivo, `fontFamily.mono` JetBrains Mono. En `index.html` preconnect y link de Google Fonts con Archivo `wdth,wght@80,400..800` y JetBrains Mono 400 y 500. Quita Inter y Bricolage. `<meta name="theme-color" content="#101a2b">`.
  - `body` con `--bg`, `--txt`, `font-sans`. Foco global: `:focus-visible` outline 2px `--amb` con offset 3px.
  - Clase `.rv` de reveal con `animation-timeline: view()` dentro de `@supports`, keyframes y animación del pipeline como en `DESIGN.md`. Bajo `prefers-reduced-motion: reduce` nada se anima y `.rv` queda visible.
  - `tokens.test.ts` lee `src/index.css` y `tailwind.config.ts` como texto o import y comprueba los 9 tokens con su hex exacto y el bloque de reduced motion.

- [ ] T3 — Copy es/en del rediseño · owner: claude · files: src/locales/es/translation.json, src/locales/en/translation.json, src/locales/locales.test.ts, scripts/extract-es.mjs · verification: `npx vitest run src/locales && node scripts/extract-es.mjs | python3 ~/.claude/skills/voz-christian/scripts/overlap_check.py`
  - dep T1.
  - Copia tal cual `openspec/changes/rediseno-fusion/copy/es.json` y `copy/en.json` a los dos `translation.json`. No reescribas textos: el copy está validado.
  - `locales.test.ts`: paridad exacta de keys y de largo de arrays entre es y en; en es ningún string contiene "—", ";", "(", ")" ni "90 %"; ningún string en ningún idioma contiene un teléfono, regex `\+?56\s?9|\b9\s?\d{4}\s?\d{4}\b`.
  - `scripts/extract-es.mjs` recorre el JSON es e imprime una línea por string con 6 palabras o más.

- [ ] T4 — Primitivas Button y CardLink · owner: claude · files: src/components/ui/Button.tsx, src/components/ui/CardLink.tsx, src/components/ui/ui.test.tsx · verification: `npx vitest run src/components/ui`
  - dep T2.
  - Estados según `ref/DirEstados.html` y `DESIGN.md`: reposo, hover, focus-visible, active con scale .97, disabled.
  - `Button`: variantes `solid` (fondo `--amb`, texto `--term`) y `ghost` (borde `--line`, texto `--txt`); prop `arrow` con flecha que se desplaza 3px en hover y se marca `aria-hidden`. Polimórfico: con `href` renderiza `<a>`, sin `href` renderiza `<button type="button">` salvo `type` explícito. Soporta `download`, `target`, `rel`, `disabled`, `aria-busy`.
  - `CardLink`: `<a>` de bloque con borde `--line` que pasa a `--amb` en hover y foco, flecha final que se desplaza, sin sombras ni glow. Acepta `onNavigate` para que el router intercepte el click sin modificadores.
  - Tests: rol y nombre accesible correctos, `<a>` vs `<button>`, `download` presente, flecha `aria-hidden`, click con y sin ctrl o meta sobre `CardLink` llama o no a `onNavigate`.

- [ ] T5 — Consola de 4 sistemas y Pipeline SVG · owner: claude · files: src/components/Console.tsx, src/components/Pipeline.tsx, src/data/systems.ts, src/components/Console.test.tsx · verification: `npx vitest run src/components/Console`
  - dep T2, T3.
  - Referencia visual: consola de `ref/DirDefinitivo.html` y pipeline vertical de `ref/DirMovil.html`.
  - `systems.ts`: orden telemetria, automatizacion, cvOptimizer, jobHunter; cada uno con `id`, prefijo de key `console.systems.<id>` y `aiNodes` (índices de nodos IA).
  - `Pipeline` según la fila "Pipeline" de `design.md`: props `nodes`, `aiNodes`, `ariaLabel`, `orientation`; `role="img"` con `aria-label`; nodos IA en `--amb`, resto en `--cy`; animación solo CSS.
  - `Console`: pestañas `role="radiogroup"` con `role="radio"`, `aria-checked`, roving tabindex; flechas izquierda y derecha ciclan, Home y End van a los extremos; al cambiar de sistema cambian `what`, pipeline (remontado con `key`) y log. Textos por `t()` y arrays con `returnObjects`.
  - Orientación: vertical bajo `matchMedia('(max-width: 640px)')`, con listener.
  - Tests: 4 radios con el primero marcado, ArrowRight marca el segundo y le da foco, End marca el último, el `aria-label` del pipeline cambia con el sistema.

- [ ] T7 — Story y Projects · owner: claude · files: src/sections/Story.tsx, src/sections/Projects.tsx, src/data/projects.ts, src/sections/Projects.test.tsx, src/components/ProjectCard.tsx, src/components/FeaturedProjectCard.tsx · verification: `npx vitest run src/sections/Projects`
  - dep T4, T3.
  - Referencia: secciones "Un caso de Migtra" y "Proyectos" de `ref/DirDefinitivo.html`.
  - `Story`: `story.*` con log mono.
  - `projects.ts` se reescribe: destacadas `cv-optimizer` → `/proyectos/cv-optimizer` y `job-hunter` → `/proyectos/job-hunter`, cada una con su key `projects.featured.<cvOptimizer|jobHunter>`; lista pokemontcgai, nocheAustral, tcg, financial con key `projects.list.<id>` y `url` solo donde el `projects.ts` actual tiene un link público. Hoy solo noche-austral tiene `https://github.com/Crispolein/Astroapp`. No inventes URLs.
  - Destacadas como `CardLink` hacia su caso usando `navigate` de `src/lib/route.ts` si ya existe; si aún no existe, `CardLink` con `href` solo y T10 conecta el router.
  - Filas: con `url`, `<a target="_blank" rel="noopener noreferrer">` con flecha; sin `url`, `<div>` sin flecha y con `projects.privateRepo` si aplica.
  - Borra `ProjectCard.tsx` y `FeaturedProjectCard.tsx`: quedan sin callers.
  - Tests: 2 links a `/proyectos/...`, la fila de noche-austral es link externo con `rel` correcto, las demás no son links.

- [ ] T8 — Tools y Experience · owner: claude · files: src/sections/Tools.tsx, src/sections/Experience.tsx, src/data/tools.ts, src/data/experience.ts, src/sections/ToolsExperience.test.tsx, src/components/ToolCard.tsx · verification: `npx vitest run src/sections/ToolsExperience`
  - dep T4, T3.
  - Referencia: secciones "Herramientas internas" y "Experiencia" de `ref/DirDefinitivo.html`.
  - `tools.ts`: ids dbCopy, kml, userManager con key `tools.items.<id>`; sin import de `Icons`. Genéricas, sin datos de clientes.
  - `experience.ts`: ids migtra, nocheAustral, pervasive, edu con key `experience.items.<id>`, en ese orden.
  - Borra `ToolCard.tsx`: queda sin callers.
  - Tests: 3 herramientas y 4 entradas de experiencia con sus textos es; con `i18n.changeLanguage('en')` aparece el texto en.

- [ ] T9 — Contact con estados y Footer · owner: claude · files: src/sections/Contact.tsx, src/components/Footer.tsx, src/sections/Contact.test.tsx · verification: `npx vitest run src/sections/Contact`
  - dep T4, T3.
  - Referencia: contacto de `ref/DirDefinitivo.html` y estados de `ref/DirEstados.html`.
  - Form con `<label>` visible por campo, `required`, `type="email"`, honeypot intacto con el mismo nombre de campo que hoy y oculto a lectores y teclado. POST a `/api/contact` con el mismo payload que hoy.
  - Estados: idle, sending (botón `disabled` y `aria-busy`, texto `contact.sending`), success (`contact.success` en región `role="status"`, form limpio), error (`contact.error` en `role="alert"`, datos conservados).
  - `Footer`: `footer.updated`, link al repo del sitio y los canales de `contact.links`. Sin teléfono.
  - Tests con `fetch` mockeado: sending deshabilita el botón, 200 muestra success, 500 y rechazo de red muestran error, honeypot lleno no llama a `fetch`.

- [ ] T6 — Router mínimo y página de caso · owner: claude · files: src/lib/route.ts, src/lib/route.test.ts, src/pages/CasePage.tsx, src/pages/CasePage.test.tsx, src/data/cases.ts · verification: `npx vitest run src/lib src/pages`
  - dep T4, T5, T3.
  - Router según las filas "Router" y "Links internos" de `design.md`: `useRoute()`, `navigate(path)`, `popstate`; tras navegar, `scrollTo(0,0)` y foco al `h1` con `tabIndex={-1}`.
  - `cases.ts`: `cv-optimizer` → `case.cvOptimizer` con `aiNodes` [2]; `job-hunter` → `case.jobHunter` con `aiNodes` [3]; `next` apunta al otro caso.
  - `CasePage` según `ref/DirCaso.html`: volver, tag, h1, sub, facts, placeholder de captura con borde punteado, secciones problema, cómo funciona con `Pipeline`, decisiones, resultado con log, y link al siguiente caso.
  - Tests: `navigate` cambia `useRoute` y llama `pushState`; `popstate` actualiza; click con meta no navega; `CasePage` de cada slug muestra su h1 y su pipeline con el `aria-label` correcto; slug desconocido devuelve null.

- [ ] T10 — Hero, Navbar y wiring de App · owner: claude · files: src/sections/Hero.tsx, src/components/Navbar.tsx, src/App.tsx, src/App.test.tsx · verification: `npx vitest run src/App && npm run build`
  - dep T5, T6, T7, T8, T9.
  - Referencia: header y hero de `ref/DirDefinitivo.html`, móvil de `ref/DirMovil.html`.
  - `Hero`: estado, h1 con `hero.titleAi` en `--amb`, sub con `hero.subStrong`, 3 roles mono, CTA solid a `#proyectos` y CTA ghost de CV a `/Christian_Rangel_CV.pdf` con `download`, y `Console` debajo.
  - `Navbar`: skip link `nav.skip` al `main`, links a secciones de la home, toggle de idioma con `aria-label` `nav.switchLang` que cambia i18next y `document.documentElement.lang`; menú móvil con `aria-expanded` y `aria-controls`. Desde una página de caso, los links de sección navegan a `/` y luego al ancla.
  - `App`: ruta `/` renderiza Hero, Story, Projects, Tools, Experience, Contact y Footer dentro de `<main id="main">`; `/proyectos/<slug>` renderiza `CasePage`; slug desconocido renderiza la home. Sin About ni Skills.
  - Conecta el router en las cards destacadas si T7 no pudo.
  - Tests: home tiene un solo h1, el toggle cambia `lang` a `en` y el texto del h1, `/proyectos/job-hunter` muestra el caso, el skip link apunta a `#main`.

- [ ] T11 — Limpieza de lo que quedó sin callers · owner: claude · files: src/sections/About.tsx, src/sections/Skills.tsx, src/components/StatCard.tsx, src/components/StackPill.tsx, src/components/Icons.tsx, src/data/skills.ts, package.json, package-lock.json · verification: `npm run test && npm run build && ! grep -rE "StatCard|FeaturedProjectCard|sections/About|sections/Skills" src`
  - dep T10.
  - Antes de borrar cada archivo, `grep -rn` de su nombre en `src` y cita la salida en el commit o en el reporte. Borra solo lo que no tiene callers. `Icons.tsx` se queda si Navbar, Contact o Footer lo siguen usando.
  - `framer-motion`: si `grep -rn framer-motion src` sale vacío, `npm uninstall framer-motion`. Si tiene usos, se queda.

- [ ] T12 — E2E de home, caso y accesibilidad · owner: claude · files: e2e/home.spec.ts, e2e/case.spec.ts, e2e/a11y.spec.ts · verification: `npm run test:e2e`
  - dep T11.
  - Viewports 1280x800 y 390x844. En ambos, `document.documentElement.scrollWidth <= innerWidth` en `/` y en los 2 casos.
  - `a11y.spec.ts`: axe sin violaciones `serious` ni `critical` en `/`, `/proyectos/cv-optimizer` y `/proyectos/job-hunter`.
  - `home.spec.ts`: Tab llega al skip link primero; en la consola, ArrowRight cambia el radio marcado; el toggle cambia a inglés y `html[lang="en"]`; con `reducedMotion: 'reduce'` los elementos del pipeline tienen `animation-name` none o duración 0; form con `page.route('**/api/contact')` en 200 muestra success y en 500 muestra error.
  - `case.spec.ts`: click en la card destacada lleva a `/proyectos/cv-optimizer` sin recarga completa, el foco queda en el h1, volver regresa a `/`, carga directa de `/proyectos/job-hunter` funciona.
