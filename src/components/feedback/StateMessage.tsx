import type { ReactNode } from 'react'

interface StateMessageProps {
  icon: ReactNode
  title: string
  description?: string
  action?: ReactNode
  /** role="alert" para erros, role="status" para carregamento; vazio fica sem role. */
  role?: 'alert' | 'status'
  className?: string
}

/** Base visual compartilhada pelos estados de carregamento, erro e vazio. */
export function StateMessage({ icon, title, description, action, role, className = '' }: StateMessageProps) {
  return (
    <div
      role={role}
      aria-live={role === 'status' ? 'polite' : undefined}
      className={`flex flex-col items-center rounded-cartao px-6 py-12 text-center ${className}`}
    >
      <div className="mb-4 grid size-14 place-items-center rounded-full bg-salvia-100 text-oliva-700">{icon}</div>
      <h2 className="font-serif text-titulo-3 font-semibold">{title}</h2>
      {description && <p className="mt-2 max-w-sm text-apoio text-tinta-suave">{description}</p>}
      {action && <div className="mt-6">{action}</div>}
    </div>
  )
}
