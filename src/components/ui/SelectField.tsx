import { useId, type SelectHTMLAttributes } from 'react'
import { FieldWrapper } from './FieldWrapper'
import { describedBy, fieldControlClasses } from './fieldStyles'

interface SelectFieldProps extends SelectHTMLAttributes<HTMLSelectElement> {
  label: string
  hint?: string
  error?: string
}

/** Lista de opções nativa, com rótulo, dica e erro acessíveis. */
export function SelectField({ label, hint, error, className, children, ...props }: SelectFieldProps) {
  const id = useId()
  return (
    <FieldWrapper id={id} label={label} hint={hint} error={error} className={className}>
      <select
        id={id}
        aria-invalid={error ? true : undefined}
        aria-describedby={describedBy(id, hint, error)}
        className={`${fieldControlClasses(Boolean(error))} appearance-auto`}
        {...props}
      >
        {children}
      </select>
    </FieldWrapper>
  )
}
