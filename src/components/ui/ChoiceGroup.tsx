import { useId } from 'react'

export interface Choice<Value extends string> {
  value: Value
  label: string
  description?: string
}

interface ChoiceGroupProps<Value extends string> {
  legend: string
  hint?: string
  name: string
  choices: Choice<Value>[]
  value: Value | undefined
  onChange: (value: Value) => void
}

/** Grupo de opções únicas (radio) com aparência de cartões. Navegável pelas setas do teclado. */
export function ChoiceGroup<Value extends string>({ legend, hint, name, choices, value, onChange }: ChoiceGroupProps<Value>) {
  const hintId = useId()
  return (
    <fieldset aria-describedby={hint ? hintId : undefined}>
      <legend className="font-serif text-titulo-2">{legend}</legend>
      {hint && (
        <p id={hintId} className="mt-2 text-apoio text-tinta-suave">
          {hint}
        </p>
      )}
      <div className="mt-6 grid gap-3">
        {choices.map((choice) => {
          const checked = value === choice.value
          return (
            <label
              key={choice.value}
              className={[
                'flex cursor-pointer items-start gap-3 rounded-cartao border px-4 py-3.5 transition-colors duration-200',
                'has-[:focus-visible]:outline-2 has-[:focus-visible]:outline-offset-2 has-[:focus-visible]:outline-oliva-600',
                checked ? 'border-oliva-600 bg-salvia-100' : 'border-areia-300 bg-white/70 hover:border-salvia-400',
              ].join(' ')}
            >
              <input
                type="radio"
                name={name}
                value={choice.value}
                checked={checked}
                onChange={() => onChange(choice.value)}
                className="mt-1 size-4 shrink-0 accent-oliva-600 focus-visible:outline-none"
              />
              <span>
                <span className="block font-medium">{choice.label}</span>
                {choice.description && (
                  <span className="mt-0.5 block text-apoio text-tinta-suave">{choice.description}</span>
                )}
              </span>
            </label>
          )
        })}
      </div>
    </fieldset>
  )
}
