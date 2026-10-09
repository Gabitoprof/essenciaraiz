import { Card } from '@/components/ui/Card'
import { Container } from '@/components/ui/Container'
import type { HomeBenefit } from '@/types/content'

export function BenefitsSection({ benefits }: { benefits: HomeBenefit[] }) {
  return (
    <section aria-labelledby="beneficios-titulo" className="py-12 sm:py-16">
      <Container>
        <h2 id="beneficios-titulo" className="sr-only">
          Como funciona a jornada
        </h2>
        <ul className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {benefits.map((benefit) => (
            <li key={benefit.title}>
              <Card className="h-full">
                <h3 className="text-xl font-semibold text-terra-700">{benefit.title}</h3>
                <p className="mt-2 text-raiz-700">{benefit.description}</p>
              </Card>
            </li>
          ))}
        </ul>
      </Container>
    </section>
  )
}
