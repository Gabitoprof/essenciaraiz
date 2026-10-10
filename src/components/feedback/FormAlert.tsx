import type { ReactNode } from 'react'
import { CircleAlert, CircleCheck, Info, type LucideIcon } from 'lucide-react'

type FormAlertTone = 'erro' | 'info' | 'sucesso'

const tones: Record<FormAlertTone, { classes: string; icon: LucideIcon }> = {
  erro: { classes: 'bg-erro-100 text-erro-600', icon: CircleAlert },
  info: { classes: 'bg-bege-100 text-tinta', icon: Info },
  sucesso: { classes: 'bg-salvia-100 text-oliva-700', icon: CircleCheck },
}

/** Mensagem no topo de um formulário. Erros são anunciados imediatamente por leitores de tela. */
export function FormAlert({ tone = 'erro', children }: { tone?: FormAlertTone; children: ReactNode }) {
  const { classes, icon: Icon } = tones[tone]
  return (
    <div
      role={tone === 'erro' ? 'alert' : 'status'}
      className={`flex gap-3 rounded-campo px-4 py-3 text-apoio ${classes}`}
    >
      <Icon aria-hidden="true" className="mt-0.5 size-5 shrink-0" strokeWidth={1.5} />
      <div>{children}</div>
    </div>
  )
}
