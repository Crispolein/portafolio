import { useTranslation } from 'react-i18next'
import Icon, { type IconName } from '../components/Icons'

const ABOUT_CARDS: { key: 'backend' | 'cloud' | 'ai' | 'mobile'; icon: IconName; borderCls: string; iconCls: string; titleCls?: string }[] = [
  { key: 'backend', icon: 'terminal', borderCls: 'border-l-[#f0a500]', iconCls: 'text-amber' },
  { key: 'cloud', icon: 'cloud', borderCls: 'border-l-[#f0a500]', iconCls: 'text-amber' },
  { key: 'ai', icon: 'sparkles', borderCls: 'border-l-[#38bdf8]', iconCls: 'text-sky-accent', titleCls: 'text-sky-accent' },
  { key: 'mobile', icon: 'smartphone', borderCls: 'border-l-[#f0a500]', iconCls: 'text-amber' },
]

export default function About() {
  const { t } = useTranslation()

  return (
    <section id="about" className="px-8 py-16 border-b border-white/[0.07]">
      <div className="max-w-6xl mx-auto">
        <h2 className="font-display text-3xl font-bold mb-10 text-white">{t('about.title')}</h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
          <div>
            <p className="text-[15px] text-[#a8a29e] leading-[1.85]">{t('about.bio')}</p>
            <div className="inline-flex items-center gap-2 mt-4 px-3 py-1.5 rounded-md
                            bg-sky-dim border border-sky text-sky-accent text-[12px]">
              <Icon name="graduationCap" size={15} />
              {t('about.diploma')}
            </div>
          </div>

          <div className="flex flex-col gap-3">
            {ABOUT_CARDS.map(({ key, icon, borderCls, iconCls, titleCls }) => (
              <div
                key={key}
                className={`bg-surface-2 border border-white/[0.07] border-l-2 ${borderCls}
                            rounded-lg px-4 py-3.5 flex gap-4 items-start`}
              >
                <span className={`mt-1 flex-shrink-0 ${iconCls}`}>
                  <Icon name={icon} size={18} />
                </span>
                <div>
                  <div className={`text-[13px] font-bold mb-0.5 ${titleCls ?? 'text-white'}`}>
                    {t(`about.cards.${key}.title`)}
                  </div>
                  <div className="text-[12px] text-muted">
                    {t(`about.cards.${key}.sub`)}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
