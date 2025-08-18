import React from 'react';
import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import { FaMobileAlt, FaDesktop, FaRobot, FaHandsHelping, FaPuzzlePiece, FaBolt, FaMagic } from 'react-icons/fa';
import { RiRocket2Line } from 'react-icons/ri';
import SectionWrapper from '../components/SectionWrapper';

// Definición de las animaciones
const containerVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const itemVariants = {
  hidden: { y: 20, opacity: 0 },
  visible: { y: 0, opacity: 1, transition: { type: 'spring', stiffness: 100 } },
};

const About = () => {
  const { t } = useTranslation();

  const values = [
    { key: 'design', icon: <FaMagic size={28} />, name: t('about.milestones.design') },
    { key: 'dev', icon: <FaMobileAlt size={28} />, name: t('about.milestones.dev') },
    { key: 'deploy', icon: <RiRocket2Line size={28} />, name: t('about.milestones.deploy') },
    { key: 'empathy', icon: <FaHandsHelping size={28} />, name: t('about.softSkills.empathy') },
    { key: 'problemSolving', icon: <FaPuzzlePiece size={28} />, name: t('about.softSkills.problemSolving') },
    { key: 'proactive', icon: <FaBolt size={28} />, name: t('about.softSkills.proactive') },
  ];

  const expertise = [
    { key: 'mobile', icon: <FaMobileAlt size={32} />, name: t('about.passions.mobile') },
    { key: 'desktop', icon: <FaDesktop size={32} />, name: t('about.passions.desktop') },
    { key: 'ai', icon: <FaRobot size={32} />, name: t('about.passions.ai') },
  ];

  return (
    <SectionWrapper id="about">
      <div className="max-w-4xl mx-auto text-center space-y-12">
        <div className="space-y-4">
          <h2 className="text-4xl font-extrabold text-white">{t('about.title')}</h2>
          <p className="text-slate-300 text-lg leading-relaxed max-w-2xl mx-auto">
            {t('about.p1')}
          </p>
          <p className="text-slate-300 text-lg leading-relaxed max-w-2xl mx-auto">
            {t('about.p2')}
          </p>
        </div>

        {/* Sección de Valores y Proceso de Trabajo */}
        <motion.div
          className="grid grid-cols-2 sm:grid-cols-3 gap-6"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
        >
          {values.map((item) => (
            <motion.div
              key={item.key}
              variants={itemVariants}
              className="flex flex-col items-center justify-center p-6 border border-teal-500/30 rounded-lg text-white backdrop-blur-sm
                         hover:bg-teal-500/10 transition-colors duration-300 cursor-pointer"
            >
              <div className="text-teal-400 mb-2">{item.icon}</div>
              <span className="text-sm font-medium">{item.name}</span>
            </motion.div>
          ))}
        </motion.div>

        {/* Sección de Áreas de Expertise */}
        <motion.div
          className="grid grid-cols-1 sm:grid-cols-3 gap-6"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
        >
          {expertise.map((item) => (
            <motion.div
              key={item.key}
              variants={itemVariants}
              className="flex flex-col items-center p-6 border border-purple-500/30 rounded-lg text-white backdrop-blur-sm
                         hover:bg-purple-500/10 transition-colors duration-300 cursor-pointer"
            >
              <div className="text-purple-400 mb-2">{item.icon}</div>
              <span className="text-lg font-semibold">{item.name}</span>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </SectionWrapper>
  );
};

export default About;