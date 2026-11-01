import type { CaseSlug } from './cases'

export interface FeaturedProject {
  id: CaseSlug
  /** Key under `projects.featured.*`. */
  key: 'cvOptimizer' | 'jobHunter' | 'gpsAnalyzer' | 'pokemonTcgai' | 'projectHub'
  href: string
}

export interface ListProject {
  /** Key under `projects.list.*`. */
  id: 'nocheAustral' | 'astroweb' | 'tcg' | 'financial' | 'patriotsweek' | 'vitrina'
  /** Only set when the project has a public link. */
  url?: string
  privateRepo?: boolean
  /** Screenshots in public/shots/<slug>-<n>.webp; rows without it stay plain. */
  shots?: { slug: string; count: number }
}

export const featuredProjects: FeaturedProject[] = [
  { id: 'cv-optimizer', key: 'cvOptimizer', href: '/proyectos/cv-optimizer' },
  { id: 'job-hunter', key: 'jobHunter', href: '/proyectos/job-hunter' },
  { id: 'gps-analyzer', key: 'gpsAnalyzer', href: '/proyectos/gps-analyzer' },
  { id: 'pokemontcgai', key: 'pokemonTcgai', href: '/proyectos/pokemontcgai' },
  { id: 'project-hub', key: 'projectHub', href: '/proyectos/project-hub' },
]

export const listProjects: ListProject[] = [
  { id: 'nocheAustral', url: 'https://github.com/Crispolein/Astroapp', shots: { slug: 'astroapp', count: 3 } },
  { id: 'astroweb', url: 'https://github.com/Crispolein/Astroweb', shots: { slug: 'astroweb', count: 3 } },
  { id: 'tcg', privateRepo: true, shots: { slug: 'pokecollector', count: 4 } },
  { id: 'financial', privateRepo: true, shots: { slug: 'financial', count: 3 } },
  { id: 'patriotsweek', privateRepo: true, shots: { slug: 'patriotsweek', count: 3 } },
  { id: 'vitrina', privateRepo: true, shots: { slug: 'vitrina', count: 4 } },
]
