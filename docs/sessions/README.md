# Plan por sesiones — Portafolio

Plan maestro derivado de la auditoría del 2026-07-12 (frontend, contenido vs criterios de reclutador, datos reales de cv_optimizer y assets disponibles). Cada sesión de trabajo con Claude abre su documento, ejecuta el checklist, marca cada ítem completado (`[ ]` → `[x]`) y actualiza la tabla de estado de este README antes de cerrar.

## Estado global

| Sesión | Documento | Estado | Última actualización |
|---|---|---|---|
| 01 | [Seguridad](01-seguridad.md) | Completada (verificación de headers pendiente del próximo deploy) | 2026-07-12 |
| 02 | [Contenido y credibilidad](02-contenido-credibilidad.md) | Completada | 2026-07-12 |
| 03 | [Frontend: des-genericizar](03-frontend-degeneric.md) | Completada | 2026-07-12 |
| 04 | [CV PDF y coherencia de fuentes](04-cv-pdf-coherencia.md) | Completada | 2026-07-12 |
| 05 | [Assets pendientes](05-assets-pendientes.md) | Parcial: 3/4 capturados (integración al sitio pospuesta por decisión de Christian); financial bloqueado (Firebase sin app web), Migtra sin autorizar | 2026-07-12 |

Orden recomendado: 01 → 02 → 03 → 04. La 05 puede ejecutarse en cualquier momento después de la 03.

## Reglas de trabajo

- Una sesión por conversación de Claude; no mezclar sesiones en un mismo diff.
- Antes de empezar una sesión, leer su documento completo y verificar los prerequisitos.
- Cada cambio de código se verifica con los comandos de la sección "Verificación" del documento antes de marcarse como completo.
- Si un hallazgo del documento resulta estar desactualizado respecto al código, corregir el documento en la misma operación.

## Decisiones ya ratificadas por Christian (no relitigar)

1. **Solo métricas documentadas**: las cifras "80 tickets/mes eliminados" y "30 hrs/mes ahorradas" no tienen respaldo en cv_optimizer ni en el CV PDF; se reemplazan por las verificadas (ver sesión 02).
2. **Rol en Migtra**: "Backend Developer" como título; el liderazgo técnico de 2 desarrolladores se presenta como logro, no como título.
3. **Refinar el diseño actual**, no rediseño completo. Conservar el sistema semántico ámbar (humano/backend) / cielo (IA).
4. **Solo assets buenos existentes** por ahora (cv_optimizer, Noche Austral); la regeneración de los rotos queda documentada en la sesión 05.
5. **Posicionamiento sin cambios**: "backend Python potenciado por IA" — validado por los scores de matching de cv_optimizer (ATS 84–88 para Backend Developer Python vs 22–54 para Data/Mobile).

## Hosting: decisión y triggers de reevaluación

**Decisión: quedarse en Vercel.** La superficie (SPA estática + 1 función serverless) encaja en el free tier, los preview deploys por PR ya están en uso y migrar no elimina ningún riesgo que la sesión 01 no cubra. Vercel incluye mitigación DDoS básica de plataforma.

Reevaluar solo si ocurre alguno de estos triggers:

- **Spam persistente** en el formulario pese a honeypot + throttle (sesión 01) → migrar a Cloudflare Pages con Turnstile + WAF (free tier); implica portar `api/contact.ts` a Pages Function (cambio pequeño de API).
- **Necesidad de backend real** (base de datos, auth, sesiones) → ese backend se despliega aparte (Railway/Fly/VPS); el sitio estático puede permanecer en Vercel.
- **Costos de ancho de banda** — improbable con el peso actual de assets (< 3 MB).

## Fuentes de verdad

- Perfil profesional: BD de cv_optimizer (`/Users/christian/herrramientas_personales/cv_optimizer/db.sqlite3`, solo lectura desde este repo).
- Assets visuales: `/Users/christian/herrramientas_personales/portfolio/{screenshots,videos}/`.
- CV público: `public/Christian_Rangel_CV.pdf` (se regenera en la sesión 04).
