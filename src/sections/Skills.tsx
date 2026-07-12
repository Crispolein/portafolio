import { useTranslation } from 'react-i18next'
import { skillGroups, type SkillTier } from '../data/skills'

const TIER_ORDER: SkillTier[] = ['daily', 'solid', 'learning']

export default function Skills() {
  const { t } = useTranslation()

  return (
    <section id="skills" className="px-8 py-16 border-b border-white/[0.07] bg-surface">
      <div className="max-w-6xl mx-auto">
        <h2 className="font-display text-3xl font-bold text-white mb-10">{t('skills.title')}</h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {skillGroups.map(group => (
            <div key={group.labelKey}>
              <p className={`text-[10px] uppercase tracking-[2px] mb-4 ${
                group.color === 'sky' ? 'text-sky-accent' : 'text-amber'
              }`}>
                {t(group.labelKey)}
              </p>
              <div className="flex flex-col gap-4">
                {TIER_ORDER.map(tier => {
                  const inTier = group.skills.filter(s => s.tier === tier)
                  if (!inTier.length) return null
                  return (
                    <div key={tier}>
                      <p className="text-[11px] text-muted mb-1.5">{t(`skills.tiers.${tier}`)}</p>
                      <div className="flex gap-1.5 flex-wrap">
                        {inTier.map(skill => (
                          <span
                            key={skill.name}
                            className={`px-2.5 py-1 rounded text-[12px] font-mono ${
                              skill.color === 'sky'
                                ? 'bg-sky-dim border border-sky text-sky-accent'
                                : 'bg-amber-dim border border-amber text-amber'
                            } ${tier === 'learning' ? 'opacity-60' : ''}`}
                          >
                            {skill.name}
                          </span>
                        ))}
                      </div>
                    </div>
                  )
                })}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
