import { Plus } from 'lucide-react'
import { Section } from '@/components/ui/Section'
import { homeSections } from '@/config/routes'
import type { HomeContent } from '@/types/content'
import { SectionHeading } from './SectionHeading'

/** Perguntas frequentes com <details>/<summary>: acessível por teclado e leitores de tela sem JavaScript extra. */
export function FaqSection({ content }: { content: HomeContent['faq'] }) {
  return (
    <Section id={homeSections.faq} tone="bege" labelledBy="faq-titulo">
      <SectionHeading id="faq-titulo" eyebrow={content.eyebrow} title={content.title} />
      <div className="mx-auto mt-12 max-w-3xl divide-y divide-areia-300 border-y border-areia-300">
        {content.items.map((item) => (
          <details key={item.question} className="group">
            <summary className="flex cursor-pointer list-none items-center justify-between gap-6 py-5 font-serif text-titulo-3 font-semibold [&::-webkit-details-marker]:hidden">
              {item.question}
              <Plus
                aria-hidden="true"
                className="size-5 shrink-0 text-oliva-600 transition-transform duration-200 group-open:rotate-45"
                strokeWidth={1.5}
              />
            </summary>
            <p className="pb-6 pr-10 text-tinta-suave">{item.answer}</p>
          </details>
        ))}
      </div>
    </Section>
  )
}
