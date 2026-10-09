export type ButtonVariant = 'primary' | 'secondary' | 'ghost'

const base =
  'inline-flex items-center justify-center gap-2 rounded-full px-6 py-3 text-sm font-semibold transition-colors disabled:cursor-not-allowed disabled:opacity-60'

const variants: Record<ButtonVariant, string> = {
  primary: 'bg-terra-600 text-white hover:bg-terra-700',
  secondary: 'border border-terra-600 text-terra-700 hover:bg-areia-100',
  ghost: 'text-terra-700 hover:bg-areia-100',
}

export function buttonClasses(variant: ButtonVariant = 'primary', extra = '') {
  return `${base} ${variants[variant]} ${extra}`.trim()
}
