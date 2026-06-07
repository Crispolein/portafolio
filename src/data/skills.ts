export interface Skill {
  name: string
  level: number
  color: 'amber' | 'sky'
}

export interface SkillGroup {
  labelKey: string
  color: 'amber' | 'sky'
  skills: Skill[]
}

export const skillGroups: SkillGroup[] = [
  {
    labelKey: 'skills.groups.backend',
    color: 'amber',
    skills: [
      { name: 'Python', level: 92, color: 'amber' },
      { name: 'Django', level: 82, color: 'amber' },
      { name: 'FastAPI', level: 78, color: 'amber' },
      { name: 'PostgreSQL', level: 78, color: 'amber' },
      { name: 'Flask', level: 72, color: 'amber' },
      { name: 'DynamoDB', level: 65, color: 'amber' },
    ],
  },
  {
    labelKey: 'skills.groups.cloud',
    color: 'amber',
    skills: [
      { name: 'Git', level: 88, color: 'amber' },
      { name: 'AWS', level: 78, color: 'amber' },
      { name: 'Linux', level: 78, color: 'amber' },
      { name: 'Docker', level: 72, color: 'amber' },
      { name: 'GCP', level: 65, color: 'amber' },
      { name: 'AWS CDK', level: 60, color: 'amber' },
    ],
  },
  {
    labelKey: 'skills.groups.ai',
    color: 'sky',
    skills: [
      { name: 'Claude API', level: 85, color: 'sky' },
      { name: 'Flutter', level: 75, color: 'sky' },
      { name: 'Firebase', level: 72, color: 'sky' },
      { name: 'OpenAI', level: 70, color: 'sky' },
      { name: 'React', level: 68, color: 'sky' },
      { name: 'React Native', level: 62, color: 'sky' },
    ],
  },
]
