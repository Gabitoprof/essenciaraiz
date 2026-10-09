import { Section } from '@/components/ui/Section'
import type { HomeContent } from '@/types/content'
import { SectionHeading } from './SectionHeading'

export function OfferingsSection({ content }: { content: HomeContent['offerings'] }) {
  return (
    <Section labelledBy="ofertas-titulo">
      <SectionHeading id="ofertas-titulo" eyebrow={content.eyebrow} title={content.title} />
      <ul className="mt-14 grid gap-x-8 gap-y-10 sm:grid-cols-2 lg:grid-cols-5">
        {content.items.map(({ title, description, icon: Icon }) => (
          <li key={title} className="text-center">
            <span className="mx-auto grid size-14 place-items-center rounded-full bg-bege-100 text-oliva-700">
              <Icon aria-hidden="true" className="size-6" strokeWidth={1.5} />
            </span>
            <h3 className="mt-4 text-titulo-3 font-semibold">{title}</h3>
            <p className="mt-2 text-apoio text-tinta-suave">{description}</p>
          </li>
        ))}
      </ul>
    </Section>
  )
}
