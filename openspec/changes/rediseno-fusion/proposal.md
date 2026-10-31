# Rediseño Fusión / Definitivo

## Por qué

El sitio actual se siente como una plantilla dev genérica: paleta café con ámbar apagado, cards iguales para todo y secciones About y Skills que repiten lo que ya dice el CV. El visitante principal es un reclutador o tech lead y no ve en los primeros segundos qué hago ni cómo lo hago.

## Qué cambia

- Paleta navy de terminal con un solo acento ámbar, Archivo para títulos y JetBrains Mono para datos.
- Hero con una consola de 4 sistemas: el visitante elige uno y ve su pipeline correr.
- Narrativa dev + ops + IA, con copy en mi voz y solo métricas verificables.
- Dos páginas de caso, CV Optimizer Pro y Job Hunter Platform, en `/proyectos/<slug>`.
- Estados de botón, card, fila, input y pestaña según `ref/DirEstados.html`; reveal al hacer scroll en CSS puro; todo quieto con reduced motion.
- Versión móvil según `ref/DirMovil.html`.
- Se eliminan About, Skills y los componentes viejos.
- Harness de tests nuevo: Vitest con Testing Library y Playwright con axe.

## Qué no cambia

- Bilingüe es/en con i18next, español por defecto.
- Formulario de contacto contra `api/contact.ts` con Resend y honeypot.
- Hosting en Vercel con el rewrite actual de `vercel.json`.

## Fuera de alcance

Página freelance de Cuadra Digital, self-hosting de fuentes, OG image, sitemap, capturas reales de los casos y deploy. El push y el deploy requieren el OK de Christian.
