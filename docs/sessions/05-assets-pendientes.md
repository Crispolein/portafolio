# Sesión 05 — Assets pendientes

**Estado:** Completada parcialmente — 2026-07-12 (3 de 4 proyectos capturados e integrados; ver pendientes)

## Objetivo

Regenerar los assets visuales rotos para que los proyectos que hoy quedan sin imagen (tras la sesión 03) muestren producto real, y resolver la autorización pendiente de las capturas de herramientas Migtra.

## Diagnóstico por proyecto (verificado 2026-07-12 con md5/ffprobe/inspección visual)

Assets en `/Users/christian/herrramientas_personales/portfolio/{screenshots,videos}/`:

| Proyecto | Problema encontrado | Por hacer |
|---|---|---|
| **busqueda_laboral** (Job Hunter) | `hero.png`, `jobs.png` y `applications.png` son el MISMO archivo (md5 idéntico): captura de un estado vacío con UI sin estilizar (botones default del navegador, emojis crudos). | Levantar la app (`GitHub/BusquedaLaboral`), poblar con datos demo (ofertas scrapeadas, kanban con tarjetas), recapturar con Playwright las 3 vistas + un clip de 5–10 s. |
| **scrapingpokemon** (TCG) | Los 2 PNG y el video muestran página en blanco con la barra "Stop/Deploy" de un dev preview — la app nunca renderizó. | Levantar `GitHub/scrapingpokemon` (dashboard Streamlit), verificar que renderiza con la colección cargada, recapturar dashboard + vista de biblioteca. |
| **financial** (Family Finance) | `hero.png` es un PNG blanco de 5 KB; el video de 2.5 s es blanco toda su duración. | Compilar la app Flutter para web o capturar desde emulador (11 pantallas disponibles según el copy); elegir 2–3 pantallas con datos demo. |
| **pokemontcgai** | Sin assets. | Capturar del notebook Kaggle: curvas de entrenamiento, tabla de win-rate por iteración (n≥1000 partidas). Una imagen de métricas reales vale más que un screenshot de código. |
| **kml_tools** | Solo video (7.6 s, sin imagen estática). | Extraer poster frame con ffmpeg si se autoriza su uso (ver Migtra abajo). |

Nota: los videos existentes son micro-clips de 2.5–10 s a 1440×900 — el formato es válido para preview hover en cards (75–270 KB), el problema es solo el contenido en blanco de los rotos.

## Autorización pendiente: herramientas Migtra

Capturas existentes de `migtra_usermanager` (v1 y v2 — v2 es la iteración pulida, usar solo esa), `kml_tools` (solo video), `chunksdownload`, `comparacion_assets`. Son herramientas internas de la empresa: **antes de publicar cualquiera**, Christian debe (1) confirmar que puede mostrarlas públicamente y (2) revisar cada captura y difuminar datos internos (nombres de clientes, patentes de vehículos, emails, URLs internas). Hasta entonces, las tool cards quedan sin imagen.

## Prerequisitos

- Sesión 03 completada (define el formato de imagen/video que consumen las cards).
- Apps externas levantables: revisar el estado de cada repo en `GitHub/` antes de asumir que corren.

## Checklist

- [x] Job Hunter: app levantada con datos demo → 4 screenshots (hero, jobs, aplicadas, API docs). Clip de video NO capturado (timebox) — pendiente.
- [x] TCG: 3 screenshots (dashboard, búsqueda, colección). Nota: el stack real es Next.js 16 + FastAPI + Firebase (no Streamlit como decía el diagnóstico).
- [ ] Family Finance: **BLOQUEADO** — doble causa raíz diagnosticada: (1) `.env` de 0 bytes empaquetado como asset rompía `dotenv.load()` antes de `runApp` (página blanca; corregido localmente en archivo gitignorado); (2) el proyecto Firebase `financial-3d527` solo tiene apps Android/iOS registradas — no existe app web (`firebase apps:list` verificado). Desbloqueo: crear app web en Firebase (decisión de Christian) o capturar desde emulador móvil.
- [x] Pokémon TCG AI: 2 gráficos matplotlib desde datos reales (`data/ladder_crawl/episodes_index.jsonl`, 35 partidas ladder de 3 submissions; winrate por versión de `docs/dashboard.md`), estética del sitio, fuente citada en cada PNG.
- [ ] Migtra: **sigue pendiente de autorización de Christian** — sin cambios.
- [x] Integración hecha y luego **revertida por decisión de Christian**: los proyectos quedan sin screenshots por ahora. Los assets capturados quedan listos en `herrramientas_personales/portfolio/screenshots/` para cuando quiera reactivarlos (los componentes ya lo soportan).
- [x] Assets rotos reemplazados in-place (los `_new` renombrados al nombre canónico). Los de financial quedan (sin reemplazo).

## Candidatas futuras (no comprometidas)

- Diagrama de arquitectura para los 2 proyectos flagship (CV Optimizer: 3 agentes + knowledge graph; Job Hunter: pipeline Celery) — evidencia técnica que un reclutador senior valora más que screenshots.
- Sección de actividad GitHub pública / escritura técnica.
- Testimonios (colegas de Migtra, profesor guía de la tesis).

## Verificación

- Cada card que recibió asset lo muestra en `npm run dev` (375px y desktop).
- Ninguna imagen publicada contiene datos personales de terceros ni datos internos de Migtra sin difuminar.

## Notas de ejecución (2026-07-12)

- **Hallazgo valioso — 3 bugs preexistentes en BusquedaLaboral** (sorteados sin tocar su código, siguen presentes en el repo):
  1. El enum `applicationstatus` de PostgreSQL solo tiene valores en MAYÚSCULAS y la API consulta en minúsculas (`invalid input value for enum applicationstatus: "pending"`).
  2. La ruta `/api/v1/jobs/matches` está registrada después de `/jobs/{job_id}` y devuelve 422 (sombreada por el path param).
  3. El frontend espera `PaginatedResponse {items,...}` pero el backend devuelve array plano.
- Cuenta demo desechable creada en PokéCollector (`demo.portfolio.screenshot@mailinator.com`, proyecto Firebase `pokestorage-85a16`) — borrarla si molesta.
- Todos los servidores levantados fueron apagados y verificados con `lsof`.
