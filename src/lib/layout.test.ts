import { readFileSync } from 'node:fs'
import { resolve } from 'node:path'
import { describe, expect, it } from 'vitest'
import { WRAP } from './layout'

const src = (p: string) => readFileSync(resolve(__dirname, '..', p), 'utf8')

describe('wide layout', () => {
  it('WRAP usa 1560px de tope y gutter fluido', () => {
    expect(WRAP).toContain('max-w-[1560px]')
    expect(WRAP).toMatch(/px-\[clamp\(16px,5vw,88px\)\]/)
  })

  it.each(['App.tsx', 'components/Navbar.tsx'])('%s usa WRAP', (file) => {
    expect(src(file)).toContain('WRAP')
  })

  it.each(['App.tsx', 'components/Navbar.tsx', 'pages/CasePage.tsx'])('%s no conserva el tope angosto', (file) => {
    expect(src(file)).not.toContain('1168')
  })

  it('CasePage vive dentro de main y no duplica el contenedor', () => {
    expect(src('pages/CasePage.tsx')).not.toContain('WRAP')
  })

  it('el hero reparte el ancho extra entre texto y consola', () => {
    expect(src('sections/Hero.tsx')).toContain('lg:grid-cols-[minmax(420px,.78fr)_1.22fr]')
  })
})
