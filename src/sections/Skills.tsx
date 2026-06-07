import { useTranslation } from 'react-i18next'
import { motion } from 'framer-motion'
import { skillGroups } from '../data/skills'

export default function Skills() {
  const { t } = useTranslation()

  return (
    <section id="skills" className="px-8 py-16 border-b border-white/[0.07] bg-[#0d1117]">
      <div className="max-w-6xl mx-auto">
        <p className="text-[10px] text-amber uppercase tracking-[3px] mb-2">{t('skills.label')}</p>
        <h2 className="text-3xl font-black text-white mb-10">{t('skills.title')}</h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {skillGroups.map((group, gi) => (
            <div key={group.labelKey}>
              <p className={`text-[10px] uppercase tracking-[2px] mb-4 ${
                group.color === 'sky' ? 'text-sky-accent' : 'text-amber'
              }`}>
                {t(group.labelKey)}
              </p>
              <div className="flex flex-col gap-3">
                {group.skills.map((skill, si) => (
                  <motion.div
                    key={skill.name}
                    className="flex items-center gap-3"
                    initial={{ opacity: 0, x: -12 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.3, delay: gi * 0.1 + si * 0.04 }}
                  >
                    <span className="text-[13px] text-white min-w-[90px]">{skill.name}</span>
                    <div className="flex-1 h-1 bg-white/[0.06] rounded-full overflow-hidden">
                      <motion.div
                        className={`h-full rounded-full ${skill.color === 'sky' ? 'bg-[#38bdf8]' : 'bg-[#f0a500]'}`}
                        initial={{ width: 0 }}
                        whileInView={{ width: `${skill.level}%` }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6, delay: gi * 0.1 + si * 0.04 }}
                      />
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
