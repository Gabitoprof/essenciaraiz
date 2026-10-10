import { ButtonLink } from '@/components/ui/ButtonLink'
import { Section } from '@/components/ui/Section'
import { homeSections, paths } from '@/config/routes'
import { journeyWeeks } from '@/data/journey'
import type { HomeContent } from '@/types/content'
import { SectionHeading } from './SectionHeading'

/** As três semanas da jornada, como uma linha do tempo (vertical no celular, horizontal no computador). */
export function JourneySection({ content }: { content: HomeContent['journey'] }) {
  return (
    <Section id={homeSections.journey} tone="verde" labelledBy="jornada-titulo">
      <SectionHeading id="jornada-titulo" eyebrow={content.eyebrow} title={content.title} intro={content.intro} />
      <ol className="relative mt-14 grid gap-10 md:grid-cols-3 md:gap-8">
        <span aria-hidden="true" className="absolute left-5 top-2 h-[calc(100%-1rem)] w-px bg-salvia-400 md:left-0 md:top-5 md:h-px md:w-full" />
        {journeyWeeks.map((week) => (
          <li key={week.week} className="relative pl-16 md:pl-0 md:pt-14">
            <span className="absolute left-0 top-0 grid size-10 place-items-center rounded-full bg-oliva-600 font-serif text-titulo-3 text-branco-quente">
              {week.week}
            </span>
            <p className="text-legenda font-medium uppercase text-terra-600">
              Semana {week.week} · dias {week.days[0]} a {week.days[week.days.length - 1]}
            </p>
            <h3 className="mt-2 text-titulo-2">{week.title}</h3>
            <p className="mt-2 text-tinta-suave">{week.description}</p>
          </li>
        ))}
      </ol>
      <div className="mt-14 text-center">
        <ButtonLink to={paths.signup}>{content.cta}</ButtonLink>
      </div>
    </Section>
  )
}
