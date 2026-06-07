interface StatCardProps {
  value: string
  label: string
  variant: 'amber' | 'sky'
}

export default function StatCard({ value, label, variant }: StatCardProps) {
  const isAmber = variant === 'amber'
  return (
    <div className={`rounded-xl p-4 text-center ${
      isAmber
        ? 'bg-amber-dim border border-amber'
        : 'bg-sky-dim border border-sky'
    }`}>
      <div className={`text-3xl font-black leading-none ${isAmber ? 'text-amber' : 'text-sky-accent'}`}>
        {value}
      </div>
      <div className="text-[10px] uppercase tracking-widest mt-1 text-[#6b7280]">
        {label}
      </div>
    </div>
  )
}
