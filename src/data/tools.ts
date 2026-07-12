import type { IconName } from '../components/Icons'

export interface Tool {
  id: string
  icon: IconName
  nameKey: string
  descKey: string
  stack: { label: string; color: 'amber' | 'sky' | 'gray' }[]
}

export const tools: Tool[] = [
  {
    id: 'db-backup',
    icon: 'database',
    nameKey: 'tools.dbBackup.name',
    descKey: 'tools.dbBackup.desc',
    stack: [
      { label: 'Python', color: 'amber' },
      { label: 'PostgreSQL', color: 'amber' },
      { label: 'SSH', color: 'gray' },
      { label: 'Tkinter', color: 'gray' },
      { label: 'YAML', color: 'gray' },
    ],
  },
  {
    id: 'kml-validator',
    icon: 'map',
    nameKey: 'tools.kmlValidator.name',
    descKey: 'tools.kmlValidator.desc',
    stack: [
      { label: 'Python', color: 'amber' },
      { label: 'Tkinter', color: 'amber' },
      { label: 'XML', color: 'gray' },
      { label: 'Google Earth', color: 'gray' },
    ],
  },
  {
    id: 'user-manager',
    icon: 'users',
    nameKey: 'tools.userManager.name',
    descKey: 'tools.userManager.desc',
    stack: [
      { label: 'FastAPI', color: 'amber' },
      { label: 'Angular', color: 'amber' },
      { label: 'AWS CDK', color: 'sky' },
      { label: 'Cognito', color: 'sky' },
      { label: 'ECS Fargate', color: 'gray' },
    ],
  },
]
