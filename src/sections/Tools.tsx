import { useTranslation } from 'react-i18next'
import { tools } from '../data/tools'
import ToolCard from '../components/ToolCard'

export default function Tools() {
  const { t } = useTranslation()

  return (
    <section id="tools" className="px-8 py-16 border-b border-white/[0.07] bg-[#0a0c12]">
      <div className="max-w-6xl mx-auto">
        <p className="text-[10px] text-amber uppercase tracking-[3px] mb-2">{t('tools.label')}</p>
        <h2 className="text-3xl font-black text-white mb-2">{t('tools.title')}</h2>
        <p className="text-[14px] text-[#6b7280] mb-10">{t('tools.sub')}</p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {tools.map((tool, i) => (
            <ToolCard key={tool.id} tool={tool} index={i} />
          ))}
        </div>
      </div>
    </section>
  )
}
