import React from 'react';
import { useTranslation } from 'react-i18next';
import SectionWrapper from '../components/SectionWrapper';

const Projects = () => {
  const { t } = useTranslation();

  // 1. Obtén la lista de proyectos con la opción { returnObjects: true }.
  const projectsData = t('projects.list', { returnObjects: true });
  
  // 2. Asegúrate de que projectsData sea un array antes de usar .map().
  // Si no es un array (por ejemplo, es un string o undefined), usa un array vacío [] en su lugar.
  const projects = Array.isArray(projectsData) ? projectsData : [];

  return (
    <SectionWrapper id="projects">
      <div>
        <h2 className="text-3xl font-bold mb-6 text-center">{t('projects.title')}</h2>
        <div className="grid gap-6 sm:grid-cols-2">
          {/* Ahora iteramos sobre la variable projects que siempre es un array */}
          {projects.map(p => (
            <a key={p.title} href={p.link} target="_blank" rel="noopener noreferrer"
              className="block p-4 bg-slate-800 rounded hover:bg-slate-700 transition">
              <h3 className="font-semibold">{p.title}</h3>
              <p className="mt-2 text-slate-300">{p.description}</p>
            </a>
          ))}
        </div>
      </div>
    </SectionWrapper>
  );
};

export default Projects;