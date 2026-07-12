import { useTranslation } from 'react-i18next'
import type { Tool } from '../data/tools'
import StackPill from './StackPill'
import Icon from './Icons'

export default function ToolCard({ tool }: { tool: Tool }) {
  const { t } = useTranslation()

  return (
    <div
      className="bg-surface border border-white/[0.07] rounded-xl p-5
                 hover:border-white/[0.14] transition-colors duration-200"
    >
      <div className="w-10 h-10 rounded-lg bg-amber-dim border border-amber text-amber
                      flex items-center justify-center mb-3">
        <Icon name={tool.icon} size={20} />
      </div>
      <h3 className="font-display text-[15px] font-bold text-white mb-2">{t(tool.nameKey)}</h3>
      <p className="text-[12px] text-muted leading-[1.65] mb-3">{t(tool.descKey)}</p>
      <div className="flex gap-1.5 flex-wrap">
        {tool.stack.map(s => (
          <StackPill key={s.label} label={s.label} color={s.color} />
        ))}
      </div>
    </div>
  )
}
