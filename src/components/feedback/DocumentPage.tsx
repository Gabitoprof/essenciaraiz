import { FileWarning } from 'lucide-react'
import { Container } from '@/components/ui/Container'
import { PageHeader } from '@/components/ui/PageHeader'
import { useDocumentTitle } from '@/hooks/useDocumentTitle'

export interface DocumentSection {
  heading: string
  paragraphs: string[]
}

export interface InstitutionalDocument {
  title: string
  description: string
  /** Aviso de rascunho: aparece em destaque enquanto o texto não for revisado. */
  notice?: string
  sections: DocumentSection[]
  updatedAt?: string
}

/** Página de texto institucional (privacidade, termos, segurança, contato), com o aviso de revisão quando houver. */
export function DocumentPage({ document }: { document: InstitutionalDocument }) {
  useDocumentTitle(document.title)
  return (
    <Container className="max-w-3xl py-12 sm:py-16">
      <PageHeader title={document.title} description={document.description} />
      {document.notice && (
        <p role="note" className="mb-10 flex gap-3 rounded-campo bg-bege-100 px-4 py-3 text-apoio text-tinta">
          <FileWarning aria-hidden="true" className="mt-0.5 size-5 shrink-0" strokeWidth={1.5} />
          {document.notice}
        </p>
      )}
      <div className="flex flex-col gap-8">
        {document.sections.map((section) => (
          <section key={section.heading}>
            <h2 className="text-titulo-2">{section.heading}</h2>
            {section.paragraphs.map((paragraph) => (
              <p key={paragraph} className="mt-3 text-tinta-suave">
                {paragraph}
              </p>
            ))}
          </section>
        ))}
      </div>
      {document.updatedAt && <p className="mt-10 text-apoio text-tinta-suave">Última atualização: {document.updatedAt}</p>}
    </Container>
  )
}
