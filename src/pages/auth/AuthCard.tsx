import type { ReactNode } from 'react'
import { Card } from '@/components/ui/Card'

interface AuthCardProps {
  title: string
  description?: string
  children: ReactNode
  footer?: ReactNode
}

/** Moldura comum das telas de cadastro, login e senha. */
export function AuthCard({ title, description, children, footer }: AuthCardProps) {
  return (
    <Card className="sm:p-8">
      <h1 className="text-titulo-1">{title}</h1>
      {description && <p className="mt-2 text-apoio text-tinta-suave">{description}</p>}
      <div className="mt-8">{children}</div>
      {footer && <div className="mt-8 flex flex-col gap-3 border-t border-areia-300/60 pt-6 text-apoio">{footer}</div>}
    </Card>
  )
}

export const authLinkClasses = 'font-medium text-oliva-700 underline underline-offset-4 decoration-salvia-400 hover:decoration-oliva-700'
