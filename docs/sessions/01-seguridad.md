# Sesión 01 — Seguridad

**Estado:** Completada — 2026-07-12

## Objetivo

Endurecer el portafolio al máximo razonable para su superficie real: SPA estática servida por Vercel + una única función serverless (`api/contact.ts`) que envía email vía Resend.

## Evidencia (auditoría 2026-07-12)

- **SQL injection: no aplica.** El portafolio no tiene base de datos. La única entrada de usuario (formulario de contacto) termina en un email vía Resend, ya escapada. cv_optimizer (Django + SQLite) es una app local, no desplegada, fuera de esta superficie.
- `api/contact.ts` ya está endurecida: POST only, límites de longitud (`LIMITS`), regex de email + bloqueo de caracteres de header-injection, escape HTML (`esc`), API key solo en env server-side. **Gaps: sin rate limiting, sin honeypot, sin check de Origin** — un bot puede quemar la cuota de Resend y llenar el inbox.
- `vercel.json` no define ningún security header.
- Build Vite ya minifica sin sourcemaps (default; `vite.config.ts` no activa `sourcemap`). `npm audit --omit=dev`: 0 vulnerabilidades (2026-07-12).
- Sin secretos en `src/` (verificado por grep); `.env` está git-ignorado.

**Límite honesto que este documento deja registrado:** el JavaScript de una SPA siempre es inspeccionable desde DevTools — minificado e ilegible, pero presente. No existe forma de "ocultar el código" de un frontend estático; la garantía real es que nada secreto viva en el cliente, y hoy ya se cumple (la API key de Resend solo existe server-side). Cualquier futura funcionalidad sensible debe implementarse en una función serverless, nunca en `src/`.

## Prerequisitos

- Working tree limpio (`git status`).
- Node disponible: `export PATH="$HOME/.nvm/versions/node/v24.15.0/bin:$PATH"`.

## Checklist

### 1. Security headers en `vercel.json`

- [x] Agregar bloque `headers` aplicado a `/(.*)` con:
  - `Content-Security-Policy`: `default-src 'self'; script-src 'self'; style-src 'self' 'unsafe-inline' https://fonts.googleapis.com; font-src https://fonts.gstatic.com; img-src 'self' data:; media-src 'self'; connect-src 'self'; frame-ancestors 'none'; base-uri 'self'; form-action 'self'`
  - `Strict-Transport-Security: max-age=63072000; includeSubDomains`
  - `X-Content-Type-Options: nosniff`
  - `X-Frame-Options: DENY`
  - `Referrer-Policy: strict-origin-when-cross-origin`
  - `Permissions-Policy: camera=(), microphone=(), geolocation=()`

  Nota: `'unsafe-inline'` en `style-src` lo exigen framer-motion (estilos inline) y el `@import` de Google Fonts en `src/index.css:1`. Si la sesión 03 self-hostea las fuentes, quitar los dominios de Google y reevaluar `'unsafe-inline'`.

### 2. Anti-spam en `api/contact.ts` (sin dependencias nuevas)

- [x] **Honeypot**: campo oculto (p. ej. `website`) en el formulario de `src/sections/Contact.tsx` (CSS `position:absolute; left:-9999px`, `tabIndex={-1}`, `autoComplete="off"`); si llega con contenido, responder `200 {ok:true}` sin enviar el email.
- [x] **Check de Origin**: si `req.headers.origin` existe y no coincide con el dominio del sitio (leer de env `SITE_ORIGIN`, con fallback a los dominios `*.vercel.app` del proyecto), responder 403.
- [x] **Throttle best-effort en memoria**: `Map<ip, timestamp[]>` module-level; máx. 3 envíos por IP cada 10 minutos → 429. Comentario `// ponytail: throttle per-instancia (se resetea en cold start); subir a KV/Upstash solo si el spam persiste`.
- [x] Mantener intactas las defensas existentes (escape, límites, regex).

### 3. Dependencias y build

- [x] `npm audit` completo (incluyendo devDeps); actualizar paquetes con vulnerabilidades high/critical si aparecen.
- [x] `npm run build` y verificar: no existen archivos `.map` en `dist/`, bundle minificado.
- [x] `grep -riE "re_[A-Za-z0-9]{8,}|RESEND_API_KEY" dist/` → sin resultados.
- [x] `grep -rn "console\." src/` → sin logs en código cliente (el `console.error` de `api/contact.ts:66` es server-side y se queda).

## Verificación

Con `vercel dev` o deploy preview:

```bash
# Headers presentes
curl -sI https://<preview-url>/ | grep -iE 'content-security|strict-transport|x-frame|x-content|referrer-policy|permissions-policy'

# Método no permitido → 405
curl -s -o /dev/null -w '%{http_code}' https://<preview-url>/api/contact

# Payload oversize → 400
curl -s -o /dev/null -w '%{http_code}' -X POST https://<preview-url>/api/contact \
  -H 'Content-Type: application/json' \
  -d "{\"name\":\"a\",\"email\":\"a@b.co\",\"message\":\"$(python3 -c 'print("x"*5000)')\"}"

# Honeypot lleno → 200 pero SIN email recibido
curl -s -X POST https://<preview-url>/api/contact -H 'Content-Type: application/json' \
  -d '{"name":"bot","email":"bot@spam.com","message":"spam","website":"http://spam.com"}'

# 4 envíos seguidos → el 4º devuelve 429
# Envío legítimo desde el formulario del sitio → llega a chris.rangel.intriago@gmail.com
```

El formulario legítimo debe seguir funcionando end-to-end (probar desde el navegador, no solo curl).

## Fuera de alcance

- CAPTCHA/Turnstile (solo si el spam persiste — ver triggers de hosting en README).
- Self-hosting de fuentes (sesión 03).
- Cualquier cambio de contenido o diseño.

## Notas de ejecución (2026-07-12)

- **Bug real encontrado y corregido** al testear el handler: Resend v4 no lanza excepción en errores de API — devuelve `{ data, error }` — por lo que un envío fallido respondía `200 {ok:true}` y el mensaje se perdía en silencio. Fix: verificación de `error` → 500 (`api/contact.ts`). El test se observó fallando antes del fix y pasando después.
- Suite ejecutable de 9 pruebas del handler con mocks (405, 403 origin, 400 oversize/inválido/injection, honeypot 200-sin-envío, throttle 429): 9/9 PASS en local.
- `npm audit`: producción **0 vulnerabilidades**. Quedan 12 (7 high) en cadenas de devDependencies (path-to-regexp/undici embebidos en @vercel/node, esbuild vía vite 6) — solo se corrigen con majors breaking (`vite@8`); sin exposición en runtime (toolchain local de build). `@vercel/node` subido a 5.8.23; `npm audit fix` aplicado.
- **Pendiente del próximo deploy**: verificación con `curl` de headers y endpoint sobre la URL real (no hay vercel CLI autenticado en local). Opcional: definir env `SITE_ORIGIN=https://<dominio>` en Vercel para restringir el check de Origin al dominio custom.
