import React from 'react'
import { motion } from 'framer-motion'
import Button from '../components/Button'
import ParticlesBackground from '../components/ParticlesBackground'

const features = [
  { title: 'Desarrollo Móvil', subtitle: 'Flutter & Dart', icon: '📱' },
  { title: 'Bases de Datos', subtitle: 'PostgreSQL, MongoDB, Firebase', icon: '🗄️' },
  { title: 'Web & AI', subtitle: 'Django, Flask & ML', icon: '🤖' },
  { title: 'Cloud Ops', subtitle: 'AWS & GCP', icon: '☁️' },
]

const Hero = () => (
  <section
    id="home"
    className="
      relative flex flex-col items-center justify-center min-h-screen
      px-4 text-center text-white overflow-hidden
      bg-animated-gradient
      /* o usa bg-gradient-to-br from-primary to-secondary hero-bg */
    "
  >
    {/* Partículas de fondo */}
    <ParticlesBackground />

    {/* Overlay sutil animado */}
    <div className="absolute inset-0 bg-black pulse-slow" />

    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8 }}
      className="relative z-10 max-w-2xl space-y-6"
    >
      <h1 className="text-5xl sm:text-6xl font-heading">
        Hola, soy Christian Rangel
      </h1>
      <p className="text-xl font-medium">
        Ingeniero Civil Informático dedicado al aprendizaje constante mediante la práctica.
      </p>
      <p className="mt-4 text-lg leading-relaxed">
        Aporto ideas innovadoras, rescato buenas prácticas y desarrollo soluciones empáticas
        basadas en las necesidades reales de mis clientes.
      </p>

      <Button href="/Christian_Rangel_CV.pdf" download>
        Descargar mi CV
      </Button>

      <div className="mt-10 grid grid-cols-2 sm:grid-cols-4 gap-6">
        {features.map(({ title, subtitle, icon }) => (
          <div
            key={title}
            className="flex flex-col items-center p-4 bg-black/25 rounded-lg backdrop-blur-sm"
          >
            <span className="text-3xl">{icon}</span>
            <h3 className="mt-2 font-semibold">{title}</h3>
            <p className="text-sm text-slate-200">{subtitle}</p>
          </div>
        ))}
      </div>
    </motion.div>
  </section>
)

export default Hero
