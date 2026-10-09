import { LeafMark } from '@/components/decor/LeafMark'
import { Eyebrow } from '@/components/ui/Eyebrow'
import { Section } from '@/components/ui/Section'
import type { HomeBenefit } from '@/types/content'

export function BenefitsSection({ benefits }: { benefits: HomeBenefit[] }) {
  return (
    <Section tone="bege" labelledBy="beneficios-titulo">
      <div className="mx-auto max-w-leitura text-center">
        <Eyebrow>Como funciona</Eyebrow>
        <h2 id="beneficios-titulo" className="mt-3 text-titulo-1 sm:text-[2.75rem]">
          Uma jornada para voltar para você
        </h2>
      </div>
      <ul className="mt-14 grid gap-10 sm:grid-cols-3 sm:gap-8">
        {benefits.map((benefit) => (
          <li key={benefit.title} className="text-center sm:text-left">
            <LeafMark className="mx-auto size-8 text-oliva-600 sm:mx-0" />
            <h3 className="mt-4 text-titulo-3 font-semibold">{benefit.title}</h3>
            <p className="mt-2 text-tinta-suave">{benefit.description}</p>
          </li>
        ))}
      </ul>
    </Section>
  )
}
