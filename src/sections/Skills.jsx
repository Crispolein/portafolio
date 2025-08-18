import React from 'react';
import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import SectionWrapper from '../components/SectionWrapper';
import { FaJs, FaReact, FaNodeJs, FaPython, FaAws, FaDocker, FaGitAlt } from 'react-icons/fa';
import { SiTypescript, SiDjango, SiPostgresql, SiMongodb, SiRedis, SiHtml5, SiCss3, SiBitbucket, SiJira, SiLinux, SiDart, SiFlutter, SiFirebase } from 'react-icons/si';

const skillsList = [
  // Lenguajes y Frameworks (del CV)
  { name: 'Python', Icon: FaPython },
  { name: 'Django / Flask', Icon: SiDjango },
  { name: 'Dart', Icon: SiDart },
  { name: 'Flutter', Icon: SiFlutter },
  { name: 'HTML', Icon: SiHtml5 },
  // Bases de Datos (del CV)
  { name: 'PostgreSQL', Icon: SiPostgresql },
  { name: 'Firebase', Icon: SiFirebase },
  { name: 'MongoDB', Icon: SiMongodb },
  // Herramientas y DevOps (del CV)
  { name: 'Git', Icon: FaGitAlt },
  { name: 'Bitbucket', Icon: SiBitbucket },
  { name: 'Jira', Icon: SiJira },
  { name: 'Docker', Icon: FaDocker },
  { name: 'Linux', Icon: SiLinux },
  { name: 'AWS', Icon: FaAws },
];

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.08,
    },
  },
};

const item = {
  hidden: { opacity: 0, scale: 0.8 },
  show: { opacity: 1, scale: 1, transition: { type: 'spring', stiffness: 100 } },
};

const Skills = () => {
  const { t } = useTranslation();

  return (
    <SectionWrapper id="skills">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-4xl font-extrabold mb-12 text-center text-white">{t('skills.title')}</h2>
        <motion.div
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.2 }}
          className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6"
        >
          {skillsList.map(({ name, Icon }) => (
            <motion.div
              key={name}
              variants={item}
              whileHover={{
                scale: 1.05,
                boxShadow: "0 0 20px rgba(100, 255, 218, 0.5)",
                transition: { duration: 0.2 },
              }}
              className="flex flex-col items-center p-6 bg-gray-800/50 backdrop-blur-sm rounded-xl cursor-pointer
                         hover:bg-gradient-to-r hover:from-teal-500/20 hover:to-blue-500/20 transition-colors"
            >
              <Icon size={56} className="text-teal-400 mb-4 transition-transform duration-300 group-hover:scale-110" />
              <span className="mt-1 text-white font-medium text-lg">{name}</span>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </SectionWrapper>
  );
};

export default Skills;