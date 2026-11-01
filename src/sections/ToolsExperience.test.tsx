import { cleanup, fireEvent, render, screen } from '@testing-library/react'
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
    expect(tools.map((t) => t.id)).toEqual(['dbCopy', 'kml', 'userManager', 'assetCompare', 'supportSkills'])
    expect(experiences.map((e) => e.id)).toEqual(['migtra', 'nocheAustral', 'pervasive', 'edu'])
  })
})

describe('Tools', () => {
  const ids = ['dbCopy', 'kml', 'userManager', 'assetCompare', 'supportSkills'] as const
  const withShots = [
    ['dbCopy', 'db-copy', 2],
    ['kml', 'kml-tools', 2],
    ['userManager', 'user-manager', 3],
    ['assetCompare', 'asset-compare', 3],
  ] as const

  it('renders 5 tools with es texts', () => {
    render(<Tools />)
    expect(screen.getAllByRole('listitem')).toHaveLength(5)
    for (const id of ids) {
      expect(screen.getByText(es.tools.items[id].name)).toBeInTheDocument()
      expect(screen.getByText(es.tools.items[id].desc)).toBeInTheDocument()
      expect(screen.getByText(es.tools.items[id].stack)).toBeInTheDocument()
    }
  })

  it('each tool with screenshots is a button with thumbnail that opens the viewer', () => {
    render(<Tools />)
    expect(screen.getAllByRole('button')).toHaveLength(4)
    for (const [id, slug, count] of withShots) {
      const name = es.tools.items[id].name
      const button = screen.getByRole('button', { name: new RegExp(name) })
      expect(button.querySelector('img')).toHaveAttribute('src', `/shots/${slug}-1.webp`)
      expect(es.tools.items[id].shots).toHaveLength(count)
      expect(en.tools.items[id].shots).toHaveLength(count)
      fireEvent.click(button)
      const dialog = screen.getByRole('dialog')
      expect(dialog).toHaveAccessibleName(name)
      expect(dialog.querySelectorAll(`img[src^="/shots/${slug}-"]`).length).toBeGreaterThanOrEqual(1)
      fireEvent.keyDown(document, { key: 'Escape' })
      expect(screen.queryByRole('dialog')).toBeNull()
    }
  })

  it('supportSkills is a text row with the measured count and no client name', () => {
    render(<Tools />)
    const row = screen.getByText(es.tools.items.supportSkills.name).closest('li')!
    expect(row.querySelector('button, a, img')).toBeNull()
    expect(es.tools.items.supportSkills.desc).toContain('16')
    expect(en.tools.items.supportSkills.desc).toContain('16')
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
