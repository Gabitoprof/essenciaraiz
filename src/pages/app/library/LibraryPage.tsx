import { BookOpen, ChevronRight, Headphones, type LucideIcon } from 'lucide-react'
import { Link } from 'react-router-dom'
import { PageHeader } from '@/components/ui/PageHeader'
import { paths } from '@/config/routes'
import { audioPractices, libraryArticles } from '@/data/library'
import { useDocumentTitle } from '@/hooks/useDocumentTitle'

function countText(available: number, pending: number, pendingWord: string) {
  return `${available} ${available === 1 ? 'disponível' : 'disponíveis'} · ${pending} ${pendingWord}`
}

function HubCard({ to, icon: Icon, title, description, counts }: { to: string; icon: LucideIcon; title: string; description: string; counts: string }) {
  return (
    <Link
      to={to}
      className="group flex h-full items-center gap-5 rounded-cartao border border-areia-300/70 bg-white/80 p-6 shadow-suave transition-shadow duration-200 ease-suave hover:shadow-elevada sm:p-8"
    >
      <span className="grid size-14 shrink-0 place-items-center rounded-full bg-salvia-100 text-oliva-700">
        <Icon aria-hidden="true" className="size-6" strokeWidth={1.5} />
      </span>
      <span className="min-w-0 flex-1">
        <span className="block font-serif text-titulo-2">{title}</span>
        <span className="mt-1 block text-apoio text-tinta-suave">{description}</span>
        <span className="mt-2 block text-legenda tracking-normal font-medium text-terra-700">{counts}</span>
      </span>
      <ChevronRight aria-hidden="true" className="size-5 shrink-0 text-tinta-suave transition-transform duration-200 group-hover:translate-x-0.5" />
    </Link>
  )
}

export function LibraryPage() {
  useDocumentTitle('Biblioteca')
  const publishedArticles = libraryArticles.filter((item) => item.status === 'publicado').length
  const publishedAudios = audioPractices.filter((item) => item.status === 'publicado' && item.src).length

  return (
    <section>
      <PageHeader eyebrow="Para aprofundar" title="Biblioteca" description="Leituras e práticas em áudio para acompanhar a jornada, no seu ritmo." />
      <ul className="grid gap-4 sm:grid-cols-2 md:grid-cols-1 lg:grid-cols-2">
        <li>
          <HubCard
            to={paths.libraryContents}
            icon={BookOpen}
            title="Conteúdos"
            description="Leituras organizadas por tema, com o grau de evidência de cada um."
            counts={countText(publishedArticles, libraryArticles.length - publishedArticles, 'em preparação')}
          />
        </li>
        <li>
          <HubCard
            to={paths.libraryAudios}
            icon={Headphones}
            title="Áudios"
            description="Meditações, relaxamentos e práticas guiadas."
            counts={countText(publishedAudios, audioPractices.length - publishedAudios, 'em produção')}
          />
        </li>
      </ul>
    </section>
  )
}
