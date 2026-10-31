import { useTranslation } from 'react-i18next'
import CardLink from '../components/ui/CardLink'
import { cases, shotSrc } from '../data/cases'
import { featuredProjects, listProjects } from '../data/projects'

const rowBase =
  'grid gap-1 px-3 py-[22px] -mx-3 items-baseline md:grid-cols-[280px_1fr_220px] md:gap-6 ' +
  'border-b border-line transition-colors duration-[180ms] ease-out'

export default function Projects() {
  const { t } = useTranslation()

  return (
    <section id="projects" aria-labelledby="projects-title" className="rv mt-[72px] sm:mt-[120px]">
      <div className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1 border-b border-line pb-3.5">
        <h2
          id="projects-title"
          className="m-0 text-[30px] font-extrabold tracking-[-.02em] sm:text-[40px] [font-variation-settings:'wdth'_80]"
        >
          {t('projects.title')}
        </h2>
        <span className="font-mono text-[13px] text-mut">{t('projects.side')}</span>
      </div>

      <div className="grid border-b border-line md:grid-cols-2">
        {featuredProjects.map((p) => (
          <CardLink
            key={p.id}
            href={p.href}
            data-ac={cases[p.id].accent}
            className="border-0 border-t-2 border-t-ac py-8 md:pr-8 md:[&:nth-child(2)]:border-l md:[&:nth-child(2)]:border-line md:[&:nth-child(2)]:pl-8 md:[&:nth-child(2)]:pr-0"
          >
            <span className="flex items-baseline gap-3 font-mono text-xs text-ac">
              <b className="text-[32px] font-medium leading-none">{cases[p.id].num}</b>
              {t(`projects.featured.${p.key}.tag`)}
            </span>
            <h3 className="mb-2 mt-3 text-2xl font-extrabold group-hover:text-ac group-focus-visible:text-ac sm:text-[28px]">
              {t(`projects.featured.${p.key}.name`)}
            </h3>
            <span className="block text-base leading-[1.6] text-mut">{t(`projects.featured.${p.key}.desc`)}</span>
            <img
              src={shotSrc(p.id, 1)}
              alt=""
              loading="lazy"
              decoding="async"
              className="mt-5 block aspect-[16/10] w-full rounded-md border border-line object-cover object-top transition-colors duration-200 group-hover:border-ac"
            />
            <span className="mt-[18px] block font-mono text-[13px] text-mut group-hover:text-ac group-focus-visible:text-ac">
              {t('projects.seeCase')}
            </span>
          </CardLink>
        ))}
      </div>

      <ul className="m-0 list-none p-0">
        {listProjects.map((p) => {
          const name = t(`projects.list.${p.id}.name`)
          const body = (
            <>
              <b className="text-[19px] group-hover:text-amb group-focus-visible:text-amb">{name}</b>
              <p className="m-0 text-[15px] leading-[1.55] text-mut">{t(`projects.list.${p.id}.desc`)}</p>
              <span className="font-mono text-xs text-cy md:text-right">
                {t(`projects.list.${p.id}.stack`)}
                {p.url ? (
                  <i
                    aria-hidden="true"
                    className="ml-2 inline-block -translate-x-1 not-italic opacity-0 transition-[opacity,transform] duration-[180ms] group-hover:translate-x-0 group-hover:opacity-100 group-focus-visible:translate-x-0 group-focus-visible:opacity-100"
                  >
                    →
                  </i>
                ) : (
                  p.privateRepo && <span className="block text-mut">{t('projects.privateRepo')}</span>
                )}
              </span>
            </>
          )
          return (
            <li key={p.id}>
              {p.url ? (
                <a
                  href={p.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`group ${rowBase} text-inherit no-underline hover:bg-term focus-visible:bg-term focus-visible:outline-offset-[-2px]`}
                >
                  {body}
                </a>
              ) : (
                <div className={rowBase}>{body}</div>
              )}
            </li>
          )
        })}
      </ul>
    </section>
  )
}
