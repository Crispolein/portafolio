export type CaseSlug = 'cv-optimizer' | 'job-hunter' | 'gps-analyzer' | 'pokemontcgai' | 'project-hub'

export interface CaseDef {
  slug: CaseSlug
  /** Prefix of the i18n keys under `case.*`. */
  keyPrefix: string
  /** Indices of the pipeline nodes that are AI steps. */
  aiNodes: number[]
  next: CaseSlug
  /** Order shown in the project rail and the cards. */
  num: '01' | '02' | '03' | '04' | '05'
  /** Accent token for this project (see `[data-ac]` in index.css). */
  accent: 'amb' | 'cy'
  /** Demo screenshots in public/shots/<slug>-<n>.webp. */
  shots: number
}

export const shotSrc = (slug: CaseSlug, n: number) => `/shots/${slug}-${n}.webp`

export const cases: Record<CaseSlug, CaseDef> = {
  'cv-optimizer': { slug: 'cv-optimizer', keyPrefix: 'case.cvOptimizer', aiNodes: [2], next: 'job-hunter', num: '01', accent: 'amb', shots: 4 },
  'job-hunter': { slug: 'job-hunter', keyPrefix: 'case.jobHunter', aiNodes: [3], next: 'gps-analyzer', num: '02', accent: 'cy', shots: 4 },
  'gps-analyzer': { slug: 'gps-analyzer', keyPrefix: 'case.gpsAnalyzer', aiNodes: [], next: 'pokemontcgai', num: '03', accent: 'amb', shots: 4 },
  pokemontcgai: { slug: 'pokemontcgai', keyPrefix: 'case.pokemonTcgai', aiNodes: [1], next: 'project-hub', num: '04', accent: 'cy', shots: 4 },
  'project-hub': { slug: 'project-hub', keyPrefix: 'case.projectHub', aiNodes: [], next: 'cv-optimizer', num: '05', accent: 'amb', shots: 4 },
}

export const isCaseSlug = (slug: string): slug is CaseSlug => Object.prototype.hasOwnProperty.call(cases, slug)
