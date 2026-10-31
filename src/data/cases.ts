export type CaseSlug = 'cv-optimizer' | 'job-hunter'

export interface CaseDef {
  slug: CaseSlug
  /** Prefix of the i18n keys under `case.*`. */
  keyPrefix: string
  /** Indices of the pipeline nodes that are AI steps. */
  aiNodes: number[]
  next: CaseSlug
  /** Order shown in the project rail and the cards. */
  num: '01' | '02'
  /** Accent token for this project (see `[data-ac]` in index.css). */
  accent: 'amb' | 'cy'
  /** Demo screenshots in public/shots/<slug>-<n>.webp. */
  shots: number
}

export const shotSrc = (slug: CaseSlug, n: number) => `/shots/${slug}-${n}.webp`

export const cases: Record<CaseSlug, CaseDef> = {
  'cv-optimizer': { slug: 'cv-optimizer', keyPrefix: 'case.cvOptimizer', aiNodes: [2], next: 'job-hunter', num: '01', accent: 'amb', shots: 4 },
  'job-hunter': { slug: 'job-hunter', keyPrefix: 'case.jobHunter', aiNodes: [3], next: 'cv-optimizer', num: '02', accent: 'cy', shots: 4 },
}

export const isCaseSlug = (slug: string): slug is CaseSlug => Object.prototype.hasOwnProperty.call(cases, slug)
