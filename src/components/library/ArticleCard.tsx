import { Clock } from 'lucide-react'
import { Link } from 'react-router-dom'
import { Badge } from '@/components/ui/Badge'
import { paths } from '@/config/routes'
import type { LibraryArticle } from '@/types/library'

/** Conteúdo publicado vira link; conteúdo pendente aparece apagado, sem link, com "Em preparação". */
export function ArticleCard({ article }: { article: LibraryArticle }) {
  if (article.status !== 'publicado') {
    return (
      <div className="flex h-full flex-col gap-2 rounded-cartao border border-dashed border-areia-300 bg-bege-100/50 p-5">
        <Badge tone="terra">Em preparação</Badge>
        <h3 className="font-serif text-titulo-3 font-semibold text-tinta-suave">{article.title}</h3>
        <p className="text-apoio text-tinta-suave">Este conteúdo ainda não foi publicado.</p>
      </div>
    )
  }

  return (
    <article className="relative flex h-full flex-col gap-2 rounded-cartao border border-areia-300/70 bg-white/80 p-5 shadow-suave transition-shadow duration-200 ease-suave hover:shadow-elevada">
      <div className="flex flex-wrap items-center gap-2">
        <Badge>Disponível</Badge>
        {article.readingMinutes && (
          <span className="inline-flex items-center gap-1 text-legenda tracking-normal text-tinta-suave">
            <Clock aria-hidden="true" className="size-3.5" /> {article.readingMinutes} min de leitura
          </span>
        )}
      </div>
      <h3 className="font-serif text-titulo-3 font-semibold">
        <Link
          to={paths.libraryContent(article.id)}
          className="after:absolute after:inset-0 after:rounded-cartao focus-visible:outline-none focus-visible:after:outline-2 focus-visible:after:outline-oliva-600"
        >
          {article.title}
        </Link>
      </h3>
      <p className="text-apoio text-tinta-suave">{article.summary}</p>
    </article>
  )
}
