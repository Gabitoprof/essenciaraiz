import { useId, type TextareaHTMLAttributes } from 'react'
import { FieldWrapper } from './FieldWrapper'
import { describedBy, fieldControlClasses } from './fieldStyles'

interface TextAreaFieldProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  label: string
  hint?: string
  error?: string
}

/** Campo de texto longo, pensado para o diário de reflexão. */
export function TextAreaField({ label, hint, error, className, rows = 5, ...props }: TextAreaFieldProps) {
  const id = useId()
  return (
    <FieldWrapper id={id} label={label} hint={hint} error={error} className={className}>
      <textarea
        id={id}
        rows={rows}
        aria-invalid={error ? true : undefined}
        aria-describedby={describedBy(id, hint, error)}
        className={`${fieldControlClasses(Boolean(error))} resize-y leading-relaxed`}
        {...props}
      />
    </FieldWrapper>
  )
}
