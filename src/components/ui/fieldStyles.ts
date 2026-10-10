export const fieldIds = (id: string) => ({ hint: `${id}-dica`, error: `${id}-erro` })

export function describedBy(id: string, hint?: string, error?: string) {
  const ids = fieldIds(id)
  return [hint ? ids.hint : '', error ? ids.error : ''].filter(Boolean).join(' ') || undefined
}

export const fieldControlClasses = (hasError: boolean) =>
  [
    'w-full rounded-campo border bg-white/70 px-4 py-3 text-corpo text-tinta placeholder:text-tinta-suave/70',
    'transition-colors duration-200 ease-suave',
    'focus:border-oliva-600 focus:bg-white focus:outline-none focus-visible:outline-2 focus-visible:outline-solid focus-visible:outline-oliva-600 focus-visible:outline-offset-1',
    hasError ? 'border-erro-600' : 'border-areia-300 hover:border-salvia-400',
  ].join(' ')
