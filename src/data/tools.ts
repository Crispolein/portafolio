export interface Tool {
  /** Key under `tools.items.*`. */
  id: 'dbCopy' | 'kml' | 'userManager' | 'assetCompare' | 'supportSkills'
  /** Screenshots in public/shots/<slug>-<n>.webp; rows without it stay plain text. */
  shots?: { slug: string; count: number }
}

export const tools: Tool[] = [
  { id: 'dbCopy', shots: { slug: 'db-copy', count: 2 } },
  { id: 'kml', shots: { slug: 'kml-tools', count: 2 } },
  { id: 'userManager', shots: { slug: 'user-manager', count: 3 } },
  { id: 'assetCompare', shots: { slug: 'asset-compare', count: 3 } },
  { id: 'supportSkills' },
]
