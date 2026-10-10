import { useCallback, useState } from 'react'

type Errors<Field extends string> = Partial<Record<Field, string>>

/**
 * Guarda os erros de um formulário.
 * `validate` recebe todos os erros de uma vez, devolve se está tudo certo e move o foco
 * para o primeiro campo com problema (importante para teclado e leitores de tela).
 */
export function useFormErrors<Field extends string>() {
  const [errors, setErrors] = useState<Errors<Field>>({})

  const validate = useCallback((form: HTMLFormElement, next: Errors<Field>) => {
    const clean = Object.fromEntries(Object.entries(next).filter(([, message]) => Boolean(message))) as Errors<Field>
    setErrors(clean)
    const firstInvalid = Object.keys(clean)[0]
    if (firstInvalid) {
      const field = form.elements.namedItem(firstInvalid)
      if (field instanceof HTMLElement) window.requestAnimationFrame(() => field.focus())
      return false
    }
    return true
  }, [])

  /** Limpa o erro de um campo assim que a participante volta a digitar nele. */
  const clearError = useCallback((field: Field) => {
    setErrors((current) => (current[field] ? { ...current, [field]: undefined } : current))
  }, [])

  return { errors, validate, clearError }
}
