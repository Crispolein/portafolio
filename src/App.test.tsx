import { act, cleanup, fireEvent, render, screen, waitFor } from '@testing-library/react'
import { afterEach, beforeEach, describe, expect, it } from 'vitest'
import App, { HOME_TITLE } from './App'
import { navigate } from './lib/route'
import i18n from './i18n'
import es from './locales/es/translation.json'
import en from './locales/en/translation.json'

function go(path: string) {
  window.history.replaceState(null, '', path)
}

beforeEach(async () => {
  go('/')
  await act(() => i18n.changeLanguage('es'))
  document.documentElement.lang = 'es'
})

afterEach(cleanup)

describe('App', () => {
  it('returning home from a case focuses the home h1', async () => {
    window.scrollTo = (() => {}) as typeof window.scrollTo
    go('/proyectos/cv-optimizer')
    render(<App />)
    act(() => navigate('/'))
    await waitFor(() => expect(screen.getByRole('heading', { level: 1 })).toHaveFocus())
  })

  it('document title follows the route and the language', async () => {
    go('/proyectos/cv-optimizer')
    render(<App />)
    expect(document.title).toBe(`${es.case.cvOptimizer.title} · Christian Rangel`)
    await act(() => i18n.changeLanguage('en'))
    expect(document.title).toBe(`${en.case.cvOptimizer.title} · Christian Rangel`)
    act(() => navigate('/'))
    expect(document.title).toBe(HOME_TITLE)
  })

  it('home has a single h1 inside main#main and no old sections', () => {
    render(<App />)
    expect(screen.getAllByRole('heading', { level: 1 })).toHaveLength(1)
    const main = document.getElementById('main')
    expect(main).not.toBeNull()
    expect(main!.querySelector('h1')).not.toBeNull()
    for (const id of ['hero', 'story', 'projects', 'tools', 'experience', 'contact']) {
      expect(main!.querySelector(`#${id}`)).not.toBeNull()
    }
    expect(document.getElementById('about')).toBeNull()
    expect(document.getElementById('skills')).toBeNull()
  })

  it('hero has the CV download and the projects CTA', () => {
    render(<App />)
    const cv = screen.getByRole('link', { name: new RegExp(es.hero.ctaCv) })
    expect(cv).toHaveAttribute('href', '/Christian_Rangel_CV.pdf')
    expect(cv).toHaveAttribute('download')
    expect(screen.getByRole('link', { name: new RegExp(es.hero.ctaProjects) })).toHaveAttribute('href', '#projects')
  })

  it('language toggle switches lang and the h1 text', async () => {
    render(<App />)
    const h1 = screen.getByRole('heading', { level: 1 })
    expect(h1).toHaveTextContent(es.hero.titleA)
    fireEvent.click(screen.getAllByRole('button', { name: es.nav.switchLang })[0])
    expect(document.documentElement.lang).toBe('en')
    expect(screen.getByRole('heading', { level: 1 })).toHaveTextContent(en.hero.titleA)
  })

  it('skip link points to #main', () => {
    render(<App />)
    expect(screen.getByRole('link', { name: es.nav.skip })).toHaveAttribute('href', '#main')
  })

  it('mobile menu toggle exposes aria-expanded and aria-controls', () => {
    render(<App />)
    const btn = screen.getByRole('button', { name: es.nav.openMenu })
    expect(btn).toHaveAttribute('aria-expanded', 'false')
    expect(btn).toHaveAttribute('aria-controls', 'mobile-menu')
    fireEvent.click(btn)
    expect(screen.getByRole('button', { name: es.nav.closeMenu })).toHaveAttribute('aria-expanded', 'true')
    expect(document.getElementById('mobile-menu')).not.toBeNull()
  })

  it('/proyectos/job-hunter renders the case page', () => {
    go('/proyectos/job-hunter')
    render(<App />)
    expect(screen.getAllByRole('heading', { level: 1 })).toHaveLength(1)
    expect(document.getElementById('hero')).toBeNull()
    expect(screen.getByRole('heading', { level: 1 })).toHaveTextContent(/job hunter/i)
  })

  it('unknown slug renders the home', () => {
    go('/proyectos/nope')
    render(<App />)
    expect(document.getElementById('hero')).not.toBeNull()
  })

  it('clicking a featured card navigates to its case without reload', async () => {
    render(<App />)
    const link = document.querySelector<HTMLAnchorElement>('a[href="/proyectos/cv-optimizer"]')!
    await act(async () => {
      fireEvent.click(link)
    })
    expect(window.location.pathname).toBe('/proyectos/cv-optimizer')
    expect(document.getElementById('hero')).toBeNull()
  })

  it('section links from a case page go back home', async () => {
    go('/proyectos/job-hunter')
    render(<App />)
    const link = screen.getAllByRole('link', { name: es.nav.projects })[0]
    await act(async () => {
      fireEvent.click(link)
    })
    expect(window.location.pathname).toBe('/')
    expect(document.getElementById('hero')).not.toBeNull()
  })
})
