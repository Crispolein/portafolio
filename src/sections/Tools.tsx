import { useRef, useState } from 'react'
import { useTranslation } from 'react-i18next'
import Lightbox from '../components/Lightbox'
import { tools, type Tool } from '../data/tools'

const rowBase =
  'grid gap-1 px-3 py-[22px] -mx-3 items-baseline md:grid-cols-[280px_1fr_220px] md:gap-6 ' +
  'border-b border-line transition-colors duration-[180ms] ease-out'

const thumbCol = 'md:grid-cols-[96px_240px_1fr_220px]'

function ShotRow({ tool }: { tool: Tool }) {
  const { t } = useTranslation()
  const [open, setOpen] = useState(false)
  const buttonRef = useRef<HTMLButtonElement>(null)
  const { id, shots } = tool
  const name = t(`tools.items.${id}.name`)
  const alts = t(`tools.items.${id}.shots`, { returnObjects: true }) as string[]
  const slides = Array.from({ length: shots!.count }, (_, i) => ({
    src: `/shots/${shots!.slug}-${i + 1}.webp`,
    alt: alts[i] ?? '',
  }))

  return (
    <li>
      <button
        ref={buttonRef}
        type="button"
        onClick={() => setOpen(true)}
        className={`group ${rowBase} ${thumbCol} w-full cursor-pointer bg-transparent text-left font-[inherit] text-inherit hover:bg-term focus-visible:bg-term focus-visible:outline-offset-[-2px]`}
      >
        <img
          src={`/shots/${shots!.slug}-1.webp`}
          alt=""
          loading="lazy"
          decoding="async"
          className="aspect-[16/10] w-24 rounded border border-line object-cover object-top transition-colors duration-200 group-hover:border-amb"
        />
        <b className="text-[19px] group-hover:text-amb group-focus-visible:text-amb">{name}</b>
        <p className="m-0 text-[15px] leading-[1.55] text-mut">{t(`tools.items.${id}.desc`)}</p>
        <span className="font-mono text-xs text-cy md:text-right">{t(`tools.items.${id}.stack`)}</span>
      </button>
      <Lightbox open={open} onClose={() => setOpen(false)} label={name} slides={slides} returnFocus={buttonRef} />
    </li>
  )
}

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
        {tools.map((tool) =>
          tool.shots ? (
            <ShotRow key={tool.id} tool={tool} />
          ) : (
            <li key={tool.id} className={rowBase}>
              <b className="text-[19px]">{t(`tools.items.${tool.id}.name`)}</b>
              <p className="m-0 text-[15px] leading-[1.55] text-mut">{t(`tools.items.${tool.id}.desc`)}</p>
              <span className="font-mono text-xs text-cy md:text-right">{t(`tools.items.${tool.id}.stack`)}</span>
            </li>
          ),
        )}
      </ul>
    </section>
  )
}
