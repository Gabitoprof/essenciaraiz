import { useId, type InputHTMLAttributes } from 'react'

interface TextFieldProps extends InputHTMLAttributes<HTMLInputElement> {
  label: string
}

/** Campo de texto com rótulo sempre associado ao input (acessibilidade). */
export function TextField({ label, className = '', ...props }: TextFieldProps) {
  const id = useId()
  return (
    <div className={`flex flex-col gap-1.5 ${className}`}>
      <label htmlFor={id} className="text-sm font-medium">
        {label}
      </label>
      <input
        id={id}
        className="rounded-xl border border-areia-200 bg-white px-4 py-3 text-base focus:border-terra-600"
        {...props}
      />
    </div>
  )
}
