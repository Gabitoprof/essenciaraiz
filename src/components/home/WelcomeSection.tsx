import { LeafMark } from '@/components/decor/LeafMark'
import { Section } from '@/components/ui/Section'
import type { HomeContent } from '@/types/content'
import { SectionHeading } from './SectionHeading'

/** Acolhimento: situações em que a visitante pode se reconhecer, sem diagnóstico nem pressão. */
export function WelcomeSection({ content }: { content: HomeContent['welcome'] }) {
  return (
    <Section tone="bege" labelledBy="acolhimento-titulo">
      <SectionHeading id="acolhimento-titulo" eyebrow={content.eyebrow} title={content.title} />
      <ul className="mx-auto mt-12 grid max-w-4xl gap-4 sm:grid-cols-2">
        {content.situations.map((situation) => (
          <li key={situation} className="flex gap-4 rounded-cartao bg-branco-quente/80 p-5 sm:p-6">
            <LeafMark className="mt-1 size-5 shrink-0 text-oliva-600" />
            <p>{situation}</p>
          </li>
        ))}
      </ul>
      <p className="mx-auto mt-12 max-w-leitura text-center font-serif text-titulo-3 italic text-terra-700">
        {content.closing}
      </p>
    </Section>
  )
}
