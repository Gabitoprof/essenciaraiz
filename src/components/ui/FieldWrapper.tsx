import type { ReactNode } from 'react'
import { fieldIds } from './fieldStyles'

interface FieldWrapperProps {
  id: string
  label: string
  hint?: string
  error?: string
  className?: string
  children: ReactNode
}

/** Rótulo, dica e mensagem de erro padronizados para qualquer campo de formulário. */
export function FieldWrapper({ id, label, hint, error, className = '', children }: FieldWrapperProps) {
  const ids = fieldIds(id)
  return (
    <div className={`flex flex-col gap-1.5 ${className}`}>
      <label htmlFor={id} className="text-apoio font-medium text-tinta">
        {label}
      </label>
      {hint && (
        <p id={ids.hint} className="text-legenda tracking-normal text-tinta-suave">
          {hint}
        </p>
      )}
      {children}
      {error && (
        <p id={ids.error} role="alert" className="text-legenda tracking-normal text-erro-600">
          {error}
        </p>
      )}
    </div>
  )
}
