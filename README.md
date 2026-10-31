# portafolio

Portafolio personal de Christian Rangel (backend Python). Objetivo: que quien lo visite descargue
el CV o escriba por el formulario de contacto.

Stack: Vite + React + TypeScript + Tailwind, i18n es/en (`src/locales/`), formulario con función
serverless en `api/contact.ts`, desplegado en Vercel (`vercel.json`).

## Uso

```bash
npm install
npm run dev        # desarrollo
npm run build      # build de producción en dist/
npm test           # vitest
npm run test:e2e   # playwright con axe, contra vite preview en :4173
```

La primera vez, `npx playwright install chromium`. Si ya hay un preview en el puerto 4173,
Playwright lo reutiliza: ciérralo antes para no probar un build viejo.

## Documentos

- `PRODUCT.md`: público, propósito, posicionamiento y reglas de evidencia del copy.
- `DESIGN.md`: sistema visual.
- `openspec/changes/`: trabajo en curso.
