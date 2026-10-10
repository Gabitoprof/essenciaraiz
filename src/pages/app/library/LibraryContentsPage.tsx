import { useState } from 'react'
import { ArrowLeft, Info } from 'lucide-react'
import { Link } from 'react-router-dom'
import { ArticleCard } from '@/components/library/ArticleCard'
import { EvidenceBadge } from '@/components/library/EvidenceBadge'
import { PageHeader } from '@/components/ui/PageHeader'
import { paths } from '@/config/routes'
import { evidenceInfo, libraryArticles, libraryCategories } from '@/data/library'
import { useDocumentTitle } from '@/hooks/useDocumentTitle'
import type { EvidenceLevel } from '@/types/library'

const ALL = 'todas'

export function LibraryContentsPage() {
  useDocumentTitle('Biblioteca de conteúdos')
  const [filter, setFilter] = useState<string>(ALL)
  const categories = filter === ALL ? libraryCategories : libraryCategories.filter((category) => category.id === filter)
  const levels = Object.keys(evidenceInfo) as EvidenceLevel[]

  return (
    <section>
      <Link to={paths.library} className="mb-8 inline-flex items-center gap-2 text-apoio text-oliva-700 underline-offset-4 hover:underline">
        <ArrowLeft aria-hidden="true" className="size-4" /> Voltar para a biblioteca
      </Link>
      <PageHeader
        eyebrow="Biblioteca"
        title="Conteúdos"
        description="Cada tema mostra de onde vêm as suas ideias: ciência, filosofia ou tradição. Eles não têm o mesmo grau de evidência e não são apresentados como se tivessem."
      />

      <details className="mb-8 rounded-cartao bg-bege-100 px-5 py-4">
        <summary className="flex cursor-pointer items-center gap-2 text-apoio font-medium text-tinta">
          <Info aria-hidden="true" className="size-4 text-oliva-700" /> Como ler as etiquetas
        </summary>
        <dl className="mt-4 flex flex-col gap-3">
          {levels.map((level) => (
            <div key={level} className="flex flex-col items-start gap-1">
              <dt>
                <EvidenceBadge level={level} />
              </dt>
              <dd className="text-apoio text-tinta-suave">{evidenceInfo[level].description}</dd>
            </div>
          ))}
        </dl>
      </details>

      <div role="group" aria-label="Filtrar por tema" className="mb-10 flex gap-2 overflow-x-auto pb-2 [scrollbar-width:thin]">
        {[{ id: ALL, name: 'Todos os temas' }, ...libraryCategories].map((category) => (
          <button
            key={category.id}
            type="button"
            aria-pressed={filter === category.id}
            onClick={() => setFilter(category.id)}
            className={`shrink-0 rounded-full border px-3.5 py-2 text-apoio whitespace-nowrap transition-colors duration-200 ${
              filter === category.id ? 'border-oliva-600 bg-salvia-100 text-oliva-700' : 'border-areia-300 bg-white/70 text-tinta hover:border-salvia-400'
            }`}
          >
            {category.name}
          </button>
        ))}
      </div>

      <div className="flex flex-col gap-12">
        {categories.map((category) => {
          const articles = libraryArticles.filter((article) => article.categoryId === category.id)
          return (
            <section key={category.id} aria-labelledby={`tema-${category.id}`}>
              <div className="flex flex-wrap items-center gap-3">
                <h2 id={`tema-${category.id}`} className="text-titulo-2">
                  {category.name}
                </h2>
                <EvidenceBadge level={category.evidence} />
              </div>
              <p className="mt-1 max-w-leitura text-tinta-suave">{category.description}</p>
              <p className="mt-2 max-w-leitura text-apoio text-terra-700">
                <span className="font-medium">Limites:</span> {category.limits}
              </p>
              <ul className="mt-5 grid gap-4 sm:grid-cols-2">
                {articles.map((article) => (
                  <li key={article.id}>
                    <ArticleCard article={article} />
                  </li>
                ))}
              </ul>
            </section>
          )
        })}
      </div>
    </section>
  )
}
