import { CircleCheck } from 'lucide-react'
import { Button } from '@/components/ui/Button'
import { Card } from '@/components/ui/Card'
import type { PracticeMomentInfo } from '@/data/practiceMoments'
import type { PracticeRecord, PracticeState } from '@/types/progress'
import { PracticeStateBadge } from './PracticeStateBadge'

interface PracticeMomentSectionProps {
  moment: PracticeMomentInfo
  state: PracticeState
  record?: PracticeRecord
  /** Falso enquanto o progresso carrega: os botões ficam desativados. */
  canAct: boolean
  onStart(): void
  onComplete(): void
}

const dateFormatter = new Intl.DateTimeFormat('pt-BR', { day: 'numeric', month: 'long', hour: '2-digit', minute: '2-digit' })

function formatDate(iso?: string) {
  return iso ? dateFormatter.format(new Date(iso)) : ''
}

/**
 * Um momento do dia na página do dia. O estado só muda pelos botões:
 * abrir a página não marca nada como iniciado ou concluído.
 */
export function PracticeMomentSection({ moment, state, record, canAct, onStart, onComplete }: PracticeMomentSectionProps) {
  const Icon = moment.icon
  const headingId = `${moment.id}-titulo`

  return (
    <section id={moment.id} aria-labelledby={headingId} className="scroll-mt-24 outline-none md:scroll-mt-8">
      <Card className="flex flex-col gap-5 sm:p-8">
        <div className="flex items-start justify-between gap-4">
          <div className="flex items-center gap-4">
            <span className="grid size-12 shrink-0 place-items-center rounded-full bg-salvia-100 text-oliva-700">
              <Icon aria-hidden="true" className="size-5" strokeWidth={1.5} />
            </span>
            <div>
              <p className="text-legenda font-medium uppercase text-terra-600">
                {moment.period} · {moment.duration}
              </p>
              <h2 id={headingId} className="text-titulo-2">
                {moment.name}
              </h2>
            </div>
          </div>
          <PracticeStateBadge state={state} />
        </div>

        <p className="text-tinta-suave">{moment.description}</p>

        <p className="rounded-campo border border-dashed border-areia-300 bg-bege-100/60 px-4 py-3 text-apoio text-tinta-suave">
          O conteúdo desta prática (áudio, orientações e perguntas) ainda está em preparação.
        </p>

        <div aria-live="polite" className="flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:items-center">
          {state === 'concluido' ? (
            <p className="flex items-center gap-2 text-apoio text-oliva-700">
              <CircleCheck aria-hidden="true" className="size-5" strokeWidth={1.5} />
              Concluída em {formatDate(record?.completedAt)}.
            </p>
          ) : (
            <>
              {state === 'disponivel' && (
                <Button variant="secondary" size="sm" disabled={!canAct} onClick={onStart}>
                  Comecei esta prática
                </Button>
              )}
              <Button size="sm" disabled={!canAct} onClick={onComplete}>
                Marcar como concluída
              </Button>
              {state === 'iniciado' && (
                <p className="text-apoio text-tinta-suave">Iniciada em {formatDate(record?.startedAt)}.</p>
              )}
            </>
          )}
        </div>
      </Card>
    </section>
  )
}
