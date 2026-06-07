export interface Experience {
  id: string
  companyKey: string
  roleKey: string
  period: string
  active: boolean
  descKey: string
  metrics?: string[]
}

export const experiences: Experience[] = [
  {
    id: 'migtra',
    companyKey: 'experience.migtra.company',
    roleKey: 'experience.migtra.role',
    period: 'Enero 2025 — Presente',
    active: true,
    descKey: 'experience.migtra.desc',
    metrics: [
      '80 tickets/mes eliminados',
      '30 hrs/mes ahorradas',
      '0 incidentes producción',
      '2 devs liderados',
    ],
  },
  {
    id: 'gesitech',
    companyKey: 'experience.gesitech.company',
    roleKey: 'experience.gesitech.role',
    period: 'Mayo 2025 — Febrero 2026',
    active: false,
    descKey: 'experience.gesitech.desc',
  },
  {
    id: 'noche-austral',
    companyKey: 'experience.nocheAustral.company',
    roleKey: 'experience.nocheAustral.role',
    period: 'Julio 2024 — Abril 2025',
    active: false,
    descKey: 'experience.nocheAustral.desc',
  },
  {
    id: 'pervasivemind',
    companyKey: 'experience.pervasivemind.company',
    roleKey: 'experience.pervasivemind.role',
    period: 'Noviembre 2023 — Febrero 2024',
    active: false,
    descKey: 'experience.pervasivemind.desc',
  },
]
