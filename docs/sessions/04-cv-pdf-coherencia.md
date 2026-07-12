# Sesión 04 — CV PDF y coherencia de fuentes

**Estado:** Completada — 2026-07-12

## Objetivo

Que las tres fuentes — portafolio, CV PDF público y BD de cv_optimizer — cuenten la misma historia. Hoy el PDF que descarga un reclutador desde el sitio contradice al propio sitio.

## Evidencia (auditoría 2026-07-12)

Inconsistencias entre portafolio / BD cv_optimizer / CV PDF (`public/Christian_Rangel_CV.pdf`, fechado 2026-06-07):

| Dato | Portafolio | BD cv_optimizer | CV PDF |
|---|---|---|---|
| Rol Migtra | "Backend Developer → Tech Lead" | "Desarrollador Backend" | "Desarrollador Backend **Junior**" |
| Liderazgo 2 devs | Sí | Sí (documentado) | **No aparece** |
| Email | gmail | chris.rangel.intriago@gmail.com | **chris.ery@hotmail.com** |
| Gesitech | "Mayo 2025 — Feb 2026, pausada" | **No existe** | "05-2025 — Actualmente" |
| Noche Austral | Proyecto, jul 2024 – abr 2025 | "Universidad Autónoma, Desarrollador FullStack, **ene–jun 2024**" | Empleo, jul 2024 – abr 2025 |
| Pervasivemind | Práctica Data & Scraping, nov 2023 – feb 2024 | "Web Scraping", nov 2023 – feb 2024 | "**Data Entry**", dic 2023 – **abr 2024** |
| Fecha inicio Migtra | Enero 2025 ✓ | 2025-01-01 ✓ | 01-2025 ✓ (única coherente) |

Además: la BD tiene solo 17 skills — faltan Django, FastAPI, Flask, Docker, Redis, Claude API, GCP, Linux, AWS CDK, React, Firebase, entre otras que el portafolio y el CV sí muestran. El último reporte de credibilidad de cv_optimizer (2026-06-10, score 58/100, `verdict=significant_issues`) corresponde a una versión vieja del perfil y no se ha vuelto a correr.

Dato de matching relevante: los CVs generados con `target_role="Backend Developer Python"` obtuvieron los mejores ATS scores (84 y 88/100); las 6 vacantes reales analizadas (Data Engineer, Mobile iOS/Flutter) dieron 22–54. El CV a regenerar apunta a Backend Python.

## Prerequisitos

- Sesión 02 completada (define título y métricas canónicos).
- App cv_optimizer operativa: `conda activate cv_optimizer && python manage.py runserver` en `/Users/christian/herrramientas_personales/cv_optimizer/`.
- Christian disponible para responder el onboarding conversacional (los datos faltantes se cargan por la app, no por SQL directo — los repos de la app usan upserts con normalización que un INSERT manual rompería).

## Checklist

### 1. Completar la BD de cv_optimizer (vía onboarding de la app)

- [x] Skills faltantes con años reales: Django, FastAPI, Flask, Docker, Redis, Claude API, GCP, Linux, AWS CDK, React, Firebase, HTMX, Celery.
- [x] Experiencia Gesitech completa (Mayo 2025 – Febrero 2026, proyecto personal pausado) — hoy no existe en la BD.
- [x] Resolver el desfase Noche Austral: decidir el marco canónico (proyecto de titulación con la Universidad Autónoma, jul 2024 – abr 2025, como dicen portafolio y PDF) y corregir la entrada "Universidad Autónoma ene–jun 2024" de la BD.
- [x] Unificar Pervasivemind: título ("Práctica — Data & Web Scraping") y fechas reales.

### 2. Regenerar CV

- [x] Generar con cv_optimizer, `target_role` = "Backend Developer Python".
- [x] Verificar contenido: email gmail, título "Backend Developer" (sin "Junior", sin "Tech Lead"), liderazgo de 2 devs como logro con la fórmula acción+contexto+métrica, Gesitech con fecha de fin, métricas idénticas a las del sitio (sesión 02).
- [x] Correr el módulo credibility sobre el CV nuevo; exigir verdict distinto de `not_credible` y revisar todo flag no auto-corregible.

### 3. Publicar

- [x] Exportar PDF y reemplazar `public/Christian_Rangel_CV.pdf` en el repo del portafolio.
- [x] Verificar la descarga desde el sitio (`npm run dev` → botón "Descargar CV").

## Verificación

- Leer el PDF final (tool Read soporta PDF) y confrontar contra `src/locales/es/translation.json`: rol, fechas, email y cada métrica deben coincidir 1:1.
- `sqlite3` (lectura) sobre la BD: Gesitech existe, skills nuevas presentes, fechas de Noche Austral corregidas.
- Reporte de credibilidad nuevo con score > 58 y sin flags de inflación de título.

## Fuera de alcance

- Postulaciones y análisis de vacantes nuevos (uso normal de la app, no de esta sesión).
- Cambios de código en cv_optimizer.

## Notas de ejecución (2026-07-12)

- BD completada programáticamente vía los repos upsert de la app (sin onboarding conversacional, sin SQL crudo): 13 skills nuevas (ids 18-30), experiencia Gesitech creada (2025-05 → 2026-02), Universidad Autónoma corregida a jul-2024 → abr-2025, Pervasivemind con cargo real ("Practicante — Data & Web Scraping"). Backup previo de db.sqlite3 y del PDF anterior en el scratchpad de la sesión.
- Se detectó y corrigió una contradicción adicional en la BD: `raw_description` de Migtra decía liderazgo "desde noviembre 2024" con inicio de rol enero 2025 — se eliminó la fecha del claim (el mes real requiere confirmación de Christian si quiere reponerlo).
- CV generado con `target_role="Backend Developer Python"`: **ATS score 88**. Auditoría credibility iterada 3 veces: score final **63** (anterior: 58), `download_blocked=False`. Fixes aplicados entre iteraciones: métrica no documentada de Pervasivemind eliminada, Django añadido al bullet de reporting (documentado en BD), skills sin bullet de soporte eliminadas (Redis, Celery, HTMX, Flask), GCP App Engine explícito en el bullet de la web astronómica.
- Flags restantes del auditor evaluados y descartados con razón: cree que feb-2026 es fecha futura (hoy es jul-2026) y marca el gap estudiantil feb–jul 2024 (aceptado: era estudiante terminando la carrera).
- PDF publicado en `public/Christian_Rangel_CV.pdf` y verificado visualmente + descarga HTTP 200 desde el sitio.
- Pendientes menores: (1) Certificaciones (Diplomado IA, EF SET B1) quedan fuera del clip de una página del template `modern` — evaluar template de 2 páginas o condensar si se quieren incluir; (2) el orden de experiencias no es estrictamente cronológico inverso (Gesitech aparece tercero) — ajustar `display_order` si molesta.
