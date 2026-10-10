import { FileWarning } from 'lucide-react'
import { Container } from '@/components/ui/Container'
import { PageHeader } from '@/components/ui/PageHeader'
import { privacyDraft } from '@/data/privacy'
import { useDocumentTitle } from '@/hooks/useDocumentTitle'

/** Política de privacidade em rascunho, claramente sinalizada até a revisão final. */
export function PrivacyPage() {
  useDocumentTitle('Política de privacidade')
  return (
    <Container className="max-w-3xl py-12 sm:py-16">
      <PageHeader title="Política de privacidade" description="Como seus dados são coletados, usados e protegidos." />
      <p role="note" className="mb-10 flex gap-3 rounded-campo bg-bege-100 px-4 py-3 text-apoio text-tinta">
        <FileWarning aria-hidden="true" className="mt-0.5 size-5 shrink-0" strokeWidth={1.5} />
        {privacyDraft.notice}
      </p>
      <div className="flex flex-col gap-8">
        {privacyDraft.sections.map((section) => (
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
      <p className="mt-10 text-apoio text-tinta-suave">Última atualização: {privacyDraft.updatedAt}</p>
    </Container>
  )
}
