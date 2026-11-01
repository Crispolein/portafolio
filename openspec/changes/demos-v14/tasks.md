# Tareas demos-v14

Contexto obligatorio antes de cada tarea: `DESIGN.md`, `PRODUCT.md`, `design.md` de este change y la lámina DirCatalogo del canvas (ver design.md). Todo texto visible sale de `t()` en es y en. TDD: el test se escribe primero y se ve fallar. Commits en español, sin atribución de IA, sin push. Tras cada tarea corre `npm run test`.

- [x] T1 — Capturas en public y su test · owner: claude · files: public/shots, src/data/shots.test.ts · verification: `npx vitest run src/data/shots.test.ts`
  - Los .webp ya están copiados en `public/shots` (sin commitear). El test lee `public/shots` y comprueba el conteo exacto por slug de la lista de design.md. Commitea los webp.

- [x] T2 — Tres casos nuevos en el modelo y el rail · owner: claude · files: src/data/cases.ts, src/data/cases.test.ts, public/sitemap.xml, src/pages/CasePage.tsx, src/pages/CasePage.test.tsx · verification: `npx vitest run src/data src/pages` · bloqueada: src/pages/CasePage.test.tsx:14: la aserción 'cases['job-hunter'].next === 'cv-optimizer'' quedó obsoleta tras cdb53a7 (ahora es 'gps-analyzer'). 'npm run test' queda en 1 failed | 134 passed, y el baseline estaba en verde. El preámbulo de tasks.md exige correr 'npm run test' después de cada tarea, y
  - dep T1. Slugs `gps-analyzer` (03, acento amb), `pokemontcgai` (04, cy), `project-hub` (05, amb), con `keyPrefix` `case.gpsAnalyzer|pokemonTcgai|projectHub`, `shots: 4`. `num` pasa a `'01'|'02'|'03'|'04'|'05'`. Cadena `next` circular 01→02→03→04→05→01. `aiNodes`: gps-analyzer `[]`, pokemontcgai `[1]`, project-hub `[]` (ajusta tras leer los nodos del copy de T3 si cambia). Sitemap con las 3 rutas. Si el router o algún test enumera los slugs, actualízalo en esos archivos.

- [x] T3 — Copy es/en de los tres casos · owner: claude · files: src/locales/es/translation.json, src/locales/en/translation.json, src/locales/locales.test.ts · verification: `npx vitest run src/locales && node scripts/extract-es.mjs | python3 ~/.claude/skills/voz-christian/scripts/overlap_check.py`
  - dep T2. Para cada `case.<prefijo>`: tag, title, sub, facts, problem, nodes, steps, decisions, resultLog, shots (4 alts, uno por captura, leyendo cada webp con Read), shotsLabel, pipelineAria, result, con la misma forma que `case.cvOptimizer`. Mismas claves en es y en (el test de locales ya lo exige). Cifras solo verificadas, pegadas en design.md.

- [x] T4 — Componente Lightbox · owner: claude · files: src/components/Lightbox.tsx, src/components/Lightbox.test.tsx · verification: `npx vitest run src/components/Lightbox.test.tsx`
  - Dialog accesible con `aria-modal`, foco atrapado, Esc cierra y devuelve el foco al disparador, flechas navegan, el fondo no hace scroll, reduced motion respetado. Reutiliza `Carousel.tsx` para las slides. Props: `open`, `onClose`, `label`, `slides`, `returnFocus`. Etiqueta «datos ficticios» por `t('lightbox.demoBadge')` y botón cerrar por `t('lightbox.close')` (claves en T5).

- [ ] T5 — Proyectos: filas con miniatura y visor, y los casos nuevos en destacados · owner: claude · files: src/sections/Projects.tsx, src/sections/Projects.test.tsx, src/data/projects.ts, src/locales/es/translation.json, src/locales/en/translation.json · verification: `npx vitest run src/sections src/locales`
  - dep T3, T4. `ListProject` gana `shots?: { slug: string; count: number }`. Filas: pokemontcgai se vuelve destacado (caso), quedan nocheAustral (astroapp), astroweb (nuevo), tcg (PokéCollector, slug pokecollector), financial, patriotsweek (nuevo), vitrina (nuevo). Copy de cada fila nueva en es y en y alts de cada captura. Destacados: los 5 casos. Claves `lightbox.demoBadge` y `lightbox.close`. Fila sin `shots` queda como hoy. Cada fila con capturas es un botón accesible que abre el visor.

- [ ] T6 — Herramientas: miniaturas, visor y filas nuevas · owner: claude · files: src/sections/Tools.tsx, src/sections/ToolsExperience.test.tsx, src/data/tools.ts, src/locales/es/translation.json, src/locales/en/translation.json · verification: `npx vitest run src/sections src/locales`
  - dep T4, T5. `Tool.id` suma `assetCompare` y `supportSkills`. Las 4 primeras con capturas y visor (user-manager, kml-tools, db-copy, asset-compare). `supportSkills` es fila de texto con la cifra de skills contada con `ls` y citada en design.md. Genérico, sin cliente.

- [ ] T7 — E2E y gate completo · owner: claude · files: e2e/demos.spec.ts · verification: `npm run test && npm run build && npm run test:e2e`
  - dep T6. Un caso nuevo navegable desde el rail, visor abre con Enter y cierra con Esc devolviendo el foco, axe sin violaciones serias, sin scroll horizontal a 390 px, y cada `src` de `/shots/` responde 200 en preview.
