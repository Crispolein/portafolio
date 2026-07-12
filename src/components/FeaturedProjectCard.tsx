import { useTranslation } from 'react-i18next'
import type { Project } from '../data/projects'
import StackPill from './StackPill'

export default function FeaturedProjectCard({ project }: { project: Project }) {
  const { t } = useTranslation()
  const fd = project.featuredData!
  const [main, ...secondary] = fd.screens ?? []

  const chips = (
    <div className="flex gap-2 flex-wrap">
      {fd.chipKeys.map(chip => (
        <span key={chip}
              className="bg-amber-dim border border-amber text-amber
                         px-2.5 py-1 rounded text-[11px] font-semibold">
          {t(chip)}
        </span>
      ))}
    </div>
  )

  return (
    <div
      className="md:col-span-2 bg-surface border border-white/[0.07] rounded-xl overflow-hidden
                 hover:border-[rgba(240,165,0,0.3)] transition-colors duration-200"
    >
      <div className={`grid grid-cols-1 ${main ? 'md:grid-cols-2' : ''}`}>
        {/* Left */}
        <div className={`p-7 ${main ? 'md:border-r border-white/[0.07]' : ''}`}>
          <p className="text-[10px] text-amber uppercase tracking-[2px] mb-2">
            {t(project.tagKey)}
          </p>
          <h3 className="font-display text-xl font-bold text-white mb-3">{t(project.nameKey)}</h3>
          <p className="text-[13px] text-muted leading-[1.65] mb-4">{t(project.descKey)}</p>

          <div className="flex flex-col gap-2 mb-4 text-[12px] text-muted leading-[1.5]">
            <p>
              <strong className="text-white">{t('projects.nocheAustral.mobileLabel')}:</strong>{' '}
              {t('projects.nocheAustral.mobile')}
            </p>
            <p>
              <strong className="text-white">{t('projects.nocheAustral.webLabel')}:</strong>{' '}
              {t('projects.nocheAustral.web')}
            </p>
          </div>

          <div className="flex gap-1.5 flex-wrap mb-5">
            {project.stack.map(s => (
              <StackPill key={s.label} label={s.label} color={s.color} />
            ))}
          </div>

          <div className="flex gap-2 flex-wrap mb-5">
            {project.github && (
              <a href={project.github} target="_blank" rel="noreferrer"
                 className="px-3.5 py-1.5 rounded-md text-[12px] font-semibold
                            border border-white/[0.1] text-muted hover:text-white transition-colors">
                {t('projects.nocheAustral.appGithub')}
              </a>
            )}
            {project.demo && (
              <a href={project.demo} target="_blank" rel="noreferrer"
                 className="px-3.5 py-1.5 rounded-md text-[12px] font-semibold
                            border border-white/[0.1] text-muted hover:text-white transition-colors">
                {t('projects.nocheAustral.webGithub')}
              </a>
            )}
          </div>

          {!main && chips}
        </div>

        {/* Right — capturas reales (cuando existan) */}
        {main && (
          <div className="p-7">
            <figure className="mb-3">
              <div className="rounded-lg border border-white/[0.07] overflow-hidden">
                <img src={main.src} alt={t(main.labelKey)} loading="lazy"
                     className="w-full object-cover object-top max-h-52" />
              </div>
              <figcaption className="text-[10px] text-muted uppercase tracking-[2px] mt-1.5">
                {t(main.labelKey)}
              </figcaption>
            </figure>

            <div className="grid grid-cols-2 gap-2 mb-4">
              {secondary.map(s => (
                <figure key={s.src}>
                  <div className="rounded-lg border border-white/[0.07] overflow-hidden">
                    <img src={s.src} alt={t(s.labelKey)} loading="lazy"
                         className="w-full object-cover object-top h-24" />
                  </div>
                  <figcaption className="text-[10px] text-muted uppercase tracking-[2px] mt-1.5">
                    {t(s.labelKey)}
                  </figcaption>
                </figure>
              ))}
            </div>

            {chips}
          </div>
        )}
      </div>
    </div>
  )
}
