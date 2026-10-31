import { useEffect, useRef, useState, type MouseEvent } from 'react'
import { useTranslation } from 'react-i18next'
import { navigate, useRoute } from '../lib/route'

const SECTIONS = ['projects', 'experience', 'contact'] as const

const link =
  'rounded-sm px-3 py-3 text-[15px] text-mut transition-colors duration-[160ms] ease-out hover:text-txt'
const control =
  'min-h-[44px] min-w-[44px] rounded border border-line bg-transparent font-mono text-xs font-medium text-txt ' +
  'transition-[color,border-color] duration-[160ms] ease-out hover:border-mut'

export default function Navbar() {
  const { t, i18n } = useTranslation()
  const route = useRoute()
  const onHome = route === '/'
  const [menuOpen, setMenuOpen] = useState(false)
  const toggleRef = useRef<HTMLButtonElement>(null)

  const toggleLang = () => {
    const next = i18n.language === 'es' ? 'en' : 'es'
    document.documentElement.lang = next
    void i18n.changeLanguage(next)
  }

  const closeMenu = () => setMenuOpen(false)

  // From a case page a section link goes home first, then to the anchor.
  const goTo = (id: string) => (e: MouseEvent<HTMLAnchorElement>) => {
    closeMenu()
    if (onHome || e.button !== 0 || e.ctrlKey || e.metaKey || e.shiftKey || e.altKey) return
    e.preventDefault()
    navigate('/')
    setTimeout(() => document.getElementById(id)?.scrollIntoView?.(), 50)
  }

  const goHome = (e: MouseEvent<HTMLAnchorElement>) => {
    closeMenu()
    if (e.button !== 0 || e.ctrlKey || e.metaKey || e.shiftKey || e.altKey) return
    e.preventDefault()
    navigate('/')
  }

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

  const langButton = (className: string) => (
    <button type="button" onClick={toggleLang} aria-label={t('nav.switchLang')} className={className}>
      {t('nav.lang')}
    </button>
  )

  return (
    <header className="sticky top-0 z-50 border-b border-line bg-bg">
      <div className="mx-auto flex h-[60px] max-w-[1168px] items-center justify-between px-4 sm:h-[76px] sm:px-14">
        <a
          href="/"
          onClick={goHome}
          className="text-[17px] font-extrabold text-txt no-underline sm:text-xl"
        >
          christian<span className="text-amb">.</span>rangel
        </a>

        <nav aria-label={t('nav.label')} className="hidden items-center sm:flex">
          {SECTIONS.map((id) => (
            <a key={id} href={onHome ? `#${id}` : `/#${id}`} onClick={goTo(id)} className={link}>
              {t(`nav.${id}`)}
            </a>
          ))}
          {langButton(`${control} ml-2.5`)}
        </nav>

        <div className="flex items-center gap-2 sm:hidden">
          {langButton(control)}
          <button
            ref={toggleRef}
            type="button"
            className={control}
            onClick={() => setMenuOpen((v) => !v)}
            aria-expanded={menuOpen}
            aria-controls="mobile-menu"
            aria-label={menuOpen ? t('nav.closeMenu') : t('nav.openMenu')}
          >
            <span aria-hidden="true">{menuOpen ? '×' : '≡'}</span>
          </button>
        </div>
      </div>

      {menuOpen && (
        <nav
          id="mobile-menu"
          aria-label={t('nav.label')}
          className="flex flex-col border-t border-line bg-bg px-4 py-2 sm:hidden"
        >
          {SECTIONS.map((id) => (
            <a key={id} href={onHome ? `#${id}` : `/#${id}`} onClick={goTo(id)} className={`${link} px-0`}>
              {t(`nav.${id}`)}
            </a>
          ))}
        </nav>
      )}
    </header>
  )
}
