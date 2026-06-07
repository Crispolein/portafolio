import { useTranslation } from 'react-i18next'
import { motion } from 'framer-motion'
import type { Tool } from '../data/tools'
import StackPill from './StackPill'

export default function ToolCard({ tool, index }: { tool: Tool; index: number }) {
  const { t } = useTranslation()

  return (
    <motion.div
      className="bg-[#0d1117] border border-white/[0.07] rounded-xl p-5
                 hover:border-white/[0.14] transition-colors duration-200"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.4, delay: index * 0.1 }}
    >
      <div className="text-3xl mb-3">{tool.icon}</div>
      <h3 className="text-[15px] font-bold text-white mb-2">{t(tool.nameKey)}</h3>
      <p className="text-[12px] text-[#6b7280] leading-[1.65] mb-3">{t(tool.descKey)}</p>
      <div className="flex gap-1.5 flex-wrap">
        {tool.stack.map(s => (
          <StackPill key={s.label} label={s.label} color={s.color} />
        ))}
      </div>
    </motion.div>
  )
}
