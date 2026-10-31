import { useTranslation } from 'react-i18next'

export default function Story() {
  const { t } = useTranslation()
  const log = t('story.log', { returnObjects: true }) as [string, string][]

  return (
    <section id="story" aria-labelledby="story-title" className="rv mt-[72px] sm:mt-[120px]">
      <div className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1 border-b border-line pb-3.5">
        <h2
          id="story-title"
          className="m-0 text-[30px] font-extrabold tracking-[-.02em] sm:text-[40px] [font-variation-settings:'wdth'_80]"
        >
          {t('story.title')}
        </h2>
        <span className="font-mono text-[13px] text-mut">{t('story.side')}</span>
      </div>
      <div className="grid gap-8 pt-7 md:grid-cols-[1fr_340px] md:gap-14">
        <div>
          <p className="mb-4 max-w-[60ch] text-base leading-[1.65] text-txt sm:text-lg">{t('story.p1')}</p>
          <p className="mb-4 max-w-[60ch] text-base leading-[1.65] text-txt sm:text-lg">{t('story.p2')}</p>
        </div>
        <dl className="m-0 self-start rounded-md border border-line bg-term px-5 py-[18px] font-mono text-sm leading-[2]">
          {log.map(([k, v]) => (
            <div key={k} className="grid grid-cols-[110px_1fr]">
              <dt className="text-cy">{k}</dt>
              <dd className="m-0 text-txt">{v}</dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  )
}
