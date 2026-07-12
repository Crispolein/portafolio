export type SkillTier = 'daily' | 'solid' | 'learning'

export interface Skill {
  name: string
  tier: SkillTier
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
      { name: 'Python', tier: 'daily', color: 'amber' },
      { name: 'Django', tier: 'daily', color: 'amber' },
      { name: 'PostgreSQL', tier: 'daily', color: 'amber' },
      { name: 'FastAPI', tier: 'solid', color: 'amber' },
      { name: 'Flask', tier: 'solid', color: 'amber' },
      { name: 'DynamoDB', tier: 'solid', color: 'amber' },
    ],
  },
  {
    labelKey: 'skills.groups.cloud',
    color: 'amber',
    skills: [
      { name: 'Git', tier: 'daily', color: 'amber' },
      { name: 'AWS', tier: 'daily', color: 'amber' },
      { name: 'Linux', tier: 'daily', color: 'amber' },
      { name: 'Docker', tier: 'solid', color: 'amber' },
      { name: 'GCP', tier: 'solid', color: 'amber' },
      { name: 'AWS CDK', tier: 'learning', color: 'amber' },
    ],
  },
  {
    labelKey: 'skills.groups.ai',
    color: 'sky',
    skills: [
      { name: 'Claude API', tier: 'daily', color: 'sky' },
      { name: 'Flutter', tier: 'solid', color: 'sky' },
      { name: 'Firebase', tier: 'solid', color: 'sky' },
      { name: 'OpenAI', tier: 'solid', color: 'sky' },
      { name: 'React', tier: 'solid', color: 'sky' },
      { name: 'React Native', tier: 'learning', color: 'sky' },
    ],
  },
]
