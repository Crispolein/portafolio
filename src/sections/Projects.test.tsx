import { cleanup, fireEvent, render, screen } from '@testing-library/react'
import { afterEach, describe, expect, it } from 'vitest'
import Projects from './Projects'
import es from '../locales/es/translation.json'

afterEach(cleanup)

const slugs = ['cv-optimizer', 'job-hunter', 'gps-analyzer', 'pokemontcgai', 'project-hub']
const caseLinks = () =>
  screen.getAllByRole('link').filter((a) => a.getAttribute('href')?.startsWith('/proyectos/'))

describe('Projects featured', () => {
  it('muestra los 5 casos numerados 01 a 05 en orden', () => {
    render(<Projects />)
    const cards = caseLinks()
    expect(cards.map((a) => a.getAttribute('href'))).toEqual(slugs.map((s) => `/proyectos/${s}`))
    cards.forEach((c, i) => expect(c).toHaveTextContent(`0${i + 1}`))
    expect(cards[0]).toHaveAttribute('data-ac', 'amb')
    expect(cards[1]).toHaveAttribute('data-ac', 'cy')
  })

  it('cada destacada muestra la primera captura de su caso y ningún placeholder', () => {
    const { container } = render(<Projects />)
    const srcs = [...container.querySelectorAll('a[href^="/proyectos/"] img')].map((i) => i.getAttribute('src'))
    expect(srcs).toEqual(slugs.map((s) => `/shots/${s}-1.webp`))
    expect(container.querySelector('.border-dashed')).toBeNull()
  })
})

describe('Projects list', () => {
  const rows = [
    ['nocheAustral', 'astroapp', 3],
    ['astroweb', 'astroweb', 3],
    ['tcg', 'pokecollector', 4],
    ['financial', 'financial', 3],
    ['patriotsweek', 'patriotsweek', 3],
    ['vitrina', 'vitrina', 4],
  ] as const

  it('cada fila con capturas es un botón con miniatura que abre el visor con sus slides', () => {
    const { container } = render(<Projects />)
    for (const [id, slug, count] of rows) {
      const name = (es.projects.list as Record<string, { name: string }>)[id].name
      const button = screen.getByRole('button', { name: new RegExp(name) })
      expect(button.querySelector('img')).toHaveAttribute('src', `/shots/${slug}-1.webp`)
      fireEvent.click(button)
      const dialog = screen.getByRole('dialog')
      expect(dialog).toHaveAccessibleName(name)
      expect(dialog.querySelectorAll(`img[src^="/shots/${slug}-"]`).length).toBeGreaterThanOrEqual(1)
      expect((es.projects.list as Record<string, { shots: string[] }>)[id].shots).toHaveLength(count)
      fireEvent.keyDown(document, { key: 'Escape' })
      expect(screen.queryByRole('dialog')).toBeNull()
      expect(button).toHaveFocus()
    }
    expect(container.querySelectorAll('li')).toHaveLength(rows.length)
  })

  it('pokemontcgai ya no está en la lista', () => {
    expect(Object.keys(es.projects.list)).not.toContain('pokemontcgai')
  })

  it('conserva el enlace externo seguro de los repos públicos', () => {
    render(<Projects />)
    for (const [id, href] of [
      ['nocheAustral', 'https://github.com/Crispolein/Astroapp'],
      ['astroweb', 'https://github.com/Crispolein/Astroweb'],
    ] as const) {
      const link = screen.getByRole('link', { name: new RegExp((es.projects.list as Record<string, { name: string }>)[id].name) })
      expect(link).toHaveAttribute('href', href)
      expect(link).toHaveAttribute('target', '_blank')
      expect(link.getAttribute('rel')).toContain('noopener')
      expect(link.getAttribute('rel')).toContain('noreferrer')
    }
  })

  it('las filas privadas indican repo privado', () => {
    render(<Projects />)
    expect(screen.getAllByText(es.projects.privateRepo)).toHaveLength(4)
  })
})
