export interface Experience {
  /** Key under `experience.items.*`. */
  id: 'migtra' | 'nocheAustral' | 'pervasive' | 'edu'
}

export const experiences: Experience[] = [
  { id: 'migtra' },
  { id: 'nocheAustral' },
  { id: 'pervasive' },
  { id: 'edu' },
]
