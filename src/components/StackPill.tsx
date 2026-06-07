interface StackPillProps {
  label: string
  color: 'amber' | 'sky' | 'gray' | 'purple'
}

const colorMap = {
  amber: 'bg-amber-dim border border-amber text-amber',
  sky: 'bg-sky-dim border border-sky text-sky-accent',
  gray: 'bg-white/[0.04] border border-white/[0.07] text-[#6b7280]',
  purple: 'bg-purple-500/[0.08] border border-purple-500/20 text-purple-400',
}

export default function StackPill({ label, color }: StackPillProps) {
  return (
    <span className={`px-2 py-1 rounded text-[11px] font-mono ${colorMap[color]}`}>
      {label}
    </span>
  )
}
