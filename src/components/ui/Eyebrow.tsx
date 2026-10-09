import type { ReactNode } from 'react'

/** Texto pequeno em caixa alta que antecede um título. */
export function Eyebrow({ children, className = '' }: { children: ReactNode; className?: string }) {
  return <p className={`text-legenda font-medium uppercase text-terra-600 ${className}`}>{children}</p>
}
