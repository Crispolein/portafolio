import React from 'react';
import { useTranslation } from 'react-i18next';
import { FaMobileAlt, FaDesktop, FaRobot, FaHandsHelping, FaPuzzlePiece, FaBolt } from 'react-icons/fa';
import SectionWrapper from '../components/SectionWrapper';

const About = () => {
  const { t } = useTranslation();

  // Ahora los arrays de datos usan las claves de traducción
  const milestones = [
    { key: 'design', icon: <FaHandsHelping size={24} /> },
    { key: 'dev', icon: <FaMobileAlt size={24} /> },
    { key: 'deploy', icon: <FaBolt size={24} /> },
  ];

  const passions = [
    { key: 'mobile', icon: <FaMobileAlt size={32} /> },
    { key: 'desktop', icon: <FaDesktop size={32} /> },
    { key: 'ai', icon: <FaRobot size={32} /> },
  ];

  const softSkills = [
    { key: 'empathy', icon: <FaHandsHelping size={24} /> },
    { key: 'problemSolving', icon: <FaPuzzlePiece size={24} /> },
    { key: 'proactive', icon: <FaBolt size={24} /> },
  ];

  return (
    <SectionWrapper id="about">
      <div className="max-w-3xl mx-auto text-center space-y-8">
        <h2 className="text-3xl font-bold">{t('about.title')}</h2>
        <p className="text-slate-300 leading-relaxed">
          {t('about.p1')}
        </p>
        <p className="text-slate-300 leading-relaxed">
          {t('about.p2')}
        </p>

        {/* Timeline */}
        <div className="flex justify-center items-center space-x-6 overflow-x-auto">
          {milestones.map(({ key, icon }) => (
            <div key={key} className="flex flex-col items-center text-slate-200">
              <div className="p-3 bg-primary/20 rounded-full mb-2">{icon}</div>
              <span className="text-sm font-medium">{t(`about.milestones.${key}`)}</span>
            </div>
          ))}
        </div>

        {/* Passions */}
        <div className="grid grid-cols-3 gap-6">
          {passions.map(({ key, icon }) => (
            <div key={key} className="flex flex-col items-center">
              <div className="p-2 text-primary">{icon}</div>
              <span className="text-slate-300 text-sm">{t(`about.passions.${key}`)}</span>
            </div>
          ))}
        </div>

        {/* Soft Skills */}
        <div className="grid grid-cols-3 gap-6">
          {softSkills.map(({ key, icon }) => (
            <div key={key} className="flex flex-col items-center">
              <div className="p-2 text-primary">{icon}</div>
              <span className="text-slate-300 text-sm">{t(`about.softSkills.${key}`)}</span>
            </div>
          ))}
        </div>
      </div>
    </SectionWrapper>
  );
};

export default About;