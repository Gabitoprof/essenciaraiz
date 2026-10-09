import { useId, useState, type InputHTMLAttributes } from 'react'
import { Eye, EyeOff } from 'lucide-react'
import { FieldWrapper } from './FieldWrapper'
import { describedBy, fieldControlClasses } from './fieldStyles'

interface PasswordFieldProps extends Omit<InputHTMLAttributes<HTMLInputElement>, 'type'> {
  label: string
  hint?: string
  error?: string
}

/** Campo de senha com botão para mostrar ou esconder o que foi digitado. */
export function PasswordField({ label, hint, error, className, ...props }: PasswordFieldProps) {
  const id = useId()
  const [isVisible, setIsVisible] = useState(false)

  return (
    <FieldWrapper id={id} label={label} hint={hint} error={error} className={className}>
      <div className="relative">
        <input
          id={id}
          type={isVisible ? 'text' : 'password'}
          aria-invalid={error ? true : undefined}
          aria-describedby={describedBy(id, hint, error)}
          className={`${fieldControlClasses(Boolean(error))} pr-14`}
          {...props}
        />
        <button
          type="button"
          onClick={() => setIsVisible((visible) => !visible)}
          aria-controls={id}
          aria-pressed={isVisible}
          className="absolute inset-y-1 right-1 grid w-11 place-items-center rounded-campo text-tinta-suave transition-colors hover:bg-salvia-100 hover:text-oliva-700"
        >
          {isVisible ? (
            <EyeOff aria-hidden="true" className="size-5" strokeWidth={1.5} />
          ) : (
            <Eye aria-hidden="true" className="size-5" strokeWidth={1.5} />
          )}
          <span className="sr-only">{isVisible ? 'Esconder senha' : 'Mostrar senha'}</span>
        </button>
      </div>
    </FieldWrapper>
  )
}
