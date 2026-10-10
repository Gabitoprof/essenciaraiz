import { journalPrompts } from '@/data/journalPrompts'

interface PromptPickerProps {
  value?: string
  onChange(prompt: string | undefined): void
}

/** Perguntas opcionais. Tocar de novo na escolhida remove a pergunta. */
export function PromptPicker({ value, onChange }: PromptPickerProps) {
  const options = value && !journalPrompts.includes(value) ? [value, ...journalPrompts] : journalPrompts

  return (
    <fieldset>
      <legend className="text-apoio font-medium text-tinta">Quer uma pergunta para começar?</legend>
      <p className="mt-0.5 text-legenda tracking-normal text-tinta-suave">Opcional. Você pode escrever livremente.</p>
      <ul className="mt-3 flex flex-wrap gap-2">
        {options.map((prompt) => {
          const selected = prompt === value
          return (
            <li key={prompt}>
              <button
                type="button"
                aria-pressed={selected}
                onClick={() => onChange(selected ? undefined : prompt)}
                className={`rounded-full border px-3.5 py-2 text-left text-apoio transition-colors duration-200 ${
                  selected
                    ? 'border-oliva-600 bg-salvia-100 text-oliva-700'
                    : 'border-areia-300 bg-white/70 text-tinta hover:border-salvia-400'
                }`}
              >
                {prompt}
              </button>
            </li>
          )
        })}
      </ul>
    </fieldset>
  )
}
