import { useId, type InputHTMLAttributes } from 'react'
import { FieldWrapper } from './FieldWrapper'
import { describedBy, fieldControlClasses } from './fieldStyles'

interface TextFieldProps extends InputHTMLAttributes<HTMLInputElement> {
  label: string
  hint?: string
  error?: string
}

/** Campo de texto com rótulo, dica e erro sempre associados ao input (acessibilidade). */
export function TextField({ label, hint, error, className, ...props }: TextFieldProps) {
  const id = useId()
  return (
    <FieldWrapper id={id} label={label} hint={hint} error={error} className={className}>
      <input
        id={id}
        aria-invalid={error ? true : undefined}
        aria-describedby={describedBy(id, hint, error)}
        className={fieldControlClasses(Boolean(error))}
        {...props}
      />
    </FieldWrapper>
  )
}
