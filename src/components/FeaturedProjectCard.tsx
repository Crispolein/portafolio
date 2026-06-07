import { useTranslation } from 'react-i18next'
import { motion } from 'framer-motion'
import type { Project } from '../data/projects'
import StackPill from './StackPill'

export default function FeaturedProjectCard({ project }: { project: Project }) {
  const { t } = useTranslation()
  const fd = project.featuredData!

  return (
    <motion.div
      className="md:col-span-2 bg-[#0d1117] border border-white/[0.07] rounded-xl overflow-hidden
                 hover:border-purple-500/30 transition-colors duration-200"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
    >
      <div className="grid grid-cols-1 md:grid-cols-2">
        {/* Left */}
        <div className="p-7 md:border-r border-white/[0.07]">
          <p className="text-[10px] text-sky-accent uppercase tracking-[2px] mb-2">
            {t(project.tagKey)}
          </p>
          <h3 className="text-xl font-black text-white mb-3">{t(project.nameKey)}</h3>
          <p className="text-[13px] text-[#6b7280] leading-[1.65] mb-4">{t(project.descKey)}</p>

          <div className="flex flex-col gap-2 mb-4">
            <div className="flex gap-2 items-start">
              <span className="min-w-[20px] h-5 bg-sky-dim border border-sky rounded
                               flex items-center justify-center text-[10px] font-bold text-sky-accent
                               flex-shrink-0 mt-0.5">M</span>
              <span className="text-[12px] text-[#6b7280] leading-[1.5]">
                <strong className="text-white">{t('projects.nocheAustral.mobileLabel')}:</strong>{' '}
                {t('projects.nocheAustral.solution').split('. ')[0]}.
              </span>
            </div>
            <div className="flex gap-2 items-start">
              <span className="min-w-[20px] h-5 bg-sky-dim border border-sky rounded
                               flex items-center justify-center text-[10px] font-bold text-sky-accent
                               flex-shrink-0 mt-0.5">W</span>
              <span className="text-[12px] text-[#6b7280] leading-[1.5]">
                <strong className="text-white">{t('projects.nocheAustral.webLabel')}:</strong>{' '}
                {t('projects.nocheAustral.solution').split('. ').slice(1).join('. ')}.
              </span>
            </div>
          </div>

          <div className="flex gap-1.5 flex-wrap mb-5">
            {project.stack.map(s => (
              <StackPill key={s.label} label={s.label} color={s.color} />
            ))}
          </div>

          <div className="flex gap-2 flex-wrap">
            {project.github && (
              <a href={project.github} target="_blank" rel="noreferrer"
                 className="px-3.5 py-1.5 rounded-md text-[12px] font-semibold
                            border border-white/[0.1] text-[#6b7280] hover:text-white transition-colors">
                {t('projects.nocheAustral.appGithub')}
              </a>
            )}
            {project.demo && (
              <a href={project.demo} target="_blank" rel="noreferrer"
                 className="px-3.5 py-1.5 rounded-md text-[12px] font-semibold
                            border border-white/[0.1] text-[#6b7280] hover:text-white transition-colors">
                {t('projects.nocheAustral.webGithub')}
              </a>
            )}
          </div>
        </div>

        {/* Right — screens */}
        <div className="p-7">
          <p className="text-[10px] text-[#6b7280] uppercase tracking-[2px] mb-3">
            {t('projects.nocheAustral.mobileLabel')}
          </p>
          <div className="grid grid-cols-3 gap-2 mb-4">
            {fd.mobileScreens.map((emoji, i) => (
              <div key={i}
                   className="bg-[#161b22] border border-white/[0.07] rounded-lg
                              aspect-[9/16] flex items-center justify-center text-2xl">
                {emoji}
              </div>
            ))}
          </div>
          <p className="text-[10px] text-[#6b7280] uppercase tracking-[2px] mb-2">
            {t('projects.nocheAustral.webLabel')}
          </p>
          <div className="bg-[#161b22] border border-white/[0.07] rounded-lg h-20
                          flex items-center justify-center text-2xl mb-3">
            {fd.webPreview}
          </div>
          <div className="flex gap-2 flex-wrap">
            {fd.chips.map(chip => (
              <span key={chip}
                    className="bg-purple-500/[0.08] border border-purple-500/20 text-purple-400
                               px-2.5 py-1 rounded text-[11px] font-semibold">
                {chip}
              </span>
            ))}
          </div>
        </div>
      </div>
    </motion.div>
  )
}
