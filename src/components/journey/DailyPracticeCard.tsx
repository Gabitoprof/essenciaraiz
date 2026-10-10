import { Check, Lock } from 'lucide-react'
import { Link } from 'react-router-dom'
import { Badge } from '@/components/ui/Badge'
import { Card } from '@/components/ui/Card'
import { buttonClasses } from '@/components/ui/buttonStyles'
import type { DayStatus, JourneyDay } from '@/types/journey'

interface DailyPracticeCardProps {
  day: JourneyDay
  status: DayStatus
  to: string
}

const statusLabel: Record<DayStatus, string> = {
  concluido: 'Concluído',
  hoje: 'Prática de hoje',
  disponivel: 'Disponível',
  bloqueado: 'Em breve',
}

/** Cartão de prática diária: número do dia, tema, resumo e ação. Usado no painel e na jornada. */
export function DailyPracticeCard({ day, status, to }: DailyPracticeCardProps) {
  const isLocked = status === 'bloqueado'
  const isToday = status === 'hoje'

  return (
    <Card tone={isToday ? 'verde' : 'claro'} className={`flex flex-col gap-5 ${isLocked ? 'opacity-70' : ''}`}>
      <div className="flex items-start justify-between gap-4">
        <div className="flex items-baseline gap-3">
          <span className="font-serif text-[3rem] leading-none font-medium text-oliva-600" aria-hidden="true">
            {String(day.day).padStart(2, '0')}
          </span>
          <span className="text-legenda font-medium uppercase text-terra-600">Dia {day.day} de 21</span>
        </div>
        <Badge tone={status === 'concluido' ? 'oliva' : isToday ? 'neutro' : 'terra'}>
          {status === 'concluido' && <Check aria-hidden="true" className="size-3.5" />}
          {isLocked && <Lock aria-hidden="true" className="size-3.5" />}
          {statusLabel[status]}
        </Badge>
      </div>

      <div>
        <h3 className="text-titulo-2">{day.title}</h3>
        <p className="mt-2 text-tinta-suave">{day.objective ?? 'Conteúdo deste dia em preparação.'}</p>
      </div>

      {isLocked ? (
        <p className="text-apoio text-tinta-suave">Este dia é liberado depois do anterior.</p>
      ) : (
        <Link
          to={to}
          className={buttonClasses({ variant: isToday ? 'primary' : 'secondary', className: 'self-start' })}
          aria-label={`${status === 'concluido' ? 'Rever' : 'Começar'} o dia ${day.day}: ${day.title}`}
        >
          {status === 'concluido' ? 'Rever prática' : 'Começar prática'}
        </Link>
      )}
    </Card>
  )
}
