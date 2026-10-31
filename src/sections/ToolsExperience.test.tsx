import { cleanup, render, screen } from '@testing-library/react'
import { afterEach, describe, expect, it } from 'vitest'
import i18n from '../i18n'
import Tools from './Tools'
import Experience from './Experience'
import { tools } from '../data/tools'
import { experiences } from '../data/experience'
import es from '../locales/es/translation.json'
import en from '../locales/en/translation.json'

afterEach(async () => {
  cleanup()
  await i18n.changeLanguage('es')
})

describe('data', () => {
  it('lists the tools and experience in order', () => {
    expect(tools.map((t) => t.id)).toEqual(['dbCopy', 'kml', 'userManager'])
    expect(experiences.map((e) => e.id)).toEqual(['migtra', 'nocheAustral', 'pervasive', 'edu'])
  })
})

describe('Tools', () => {
  it('renders 3 tools with es texts', () => {
    render(<Tools />)
    expect(screen.getAllByRole('listitem')).toHaveLength(3)
    for (const id of ['dbCopy', 'kml', 'userManager'] as const) {
      expect(screen.getByText(es.tools.items[id].name)).toBeInTheDocument()
      expect(screen.getByText(es.tools.items[id].desc)).toBeInTheDocument()
      expect(screen.getByText(es.tools.items[id].stack)).toBeInTheDocument()
    }
  })

  it('switches to en', async () => {
    render(<Tools />)
    await i18n.changeLanguage('en')
    expect(await screen.findByText(en.tools.items.kml.name)).toBeInTheDocument()
    expect(screen.getByRole('heading', { level: 2 })).toHaveTextContent(en.tools.title)
  })
})

describe('Experience', () => {
  it('renders 4 entries with es texts', () => {
    render(<Experience />)
    expect(screen.getAllByRole('heading', { level: 3 })).toHaveLength(4)
    for (const id of ['migtra', 'nocheAustral', 'pervasive', 'edu'] as const) {
      const it = es.experience.items[id]
      expect(screen.getByText(it.org)).toBeInTheDocument()
      expect(screen.getByText(it.when)).toBeInTheDocument()
      expect(screen.getByText(it.role)).toBeInTheDocument()
      expect(screen.getByText(it.desc)).toBeInTheDocument()
    }
  })

  it('switches to en', async () => {
    render(<Experience />)
    await i18n.changeLanguage('en')
    expect(await screen.findByText(en.experience.items.edu.role)).toBeInTheDocument()
    expect(screen.getByText(en.experience.items.migtra.desc)).toBeInTheDocument()
  })
})
