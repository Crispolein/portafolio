import { readFileSync } from 'node:fs'
import { resolve } from 'node:path'
import { describe, expect, it } from 'vitest'

const root = resolve(__dirname, '../..')
const css = readFileSync(resolve(root, 'src/index.css'), 'utf8')
const tailwind = readFileSync(resolve(root, 'tailwind.config.ts'), 'utf8')
const html = readFileSync(resolve(root, 'index.html'), 'utf8')

const tokens: Record<string, string> = {
  bg: '#101a2b',
  term: '#0a1220',
  line: '#22324d',
  txt: '#d8e1f0',
  mut: '#8b9ab5',
  amb: '#ffb340',
  'amb-hi': '#ffc56b',
  cy: '#7fd4ff',
  ok: '#8fe0a6',
}

describe('design tokens', () => {
  for (const [name, hex] of Object.entries(tokens)) {
    it(`--${name} es ${hex} en :root y se mapea en tailwind`, () => {
      expect(css).toMatch(new RegExp(`--${name}:\\s*${hex}\\s*;`, 'i'))
      expect(tailwind).toContain(`'${name}': 'var(--${name})'`)
    })
  }

  it('declara fuentes Archivo y JetBrains Mono', () => {
    expect(tailwind).toMatch(/sans:\s*\[\s*'Archivo'/)
    expect(tailwind).toMatch(/mono:\s*\[\s*'"JetBrains Mono"'/)
    expect(html).toContain('family=Archivo:wdth,wght@80,400..800')
    expect(html).toContain('JetBrains+Mono')
    expect(html).toContain('rel="preconnect"')
    expect(html).toContain('<meta name="theme-color" content="#101a2b"')
    expect(html).not.toMatch(/Inter|Bricolage/)
  })

  it('foco global ámbar con offset 3px', () => {
    expect(css).toMatch(/:focus-visible\s*{[^}]*outline:\s*2px solid var\(--amb\)[^}]*outline-offset:\s*3px/)
  })

  it('reveal ligado al scroll solo con soporte y sin reduced motion', () => {
    expect(css).toMatch(/@media \(prefers-reduced-motion:\s*no-preference\)[\s\S]*@supports \(animation-timeline:\s*view\(\)\)[\s\S]*\.rv\s*{/)
    expect(css).toContain('animation-timeline: view()')
  })

  it('bloque reduced motion: sin animación y .rv visible', () => {
    const m = css.match(/@media \(prefers-reduced-motion:\s*reduce\)\s*{([\s\S]*?)\n}\n/)
    expect(m).not.toBeNull()
    const block = m![1]
    expect(block).toMatch(/animation:\s*none/)
    expect(block).toMatch(/transition:\s*none/)
    expect(block).toMatch(/\.rv\s*{[^}]*opacity:\s*1/)
  })
})
