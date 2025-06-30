
import React from 'react'
import { FaMobileAlt, FaDesktop, FaRobot, FaHandsHelping, FaPuzzlePiece, FaBolt } from 'react-icons/fa'
import SectionWrapper from '../components/SectionWrapper'

const About = () => {
  const milestones = [
    { phase: 'Diseño & Prototipado', icon: <FaHandsHelping size={24} /> },
    { phase: 'Desarrollo Mobile', icon: <FaMobileAlt size={24} /> },
    { phase: 'Despliegue & Feedback', icon: <FaBolt size={24} /> },
  ]

  const passions = [
    { label: 'Apps Móviles', icon: <FaMobileAlt size={32} /> },
    { label: 'Apps de Escritorio', icon: <FaDesktop size={32} /> },
    { label: 'Inteligencia Artificial', icon: <FaRobot size={32} /> },
  ]

  const softSkills = [
    { label: 'Empatía', icon: <FaHandsHelping size={24} /> },
    { label: 'Resolución', icon: <FaPuzzlePiece size={24} /> },
    { label: 'Proactivo', icon: <FaBolt size={24} /> },
  ]

  return (
    <SectionWrapper id="about">
      <div className="max-w-3xl mx-auto text-center space-y-8">
        <h2 className="text-3xl font-bold">About Me</h2>
        <p className="text-slate-300 leading-relaxed">
          Soy <strong>Christian Rangel</strong>, Ingeniero Civil Informático que lideró <em>Astroapp</em>,
          una aplicación móvil desarrollada desde el diseño hasta el despliegue,
          satisfaciendo todas las necesidades del cliente.
        </p>
        <p className="text-slate-300 leading-relaxed">
          Busco diseñar proyectos robustos que combinen <strong>innovación</strong> y <strong>empatía</strong>,
          ofreciendo soluciones pocket-friendly y aplicando inteligencia artificial para mejorar la experiencia de usuario.
        </p>

        {/* Timeline */}
        <div className="flex justify-center items-center space-x-6 overflow-x-auto">
          {milestones.map(({ phase, icon }) => (
            <div key={phase} className="flex flex-col items-center text-slate-200">
              <div className="p-3 bg-primary/20 rounded-full mb-2">{icon}</div>
              <span className="text-sm font-medium">{phase}</span>
            </div>
          ))}
        </div>

        {/* Passions */}
        <div className="grid grid-cols-3 gap-6">
          {passions.map(({ label, icon }) => (
            <div key={label} className="flex flex-col items-center">
              <div className="p-2 text-primary">{icon}</div>
              <span className="text-slate-300 text-sm">{label}</span>
            </div>
          ))}
        </div>

        {/* Soft Skills */}
        <div className="grid grid-cols-3 gap-6">
          {softSkills.map(({ label, icon }) => (
            <div key={label} className="flex flex-col items-center">
              <div className="p-2 text-primary">{icon}</div>
              <span className="text-slate-300 text-sm">{label}</span>
            </div>
          ))}
        </div>
      </div>
    </SectionWrapper>
  )
}

export default About
