import { ArrowLeft, Clock } from 'lucide-react'
import { Link, useParams } from 'react-router-dom'
import { EmptyState } from '@/components/feedback/EmptyState'
import { EvidenceBadge } from '@/components/library/EvidenceBadge'
import { ButtonLink } from '@/components/ui/ButtonLink'
import { Eyebrow } from '@/components/ui/Eyebrow'
import { paths } from '@/config/routes'
import { getLibraryArticle, getLibraryCategory } from '@/data/library'
import { useDocumentTitle } from '@/hooks/useDocumentTitle'

export function LibraryArticlePage() {
  const { id = '' } = useParams()
  const article = getLibraryArticle(id)
  const published = article?.status === 'publicado'
  const category = article && getLibraryCategory(article.categoryId)
  useDocumentTitle(published ? article.title : 'Conteúdo não disponível')

  return (
    <section>
      <Link to={paths.libraryContents} className="mb-8 inline-flex items-center gap-2 text-apoio text-oliva-700 underline-offset-4 hover:underline">
        <ArrowLeft aria-hidden="true" className="size-4" /> Voltar para os conteúdos
      </Link>

      {!published || !category ? (
        <EmptyState
          title={article ? 'Este conteúdo ainda está em preparação' : 'Conteúdo não encontrado'}
          description={article ? 'Ele aparece aqui assim que for publicado.' : 'O endereço pode estar incompleto.'}
          action={<ButtonLink to={paths.libraryContents}>Ver os conteúdos</ButtonLink>}
        />
      ) : (
        <article className="max-w-leitura">
          <div className="mb-3 flex flex-wrap items-center gap-2">
            <Eyebrow>{category.name}</Eyebrow>
            <EvidenceBadge level={category.evidence} />
          </div>
          <h1 className="text-titulo-1 sm:text-[2.75rem]">{article.title}</h1>
          {article.readingMinutes && (
            <p className="mt-3 inline-flex items-center gap-1.5 text-apoio text-tinta-suave">
              <Clock aria-hidden="true" className="size-4" /> {article.readingMinutes} min de leitura
            </p>
          )}
          <div className="mt-8 flex flex-col gap-8">
            {article.sections?.map((section, index) => (
              <section key={section.heading ?? index}>
                {section.heading && <h2 className="text-titulo-2">{section.heading}</h2>}
                <div className="mt-3 flex flex-col gap-4 text-tinta">
                  {section.paragraphs.map((paragraph) => (
                    <p key={paragraph}>{paragraph}</p>
                  ))}
                </div>
              </section>
            ))}
          </div>
          <p className="mt-10 rounded-cartao bg-bege-100 p-5 text-apoio text-tinta-suave">
            <span className="font-medium text-tinta">Limites do tema:</span> {category.limits} Os conteúdos da biblioteca
            são informativos e não substituem orientação de profissionais de saúde.
          </p>
        </article>
      )}
    </section>
  )
}
