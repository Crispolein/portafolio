import React from 'react';
import SectionWrapper from '../components/SectionWrapper';
import projects from '../data/projects';

const Projects = () => (
  <SectionWrapper id="projects">
    <div>
      <h2 className="text-3xl font-bold mb-6 text-center">Projects</h2>
      <div className="grid gap-6 sm:grid-cols-2">
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
export default Projects;