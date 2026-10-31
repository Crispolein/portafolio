# Design

Dirección aprobada: **Fusión / Definitivo** (canvas v12, octubre 2026). Las láminas de referencia viven en `openspec/changes/rediseno-fusion/ref/`: `DirDefinitivo` (home desktop), `DirCaso` (página de caso), `DirEstados` (hover, presionado, foco, scroll) y `DirMovil` (390 px). Si este archivo y una lámina discrepan, manda este archivo.

## Mundo

Un backend developer que opera y usa IA. El protagonista es una consola: el visitante elige un sistema y ve su pipeline correr. Navy de terminal con un solo acento ámbar. Nada decorativo se mueve: lo único animado es el paquete del pipeline, el caret y la entrada de cada sección al hacer scroll.

## Tokens

Definidos como CSS vars en `:root` (`src/index.css`) y mapeados en `tailwind.config.ts` con los mismos nombres.

| Token | Valor | Uso |
|---|---|---|
| `--bg` | `#101a2b` | fondo de página |
| `--term` | `#0a1220` | consola, inputs, hover de filas |
| `--line` | `#22324d` | bordes y divisores |
| `--txt` | `#d8e1f0` | texto principal |
| `--mut` | `#8b9ab5` | texto secundario |
| `--amb` | `#ffb340` | acento único: CTA, foco, nodos IA, marca |
| `--amb-hi` | `#ffc56b` | hover del botón sólido |
| `--cy` | `#7fd4ff` | claves en logs de consola |
| `--ok` | `#8fe0a6` | estado "disponible" y nodo final encendido |

Texto sobre ámbar: `#101a2b`. No hay modo claro.

## Tipografía

- **Archivo** variable (`wdth 62..125`, `wght 400..900`): todo el texto. Títulos con `font-variation-settings:"wdth" 80` y peso 800.
- **JetBrains Mono** 400/500/700: solo datos (estado, roles, consola, tags de stack, fechas, breadcrumbs).
- Self-hosted en `public/fonts` (woff2, `font-display: swap`); la CSP exige `font-src 'self'`, sin Google Fonts.

| Elemento | Desktop | Móvil (≤ 640 px) |
|---|---|---|
| h1 home | 62px / .94, -.03em | 40px / .98 |
| h1 caso | 72px | 44px |
| h2 sección | 40px | 30px |
| h2 contacto | 56px | 36px |
| h3 card destacada | 28px | 24px |
| h3 experiencia | 22px | 20px |
| cuerpo | 16-17px / 1.6 | 15-16px / 1.6 |
| mono datos | 12-14px | 11.5-13px |

## Espacio y layout

- Contenedor `WRAP` (`src/lib/layout.ts`), compartido por navbar, home y casos: max-width 1560px y gutter fluido `clamp(16px, 5vw, 88px)`. Los casos viven dentro de `<main>`, que ya lo aplica: no se repite.
- **Un acento por proyecto**: `data-ac="amb|cy"` en el contenedor fija `--ac`; los hijos usan `text-ac` y `border-ac`. 01 cv-optimizer es ámbar, 02 job-hunter es cian. El número 01/02 sale de `src/data/cases.ts` y se repite en las cards, el riel de proyectos y el panel de siguiente caso.
- Header 76px (60px móvil, sticky con borde inferior).
- Hero: grid `380px 1fr`, gap 56px, margin-top 52px. En móvil apilado: texto, CTAs, consola.
- Secciones: margin-top 120px (72px móvil). Encabezado `.sh` en flex con baseline, h2 a la izquierda y nota mono a la derecha, borde inferior `--line`.
- Proyectos destacados: grid `1fr 1fr` con borde izquierdo entre cards; captura de 200px con borde punteado.
- Lista de proyectos y herramientas: filas grid `280px 1fr 220px`, padding `22px 12px`, margin `0 -12px`. En móvil se apilan: nombre, texto y stack.
- Experiencia: grid `220px 1fr`. Contacto: grid `1fr 1fr`. Caso: grid `1fr 360px`.
- Radios: botón 4px, consola 8px, captura 6px. Sin sombras.

## Componentes

