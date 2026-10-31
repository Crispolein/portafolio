import { useTranslation } from 'react-i18next'

const channels = [
  { label: 'chris.rangel.intriago@gmail.com', href: 'mailto:chris.rangel.intriago@gmail.com' },
  { label: 'LinkedIn', href: 'https://cl.linkedin.com/in/christian-elias-rangel-intriago-85a8a1293' },
  { label: 'GitHub', href: 'https://github.com/Crispolein' },
]

export default function Footer() {
  const { t } = useTranslation()

  return (
    <footer className="mt-20 flex flex-col gap-4 border-t border-line pb-10 pt-6 font-mono text-xs text-mut">
      <p className="m-0">
        {t('footer.updated')} ·{' '}
        <a
          href="https://github.com/Crispolein/portafolio"
          target="_blank"
          rel="noopener noreferrer"
          className="underline-offset-4 hover:text-amb hover:underline focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-amb"
        >
          {t('footer.source')} →
        </a>
      </p>
      <nav aria-label={t('contact.links')} className="flex flex-wrap items-center gap-x-5 gap-y-2">
        <span>{t('contact.links')}</span>
        {channels.map((c) => (
          <a
            key={c.href}
            href={c.href}
            {...(c.href.startsWith('http') ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
            className="text-txt underline-offset-4 hover:text-amb hover:underline focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-amb"
          >
            {c.label}
          </a>
        ))}
      </nav>
    </footer>
  )
}
