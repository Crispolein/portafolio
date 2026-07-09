import { useTranslation } from 'react-i18next'
import { motion } from 'framer-motion'
import type { Project } from '../data/projects'
import { BADGE_STYLES } from '../data/projects'
import StackPill from './StackPill'

export default function ProjectCard({ project, index }: { project: Project; index: number }) {
  const { t } = useTranslation()

  return (
    <motion.div
      className="bg-[#0d1117] border border-white/[0.07] rounded-xl overflow-hidden
                 hover:border-[rgba(240,165,0,0.3)] transition-colors duration-200"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.4, delay: index * 0.08 }}
    >
      {/* Visual header */}
      <div className="h-28 bg-gradient-to-br from-[rgba(240,165,0,0.08)] to-transparent
                      border-b border-[rgba(240,165,0,0.15)]
                      flex items-center justify-center text-5xl relative">
        {project.emoji}
        <span className={`absolute top-2 right-2 text-[10px] px-2 py-0.5 rounded-full font-bold
                          ${BADGE_STYLES[project.badgeColor]}`}>
          {project.badge}
        </span>
      </div>

      <div className="p-5">
        <p className="text-[10px] text-amber uppercase tracking-[2px] mb-2">
          {t(project.tagKey)}
        </p>
        <h3 className="text-[17px] font-black text-white mb-2">{t(project.nameKey)}</h3>
        <p className="text-[13px] text-[#6b7280] leading-[1.65] mb-4">{t(project.descKey)}</p>

        <div className="flex flex-col gap-2 mb-4">
          <div className="flex gap-2 items-start">
            <span className="min-w-[20px] h-5 bg-amber-dim border border-amber rounded
                             flex items-center justify-center text-[10px] font-bold text-amber
                             flex-shrink-0 mt-0.5">
              P
            </span>
            <span className="text-[12px] text-[#6b7280] leading-[1.5]">{t(project.problemKey)}</span>
          </div>
          <div className="flex gap-2 items-start">
            <span className="min-w-[20px] h-5 bg-amber-dim border border-amber rounded
                             flex items-center justify-center text-[10px] font-bold text-amber
                             flex-shrink-0 mt-0.5">
              S
            </span>
            <span className="text-[12px] text-[#6b7280] leading-[1.5]">{t(project.solutionKey)}</span>
          </div>
        </div>

        <div className="flex gap-1.5 flex-wrap mb-4">
          {project.stack.map(s => (
            <StackPill key={s.label} label={s.label} color={s.color} />
          ))}
        </div>

        <div className="flex gap-2 flex-wrap">
          {project.github && (
            <a href={project.github} target="_blank" rel="noreferrer"
               className="px-3.5 py-1.5 rounded-md text-[12px] font-semibold
                          border border-white/[0.1] text-[#6b7280] hover:text-white transition-colors">
              {t('projects.github')}
            </a>
          )}
          {project.demo && (
            <a href={project.demo} target="_blank" rel="noreferrer"
               className="px-3.5 py-1.5 rounded-md text-[12px] font-semibold
                          bg-amber-dim border border-amber text-amber hover:bg-[rgba(240,165,0,0.2)] transition-colors">
              {t('projects.demo')}
            </a>
          )}
          {project.privateRepo && !project.github && (
            <span className="px-3.5 py-1.5 rounded-md text-[12px] font-semibold
                             border border-white/[0.1] text-[#4b5563]">
              {t('projects.privateRepo')}
            </span>
          )}
        </div>
      </div>
    </motion.div>
  )
}
