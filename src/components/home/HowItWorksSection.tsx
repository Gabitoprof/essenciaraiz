import { Moon, Sun, Sunrise, type LucideIcon } from 'lucide-react'
import { Card } from '@/components/ui/Card'
import { Section } from '@/components/ui/Section'
import { homeSections } from '@/config/routes'
import type { HomeContent } from '@/types/content'
import { SectionHeading } from './SectionHeading'

/** Ícone de cada momento do dia, na mesma ordem dos dados (manhã, dia, noite). */
const momentIcons: LucideIcon[] = [Sunrise, Sun, Moon]

export function HowItWorksSection({ content }: { content: HomeContent['howItWorks'] }) {
  return (
    <Section id={homeSections.howItWorks} labelledBy="como-funciona-titulo">
      <SectionHeading id="como-funciona-titulo" eyebrow={content.eyebrow} title={content.title} intro={content.intro} />
      <ol className="mt-14 grid gap-5 md:grid-cols-3">
        {content.moments.map((moment, index) => {
          const Icon = momentIcons[index] ?? Sun
          return (
            <li key={moment.name}>
              <Card className="h-full">
                <div className="flex items-center justify-between">
                  <span className="grid size-11 place-items-center rounded-full bg-salvia-100 text-oliva-700">
                    <Icon aria-hidden="true" className="size-5" strokeWidth={1.5} />
                  </span>
                  <span className="font-serif text-titulo-3 text-oliva-600" aria-hidden="true">
                    0{index + 1}
                  </span>
                </div>
                <h3 className="mt-5 text-titulo-2">{moment.name}</h3>
                <p className="mt-1 text-apoio font-medium text-terra-600">
                  {moment.period} · {moment.duration}
                </p>
                <p className="mt-3 text-tinta-suave">{moment.description}</p>
              </Card>
            </li>
          )
        })}
      </ol>
      <p className="mx-auto mt-10 max-w-leitura rounded-cartao bg-salvia-100 px-6 py-5 text-center">{content.note}</p>
    </Section>
  )
}
