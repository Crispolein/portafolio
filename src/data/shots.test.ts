import { readdirSync } from 'node:fs'
import { join } from 'node:path'
import { describe, expect, it } from 'vitest'

// Exact screenshot count per slug, as listed in openspec/changes/demos-v14/design.md.
const EXPECTED: Record<string, number> = {
  'cv-optimizer': 4,
  'job-hunter': 4,
  'gps-analyzer': 4,
  pokemontcgai: 4,
  'project-hub': 4,
  astroapp: 3,
  astroweb: 3,
  pokecollector: 4,
  financial: 3,
  patriotsweek: 3,
  vitrina: 4,
  'user-manager': 3,
  'kml-tools': 2,
  'db-copy': 2,
  'asset-compare': 3,
}

const dir = join(process.cwd(), 'public', 'shots')
const files = readdirSync(dir).filter((f) => f.endsWith('.webp'))

describe('public/shots', () => {
  for (const [slug, count] of Object.entries(EXPECTED)) {
    it(`${slug} has exactly ${count} captures numbered 1..${count}`, () => {
      const found = files
        .filter((f) => new RegExp(`^${slug}-\\d+\\.webp$`).test(f))
        .sort()
      expect(found).toEqual(Array.from({ length: count }, (_, i) => `${slug}-${i + 1}.webp`))
    })
  }

  it('has no captures outside the expected slugs', () => {
    const total = Object.values(EXPECTED).reduce((a, b) => a + b, 0)
    expect(files).toHaveLength(total)
  })
})
