import { useTranslation } from 'react-i18next'
import Button from '../components/ui/Button'
import Console from '../components/Console'

const ROLES = ['dev', 'ops', 'ia'] as const

export default function Hero() {
  const { t } = useTranslation()

  return (
    <section id="hero" className="mt-8 grid gap-10 sm:mt-[52px] lg:grid-cols-[minmax(420px,.78fr)_1.22fr] lg:items-start lg:gap-14">
      <div>
        <p className="mb-[22px] mt-0 font-mono text-xs text-mut">
          <span
            aria-hidden="true"
            className="mr-2 inline-block h-[7px] w-[7px] rounded-full bg-ok align-[1px]"
          />
          {t('hero.status')}
        </p>
        <h1 tabIndex={-1} className="m-0 text-[40px] focus:outline-none font-extrabold leading-[.98] tracking-[-.03em] [font-variation-settings:'wdth'_80] sm:text-[62px] sm:leading-[.94]">
          {t('hero.titleA')} <span className="text-amb">{t('hero.titleAi')}</span> {t('hero.titleB')}
        </h1>
        <p className="mb-0 mt-[22px] text-base leading-[1.6] text-mut sm:text-[17px]">
          {t('hero.subA')} <strong className="font-semibold text-txt">{t('hero.subStrong')}</strong>{' '}
          {t('hero.subB')}
        </p>
        <ul className="m-0 mt-[22px] list-none p-0 font-mono text-[13px] leading-8 text-txt">
          {ROLES.map((r) => (
            <li key={r}>
              <b className="mr-2 font-medium text-amb">{r}</b>
              {t(`hero.roles.${r}`)}
            </li>
          ))}
        </ul>
        <div className="mt-7 flex flex-col gap-3 sm:flex-row">
          <Button href="#projects" variant="solid" arrow>
            {t('hero.ctaProjects')}
          </Button>
          <Button href="/Christian_Rangel_CV.pdf" download variant="ghost" arrow>
            {t('hero.ctaCv')}
          </Button>
        </div>
      </div>
      <Console />
    </section>
  )
}
