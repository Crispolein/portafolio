import { useTranslation } from 'react-i18next'
import { tools } from '../data/tools'

export default function Tools() {
  const { t } = useTranslation()

  return (
    <section id="tools" aria-labelledby="tools-title" className="rv mt-[72px] sm:mt-[120px]">
      <div className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1 border-b border-line pb-3.5">
        <h2
          id="tools-title"
          className="m-0 text-[30px] font-extrabold tracking-[-.02em] sm:text-[40px] [font-variation-settings:'wdth'_80]"
        >
          {t('tools.title')}
        </h2>
        <span className="font-mono text-[13px] text-mut">{t('tools.side')}</span>
      </div>

      <ul className="m-0 list-none p-0">
        {tools.map((tool) => (
          <li
            key={tool.id}
            className="-mx-3 grid items-baseline gap-1 border-b border-line px-3 py-[22px] md:grid-cols-[280px_1fr_220px] md:gap-6"
          >
            <b className="text-[19px]">{t(`tools.items.${tool.id}.name`)}</b>
            <p className="m-0 text-[15px] leading-[1.55] text-mut">{t(`tools.items.${tool.id}.desc`)}</p>
            <span className="font-mono text-xs text-cy md:text-right">{t(`tools.items.${tool.id}.stack`)}</span>
          </li>
        ))}
      </ul>
    </section>
  )
}
