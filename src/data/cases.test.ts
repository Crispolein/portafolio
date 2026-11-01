import { readFileSync } from 'node:fs'
import { describe, expect, it } from 'vitest'
import { cases, isCaseSlug } from './cases'

const order = ['cv-optimizer', 'job-hunter', 'gps-analyzer', 'pokemontcgai', 'project-hub'] as const

describe('cases', () => {
  it('has the five slugs in rail order', () => {
    expect(Object.values(cases).map((c) => c.slug)).toEqual(order)
    expect(Object.values(cases).map((c) => c.num)).toEqual(['01', '02', '03', '04', '05'])
  })

  it('chains next circularly 01 to 05 and back', () => {
    order.forEach((slug, i) => expect(cases[slug].next).toBe(order[(i + 1) % order.length]))
  })

  it('new cases carry prefix, accent, shots and aiNodes', () => {
    expect(cases['gps-analyzer']).toMatchObject({ keyPrefix: 'case.gpsAnalyzer', accent: 'amb', shots: 4, aiNodes: [] })
    expect(cases.pokemontcgai).toMatchObject({ keyPrefix: 'case.pokemonTcgai', accent: 'cy', shots: 4, aiNodes: [1] })
    expect(cases['project-hub']).toMatchObject({ keyPrefix: 'case.projectHub', accent: 'amb', shots: 4, aiNodes: [] })
  })

  it('isCaseSlug accepts only known slugs', () => {
    order.forEach((s) => expect(isCaseSlug(s)).toBe(true))
    expect(isCaseSlug('nope')).toBe(false)
  })

  it('sitemap lists every case route', () => {
    const xml = readFileSync('public/sitemap.xml', 'utf8')
    order.forEach((s) => expect(xml).toContain(`/proyectos/${s}</loc>`))
  })
})
