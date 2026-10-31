import { useEffect, useRef, useState } from 'react'
import { useTranslation } from 'react-i18next'
import Icon from './Icons'

const NAV_KEYS = ['about', 'projects', 'tools', 'experience', 'skills'] as const

const press = 'transition duration-150 active:scale-[0.97]'

export default function Navbar() {
  const { t, i18n } = useTranslation()
  const [menuOpen, setMenuOpen] = useState(false)
  const toggleRef = useRef<HTMLButtonElement>(null)

  const toggleLang = () =>
    i18n.changeLanguage(i18n.language === 'es' ? 'en' : 'es')

  const closeMenu = () => setMenuOpen(false)

  useEffect(() => {
    if (!menuOpen) return
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setMenuOpen(false)
        toggleRef.current?.focus()
      }
    }
    document.addEventListener('keydown', onKey)
    return () => document.removeEventListener('keydown', onKey)
  }, [menuOpen])

  return (
    <nav className="sticky top-0 z-50 flex justify-between items-center px-8 py-4
                    bg-[rgba(10,9,8,0.96)] border-b border-white/[0.07]">
      <a href="#hero" className="font-display font-bold text-base text-amber tracking-wide rounded-sm">
        Christian Rangel
      </a>

      {/* Desktop links */}
      <div className="hidden md:flex gap-6 items-center text-[13px] text-muted">
        {NAV_KEYS.map(key => (
          <a key={key} href={`#${key}`} className="py-2 hover:text-white transition-colors rounded-sm">
            {t(`nav.${key}`)}
          </a>
        ))}
        <a
          href="#contact"
          className={`border border-amber text-amber px-4 py-2 rounded-md text-[13px]
                      hover:bg-amber-dim ${press}`}
        >
          {t('nav.contact')}
        </a>
        <button
          type="button"
          onClick={toggleLang}
          aria-label={t('nav.switchLang')}
          className={`border border-white/[0.1] text-muted px-3 py-1.5 rounded text-[12px]
                      hover:text-white ${press}`}
        >
          {i18n.language === 'es' ? 'EN' : 'ES'}
        </button>
      </div>

      {/* Mobile hamburger */}
      <button
        ref={toggleRef}
        type="button"
        className="md:hidden -m-2 p-2 text-muted hover:text-white rounded"
        onClick={() => setMenuOpen(v => !v)}
        aria-expanded={menuOpen}
        aria-controls="mobile-menu"
        aria-label={menuOpen ? t('nav.closeMenu') : t('nav.openMenu')}
      >
        <Icon name={menuOpen ? 'close' : 'menu'} size={22} />
      </button>

      {/* Mobile menu */}
      {menuOpen && (
        <div
          id="mobile-menu"
          className="absolute top-full left-0 right-0 bg-surface border-b border-white/[0.07]
                     flex flex-col gap-1 px-8 py-4 md:hidden"
        >
          {NAV_KEYS.map(key => (
            <a
              key={key}
              href={`#${key}`}
              onClick={closeMenu}
              className="py-2.5 text-[15px] text-muted hover:text-white"
            >
              {t(`nav.${key}`)}
            </a>
          ))}
          <a href="#contact" onClick={closeMenu} className="py-2.5 text-amber text-[15px]">
            {t('nav.contact')}
          </a>
          <button
            type="button"
            onClick={toggleLang}
            className="py-2.5 text-left text-[14px] text-muted hover:text-white"
          >
            {i18n.language === 'es' ? 'Switch to EN' : 'Cambiar a ES'}
          </button>
        </div>
      )}
    </nav>
  )
}
