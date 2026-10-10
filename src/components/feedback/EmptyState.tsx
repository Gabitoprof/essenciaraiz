import type { ReactNode } from 'react'
import { Sprout } from 'lucide-react'
import { StateMessage } from './StateMessage'

interface EmptyStateProps {
  title: string
  description?: string
  action?: ReactNode
  icon?: ReactNode
  headingLevel?: 'h1' | 'h2'
}

/** Estado vazio: quando ainda não há conteúdo (ex.: diário sem registros). */
export function EmptyState({ title, description, action, icon, headingLevel }: EmptyStateProps) {
  return (
    <StateMessage
      className="border border-dashed border-areia-300 bg-bege-100/60"
      icon={icon ?? <Sprout aria-hidden="true" className="size-6" strokeWidth={1.5} />}
      title={title}
      description={description}
      action={action}
      headingLevel={headingLevel}
    />
  )
}
