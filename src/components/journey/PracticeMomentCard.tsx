import { Link } from 'react-router-dom'
import { Badge } from '@/components/ui/Badge'
import { Card } from '@/components/ui/Card'
import { buttonClasses } from '@/components/ui/buttonStyles'
import type { PracticeMomentInfo } from '@/data/practiceMoments'
import type { PracticeState } from '@/types/progress'
import { PracticeStateBadge } from './PracticeStateBadge'

interface PracticeMomentCardProps {
  moment: PracticeMomentInfo
  state: PracticeState
  day: number
  /** Endereço da prática (página do dia com a âncora do momento). */
  to: string
  /** Falso quando o conteúdo do dia ainda está em preparação. */
  published?: boolean
}

const actionLabel: Record<PracticeState, string> = {
  disponivel: 'Abrir prática',
  iniciado: 'Continuar',
  concluido: 'Rever',
}

/** Um dos três momentos do dia (Despertar, Presença, Integrar) com o estado registrado pela participante. */
export function PracticeMomentCard({ moment, state, day, to, published = true }: PracticeMomentCardProps) {
  const Icon = moment.icon
  const label = published ? actionLabel[state] : 'Ver o dia'

  return (
    <Card className="flex h-full flex-col gap-4">
      <div className="flex flex-wrap items-start justify-between gap-3">
        <span className="grid size-11 shrink-0 place-items-center rounded-full bg-salvia-100 text-oliva-700">
          <Icon aria-hidden="true" className="size-5" strokeWidth={1.5} />
        </span>
        {published ? <PracticeStateBadge state={state} /> : <Badge tone="terra">Em preparação</Badge>}
      </div>
      <div className="flex-1">
        <p className="text-legenda font-medium uppercase text-terra-600">
          {moment.period} · {moment.duration}
        </p>
        <h3 className="mt-1 font-serif text-titulo-3 font-semibold">{moment.name}</h3>
        <p className="mt-1 text-apoio text-tinta-suave">{moment.description}</p>
      </div>
      <Link
        to={to}
        className={buttonClasses({ variant: state === 'concluido' ? 'ghost' : 'secondary', size: 'sm', className: 'self-start' })}
        aria-label={`${label}: ${moment.name}, dia ${day}`}
      >
        {label}
      </Link>
    </Card>
  )
}
