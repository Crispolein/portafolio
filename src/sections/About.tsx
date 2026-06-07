import { motion } from 'framer-motion'
import { useTranslation } from 'react-i18next'

const ABOUT_CARDS: { key: 'backend' | 'cloud' | 'ai' | 'mobile'; icon: string; borderCls: string; titleCls?: string }[] = [
  { key: 'backend', icon: '🐍', borderCls: 'border-l-[#f0a500]' },
  { key: 'cloud',   icon: '☁️', borderCls: 'border-l-[#f0a500]' },
  { key: 'ai',      icon: '🤖', borderCls: 'border-l-[#38bdf8]', titleCls: 'text-sky-accent' },
  { key: 'mobile',  icon: '📱', borderCls: 'border-l-[#f0a500]' },
]

export default function About() {
  const { t } = useTranslation()

  return (
    <section id="about" className="px-8 py-16 border-b border-white/[0.07]">
      <div className="max-w-6xl mx-auto">
        <p className="text-[10px] text-amber uppercase tracking-[3px] mb-2">{t('about.label')}</p>
        <h2 className="text-3xl font-black mb-10 text-white">{t('about.title')}</h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <p className="text-[15px] text-[#9ca3af] leading-[1.85]">{t('about.bio')}</p>
            <div className="inline-flex items-center gap-2 mt-4 px-3 py-1.5 rounded-md
                            bg-sky-dim border border-sky text-sky-accent text-[12px]">
              🎓 {t('about.diploma')}
            </div>
          </motion.div>

          <div className="flex flex-col gap-3">
            {ABOUT_CARDS.map(({ key, icon, borderCls, titleCls }, i) => (
              <motion.div
                key={key}
                className={`bg-[#161b22] border border-white/[0.07] border-l-2 ${borderCls}
                            rounded-lg px-4 py-3.5 flex gap-4 items-start`}
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.08 }}
              >
                <span className="text-xl mt-0.5 flex-shrink-0">{icon}</span>
                <div>
                  <div className={`text-[13px] font-bold mb-0.5 ${titleCls ?? 'text-white'}`}>
                    {t(`about.cards.${key}.title`)}
                  </div>
                  <div className="text-[12px] text-[#6b7280]">
                    {t(`about.cards.${key}.sub`)}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
