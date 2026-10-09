import { BookOpen, Headphones, Sparkles, type LucideIcon } from 'lucide-react'
import { Link } from 'react-router-dom'
import { Card } from '@/components/ui/Card'
import type { ContentKind, JourneyContent } from '@/types/journey'

const kindInfo: Record<ContentKind, { label: string; icon: LucideIcon }> = {
  audio: { label: 'Áudio', icon: Headphones },
  texto: { label: 'Leitura', icon: BookOpen },
  exercicio: { label: 'Prática', icon: Sparkles },
}

interface ContentCardProps {
  content: JourneyContent
  /** Quando informado, o cartão inteiro vira um link. */
  to?: string
}

/** Cartão de um conteúdo (áudio, leitura ou prática). Usado na biblioteca e na página de cada dia. */
export function ContentCard({ content, to }: ContentCardProps) {
  const { label, icon: Icon } = kindInfo[content.kind]

  return (
    <Card interactive={Boolean(to)} className="relative flex gap-4">
      <span className="grid size-11 shrink-0 place-items-center rounded-full bg-salvia-100 text-oliva-700">
        <Icon aria-hidden="true" className="size-5" strokeWidth={1.5} />
      </span>
      <div className="min-w-0">
        <p className="text-legenda font-medium uppercase text-terra-600">
          {label}
          {content.durationMinutes ? ` · ${content.durationMinutes} min` : ''}
        </p>
        <h3 className="mt-1 font-serif text-titulo-3 font-semibold">
          {to ? (
            <Link to={to} className="after:absolute after:inset-0 after:rounded-cartao focus-visible:outline-none focus-visible:after:outline-2 focus-visible:after:outline-oliva-600">
              {content.title}
            </Link>
          ) : (
            content.title
          )}
        </h3>
        {content.description && <p className="mt-1 text-apoio text-tinta-suave">{content.description}</p>}
      </div>
    </Card>
  )
}
