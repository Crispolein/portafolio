import Navbar from './components/Navbar'
import Hero from './sections/Hero'
import About from './sections/About'
import Projects from './sections/Projects'
import Tools from './sections/Tools'
import Experience from './sections/Experience'
import Skills from './sections/Skills'
import Contact from './sections/Contact'

export default function App() {
  return (
    <div className="min-h-screen" style={{ background: '#060810', color: '#e5e7eb' }}>
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
      <footer className="px-8 py-6 border-t border-white/[0.07] flex flex-wrap justify-between items-center gap-3 text-[12px] text-[#6b7280]">
        <span className="font-black text-amber">Christian Rangel</span>
        <span>Ing. Civil Informático · Backend Python · AWS · IA — 2025</span>
        <span>Hecho con React + Vite</span>
      </footer>
    </div>
  )
}
