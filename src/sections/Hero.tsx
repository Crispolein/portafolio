import { motion } from 'framer-motion'
import { useTranslation } from 'react-i18next'
import StatCard from '../components/StatCard'
import StackPill from '../components/StackPill'

const STACK_PILLS = [
  { label: 'python', color: 'amber' as const },
  { label: 'django', color: 'amber' as const },
  { label: 'fastapi', color: 'amber' as const },
  { label: 'postgresql', color: 'amber' as const },
  { label: 'flutter', color: 'amber' as const },
  { label: 'aws', color: 'gray' as const },
  { label: 'docker', color: 'gray' as const },
  { label: 'linux', color: 'gray' as const },
  { label: 'claude api', color: 'sky' as const },
  { label: 'llm integration', color: 'sky' as const },
]

function renderSubtitle(text: string) {
  const parts = text.split(/<amber>|<\/amber>/)
  return parts.map((part, i) =>
    i % 2 === 1
      ? <strong key={i} className="text-amber font-semibold">{part}</strong>
      : part
  )
}

export default function Hero() {
  const { t } = useTranslation()

  return (
    <>
      <section
        id="hero"
        className="px-8 py-20 border-b border-white/[0.07]"
        style={{
          background:
            'radial-gradient(ellipse 70% 50% at 50% -10%, rgba(240,165,0,0.04) 0%, transparent 70%), linear-gradient(180deg, #121110 0%, #0a0908 100%)',
        }}
      >
        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-[1fr_auto] gap-10 items-center">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div className="flex items-center gap-2 text-[11px] text-amber uppercase tracking-[3px] mb-5">
              <span className="w-2 h-2 rounded-full bg-green-400 shadow-[0_0_8px_#4ade80]" />
              {t('hero.badge')}
            </div>

            <h1 className="font-display text-5xl font-bold leading-[1.08] tracking-tight mb-4 text-white">
              {t('hero.title1')}
              <br />
              <span className="text-amber">
                {t('hero.title2')}{' '}
                <span className="text-sky-accent">{t('hero.titleAi')}</span>
              </span>
            </h1>

            <p className="text-[15px] text-[#a8a29e] max-w-[460px] leading-[1.75] mb-7">
              {renderSubtitle(t('hero.subtitle'))}
            </p>

            <div className="flex gap-3 flex-wrap">
              <button
                onClick={() => document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' })}
                className="bg-amber text-black px-5 py-2.5 rounded-lg text-[13px] font-bold
                           hover:bg-amber/90 transition-colors"
              >
                {t('hero.cta')}
              </button>
              <a
                href="/Christian_Rangel_CV.pdf"
                download
                className="border border-sky text-sky-accent px-5 py-2.5 rounded-lg text-[13px]
                           hover:bg-sky-dim transition-colors"
              >
                {t('hero.cv')}
              </a>
            </div>
          </motion.div>

          <motion.div
            className="flex flex-col gap-3 min-w-[130px]"
            initial={{ opacity: 0, x: 24 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <StatCard value={t('hero.stat1.value')} label={t('hero.stat1.label')} variant="amber" />
            <StatCard value={t('hero.stat2.value')} label={t('hero.stat2.label')} variant="amber" />
            <StatCard value={t('hero.stat3.value')} label={t('hero.stat3.label')} variant="sky" />
          </motion.div>
        </div>
      </section>

      {/* Stack strip */}
      <div className="px-8 py-3.5 border-b border-white/[0.07] bg-surface flex items-center gap-3 flex-wrap">
        <span className="text-[10px] text-muted uppercase tracking-[2px] whitespace-nowrap">Stack</span>
        <div className="w-px h-4 bg-white/[0.07]" />
        <div className="flex gap-1.5 flex-wrap">
          {STACK_PILLS.map(p => (
            <StackPill key={p.label} label={p.label} color={p.color} />
          ))}
        </div>
      </div>
    </>
  )
}