- **Button**: `min-height 50px`, padding `0 22px`, radius 4px, 700 16px. Variantes `solid` (fondo ámbar) y `ghost` (borde `--line`). Flecha en `<span aria-hidden>`. En móvil, ancho completo.
- **CardLink**: un `<a>` que envuelve tag mono, h3, descripción, captura y "Ver caso →".
- **Console**: barra (`~/christian/sistemas` · `4 sistemas`), pestañas como radio group (flechas izquierda/derecha cambian sistema), línea `~ $ run <sistema>`, descripción, pipeline, log de claves en cian, pie con caret.
- **Pipeline**: SVG horizontal `viewBox 0 0 640 120` en desktop y vertical en móvil. 5 nodos: inicio (círculo), 3 intermedios (cuadrados), fin (círculo que se enciende en verde). Nodos de IA con trazo y etiqueta ámbar. Cada SVG lleva `role="img"` y `aria-label` traducido.

## Estados (DirEstados)

| Elemento | Hover | Presionado | Foco teclado |
|---|---|---|---|
| Botón sólido | fondo `--amb-hi`, flecha `translateX(3px)` | `scale(.97)` | outline 2px `--amb`, offset 3px |
| Botón ghost | borde `--mut`, fondo `rgba(216,225,240,.04)`, flecha ↓ `translateY(2px)` | `scale(.97)` | igual |
| Card destacada | h3 ámbar, captura con borde sólido ámbar, "Ver caso" ámbar con flecha `translateX(4px)` | captura `scale(.995)` | outline offset 6px + mismos cambios que hover |
| Fila de lista | fondo `--term`, nombre ámbar, flecha aparece | igual | outline offset -2px + flecha visible |
| Input | sin cambio | n/a | outline 2px `--amb`, offset 1px |
| Pestaña consola | borde `--mut` | n/a | outline 2px `--amb`; activa: borde ámbar, fondo `rgba(255,179,64,.08)` |

Transiciones: color, fondo y borde en `.16s ease-out`; transform en `.1s`; flechas en `.2s cubic-bezier(.2,.8,.2,1)`.

## Motion

- **Reveal**: cada sección entra subiendo 28px con fade, una sola vez, atada al scroll. CSS puro:
  ```css
  @media (prefers-reduced-motion:no-preference){@supports (animation-timeline:view()){
    .rv{animation:rv linear both;animation-timeline:view();animation-range:entry 0% entry 35%}
    @keyframes rv{from{opacity:0;transform:translateY(28px)}}}}
  ```
  Sin soporte de `animation-timeline` el contenido simplemente está visible.
- **Pipeline**: el paquete ámbar recorre la línea en 4.6s `cubic-bezier(.55,0,.25,1)` en bucle; el nodo final pasa a `--ok` al 71%. Al cambiar de pestaña la animación reinicia.
- **Caret**: parpadeo 1.1s `steps(1)`.
- **Cambio entre vistas**: `navigate()` usa `document.startViewTransition` (la vieja se apaga en 160ms y la nueva barre de derecha a izquierda sobre ámbar, 320ms total). Sin soporte o con reduced motion, el cambio es inmediato. El foco va al h1 nuevo.
- **Carrusel de capturas** (`Carousel`): una captura visible, flechas, miniaturas con `aria-current`, contador `01 / 04` en región polite y flechas del teclado. Insignia fija "Datos ficticios": todas las capturas salen de datos inventados.
- **Reduced motion**: paquete quieto en el final, nodo final encendido, caret fijo, sin reveal y sin transiciones de botones ni cards.

## Breakpoints

- `≤ 640px`: layout de una columna según `DirMovil`. Menú en botón ≡ con `aria-expanded`; pestañas con scroll horizontal y snap; pipeline vertical; botones a ancho completo.
- `641-1023px`: hero apilado con consola a ancho completo; grids de dos columnas se mantienen donde caben.
- `≥ 1024px`: layout de `DirDefinitivo`.
- Nunca scroll horizontal de página.

## Accesibilidad

Skip link al `<main>`, foco visible en todo lo interactivo, labels reales en el formulario, `aria-live="polite"` en el estado del envío, contraste AA (todo texto `--mut` sobre `--bg` o `--term` lo cumple), `lang` del `<html>` sincronizado con el idioma activo.

## Anti-metas

No corporativo. Nada de animaciones de adorno (partículas, gradientes que se mueven, contadores, parallax). No la plantilla dev genérica de casi negro con neón, cards con glow y badges. Un solo acento.
