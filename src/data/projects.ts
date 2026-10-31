export interface FeaturedProject {
  id: 'cv-optimizer' | 'job-hunter'
  /** Key under `projects.featured.*`. */
  key: 'cvOptimizer' | 'jobHunter'
  href: string
}

export interface ListProject {
  /** Key under `projects.list.*`. */
  id: 'pokemontcgai' | 'nocheAustral' | 'tcg' | 'financial'
  /** Only set when the project has a public link. */
  url?: string
  privateRepo?: boolean
}

export const featuredProjects: FeaturedProject[] = [
  { id: 'cv-optimizer', key: 'cvOptimizer', href: '/proyectos/cv-optimizer' },
  { id: 'job-hunter', key: 'jobHunter', href: '/proyectos/job-hunter' },
]

export const listProjects: ListProject[] = [
  { id: 'pokemontcgai', privateRepo: true },
  { id: 'nocheAustral', url: 'https://github.com/Crispolein/Astroapp' },
  { id: 'tcg', privateRepo: true },
  { id: 'financial', privateRepo: true },
]
