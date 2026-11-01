import { lazy, Suspense, useEffect, useRef, useState } from 'react'
import { useTranslation } from 'react-i18next'
import Pipeline, { type Orientation } from '../components/Pipeline'
import CardLink from '../components/ui/CardLink'
import Carousel from '../components/Carousel'
import { cases, isCaseSlug, shotSrc, type CaseSlug } from '../data/cases'
import { linkClickHandler, navigate } from '../lib/route'

const MOBILE_QUERY = '(max-width: 640px)'
const MOTION_QUERY = '(prefers-reduced-motion: no-preference)'

// GSAP weighs ~47 kB gzip: it loads only on case pages, and only when motion is allowed.
const RevealEffect = lazy(() => import('../components/RevealEffect'))

type Pair = [string, string]
type Triple = [string, string, string]

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

function SectionHead({ title, n }: { title: string; n: string }) {
  return (
    <div className="flex items-baseline justify-between border-b border-line pb-3.5">
      <h2 className="text-[30px] font-extrabold tracking-[-.02em] [font-variation-settings:'wdth'_80] sm:text-[40px]">{title}</h2>
      <span className="font-mono text-[13px] text-mut">{n}</span>
    </div>
  )
}

function Log({ rows }: { rows: Pair[] }) {
  return (
    <dl className="rounded-md border border-line bg-term px-5 py-[18px] font-mono text-sm leading-8">
      {rows.map(([k, v]) => (
        <div key={k} className="grid grid-cols-[110px_1fr]">
          <dt className="text-cy">{k}</dt>
          <dd>{v}</dd>
        </div>
      ))}
    </dl>
  )
}

