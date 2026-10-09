export type ButtonVariant = 'primary' | 'secondary' | 'ghost'
export type ButtonSize = 'md' | 'sm'

interface ButtonStyleOptions {
  variant?: ButtonVariant
  size?: ButtonSize
  fullWidth?: boolean
  className?: string
}

const base =
  'inline-flex items-center justify-center gap-2 rounded-botao font-medium tracking-[0.01em] transition-colors duration-200 ease-suave disabled:pointer-events-none disabled:opacity-55'

const variants: Record<ButtonVariant, string> = {
  primary: 'bg-oliva-600 text-branco-quente shadow-suave hover:bg-oliva-700',
  secondary: 'border border-oliva-600/70 bg-transparent text-oliva-700 hover:border-oliva-700 hover:bg-salvia-100',
  ghost: 'text-oliva-700 hover:bg-salvia-100',
}

const sizes: Record<ButtonSize, string> = {
  md: 'min-h-12 px-6 text-apoio',
  sm: 'min-h-10 px-4 text-legenda tracking-normal',
}

/** Classes compartilhadas por <Button> e <ButtonLink>, para botões e links terem a mesma aparência. */
export function buttonClasses({ variant = 'primary', size = 'md', fullWidth, className = '' }: ButtonStyleOptions = {}) {
  return [base, variants[variant], sizes[size], fullWidth ? 'w-full' : '', className].filter(Boolean).join(' ')
}
