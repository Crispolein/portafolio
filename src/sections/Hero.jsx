// src/components/Hero.jsx
import React from 'react';
import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import Button from '../components/Button';
import { FaFileDownload } from 'react-icons/fa';

const skills = [
  { key: 'mobileDev', subtitle: 'Flutter & Dart', icon: '📱' },
  { key: 'databases', subtitle: 'PostgreSQL, MongoDB', icon: '🗄️' },
  { key: 'webAi', subtitle: 'Django, Flask & ML', icon: '🤖' },
  { key: 'cloudOps', subtitle: 'AWS & GCP', icon: '☁️' },
];

const Hero = () => {
  const { t } = useTranslation();

  return (
    <section
      id="home"
      className="
        relative flex flex-col items-center justify-center min-h-screen
        px-4 text-center text-white overflow-hidden
        bg-gradient-to-br from-gray-900 to-slate-800
      "
    >
      <div className="absolute inset-0 bg-black/30" />

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="relative z-10 max-w-3xl space-y-6"
      >
        <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight leading-tight">
          {t('hero.greeting')}
        </h1>
        <p className="text-xl sm:text-2xl font-medium text-slate-300">
          {t('hero.subtitle')}
        </p>

        <a
          href="/Christian_Rangel_CV.pdf"
          download
          className="
            inline-flex items-center space-x-2 px-8 py-3 mt-8
            text-white font-bold rounded-full
            bg-primary hover:bg-teal-500 transition-all duration-300
          "
        >
          <FaFileDownload />
          <span>{t('hero.cta')}</span>
        </a>

        <div className="mt-12 grid grid-cols-2 sm:grid-cols-4 gap-6">
          {skills.map(({ key, subtitle, icon }) => (
            <div
              key={key}
              className="
                flex flex-col items-center p-4 rounded-lg
                bg-white/5 backdrop-blur-sm border border-white/10
                transition-transform duration-300 hover:scale-105
              "
            >
              <span className="text-4xl">{icon}</span>
              <h3 className="mt-3 font-bold text-lg">{t(`hero.skills.${key}`)}</h3>
              <p className="text-sm text-slate-400">{subtitle}</p>
            </div>
          ))}
        </div>
      </motion.div>
    </section>
  );
};

export default Hero;