export default function CasePage({ slug }: { slug: string }) {
  const { t } = useTranslation()
  const orientation = useOrientation()
  const scope = useRef<HTMLDivElement>(null)
  const motionOk = window.matchMedia?.(MOTION_QUERY).matches ?? false
  if (!isCaseSlug(slug)) return null

  const { keyPrefix, aiNodes, next, accent, shots } = cases[slug]
  const list = <T,>(key: string) => t(`${keyPrefix}.${key}`, { returnObjects: true }) as T
  const facts = list<Pair[]>('facts')
  const problem = list<string[]>('problem')
  const nodes = list<Pair[]>('nodes')
  const steps = list<Pair[]>('steps')
  const decisions = list<Triple[]>('decisions')
  const resultLog = list<Pair[]>('resultLog')
  const shotAlts = list<string[]>('shots')
  const slides = Array.from({ length: shots }, (_, i) => ({ src: shotSrc(slug, i + 1), alt: shotAlts[i] ?? '' }))
  const nextDef = cases[next]
  const nextPath = `/proyectos/${next}`

  return (
    <div ref={scope} className="pb-20" data-ac={accent}>
      {motionOk && (
        <Suspense fallback={null}>
          <RevealEffect scope={scope} slug={slug} />
        </Suspense>
      )}
      <nav aria-label={t('case.railLabel')} className="mt-8 flex flex-wrap gap-2 font-mono text-[13px]">
        {(Object.keys(cases) as CaseSlug[]).map((s) => {
          const c = cases[s]
          const here = s === slug
          return (
            <a
              key={s}
              href={`/proyectos/${s}`}
              onClick={linkClickHandler(`/proyectos/${s}`)}
              aria-current={here ? 'page' : undefined}
              data-ac={c.accent}
              className={`rounded-md border px-3 py-1.5 transition-colors duration-[160ms] ease-out ${
                here ? 'border-ac bg-term text-ac' : 'border-line text-mut hover:border-ac hover:text-ac'
              }`}
            >
              {c.num} {s}
            </a>
          )
        })}
      </nav>
      <p className="mt-6 font-mono text-[13px] text-mut">
        <a
          href="/"
          onClick={linkClickHandler('/')}
          className="transition-colors duration-[160ms] ease-out hover:text-amb"
        >
          ← {t('case.back')}
        </a>{' '}
        / {slug}
      </p>

      <div className="mt-5 grid items-end gap-8 lg:grid-cols-[1fr_360px] lg:gap-12">
        <div>
          <p className="font-mono text-xs text-ac">{t(`${keyPrefix}.tag`)}</p>
          <h1
            tabIndex={-1}
            className="mt-3.5 text-[44px] font-extrabold leading-[.98] tracking-[-.03em] [font-variation-settings:'wdth'_80] focus:outline-none sm:text-[72px]"
          >
            {t(`${keyPrefix}.title`)}
          </h1>
          <p className="mt-[22px] max-w-[56ch] text-[17px] leading-[1.6] text-mut">{t(`${keyPrefix}.sub`)}</p>
        </div>
        <dl aria-label={t('case.factsLabel')} className="rounded-md border border-line bg-term px-5 py-[18px] font-mono text-[13px] leading-8">
          {facts.map(([k, v]) => (
            <div key={k} className="grid grid-cols-[80px_1fr]">
              <dt className="text-cy">{k}</dt>
              <dd>{v}</dd>
            </div>
          ))}
        </dl>
      </div>

      <Carousel label={t(`${keyPrefix}.shotsLabel`)} slides={slides} />

      <section data-reveal className="mt-[72px] sm:mt-[120px]">
        <SectionHead title={t('case.sections.problem')} n="01" />
        <div className="space-y-4 pt-7">
          {problem.map((p) => (
            <p key={p} className="max-w-[60ch] text-lg leading-[1.65] text-txt">
              {p}
            </p>
          ))}
        </div>
      </section>

      <section data-reveal className="mt-[72px] sm:mt-[120px]">
        <SectionHead title={t('case.sections.how')} n="02" />
        <div className="mt-7 overflow-hidden rounded-lg border border-line bg-term px-7 pb-3 pt-7 font-mono">
          <Pipeline
            key={orientation}
            nodes={nodes}
            aiNodes={aiNodes}
            ariaLabel={t(`${keyPrefix}.pipelineAria`)}
            orientation={orientation}
          />
        </div>
        <ol className="grid md:grid-cols-3">
          {steps.map(([name, text], i) => (
            <li key={name} className={`pr-7 pt-7 md:border-line ${i > 0 ? 'md:border-l md:pl-7' : ''}`}>
              <b className="text-xl">{name}</b>
              <p className="mt-2.5 text-[15px] leading-[1.6] text-mut">{text}</p>
            </li>
          ))}
        </ol>
      </section>

      <section data-reveal className="mt-[72px] sm:mt-[120px]">
        <SectionHead title={t('case.sections.decisions')} n="03" />
        <ul>
          {decisions.map(([name, text, stack]) => (
            <li
              key={name}
              className="grid gap-2 border-b border-line py-[22px] md:grid-cols-[280px_1fr_220px] md:items-baseline md:gap-6"
            >
              <b className="text-[19px]">{name}</b>
              <p className="text-[15px] leading-[1.55] text-mut">{text}</p>
              <span className="font-mono text-xs text-cy md:text-right">{stack}</span>
            </li>
          ))}
        </ul>
      </section>

      <section data-reveal className="mt-[72px] sm:mt-[120px]">
        <SectionHead title={t('case.sections.result')} n="04" />
        <div className="grid gap-8 pt-7 lg:grid-cols-[1fr_340px] lg:gap-14">
          <p className="max-w-[60ch] text-lg leading-[1.65] text-txt">{t(`${keyPrefix}.result`)}</p>
          <Log rows={resultLog} />
        </div>
      </section>

      <div className="mt-[72px] border-t border-line sm:mt-[120px]">
        <CardLink
          href={nextPath}
          onNavigate={() => navigate(nextPath)}
          data-ac={nextDef.accent}
          className="mt-10 border-0 py-10 hover:text-ac"
        >
          <span className="flex items-baseline gap-4 font-mono text-xs text-ac">
            <b className="text-[56px] font-medium leading-none sm:text-[88px]">{nextDef.num}</b>
            {t('case.next')}
          </span>
          <span className="mt-2.5 block text-[28px] font-extrabold sm:text-[40px]">{t(`${nextDef.keyPrefix}.title`)}</span>
        </CardLink>
      </div>
    </div>
  )
}
