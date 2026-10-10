import { CalendarDays } from 'lucide-react'
import { Link } from 'react-router-dom'
import { Badge } from '@/components/ui/Badge'
import { paths } from '@/config/routes'
import type { JournalEntry } from '@/types/journal'
import { formatDate } from '@/utils/dates'

function excerpt(text: string, length = 160) {
  const flat = text.replace(/\s+/g, ' ').trim()
  return flat.length > length ? `${flat.slice(0, length).trimEnd()}…` : flat
}

/** Registro na lista do diário. O cartão inteiro abre o registro. */
export function JournalEntryCard({ entry }: { entry: JournalEntry }) {
  const title = entry.title || excerpt(entry.body, 60)
  const edited = entry.updatedAt !== entry.createdAt

  return (
    <article className="relative rounded-cartao border border-areia-300/70 bg-white/80 p-5 shadow-suave transition-shadow duration-200 ease-suave hover:shadow-elevada sm:p-6">
      <div className="flex flex-wrap items-center gap-2 text-legenda tracking-normal text-tinta-suave">
        <CalendarDays aria-hidden="true" className="size-4" strokeWidth={1.5} />
        <span>Criado em {formatDate(entry.createdAt)}</span>
        {edited && <span>· Atualizado em {formatDate(entry.updatedAt)}</span>}
        {entry.day && <Badge>Dia {entry.day}</Badge>}
      </div>
      <h2 className="mt-2 font-serif text-titulo-3 font-semibold">
        <Link
          to={paths.journalEntry(entry.id)}
          className="after:absolute after:inset-0 after:rounded-cartao focus-visible:outline-none focus-visible:after:outline-2 focus-visible:after:outline-oliva-600"
        >
          {title}
        </Link>
      </h2>
      {entry.title && <p className="mt-1 text-apoio text-tinta-suave">{excerpt(entry.body)}</p>}
    </article>
  )
}
