import { useTranslation } from 'react-i18next'
import { experiences } from '../data/experience'

export default function Experience() {
  const { t } = useTranslation()

  return (
    <section id="experience" aria-labelledby="experience-title" className="rv mt-[72px] sm:mt-[120px]">
      <div className="flex items-baseline justify-between gap-4 border-b border-line pb-3.5">
        <h2
          id="experience-title"
          className="m-0 text-[30px] font-extrabold tracking-[-.02em] sm:text-[40px] [font-variation-settings:'wdth'_80]"
        >
          {t('experience.title')}
        </h2>
        <span className="font-mono text-[13px] text-mut">{t('experience.side')}</span>
      </div>

      {experiences.map((exp) => (
        <div
          key={exp.id}
          className="grid gap-2 border-b border-line py-[26px] md:grid-cols-[220px_1fr] md:gap-6"
        >
          <span className="font-mono text-[13px] text-mut">{t(`experience.items.${exp.id}.when`)}</span>
          <div>
            <h3 className="m-0 text-xl font-extrabold sm:text-[22px]">{t(`experience.items.${exp.id}.org`)}</h3>
            <p className="mb-0 mt-1 font-mono text-[13px] text-amb">{t(`experience.items.${exp.id}.role`)}</p>
            <p className="mb-0 mt-3 text-base leading-[1.6] text-mut">{t(`experience.items.${exp.id}.desc`)}</p>
          </div>
        </div>
      ))}
    </section>
  )
}
