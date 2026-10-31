export interface Tool {
  /** Key under `tools.items.*`. */
  id: 'dbCopy' | 'kml' | 'userManager'
}

export const tools: Tool[] = [{ id: 'dbCopy' }, { id: 'kml' }, { id: 'userManager' }]
