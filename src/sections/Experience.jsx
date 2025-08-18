import React from 'react';
import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import SectionWrapper from '../components/SectionWrapper';
import { FaLaptopCode } from 'react-icons/fa';
import { GiGears } from 'react-icons/gi';

// Actualiza este array para que coincida con el número de trabajos en tus traducciones
const jobKeys = ['job1', 'job2', 'job3', 'job4'];

const container = {
  hidden: {},
  show: {
    transition: {
      staggerChildren: 0.2,
    },
  },
};

const item = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0 },
};

const Experience = () => {
  const { t } = useTranslation();

  return (
    <SectionWrapper id="experience">
      <motion.div
        variants={container}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.2 }}
        className="max-w-4xl mx-auto"
      >
        <h2 className="text-3xl font-bold mb-8 text-center">{t('experience.title')}</h2>
        <div className="space-y-6">
          {jobKeys.map((key, idx) => {
            const Icon = idx % 2 === 0 ? FaLaptopCode : GiGears; // Alternamos los íconos para variedad
            return (
              <motion.div
                key={key}
                variants={item}
                whileHover={{ scale: 1.03 }}
                transition={{ type: 'spring', stiffness: 300 }}
                className="flex items-start p-6 bg-black/20 backdrop-blur-sm rounded-lg cursor-pointer"
              >
                <div className="text-primary mr-4 mt-1">
                  <Icon size={32} />
                </div>
                <div>
                  <h3 className="text-xl font-semibold">
                    {t(`experience.${key}.role`)} @ {t(`experience.${key}.company`)}
                  </h3>
                  <span className="text-sm text-slate-400">{t(`experience.${key}.period`)}</span>
                  <p className="mt-2 text-slate-300 leading-relaxed">{t(`experience.${key}.description`)}</p>
                </div>
              </motion.div>
            );
          })}
        </div>
      </motion.div>
    </SectionWrapper>
  );
};

export default Experience;