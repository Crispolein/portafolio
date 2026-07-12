# Sesión 02 — Contenido y credibilidad

**Estado:** Completada — 2026-07-12

## Objetivo

Alinear cada claim del portafolio con lo documentado en la BD de cv_optimizer y el CV, bajo el principio de la propia app: **credibilidad > impacto visual**. Un reclutador que cruce el sitio con el PDF o pida evidencia en entrevista no debe encontrar ninguna cifra indefendible.

## Evidencia (auditoría 2026-07-12, BD `cv_optimizer/db.sqlite3` + CV PDF)

- Las métricas del hero **"80 tickets/mes eliminados"** y **"30 hrs/mes ahorradas"** no existen en ninguna fuente: la BD (`profiles_workexperience.structured_achievements`) dice "reducción a casi 0 de tickets de solicitud de documentos", sin cifra mensual; el CV PDF no menciona tickets numéricamente.
- Métricas **sí documentadas** en la BD: "Zero incidentes reportados en 6+ meses", "2 personas bajo liderazgo directo", "comprendí la arquitectura completa del sistema de procesamiento GPS en menos de 6 meses — reconocido como una de solo 2 personas que dominan el sistema", "solicitudes que tardaban días → autoservicio en horas".
- **"Tech Lead"** solo existe en el portafolio. BD: `job_title = "Desarrollador Backend"`. CV PDF: "Desarrollador Backend Junior". Decisión ratificada: título "Backend Developer", liderazgo como logro.
- Contradicción interna: `src/locales/es/translation.json:25` dice "en **más** de un año pasé […] a Tech Lead"; `:114` dice "En **menos** de un año". Igual en `en/`.
- Noche Austral: la BD documenta logros ausentes del sitio — Clean Architecture por capas, pruebas unitarias + CI/CD, Firebase Auth con roles admin/común, 16.000+ líneas Dart (esta última ya está en los chips).
- El botón "demo" de Noche Austral (`src/data/projects.ts:149`) apunta a otro repo de GitHub, no a una demo.
- Los 6 proyectos usan la misma fórmula de copy "problema en una frase + tecnologías para [resultado]" con badges P/S — marcador de texto generado por IA (se elimina el scaffold aquí a nivel de copy; el visual en sesión 03).

## Prerequisitos

- Sesión 01 completada o en rama aparte (no mezclar diffs).
- Leer las claves actuales: `src/locales/es/translation.json`, `src/locales/en/translation.json`, `src/data/experience.ts`.

## Checklist

### 1. Hero (`translation.json` es + en: claves `hero.*`)

- [x] `hero.subtitle`: reemplazar "80 tickets/mes eliminados" y toda mención de horas ahorradas por métricas documentadas. Propuesta base (ajustar redacción): "Python y AWS como base, IA como multiplicador. Backend developer con impacto verificable: solicitudes de documentos que tardaban días ahora se auto-sirven en horas, 0 incidentes en 6+ meses, 2 desarrolladores liderados."
- [x] `hero.stat1`: "~0" / "tickets de documentos" (antes 80/mes). `hero.stat2`: "0" / "incid. en 6+ meses". `hero.stat3`: mantener proyectos.

### 2. Rol Migtra (es + en: `about.bio`, `experience.migtra.*`; `src/data/experience.ts`)

- [x] `experience.migtra.role`: "Backend Developer" (quitar "→ Tech Lead").
- [x] Liderazgo como logro en la descripción: "Líder técnico de 2 desarrolladores junior — inducción, code review, asignación de trabajo y mentoring".
- [x] Eliminar la contradicción más/menos de un año: no afirmar tiempo de promoción. Sustituir por el ramp-up documentado: "referente técnico del sistema GPS crítico en menos de 6 meses, una de las 2 personas del equipo que lo dominan".
- [x] `experience.ts:19-24` (metric chips): reemplazar `'80 tickets/mes eliminados'` y `'30 hrs/mes ahorradas'` por chips documentados: `'Tickets de documentos: de días a ~0'`, `'0 incidentes en 6+ meses'`, `'2 devs liderados'`, `'Sistema GPS dominado en <6 meses'`.

### 3. Noche Austral (es + en: `projects.nocheAustral.*`; `src/data/projects.ts`)

- [x] Sumar a la descripción: Clean Architecture por capas, pruebas unitarias + CI/CD, Firebase Auth con roles.
- [x] `projects.ts:149`: el link `demo` apunta a un repo GitHub → renombrar el label del botón a "Web GitHub" (la clave `projects.nocheAustral.webGithub` ya existe) o eliminar el campo `demo` y usar solo los dos links de GitHub.

### 4. Copy de proyectos (es + en: `projects.*.desc/problem/solution`)

- [x] Reescribir los 6 proyectos rompiendo la fórmula única: uno arranca con el resultado, otro con una cifra, otro con la anécdota técnica. Prohibido el patrón "X + Y + Z para [resultado]" repetido.
- [x] Las claves `problem`/`solution` pueden fusionarse en la descripción si la sesión 03 elimina el scaffold visual P/S — coordinar: si esta sesión corre primero, solo reescribir el texto manteniendo las claves.

### 5. Inglés espejo

- [x] Aplicar todos los cambios anteriores a `en/translation.json` con el mismo nivel de redacción (no traducción literal).

## Verificación

```bash
grep -rn "80 tickets\|30 hrs\|30 horas\|Tech Lead" src/ && echo "FALLO: quedan claims sin respaldo" || echo OK
npm run build          # sin errores
npm run dev            # toggle ES/EN: todas las secciones cambian, sin claves huérfanas en consola
```

Cross-check final: cada métrica visible en el sitio debe existir en `profiles_workexperience.structured_achievements` de la BD cv_optimizer (consultar con `sqlite3` en modo lectura) o en el CV PDF regenerado (sesión 04).

## Fuera de alcance

- Cambios visuales/estructurales (sesión 03).
- Regeneración del CV PDF (sesión 04) — hasta entonces el PDF seguirá desalineado; aceptado como estado intermedio.
