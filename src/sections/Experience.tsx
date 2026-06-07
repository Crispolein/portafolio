import { useTranslation } from 'react-i18next'
import { motion } from 'framer-motion'
import { experiences } from '../data/experience'

export default function Experience() {
  const { t } = useTranslation()

  return (
    <section id="experience" className="px-8 py-16 border-b border-white/[0.07]">
      <div className="max-w-6xl mx-auto">
        <p className="text-[10px] text-amber uppercase tracking-[3px] mb-2">{t('experience.label')}</p>
        <h2 className="text-3xl font-black text-white mb-10">{t('experience.title')}</h2>

        <div className="flex flex-col">
          {experiences.map((exp, i) => (
            <motion.div
              key={exp.id}
              className="grid grid-cols-[auto_1fr] gap-5 py-6 border-b border-white/[0.07] last:border-0"
              initial={{ opacity: 0, x: -16 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: i * 0.08 }}
            >
              <div className="flex flex-col items-center pt-1">
                <div className={`w-2.5 h-2.5 rounded-full flex-shrink-0 ${
                  exp.active
                    ? 'bg-amber shadow-[0_0_8px_rgba(240,165,0,0.5)]'
                    : 'bg-[#6b7280]'
                }`} />
                {i < experiences.length - 1 && (
                  <div className="w-px flex-1 bg-white/[0.07] mt-1.5" />
                )}
              </div>

              <div>
                <p className={`text-[11px] font-bold uppercase tracking-[1px] mb-0.5 ${
                  exp.active ? 'text-amber' : 'text-[#6b7280]'
                }`}>
                  {t(exp.companyKey)}
                </p>
                <h3 className="text-[15px] font-black text-white mb-1">{t(exp.roleKey)}</h3>
                <p className="text-[11px] text-[#6b7280] mb-2">{exp.period}</p>
                <p className="text-[13px] text-[#6b7280] leading-[1.65]">{t(exp.descKey)}</p>

                {exp.metrics && (
                  <div className="flex gap-2 flex-wrap mt-3">
                    {exp.metrics.map(m => (
                      <span key={m}
                            className="bg-amber-dim border border-amber text-amber
                                       px-2.5 py-1 rounded text-[11px] font-semibold">
                        {m}
                      </span>
                    ))}
                  </div>
                )}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
