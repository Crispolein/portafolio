import { useRef } from 'react'
import { useTranslation } from 'react-i18next'
import type { Project } from '../data/projects'
import { BADGE_STYLES } from '../data/projects'
import StackPill from './StackPill'

export default function ProjectCard({ project }: { project: Project }) {
  const { t } = useTranslation()
  const videoRef = useRef<HTMLVideoElement>(null)

  const playPreview = () => videoRef.current?.play()
  const stopPreview = () => {
    if (videoRef.current) {
      videoRef.current.pause()
      videoRef.current.currentTime = 0
    }
  }

  return (
    <div
      className="group bg-surface border border-white/[0.07] rounded-xl overflow-hidden
                 hover:border-[rgba(240,165,0,0.3)] transition-colors duration-200"
      onMouseEnter={project.video ? playPreview : undefined}
      onMouseLeave={project.video ? stopPreview : undefined}
    >
      {project.image && (
        <div className="relative border-b border-white/[0.07] aspect-[4/3] overflow-hidden">
          <img
            src={project.image}
            alt={t(project.nameKey)}
            loading="lazy"
            className="w-full h-full object-cover object-top"
          />
          {project.video && (
            <video
              ref={videoRef}
              src={project.video}
              muted
              loop
              playsInline
              preload="none"
              className="absolute inset-0 w-full h-full object-cover object-top opacity-0
                         group-hover:opacity-100 transition-opacity duration-300"
            />
          )}
          <span className={`absolute top-2 right-2 text-[10px] px-2 py-0.5 rounded-full font-bold
                            ${BADGE_STYLES[project.badgeColor]}`}>
            {t(project.badgeKey)}
          </span>
        </div>
      )}

      <div className="p-5">
        <div className="flex items-center justify-between gap-2 mb-2">
          <p className="text-[10px] text-amber uppercase tracking-[2px]">{t(project.tagKey)}</p>
          {!project.image && (
            <span className={`text-[10px] px-2 py-0.5 rounded-full font-bold whitespace-nowrap
                              ${BADGE_STYLES[project.badgeColor]}`}>
              {t(project.badgeKey)}
            </span>
          )}
        </div>
        <h3 className="font-display text-[17px] font-bold text-white mb-2">{t(project.nameKey)}</h3>
        <p className="text-[13px] text-muted leading-[1.65] mb-4">{t(project.descKey)}</p>

        <div className="flex gap-1.5 flex-wrap mb-4">
          {project.stack.map(s => (
            <StackPill key={s.label} label={s.label} color={s.color} />
          ))}
        </div>

        <div className="flex gap-2 flex-wrap">
          {project.github && (
            <a href={project.github} target="_blank" rel="noreferrer"
               className="px-3.5 py-1.5 rounded-md text-[12px] font-semibold
                          border border-white/[0.1] text-muted hover:text-white transition-colors">
              {t('projects.github')}
            </a>
          )}
          {project.privateRepo && !project.github && (
            <span className="px-3.5 py-1.5 rounded-md text-[12px] font-semibold
                             border border-white/[0.1] text-[#57534e]">
              {t('projects.privateRepo')}
            </span>
          )}
        </div>
      </div>
    </div>
  )
}
