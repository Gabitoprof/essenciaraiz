import { Moon, Sun, Sunrise } from 'lucide-react'
import { Eyebrow } from '@/components/ui/Eyebrow'
import { homeContent } from '@/data/home'
import { journeyWeeks } from '@/data/journey'
import { onboardingContent } from '@/data/onboarding'

const momentIcons = [Sunrise, Sun, Moon]

/** Primeira tela do onboarding: acolhimento e proposta dos 21 dias. */
export function WelcomeStep({ name }: { name: string }) {
  const { welcome } = onboardingContent
  return (
    <div>
      <Eyebrow>{welcome.eyebrow}</Eyebrow>
      <p className="mt-2 font-serif text-titulo-2 text-oliva-700">{name ? `Olá, ${name}.` : 'Olá.'}</p>
      {welcome.text.map((paragraph) => (
        <p key={paragraph} className="mt-4 text-tinta-suave">
          {paragraph}
        </p>
      ))}

      <h2 className="mt-8 font-serif text-titulo-3 font-semibold">Os três momentos de cada dia</h2>
      <ul className="mt-3 grid gap-2">
        {homeContent.howItWorks.moments.map((moment, index) => {
          const Icon = momentIcons[index] ?? Sun
          return (
            <li key={moment.name} className="flex items-center gap-3 rounded-campo bg-bege-100 px-4 py-3">
              <Icon aria-hidden="true" className="size-5 shrink-0 text-oliva-700" strokeWidth={1.5} />
              <span>
                <strong className="font-medium">{moment.name}</strong>
                <span className="text-tinta-suave">
                  {' '}
                  · {moment.period.toLowerCase()}, {moment.duration}
                </span>
              </span>
            </li>
          )
        })}
      </ul>

      <h2 className="mt-8 font-serif text-titulo-3 font-semibold">As três semanas</h2>
      <ol className="mt-3 grid gap-2">
        {journeyWeeks.map((week) => (
          <li key={week.week} className="flex gap-3">
            <span className="grid size-7 shrink-0 place-items-center rounded-full bg-oliva-600 text-legenda tracking-normal text-branco-quente">
              {week.week}
            </span>
            <span className="pt-0.5">{week.title}</span>
          </li>
        ))}
      </ol>
    </div>
  )
}
