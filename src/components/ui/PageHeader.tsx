import type { ReactNode } from 'react'
import { Eyebrow } from './Eyebrow'

interface PageHeaderProps {
  title: string
  eyebrow?: string
  description?: string
  actions?: ReactNode
}

/** Título padrão das páginas internas. */
export function PageHeader({ title, eyebrow, description, actions }: PageHeaderProps) {
  return (
    <header className="mb-10 flex flex-col gap-5 sm:flex-row sm:items-end sm:justify-between">
      <div>
        {eyebrow && <Eyebrow className="mb-2">{eyebrow}</Eyebrow>}
        <h1 className="text-titulo-1 sm:text-[2.75rem]">{title}</h1>
        {description && <p className="mt-3 max-w-leitura text-tinta-suave">{description}</p>}
      </div>
      {actions && <div className="shrink-0">{actions}</div>}
    </header>
  )
}
