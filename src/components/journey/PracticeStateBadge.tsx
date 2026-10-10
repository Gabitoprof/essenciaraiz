import { Check, CircleDashed } from 'lucide-react'
import { Badge } from '@/components/ui/Badge'
import type { PracticeState } from '@/types/progress'

const practiceStateLabel: Record<PracticeState, string> = {
  disponivel: 'Disponível',
  iniciado: 'Iniciado',
  concluido: 'Concluído',
}

export function PracticeStateBadge({ state }: { state: PracticeState }) {
  return (
    <Badge tone={state === 'concluido' ? 'oliva' : state === 'iniciado' ? 'terra' : 'neutro'}>
      {state === 'concluido' && <Check aria-hidden="true" className="size-3.5" />}
      {state === 'iniciado' && <CircleDashed aria-hidden="true" className="size-3.5" />}
      {practiceStateLabel[state]}
    </Badge>
  )
}
