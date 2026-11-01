# demos-v14: diseño y evidencia

Lámina aprobada por Christian el 2026-10-31: DirCatalogo, versión 14 del canvas https://claude.ai/artifact/3RBiqvyZ3dz7jCXKMmsYUC (home con 5 casos, filas con miniatura y visor). Plan: `~/.claude/plans/wiggly-squishing-treasure.md`.

## Decisiones ratificadas
- Bilingüe obligatorio: todo texto por `t()` en es y en. En `en/translation.json` no uses `json.dump`: inserta por líneas.
- Español en voz-christian: sin raya, sin punto y coma, sin paréntesis. `overlap_check.py` debe salir 0.
- Solo cifras verificadas con un comando que ejecutas y citas aquí. Nunca «90 %».
- Herramientas Migtra siempre en genérico: sin nombre de cliente, sin host, sin patente real. GPS Analyzer se describe como «analizador de salud de transmisión GPS» y en pasado, porque está retirado desde 2026-10-28.
- Capturas con datos ficticios, ya revisadas una a una. No se capturan más.
- Arte de cartas Pokémon aceptado (sin fines comerciales).
- Sin push, sin deploy.

## Fuentes para el copy (solo lectura)
- pokemontcgai: `/Users/christian/herrramientas_personales/pokemontcgai` (README, `scripts/gui_play`).
- project-hub: `/Users/christian/herrramientas_personales/project-hub` (README, `frontend/e2e`).
- GPS Analyzer: `/Users/christian/migtra/repos/migtra.it-support.utils/gps_analyzer` (README). Repo Migtra: solo leer, no commits ni ramas.
- Proyectos de lista: `GitHub/{Astroapp,Astroweb,scrapingpokemon,financial,PatriotsWeek,vitrina-local}` (README).
- Skills de soporte: contar con `ls /Users/christian/migtra/repos/migtra.it-support.utils/skills | wc -l` (esperado 17).

## Capturas disponibles en `public/shots/<slug>-<n>.webp`
gps-analyzer 4, pokemontcgai 4, project-hub 4 (casos); astroapp 3, astroweb 3, pokecollector 4, financial 3, patriotsweek 3, vitrina 4 (lista); user-manager 3, kml-tools 2, db-copy 2, asset-compare 3 (herramientas). cv-optimizer 4 y job-hunter 4 ya existían.

## Evidencia de cifras
(cada tarea que cite una cifra la pega aquí con su comando)

### Cifras medidas el 2026-10-31
- Skills de soporte: `ls /Users/christian/migtra/repos/migtra.it-support.utils/skills | wc -l` → 17, pero incluye `README.md`; `ls -d skills/*/ | wc -l` en esa misma ruta → 16 skills. El portafolio usa 16.
- pokemontcgai: `git -C /Users/christian/herrramientas_personales/pokemontcgai rev-list --count HEAD` → 951 commits; `find pokemontcgai -name 'test_*.py' (sin node_modules ni .venv) | wc -l` → 150 archivos de test.
- project-hub: `git -C /Users/christian/herrramientas_personales/project-hub rev-list --count HEAD` → 373 commits; `frontend/e2e` trae 19 entradas entre specs y apoyo (a11y, portfolio, project, team, responsive, routes, write y otros).
- GPS Analyzer: `git log --oneline -- gps_analyzer | wc -l` en migtra.it-support.utils → 919 commits que tocan el directorio. Estado según su README: fases 1, 1b, 2, 3 y 4 completas, fase 5 en curso; detección F01-F11 y scoring de 6 dimensiones; API FastAPI y Angular 22; criterio de éxito: un operador responde en menos de 1 minuto qué proveedores fallan. Retirado el 2026-10-28.
- pokemontcgai: agente para el Kaggle «Pokémon TCG AI Battle Challenge»; motor de reglas, búsqueda y evaluación, laboratorio de mazos, ladder y GUI humano contra modelo (`scripts/gui_play`).
- project-hub: FastAPI, Angular y Postgres en Docker; registro YAML por proyecto, escáner de repos y Jira de solo lectura, dashboard local en 127.0.0.1:8765.
