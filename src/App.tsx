import { useEffect, type MouseEvent } from 'react'
import { useTranslation } from 'react-i18next'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import Hero from './sections/Hero'
import Story from './sections/Story'
import Projects from './sections/Projects'
import Tools from './sections/Tools'
import Experience from './sections/Experience'
import Contact from './sections/Contact'
import CasePage from './pages/CasePage'
import { cases, isCaseSlug } from './data/cases'
import { linkClickHandler, useRoute } from './lib/route'

const CASE_PREFIX = '/proyectos/'

// The home keeps the title from index.html; case pages name the project.
export const HOME_TITLE = document.title

// Featured cards render a plain href; route plain clicks on case links through the router.
function onCaseLinkClick(e: MouseEvent<HTMLElement>) {
  const a = (e.target as HTMLElement).closest?.('a')
  const href = a?.getAttribute('href')
  if (href?.startsWith(CASE_PREFIX)) linkClickHandler(href)(e)
}

export default function App() {
  const { t } = useTranslation()
  const route = useRoute()
  const slug = route.startsWith(CASE_PREFIX) ? route.slice(CASE_PREFIX.length).replace(/\/$/, '') : ''
  const caseTitle = isCaseSlug(slug) ? t(`${cases[slug].keyPrefix}.title`) : ''

  useEffect(() => {
    document.title = caseTitle ? `${caseTitle} · Christian Rangel` : HOME_TITLE
  }, [caseTitle])

  return (
    <div onClick={onCaseLinkClick}>
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:fixed focus:left-3 focus:top-3 focus:z-[100] focus:rounded focus:bg-amb focus:px-4 focus:py-2 focus:font-bold focus:text-term"
      >
        {t('nav.skip')}
      </a>
      <Navbar />
      <main id="main" className="mx-auto max-w-[1168px] px-4 sm:px-14">
        {isCaseSlug(slug) ? (
          <CasePage slug={slug} />
        ) : (
          <>
            <Hero />
            <Story />
            <Projects />
            <Tools />
            <Experience />
            <Contact />
            <Footer />
          </>
        )}
      </main>
    </div>
  )
}
