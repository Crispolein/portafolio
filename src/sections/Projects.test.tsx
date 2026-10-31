import { cleanup, render, screen, within } from '@testing-library/react'
import { afterEach, describe, expect, it } from 'vitest'
import Projects from './Projects'
import es from '../locales/es/translation.json'

afterEach(cleanup)

describe('Projects numbering', () => {
  it('numera las destacadas 01 y 02 con su acento', () => {
    render(<Projects />)
    const cards = screen.getAllByRole('link').filter((a) => a.getAttribute('href')?.startsWith('/proyectos/'))
    expect(cards).toHaveLength(2)
    expect(cards[0]).toHaveTextContent('01')
    expect(cards[0]).toHaveAttribute('data-ac', 'amb')
    expect(cards[1]).toHaveTextContent('02')
    expect(cards[1]).toHaveAttribute('data-ac', 'cy')
  })
})

describe('Projects', () => {
  it('links the two featured projects to their case pages', () => {
    render(<Projects />)
    const hrefs = screen
      .getAllByRole('link')
      .map((a) => a.getAttribute('href'))
      .filter((h) => h?.startsWith('/proyectos/'))
    expect(hrefs).toEqual(['/proyectos/cv-optimizer', '/proyectos/job-hunter'])
  })

  it('renders noche austral as an external link with safe rel', () => {
    render(<Projects />)
    const link = screen.getByRole('link', { name: new RegExp(es.projects.list.nocheAustral.name) })
    expect(link).toHaveAttribute('href', 'https://github.com/Crispolein/Astroapp')
    expect(link).toHaveAttribute('target', '_blank')
    expect(link.getAttribute('rel')).toContain('noopener')
    expect(link.getAttribute('rel')).toContain('noreferrer')
  })

  it('renders the other list rows as non-links', () => {
    render(<Projects />)
    for (const id of ['pokemontcgai', 'tcg', 'financial'] as const) {
      const name = es.projects.list[id].name
      expect(screen.queryByRole('link', { name: new RegExp(name) })).toBeNull()
      const row = screen.getByText(name).closest('div') as HTMLElement
      expect(within(row).getByText(es.projects.privateRepo)).toBeInTheDocument()
    }
    expect(screen.getAllByRole('link')).toHaveLength(3)
  })
})

describe('Projects screenshots', () => {
  it('cada destacada muestra la primera captura de su caso y ningún placeholder', () => {
    const { container } = render(<Projects />)
    const srcs = [...container.querySelectorAll('a[href^="/proyectos/"] img')].map((i) => i.getAttribute('src'))
    expect(srcs).toEqual(['/shots/cv-optimizer-1.webp', '/shots/job-hunter-1.webp'])
    expect(container.querySelector('.border-dashed')).toBeNull()
  })
})
