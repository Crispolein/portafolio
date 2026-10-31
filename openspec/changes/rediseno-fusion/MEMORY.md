# MEMORY del loop

Lee este archivo antes de empezar una tarea y agrega lo aprendido antes de cerrarla. Solo hechos con evidencia.

## PROBADO

- (vacío al iniciar el loop)

## VERIFICADO

- Cifras del copy y sus comandos: ver `design.md`, sección "Evidencia de las cifras".
- `copy/es.json` y `copy/en.json` tienen paridad exacta de keys y largo de arrays. El es no tiene "—", ";", paréntesis, "90 %" ni teléfono. `overlap_check.py` de voz-christian sale con 0 sobre su prosa.
- Contraste AA: `--mut` sobre `--bg` 6.13, sobre `--term` 6.59; `--amb` sobre `--bg` 9.77; `--cy` sobre `--term` 11.39; `--txt` sobre `--bg` 13.24.
- `tsconfig.json` incluye `src` y `api`; los tests dentro de `src` los compila `tsc` en `npm run build`, así que deben tipar bien.
- `vercel.json` reescribe `/((?!api/).*)` a `/index.html`: las rutas `/proyectos/*` no necesitan cambio de infra.
- En zsh, globs en flags van entre comillas: `--include='*.py'`.

## ABIERTO

- Capturas reales de los casos: hoy son placeholders con borde punteado.
- Self-hosting de fuentes.
