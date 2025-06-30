// src/sections/Contact.jsx
import React from 'react'
import SectionWrapper from '../components/SectionWrapper'
import { FaEnvelope, FaLinkedin, FaGithub } from 'react-icons/fa'

const Contact = () => (
  <SectionWrapper id="contact">
    <div className="max-w-lg mx-auto text-center space-y-8">
      <h2 className="text-3xl font-bold">Get in Touch</h2>
      <p className="text-slate-300">
        ¿Tienes un proyecto interesante o simplemente quieres saludar?  
        Escríbeme un mensaje y te responderé lo antes posible.
      </p>

      {/* Formulario con Formspree */}
      <form
        action="https://formspree.io/f/yourFormID"
        method="POST"
        className="space-y-4"
      >
        <input
          type="text"
          name="name"
          placeholder="Tu nombre"
          required
          className="w-full p-3 rounded bg-black/20 text-white focus:outline-none focus:ring-2 focus:ring-primary"
        />
        <input
          type="email"
          name="email"
          placeholder="Tu email"
          required
          className="w-full p-3 rounded bg-black/20 text-white focus:outline-none focus:ring-2 focus:ring-primary"
        />
        <textarea
          name="message"
          rows="4"
          placeholder="Tu mensaje..."
          required
          className="w-full p-3 rounded bg-black/20 text-white focus:outline-none focus:ring-2 focus:ring-primary resize-y max-h-40"
        />
        <button
          type="submit"
          className="mt-2 px-6 py-3 bg-primary text-black font-semibold rounded hover:bg-secondary transition"
        >
          Enviar Mensaje
        </button>
      </form>

      {/* Links de contacto directo */}
      <div className="flex justify-center space-x-6 text-primary text-2xl">
        <a href="mailto:chris.ery@hotmail.com" aria-label="Email">
          <FaEnvelope />
        </a>
        <a
          href="https://cl.linkedin.com/in/christian-elias-rangel-intriago-85a8a1293"
          target="_blank"
          rel="noopener noreferrer"
          aria-label="LinkedIn"
        >
          <FaLinkedin />
        </a>
        <a
          href="https://github.com/Crispolein"
          target="_blank"
          rel="noopener noreferrer"
          aria-label="GitHub"
        >
          <FaGithub />
        </a>
      </div>
    </div>
  </SectionWrapper>
)

export default Contact
