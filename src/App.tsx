import { useTranslation } from 'react-i18next'
import Navbar from './components/Navbar'
import Hero from './sections/Hero'
import About from './sections/About'
import Projects from './sections/Projects'
import Tools from './sections/Tools'
import Experience from './sections/Experience'
import Skills from './sections/Skills'
import Contact from './sections/Contact'

export default function App() {
  const { t } = useTranslation()

  return (
    <div className="min-h-screen bg-surface-deep text-[#e7e5e4]">
      <Navbar />
      <main>
        <Hero />
        <About />
        <Projects />
        <Tools />
        <Experience />
        <Skills />
        <Contact />
      </main>
      <footer className="px-8 py-6 border-t border-white/[0.07] flex flex-wrap justify-between items-center gap-3 text-[12px] text-muted">
        <span className="font-display font-bold text-amber">Christian Rangel</span>
        <span>{t('footer.updated')}</span>
        <a
          href="https://github.com/Crispolein/portafolio"
          target="_blank"
          rel="noreferrer"
          className="hover:text-white transition-colors"
        >
          {t('footer.source')} →
        </a>
      </footer>
    </div>
  )
}
