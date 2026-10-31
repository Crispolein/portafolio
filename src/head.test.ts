import { existsSync, readFileSync } from 'node:fs'
import { resolve } from 'node:path'
import { describe, expect, it } from 'vitest'

const root = resolve(__dirname, '..')
const read = (p: string) => readFileSync(resolve(root, p), 'utf8')
const html = read('index.html')
const SITE = 'https://portafolio-roan-phi.vercel.app'

describe('self-hosted fonts', () => {
  it('index.html does not load Google Fonts', () => {
    expect(html).not.toMatch(/fonts\.(googleapis|gstatic)\.com/)
  })

  it('index.css declares both families from /fonts and the files exist', () => {
    const css = read('src/index.css')
    for (const file of ['archivo-latin', 'jetbrains-mono-latin']) {
      expect(css).toContain(`url(/fonts/${file}.woff2)`)
      expect(existsSync(resolve(root, `public/fonts/${file}.woff2`))).toBe(true)
    }
  })

  it('CSP only allows fonts and styles from self', () => {
    const csp = read('vercel.json')
    expect(csp).toContain("font-src 'self'")
    expect(csp).not.toMatch(/googleapis|gstatic/)
  })
})

describe('sharing and crawling', () => {
  it('index.html has Open Graph and Twitter card tags with absolute URLs', () => {
    expect(html).toContain(`<meta property="og:image" content="${SITE}/og.png"`)
    expect(html).toContain(`<meta property="og:url" content="${SITE}/"`)
    expect(html).toMatch(/<meta property="og:title" content="[^"]+"/)
    expect(html).toMatch(/<meta property="og:description" content="[^"]+"/)
    expect(html).toContain('<meta name="twitter:card" content="summary_large_image"')
    expect(html).toContain(`<link rel="canonical" href="${SITE}/"`)
    expect(existsSync(resolve(root, 'public/og.png'))).toBe(true)
  })

  it('title and description use the ratified role, not Backend Engineer', () => {
    expect(html).not.toContain('Backend Engineer')
    expect(html).toContain('<title>Christian Rangel · Backend Developer</title>')
  })

  it('robots.txt points to the sitemap and the sitemap lists every route', () => {
    expect(read('public/robots.txt')).toContain(`Sitemap: ${SITE}/sitemap.xml`)
    const sitemap = read('public/sitemap.xml')
    for (const path of ['/', '/proyectos/cv-optimizer', '/proyectos/job-hunter']) {
      expect(sitemap).toContain(`<loc>${SITE}${path}</loc>`)
    }
  })
})
