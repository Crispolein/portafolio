import React, { useCallback } from 'react'
import Particles from 'react-tsparticles'
import { loadFull } from 'tsparticles'

const ParticlesBackground = () => {
  const particlesInit = useCallback(async (engine) => {
    await loadFull(engine)
  }, [])

  const particlesOptions = {
    background: { color: { value: 'transparent' } },
    fpsLimit: 60,
    particles: {
      number: { value: 40, density: { enable: true, area: 800 } },
      color: { value: '#4FD1C5' },
      shape: { type: 'circle' },
      opacity: {
        value: 0.3,
        anim: { enable: true, speed: 1, opacity_min: 0.1, sync: false },
      },
      size: { value: { min: 1, max: 3 } },
      move: {
        enable: true,
        speed: 1,
        direction: 'none',
        outModes: 'bounce',
      },
    },
    interactivity: {
      events: {
        onHover: { enable: true, mode: 'grab' },
        onClick: { enable: true, mode: 'push' },
        resize: true,
      },
      modes: {
        grab: { distance: 120, links: { opacity: 0.2 } },
        push: { quantity: 2 },
      },
    },
    detectRetina: true,
  }

  return (
    <Particles
      id="tsparticles"
      init={particlesInit}
      options={particlesOptions}
      className="absolute inset-0 z-0"
    />
  )
}

export default ParticlesBackground
