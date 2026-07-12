export interface Project {
  id: string
  badgeKey: string
  badgeColor: 'ai' | 'automation' | 'vision' | 'mobile' | 'graduation'
  tagKey: string
  nameKey: string
  descKey: string
  stack: { label: string; color: 'amber' | 'sky' | 'gray' }[]
  github?: string
  demo?: string
  privateRepo?: boolean
  featured?: boolean
  image?: string
  video?: string
  featuredData?: {
    screens?: { src: string; labelKey: string }[]
    chipKeys: string[]
  }
}

export const BADGE_STYLES: Record<Project['badgeColor'], string> = {
  ai: 'bg-sky-dim border border-sky text-sky-accent',
  automation: 'bg-sky-dim border border-sky text-sky-accent',
  vision: 'bg-emerald-500/10 border border-emerald-500/25 text-emerald-400',
  mobile: 'bg-sky-dim border border-sky text-sky-accent',
  graduation: 'bg-amber-dim border border-amber text-amber',
}

export const projects: Project[] = [
  {
    id: 'cv-optimizer',
    badgeKey: 'projects.cvOptimizer.badge',
    badgeColor: 'ai',
    tagKey: 'projects.cvOptimizer.tag',
    nameKey: 'projects.cvOptimizer.name',
    descKey: 'projects.cvOptimizer.desc',
    stack: [
      { label: 'Django 5', color: 'amber' },
      { label: 'HTMX', color: 'amber' },
      { label: 'SQLite', color: 'amber' },
      { label: 'Claude API', color: 'sky' },
      { label: 'Multi-agent', color: 'sky' },
      { label: 'WeasyPrint', color: 'gray' },
    ],
    privateRepo: true,
  },
  {
    id: 'job-hunter',
    badgeKey: 'projects.jobHunter.badge',
    badgeColor: 'automation',
    tagKey: 'projects.jobHunter.tag',
    nameKey: 'projects.jobHunter.name',
    descKey: 'projects.jobHunter.desc',
    stack: [
      { label: 'FastAPI', color: 'amber' },
      { label: 'Celery', color: 'amber' },
      { label: 'React', color: 'amber' },
      { label: 'OpenAI', color: 'sky' },
      { label: 'Redis', color: 'gray' },
      { label: 'PostgreSQL', color: 'gray' },
    ],
    privateRepo: true,
  },
  {
    id: 'tcg',
    badgeKey: 'projects.tcg.badge',
    badgeColor: 'vision',
    tagKey: 'projects.tcg.tag',
    nameKey: 'projects.tcg.name',
    descKey: 'projects.tcg.desc',
    stack: [
      { label: 'Python', color: 'amber' },
      { label: 'Streamlit', color: 'amber' },
      { label: 'FastAPI', color: 'amber' },
      { label: 'OpenCV', color: 'sky' },
      { label: 'OCR', color: 'sky' },
      { label: 'React Native', color: 'gray' },
    ],
    privateRepo: true,
  },
  {
    id: 'pokemontcgai',
    badgeKey: 'projects.pokemontcgai.badge',
    badgeColor: 'ai',
    tagKey: 'projects.pokemontcgai.tag',
    nameKey: 'projects.pokemontcgai.name',
    descKey: 'projects.pokemontcgai.desc',
    stack: [
      { label: 'PyTorch', color: 'sky' },
      { label: 'Stable-Baselines3', color: 'sky' },
      { label: 'Gymnasium', color: 'sky' },
      { label: 'PettingZoo', color: 'gray' },
      { label: 'Kaggle', color: 'gray' },
    ],
    privateRepo: true,
  },
  {
    id: 'financial',
    badgeKey: 'projects.financial.badge',
    badgeColor: 'mobile',
    tagKey: 'projects.financial.tag',
    nameKey: 'projects.financial.name',
    descKey: 'projects.financial.desc',
    stack: [
      { label: 'Flutter', color: 'amber' },
      { label: 'Riverpod', color: 'amber' },
      { label: 'OpenAI', color: 'sky' },
      { label: 'Firebase', color: 'gray' },
      { label: 'Cloud Functions', color: 'gray' },
    ],
    privateRepo: true,
  },
  {
    id: 'noche-austral',
    badgeKey: 'projects.nocheAustral.badge',
    badgeColor: 'graduation',
    tagKey: 'projects.nocheAustral.tag',
    nameKey: 'projects.nocheAustral.name',
    descKey: 'projects.nocheAustral.desc',
    stack: [
      { label: 'Flutter', color: 'amber' },
      { label: 'Dart', color: 'amber' },
      { label: 'Firebase', color: 'gray' },
      { label: 'Django', color: 'amber' },
      { label: 'PostgreSQL', color: 'amber' },
      { label: 'GCP App Engine', color: 'gray' },
    ],
    github: 'https://github.com/Crispolein/Astroapp',
    demo: 'https://github.com/Crispolein/Astroweb',
    featured: true,
    featuredData: {
      chipKeys: ['projects.nocheAustral.chip1', 'projects.nocheAustral.chip2', 'projects.nocheAustral.chip3', 'projects.nocheAustral.chip4'],
    },
  },
]
