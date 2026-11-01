import { cleanup, render, screen, waitFor, within } from '@testing-library/react'
import { afterEach, describe, expect, it } from 'vitest'
import CasePage from './CasePage'
import { existsSync } from 'node:fs'
import { resolve } from 'node:path'
import { cases, shotSrc, type CaseSlug } from '../data/cases'
import i18n from '../i18n'

afterEach(cleanup)

describe('cases data', () => {
  it('maps slugs to keys, AI nodes and the other case', () => {
    expect(cases['cv-optimizer']).toMatchObject({ keyPrefix: 'case.cvOptimizer', aiNodes: [2], next: 'job-hunter' })
    expect(cases['job-hunter']).toMatchObject({ keyPrefix: 'case.jobHunter', aiNodes: [3], next: 'gps-analyzer' })
  })
})

describe('cases numbering and accent', () => {
  it('numera 01/02 y asigna un acento por proyecto', () => {
    expect(cases['cv-optimizer']).toMatchObject({ num: '01', accent: 'amb' })
    expect(cases['job-hunter']).toMatchObject({ num: '02', accent: 'cy' })
  })
})

describe('CasePage project rail', () => {
  it('marca el caso actual con aria-current y enlaza al otro', () => {
    render(<CasePage slug="job-hunter" />)
    const rail = screen.getByRole('navigation', { name: i18n.t('case.railLabel') })
    const current = within(rail).getByRole('link', { current: 'page' })
    expect(current).toHaveTextContent('02')
    expect(within(rail).getByRole('link', { name: /01/ })).toHaveAttribute('href', '/proyectos/cv-optimizer')
  })

  it('el panel de siguiente caso muestra el número del siguiente', () => {
    render(<CasePage slug="cv-optimizer" />)
    const next = screen.getByRole('link', { name: /Job Hunter Platform/ })
    expect(next).toHaveTextContent('02')
    expect(next).toHaveAttribute('data-ac', 'cy')
  })

  it('el contenedor del caso lleva el acento del proyecto', () => {
    const { container } = render(<CasePage slug="job-hunter" />)
    expect(container.firstElementChild).toHaveAttribute('data-ac', 'cy')
  })
})

describe('CasePage', () => {
  it.each(['cv-optimizer', 'job-hunter'] as const)('renders h1 and pipeline for %s', (slug) => {
    const prefix = cases[slug].keyPrefix
    render(<CasePage slug={slug} />)
    expect(screen.getByRole('heading', { level: 1 })).toHaveTextContent(i18n.t(`${prefix}.title`))
    expect(screen.getByRole('img', { name: i18n.t(`${prefix}.pipelineAria`) })).toBeInTheDocument()
    expect(screen.getByRole('heading', { level: 1 })).toHaveAttribute('tabindex', '-1')
  })

  it('links to the next case and back', () => {
    render(<CasePage slug="cv-optimizer" />)
    expect(screen.getByRole('link', { name: /Job Hunter Platform/ })).toHaveAttribute('href', '/proyectos/job-hunter')
    expect(screen.getByRole('link', { name: /Proyectos/ })).toHaveAttribute('href', '/')
  })

  it('returns null for an unknown slug', () => {
    const { container } = render(<CasePage slug="nope" />)
    expect(container).toBeEmptyDOMElement()
  })
})

describe('CasePage screenshots', () => {
  const slugs: CaseSlug[] = ['cv-optimizer', 'job-hunter']

  it.each(slugs)('%s: los 4 archivos de captura existen en public/shots', (slug) => {
    for (let n = 1; n <= cases[slug].shots; n++) {
      expect(existsSync(resolve(__dirname, '../../public', '.' + shotSrc(slug, n)))).toBe(true)
    }
  })

  it.each(slugs)('%s: monta un carrusel de 4 capturas con alt propio', (slug) => {
    const { container } = render(<CasePage slug={slug} />)
    const carousel = screen.getByRole('region', { name: i18n.t(`${cases[slug].keyPrefix}.shotsLabel`) })
    const imgs = carousel.querySelectorAll('figure img')
    expect(imgs).toHaveLength(4)
    imgs.forEach((img, i) => {
      expect(img.getAttribute('src')).toBe(shotSrc(slug, i + 1))
      expect(img.getAttribute('alt')).toBeTruthy()
    })
    expect(container.querySelector('.border-dashed')).toBeNull()
  })
})

describe('CasePage reveal (GSAP)', () => {
  const mockMotion = (noPreference: boolean) => {
    window.matchMedia = ((query: string) => ({
      matches: query.includes('no-preference') ? noPreference : false,
      media: query,
      addEventListener: () => {},
      removeEventListener: () => {},
      addListener: () => {},
      removeListener: () => {},
      dispatchEvent: () => false,
      onchange: null,
    })) as unknown as typeof window.matchMedia
  }
  afterEach(() => {
    // @ts-expect-error jsdom has no matchMedia by default
    delete window.matchMedia
  })

  it('las 4 secciones usan data-reveal y no la clase CSS .rv (sin doble animación)', () => {
    const { container } = render(<CasePage slug="cv-optimizer" />)
    expect(container.querySelectorAll('section[data-reveal]')).toHaveLength(4)
    expect(container.querySelector('section.rv')).toBeNull()
  })

  it('con prefers-reduced-motion: reduce no oculta ni anima nada', () => {
    mockMotion(false)
    const { container } = render(<CasePage slug="cv-optimizer" />)
    const sections = container.querySelectorAll<HTMLElement>('section[data-reveal]')
    expect(sections).toHaveLength(4)
    sections.forEach((s) => expect(s.style.opacity).toBe(''))
  })

  it('sin preferencia de movimiento prepara las secciones ocultas para revelarlas al hacer scroll', async () => {
    mockMotion(true)
    const { container } = render(<CasePage slug="cv-optimizer" />)
    const sections = container.querySelectorAll<HTMLElement>('section[data-reveal]')
    expect(sections).toHaveLength(4)
    await waitFor(() => sections.forEach((s) => expect(s.style.opacity).toBe('0')))
  })

  it('al desmontar revierte los estilos inline (cleanup)', async () => {
    mockMotion(true)
    const { container, unmount } = render(<CasePage slug="cv-optimizer" />)
    const sections = Array.from(container.querySelectorAll<HTMLElement>('section[data-reveal]'))
    expect(sections).toHaveLength(4)
    await waitFor(() => expect(sections[0].style.opacity).toBe('0'))
    unmount()
    sections.forEach((s) => expect(s.style.opacity).toBe(''))
  })
})
