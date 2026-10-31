export type CaseSlug = 'cv-optimizer' | 'job-hunter'

export interface CaseDef {
  slug: CaseSlug
  /** Prefix of the i18n keys under `case.*`. */
  keyPrefix: string
  /** Indices of the pipeline nodes that are AI steps. */
  aiNodes: number[]
  next: CaseSlug
}

export const cases: Record<CaseSlug, CaseDef> = {
  'cv-optimizer': { slug: 'cv-optimizer', keyPrefix: 'case.cvOptimizer', aiNodes: [2], next: 'job-hunter' },
  'job-hunter': { slug: 'job-hunter', keyPrefix: 'case.jobHunter', aiNodes: [3], next: 'cv-optimizer' },
}

export const isCaseSlug = (slug: string): slug is CaseSlug => Object.prototype.hasOwnProperty.call(cases, slug)
