import React from 'react';
import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import SectionWrapper from '../components/SectionWrapper';
import { FaJs, FaReact, FaNodeJs, FaPython, FaAws, FaDocker } from 'react-icons/fa';
import { SiTypescript, SiDjango, SiPostgresql } from 'react-icons/si';

const skillsList = [
  { name: 'JavaScript', Icon: FaJs },
  { name: 'TypeScript', Icon: SiTypescript },
  { name: 'React', Icon: FaReact },
  { name: 'Node.js', Icon: FaNodeJs },
  { name: 'Python', Icon: FaPython },
  { name: 'Django', Icon: SiDjango },
  { name: 'AWS', Icon: FaAws },
  { name: 'Docker', Icon: FaDocker },
  { name: 'PostgreSQL', Icon: SiPostgresql },
];

const container = {
  hidden: {},
  show: {
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const item = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0 },
};

const Skills = () => {
  const { t } = useTranslation();

  return (
    <SectionWrapper id="skills">
      <div className="max-w-4xl mx-auto">
        <h2 className="text-3xl font-bold mb-8 text-center">{t('skills.title')}</h2>
        <motion.div
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.2 }}
          className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-6"
        >
          {skillsList.map(({ name, Icon }) => (
            <motion.div
              key={name}
              variants={item}
              whileHover={{ scale: 1.1, rotate: 10 }}
              transition={{ type: 'spring', stiffness: 300 }}
              className="flex flex-col items-center p-6 bg-black/20 backdrop-blur-sm rounded-lg cursor-pointer"
            >
              <Icon size={48} className="text-primary mb-2" />
              <span className="mt-1 text-white font-medium">{name}</span>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </SectionWrapper>
  );
};

export default Skills;