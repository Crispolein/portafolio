import { useTranslation } from 'react-i18next'
import { projects } from '../data/projects'
import ProjectCard from '../components/ProjectCard'
import FeaturedProjectCard from '../components/FeaturedProjectCard'

export default function Projects() {
  const { t } = useTranslation()
  const regular = projects.filter(p => !p.featured)
  const featured = projects.find(p => p.featured)!

  return (
    <section id="projects" className="px-8 py-16 border-b border-white/[0.07]">
      <div className="max-w-6xl mx-auto">
        <p className="text-[10px] text-amber uppercase tracking-[3px] mb-2">{t('projects.label')}</p>
        <h2 className="text-3xl font-black text-white mb-2">{t('projects.title')}</h2>
        <p className="text-[14px] text-[#6b7280] mb-10">{t('projects.sub')}</p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {regular.map((p, i) => (
            <ProjectCard key={p.id} project={p} index={i} />
          ))}
          <FeaturedProjectCard project={featured} />
        </div>
      </div>
    </section>
  )
}
