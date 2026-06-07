export interface Project {
  id: string
  emoji: string
  badge: string
  badgeColor: 'ai' | 'automation' | 'vision' | 'mobile' | 'graduation'
  tagKey: string
  nameKey: string
  descKey: string
  problemKey: string
  solutionKey: string
  stack: { label: string; color: 'amber' | 'sky' | 'gray' | 'purple' }[]
  github?: string
  demo?: string
  featured?: boolean
  featuredData?: {
    mobileScreens: string[]
    webPreview: string
    chips: string[]
  }
}

export const BADGE_STYLES: Record<Project['badgeColor'], string> = {
  ai: 'bg-sky-dim border border-sky text-sky-accent',
  automation: 'bg-sky-dim border border-sky text-sky-accent',
  vision: 'bg-emerald-500/10 border border-emerald-500/25 text-emerald-400',
  mobile: 'bg-sky-dim border border-sky text-sky-accent',
  graduation: 'bg-purple-500/10 border border-purple-500/25 text-purple-400',
}

export const projects: Project[] = [
  {
    id: 'cv-optimizer',
    emoji: '🧠',
    badge: 'IA · Agentes',
    badgeColor: 'ai',
    tagKey: 'projects.cvOptimizer.tag',
    nameKey: 'projects.cvOptimizer.name',
    descKey: 'projects.cvOptimizer.desc',
    problemKey: 'projects.cvOptimizer.problem',
    solutionKey: 'projects.cvOptimizer.solution',
    stack: [
      { label: 'Django 5', color: 'amber' },
      { label: 'HTMX', color: 'amber' },
      { label: 'SQLite', color: 'amber' },
      { label: 'Claude API', color: 'sky' },
      { label: 'Multi-agent', color: 'sky' },
      { label: 'WeasyPrint', color: 'gray' },
    ],
    github: 'https://github.com/Crispolein/cv_optimizer',
  },
  {
    id: 'job-hunter',
    emoji: '🔍',
    badge: 'Automatización',
    badgeColor: 'automation',
    tagKey: 'projects.jobHunter.tag',
    nameKey: 'projects.jobHunter.name',
    descKey: 'projects.jobHunter.desc',
    problemKey: 'projects.jobHunter.problem',
    solutionKey: 'projects.jobHunter.solution',
    stack: [
      { label: 'FastAPI', color: 'amber' },
      { label: 'Celery', color: 'amber' },
      { label: 'React', color: 'amber' },
      { label: 'OpenAI', color: 'sky' },
      { label: 'Redis', color: 'gray' },
      { label: 'PostgreSQL', color: 'gray' },
    ],
    github: 'https://github.com/Crispolein/BusquedaLaboral',
  },
  {
    id: 'tcg',
    emoji: '🃏',
    badge: 'Visión Comp.',
    badgeColor: 'vision',
    tagKey: 'projects.tcg.tag',
    nameKey: 'projects.tcg.name',
    descKey: 'projects.tcg.desc',
    problemKey: 'projects.tcg.problem',
    solutionKey: 'projects.tcg.solution',
    stack: [
      { label: 'Python', color: 'amber' },
      { label: 'Streamlit', color: 'amber' },
      { label: 'FastAPI', color: 'amber' },
      { label: 'OpenCV', color: 'sky' },
      { label: 'OCR', color: 'sky' },
      { label: 'React Native', color: 'gray' },
    ],
    github: 'https://github.com/Crispolein/scrapingpokemon',
  },
  {
    id: 'financial',
    emoji: '💸',
    badge: 'IA · Mobile',
    badgeColor: 'mobile',
    tagKey: 'projects.financial.tag',
    nameKey: 'projects.financial.name',
    descKey: 'projects.financial.desc',
    problemKey: 'projects.financial.problem',
    solutionKey: 'projects.financial.solution',
    stack: [
      { label: 'Flutter', color: 'purple' },
      { label: 'Riverpod', color: 'purple' },
      { label: 'OpenAI', color: 'sky' },
      { label: 'Firebase', color: 'gray' },
      { label: 'Cloud Functions', color: 'gray' },
    ],
    github: 'https://github.com/Crispolein/financial',
  },
  {
    id: 'noche-austral',
    emoji: '🌌',
    badge: 'Titulación',
    badgeColor: 'graduation',
    tagKey: 'projects.nocheAustral.tag',
    nameKey: 'projects.nocheAustral.name',
    descKey: 'projects.nocheAustral.desc',
    problemKey: 'projects.nocheAustral.problem',
    solutionKey: 'projects.nocheAustral.solution',
    stack: [
      { label: 'Flutter', color: 'purple' },
      { label: 'Dart', color: 'purple' },
      { label: 'Firebase', color: 'purple' },
      { label: 'Django', color: 'amber' },
      { label: 'PostgreSQL', color: 'amber' },
      { label: 'GCP App Engine', color: 'gray' },
    ],
    github: 'https://github.com/Crispolein/Astroapp',
    demo: 'https://github.com/Crispolein/Astroweb',
    featured: true,
    featuredData: {
      mobileScreens: ['🌙', '🛸', '🎮'],
      webPreview: '🌌',
      chips: ['16.000+ líneas Dart', 'Deploy GCP', 'Tesis titulación'],
    },
  },
]
