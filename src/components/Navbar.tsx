import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import Icon from './Icons'

const NAV_KEYS = ['about', 'projects', 'tools', 'experience', 'skills'] as const

export default function Navbar() {
  const { t, i18n } = useTranslation()
  const [menuOpen, setMenuOpen] = useState(false)

  const toggleLang = () =>
    i18n.changeLanguage(i18n.language === 'es' ? 'en' : 'es')

  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })
    setMenuOpen(false)
  }

  return (
    <nav className="sticky top-0 z-50 flex justify-between items-center px-8 py-4
                    bg-[rgba(10,9,8,0.96)] border-b border-white/[0.07]">
      <span className="font-display font-bold text-base text-amber tracking-wide cursor-pointer"
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
        Christian Rangel
      </span>

      {/* Desktop links */}
      <div className="hidden md:flex gap-6 items-center text-[13px] text-muted">
        {NAV_KEYS.map(key => (
          <button
            key={key}
            onClick={() => scrollTo(key)}
            className="hover:text-white transition-colors"
          >
            {t(`nav.${key}`)}
          </button>
        ))}
        <button
          onClick={() => scrollTo('contact')}
          className="border border-amber text-amber px-4 py-1.5 rounded-md text-[12px]
                     hover:bg-amber-dim transition-colors"
        >
          {t('nav.contact')}
        </button>
        <button
          onClick={toggleLang}
          className="border border-white/[0.1] text-muted px-3 py-1 rounded text-[11px]
                     hover:text-white transition-colors"
        >
          {i18n.language === 'es' ? 'EN' : 'ES'}
        </button>
      </div>

      {/* Mobile hamburger */}
      <button
        className="md:hidden text-muted hover:text-white"
        onClick={() => setMenuOpen(v => !v)}
        aria-label={menuOpen ? 'Cerrar menú' : 'Abrir menú'}
      >
        <Icon name={menuOpen ? 'close' : 'menu'} size={22} />
      </button>

      {/* Mobile menu */}
      {menuOpen && (
        <div className="absolute top-full left-0 right-0 bg-surface border-b border-white/[0.07]
                        flex flex-col gap-4 px-8 py-6 md:hidden">
          {NAV_KEYS.map(key => (
            <button
              key={key}
              onClick={() => scrollTo(key)}
              className="text-left text-[14px] text-muted hover:text-white"
            >
              {t(`nav.${key}`)}
            </button>
          ))}
          <button
            onClick={() => scrollTo('contact')}
            className="text-left text-amber text-[14px]"
          >
            {t('nav.contact')}
          </button>
          <button onClick={toggleLang} className="text-left text-[12px] text-muted">
            {i18n.language === 'es' ? 'Switch to EN' : 'Cambiar a ES'}
          </button>
        </div>
      )}
    </nav>
  )
}
