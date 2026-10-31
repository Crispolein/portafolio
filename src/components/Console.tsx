import { useEffect, useRef, useState, type KeyboardEvent } from 'react'
import { useTranslation } from 'react-i18next'
import Pipeline, { type Orientation } from './Pipeline'
import { systems } from '../data/systems'

const MOBILE_QUERY = '(max-width: 640px)'

type Pair = [string, string]

function useOrientation(): Orientation {
  const [vertical, setVertical] = useState(() => window.matchMedia?.(MOBILE_QUERY).matches ?? false)
  useEffect(() => {
    // jsdom and very old browsers have no matchMedia
    const mql = window.matchMedia?.(MOBILE_QUERY)
    if (!mql) return
    const onChange = (e: { matches: boolean }) => setVertical(e.matches)
    setVertical(mql.matches)
    mql.addEventListener('change', onChange)
    return () => mql.removeEventListener('change', onChange)
  }, [])
  return vertical ? 'vertical' : 'horizontal'
}

export default function Console() {
  const { t } = useTranslation()
  const [active, setActive] = useState(0)
  const orientation = useOrientation()
  const radios = useRef<(HTMLButtonElement | null)[]>([])
  const system = systems[active]

  const select = (index: number) => {
    setActive(index)
    radios.current[index]?.focus()
  }

  const onKeyDown = (e: KeyboardEvent<HTMLButtonElement>) => {
    const last = systems.length - 1
    let next: number
    switch (e.key) {
      case 'ArrowRight':
      case 'ArrowDown':
        next = active === last ? 0 : active + 1
        break
      case 'ArrowLeft':
      case 'ArrowUp':
        next = active === 0 ? last : active - 1
        break
      case 'Home':
        next = 0
        break
      case 'End':
        next = last
        break
      default:
        return
    }
    e.preventDefault()
    select(next)
  }

  const nodes = t(`${system.keyPrefix}.nodes`, { returnObjects: true }) as Pair[]
  const log = t(`${system.keyPrefix}.log`, { returnObjects: true }) as Pair[]

  return (
    <section aria-label={t('console.label')} className="overflow-hidden rounded-lg border border-line bg-term font-mono">
      <div className="flex justify-between border-b border-line px-[18px] py-3 text-xs text-mut">
        <span>{t('console.path')}</span>
        <span>{t('console.count')}</span>
      </div>

      <div
        role="radiogroup"
        aria-label={t('console.tabs')}
        className="flex snap-x gap-1.5 overflow-x-auto px-[18px] pt-4 sm:flex-wrap"
      >
        {systems.map((s, i) => (
          <button
            key={s.id}
            ref={(el) => {
              radios.current[i] = el
            }}
            type="button"
            role="radio"
            aria-checked={i === active}
            tabIndex={i === active ? 0 : -1}
            onClick={() => select(i)}
            onKeyDown={onKeyDown}
            className={
              'inline-flex min-h-[38px] shrink-0 snap-start items-center rounded border px-3.5 text-[13px] ' +
              'transition-[color,background-color,border-color] duration-[120ms] ease-out focus-visible:outline-offset-2 ' +
              (i === active
                ? 'border-amb bg-[rgba(255,179,64,.08)] text-txt'
                : 'border-line text-mut hover:border-mut hover:text-txt')
            }
          >
            <span aria-hidden="true" className="mr-2 text-amb">
              $
            </span>
            {s.command}
          </button>
        ))}
      </div>

      <div className="px-[18px] pb-1.5 pt-5">
        <div className="mb-2.5 text-sm">
          <span className="text-amb">~ $</span> <span className="font-bold">run {system.command}</span>
        </div>
        <p className="mb-1.5 text-[13px] text-mut">{t(`${system.keyPrefix}.what`)}</p>
        <Pipeline
          key={`${system.id}-${orientation}`}
          nodes={nodes}
          aiNodes={system.aiNodes}
          ariaLabel={t(`${system.keyPrefix}.aria`)}
          orientation={orientation}
        />
        <dl className="mt-1 border-t border-dashed border-line pt-3.5 text-[13.5px] leading-[1.9]">
          {log.map(([k, v]) => (
            <div key={k} className="flex flex-wrap gap-x-4">
              <dt className="min-w-[130px] text-cy">{k}</dt>
              <dd>{v}</dd>
            </div>
          ))}
        </dl>
      </div>

      <div className="flex items-center gap-2 border-t border-line px-[18px] py-3 text-xs text-mut">
        <span className="text-amb">~ $</span>
        <span aria-hidden="true" className="caret inline-block h-4 w-2 bg-amb" />
        <span>{t('console.hint')}</span>
      </div>
    </section>
  )
}
