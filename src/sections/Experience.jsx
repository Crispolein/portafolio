// src/sections/Experience.jsx
import React from 'react'
import { motion } from 'framer-motion'
import SectionWrapper from '../components/SectionWrapper'
import { FaLaptopCode } from 'react-icons/fa'
import { GiGears } from 'react-icons/gi'
// Importa tu data real
import experienceList from '../data/experience'

const container = {
  hidden: {},
  show: {
    transition: {
      staggerChildren: 0.2,
    },
  },
}

const item = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0 },
}

const Experience = () => (
  <SectionWrapper id="experience">
    <motion.div
      variants={container}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, amount: 0.2 }}
      className="max-w-4xl mx-auto"
    >
      <h2 className="text-3xl font-bold mb-8 text-center">Experience</h2>
      <div className="space-y-6">
        {experienceList.map(({ company, role, period, description }, idx) => {
          const Icon = idx === 0 ? FaLaptopCode : GiGears
          return (
            <motion.div
              key={company}
              variants={item}
              whileHover={{ scale: 1.03 }}
              transition={{ type: 'spring', stiffness: 300 }}
              className="flex items-start p-6 bg-black/20 backdrop-blur-sm rounded-lg cursor-pointer"
            >
              <div className="text-primary mr-4">
                <Icon size={32} />
              </div>
              <div>
                <h3 className="text-xl font-semibold">
                  {role} @ {company}
                </h3>
                <span className="text-sm text-slate-400">{period}</span>
                <p className="mt-2 text-slate-300 leading-relaxed">{description}</p>
              </div>
            </motion.div>
          )
        })}
      </div>
    </motion.div>
  </SectionWrapper>
)

export default Experience
