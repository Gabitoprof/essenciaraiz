import { ChevronRight, type LucideIcon } from 'lucide-react'
import { Link } from 'react-router-dom'
import { Badge } from '@/components/ui/Badge'

interface ShortcutCardProps {
  label: string
  description: string
  to: string
  icon: LucideIcon
  /** Mostra a etiqueta "Em preparação" quando a área ainda não foi desenvolvida. */
  inPreparation?: boolean
}

/** Atalho do painel para outra área do app. O cartão inteiro é o link. */
export function ShortcutCard({ label, description, to, icon: Icon, inPreparation }: ShortcutCardProps) {
  return (
    <Link
      to={to}
      className="group flex h-full items-center gap-4 rounded-cartao border border-areia-300/70 bg-white/80 p-4 shadow-suave transition-shadow duration-200 ease-suave hover:shadow-elevada sm:p-5"
    >
      <span className="grid size-11 shrink-0 place-items-center rounded-full bg-bege-100 text-terra-700">
        <Icon aria-hidden="true" className="size-5" strokeWidth={1.5} />
      </span>
      <span className="min-w-0 flex-1">
        <span className="flex flex-wrap items-center gap-x-2 gap-y-1">
          <span className="font-medium text-tinta">{label}</span>
          {inPreparation && <Badge tone="terra">Em preparação</Badge>}
        </span>
        <span className="mt-0.5 block text-apoio text-tinta-suave">{description}</span>
      </span>
      <ChevronRight aria-hidden="true" className="size-5 shrink-0 text-tinta-suave transition-transform duration-200 group-hover:translate-x-0.5" />
    </Link>
  )
}
