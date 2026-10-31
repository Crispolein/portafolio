export type SystemId = 'telemetria' | 'automatizacion' | 'cvOptimizer' | 'jobHunter'

export interface SystemDef {
  id: SystemId
  /** Shell-style name shown after `run` and on the tab; a project identifier, not copy. */
  command: string
  /** Prefix of the i18n keys: `<keyPrefix>.{what,aria,nodes,log}`. */
  keyPrefix: string
  /** Indices of the pipeline nodes that are AI steps. */
  aiNodes: number[]
}

export const systems: SystemDef[] = [
  { id: 'telemetria', command: 'telemetria', keyPrefix: 'console.systems.telemetria', aiNodes: [] },
  { id: 'automatizacion', command: 'automatizacion', keyPrefix: 'console.systems.automatizacion', aiNodes: [] },
  { id: 'cvOptimizer', command: 'cv-optimizer', keyPrefix: 'console.systems.cvOptimizer', aiNodes: [1, 2, 3] },
  { id: 'jobHunter', command: 'job-hunter', keyPrefix: 'console.systems.jobHunter', aiNodes: [3] },
]
