# Diseño técnico

El diseño visual vive en `DESIGN.md` de la raíz y en las láminas de `ref/`. Este archivo fija las decisiones de implementación, el mapa de keys i18n y la evidencia de cada cifra del copy.

## Decisiones

| Tema | Decisión | Razón |
|---|---|---|
| Router | Hook propio `src/lib/route.ts`: lee `location.pathname`, navega con `history.pushState`, escucha `popstate`, expone `useRoute()` y `navigate(path)`. Rutas: `/`, `/proyectos/cv-optimizer`, `/proyectos/job-hunter`. Ruta desconocida bajo `/proyectos/` cae en la home. | Son 3 vistas; react-router no se justifica. `vercel.json` ya reescribe todo lo que no es `/api` a `index.html`. |
| Links internos | `<a href="/proyectos/...">` real con `onClick` que hace `preventDefault` y `navigate`, salvo con modificadores (ctrl, meta, shift, botón medio). Al navegar, `scrollTo(0,0)` y foco al `h1` de la vista. | Funciona sin JS, abre en pestaña nueva y anuncia el cambio a lectores de pantalla. |
| Idioma | i18next como hoy, default `es`, sin idioma en la URL. El toggle cambia el idioma y `document.documentElement.lang`. | Ratificado. |
| Estilos | Tailwind 3 con los tokens como CSS vars en `:root` y mapeados en `tailwind.config.ts` con los mismos nombres (`bg`, `term`, `line`, `txt`, `mut`, `amb`, `amb-hi`, `cy`, `ok`). Fuentes `font-sans` Archivo y `font-mono` JetBrains Mono. | Un solo lugar para cambiar la paleta. |
| Motion | Reveal con la clase `.rv` y el pipeline con CSS puro, como en `DESIGN.md`. framer-motion no se usa en el código nuevo; T11 lo desinstala si queda sin callers. | Nada decorativo se mueve. |
| Datos vs copy | `src/data/*.ts` guarda estructura: ids, slugs, URLs, índices de nodos IA y la key i18n de cada item. Todo texto visible sale de `t()`. | Bilingüe sin duplicar estructura. |
| Arrays en i18n | Nodos, logs, facts, steps y decisions son arrays de tuplas en el JSON y se leen con `t(key, { returnObjects: true })` tipado con un helper local. | Paridad de keys simple de testear. |
| Pipeline | Un componente `Pipeline` recibe `nodes: [string, string][]`, `aiNodes: number[]`, `ariaLabel` y `orientation`. Horizontal `viewBox 0 0 640 120`, vertical `viewBox 0 0 358 210` como en `ref/DirMovil.html`. Elige orientación con `matchMedia('(max-width: 640px)')`. Para reiniciar la animación al cambiar de pestaña se remonta con `key`. | Mismo componente en consola y caso. |
| Consola | Pestañas como `role="radiogroup"` con `role="radio"` y `aria-checked`; roving tabindex; flechas izquierda/derecha y Home/End cambian de sistema. Sistemas en orden: telemetria, automatizacion, cvOptimizer, jobHunter. | Patrón ARIA de radio group. |
| Proyectos | Las 2 destacadas son `CardLink` a su caso. Las filas de la lista son `<a>` al repo con `target="_blank" rel="noopener noreferrer"` si `src/data/projects.ts` actual tiene URL pública; si no, `<div>` sin flecha. | No inventar links. |
| Footer | Componente nuevo con `footer.updated`, link al repo del sitio y los canales que hoy están en `Contact.tsx`. | El sitio actual no tiene footer propio. |
| CV | El botón "Descargar CV" apunta a `/Christian_Rangel_CV.pdf` con `download`. | Ya existe en `public/`. |
| Tests | Vitest + jsdom + Testing Library para unidad; Playwright chromium + `@axe-core/playwright` para e2e contra `vite preview`. Los tests importan de `vitest` explícitamente. | TDD rojo primero en cada tarea. |

## Mapa de keys i18n

Fuente: `copy/es.json` y `copy/en.json` en este change. T3 los copia tal cual a `src/locales/{es,en}/translation.json`. Las tareas siguientes usan estas keys y no agregan otras sin agregarlas en ambos idiomas.

| Prefijo | Uso |
|---|---|
| `nav.*` | Header, skip link, menú móvil, toggle de idioma |
| `hero.*` | Estado, h1 en 3 partes con `titleAi` en ámbar, sub con `subStrong`, 3 roles mono, 2 CTAs |
| `console.*` | Barra, pestañas y `console.systems.<id>.{what,aria,nodes,log}` |
| `story.*` | "Un caso de Migtra": 2 párrafos y log |
| `projects.*` | Encabezado, `featured.<id>` y `list.<id>` |
| `tools.*` | `tools.items.<id>` |
| `experience.*` | `experience.items.<id>`, con `edu` al final |
| `contact.*` | Formulario y sus estados |
| `footer.*` | Pie |
| `case.*` | Etiquetas comunes y `case.<cvOptimizer|jobHunter>.*` |

## Evidencia de las cifras

Toda cifra del copy sale de un comando ejecutado el 2026-10-31.

| Cifra | Comando | Salida |
|---|---|---|
| 193 mensajes en la entrevista | `sqlite3 ~/herrramientas_personales/cv_optimizer/db.sqlite3 "select session_id,count(*) from onboarding_conversationturn group by 1"` | `1\|193`, `2\|1` |
| 15 marcas en 2 revisiones | `sqlite3 ... "select report_id,count(*) from credibility_inconsistencyflag group by 1"` | `1\|7`, `4\|8` |
| 3 portales | `grep -nE '^class \w+Scraper' BusquedaLaboral/backend/app/scrapers/job_scrapers.py` | RemoteOK, WeWorkRemotely, GetOnBoard más `BaseScraper` |
| cada 2 horas | `grep -n 7200 BusquedaLaboral/backend/app/core/celery_app.py` | `"schedule": 7200.0` en `scrape-jobs` |
| 116+ endpoints | `PROJECT_STATUS.md` declara 116+; el código tiene 186 decoradores `@router.*` | Se usa la cifra conservadora |

Corrección respecto al canvas v12: Job Hunter decía "7 portales cada 6 h" y "4 estilos de CV". El código no lo respalda: son 3 portales cada 2 horas y los estilos no son un número defendible, así que se quitó.

Las cifras de Migtra (tickets casi 0, días a horas, 200+ vehículos, 0 caídas en 6+ meses, 2 devs junior) vienen del CV verificado de Christian y del onboarding de cv_optimizer. Nunca se usa "90 %".
