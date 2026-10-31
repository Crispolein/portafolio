# Product

<!-- impeccable:product-schema 1 -->

## Platform

web

## Users

Primary: recruiters and tech leads screening a backend candidate, usually on desktop between LinkedIn and GitHub tabs, deciding in under a minute whether to open the CV or write. Freelance clients are served separately (Cuadra Digital), not by this site.

## Product Purpose

Personal portfolio of Christian Rangel, Backend Developer at Migtra (since January 2025, GPS telemetry on AWS) and Ingeniero Civil Informático. Success: the visitor downloads the CV or sends a message through the contact form.

## Positioning

Backend Python engineer amplified by AI: the proof is production work (automations that took document-request tickets from days to ~0, 0 incidents in 6+ months, technical lead of 2 junior devs) plus AI-agent projects built end to end.

## Evidence

Only documented metrics are used; never invent numbers, clients or testimonials. Source of truth for copy: `src/locales/{es,en}/translation.json`. Migtra internal tools are shown generically, without client data.

## Constraints

- Bilingual es/en is mandatory (i18next); every visible string lives in both locales.
- Accessibility baseline: labeled controls, visible keyboard focus, alt text, `prefers-reduced-motion` respected.
- Hosted on Vercel; contact form via Resend (`api/contact.ts`).

## Anti-goals

Must not feel corporate, must not use decorative motion, must not look like the generic dev template (near-black + neon accent + cards + badges).
