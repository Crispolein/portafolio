import { useState, type KeyboardEvent } from 'react'
import { useTranslation } from 'react-i18next'

export interface Slide {
  src: string
  alt: string
}

const pad = (n: number) => String(n).padStart(2, '0')

export default function Carousel({ label, slides }: { label: string; slides: Slide[] }) {
  const { t } = useTranslation()
  const [index, setIndex] = useState(0)
  const total = slides.length
  const go = (i: number) => setIndex((i + total) % total)

  const onKeyDown = (event: KeyboardEvent<HTMLElement>) => {
    if (event.key === 'ArrowRight') go(index + 1)
    else if (event.key === 'ArrowLeft') go(index - 1)
    else return
    event.preventDefault()
  }

  const arrow =
    'grid size-11 place-items-center rounded-md border border-line bg-term/90 font-mono text-lg text-txt ' +
    'transition-[color,border-color,transform] duration-[160ms] ease-out hover:border-ac hover:text-ac active:scale-[.97]'

  return (
    <section
      aria-roledescription="carousel"
      aria-label={label}
      onKeyDown={onKeyDown}
      className="mt-12"
    >
      <div className="relative overflow-hidden rounded-lg border border-line bg-term">
        {slides.map((s, i) => (
          <figure
            key={s.src}
            role="group"
            aria-roledescription="slide"
            aria-label={t('carousel.slide', { n: i + 1, total })}
            hidden={i !== index}
            className="m-0"
          >
            <img
              src={s.src}
              alt={s.alt}
              loading={i === 0 ? 'eager' : 'lazy'}
              decoding="async"
              className="block aspect-[16/10] w-full object-cover object-top"
            />
          </figure>
        ))}
      </div>

      <div className="mt-3 flex items-center justify-between gap-4">
        <div role="group" aria-label={t('carousel.thumbs')} className="flex gap-2">
          {slides.map((s, i) => (
            <button
              key={s.src}
              type="button"
              aria-label={s.alt}
              aria-current={i === index ? 'true' : undefined}
              onClick={() => go(i)}
              className={`h-11 w-16 overflow-hidden rounded-md border transition-[border-color,opacity] duration-[160ms] ease-out sm:w-20 ${
                i === index ? 'border-ac' : 'border-line opacity-60 hover:opacity-100'
              }`}
            >
              <img src={s.src} alt="" loading="lazy" className="size-full object-cover object-top" />
            </button>
          ))}
        </div>
        <span aria-live="polite" className="font-mono text-[13px] text-mut">
          {pad(index + 1)} / {pad(total)}
        </span>
      </div>

      <div className="mt-3 flex items-center justify-between gap-4">
        <span className="rounded-md border border-line px-2.5 py-1 font-mono text-xs text-ac">{t('carousel.demo')}</span>
        <div className="flex gap-2">
          <button type="button" aria-label={t('carousel.prev')} onClick={() => go(index - 1)} className={arrow}>
            <span aria-hidden="true">←</span>
          </button>
          <button type="button" aria-label={t('carousel.next')} onClick={() => go(index + 1)} className={arrow}>
            <span aria-hidden="true">→</span>
          </button>
        </div>
      </div>
    </section>
  )
}
