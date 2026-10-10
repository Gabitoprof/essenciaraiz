import { Download, Lock, PenLine } from 'lucide-react'
import { useLocation } from 'react-router-dom'
import { EmptyState } from '@/components/feedback/EmptyState'
import { ErrorState } from '@/components/feedback/ErrorState'
import { FormAlert } from '@/components/feedback/FormAlert'
import { LoadingState } from '@/components/feedback/LoadingState'
import { JournalEntryCard } from '@/components/journal/JournalEntryCard'
import { Button } from '@/components/ui/Button'
import { ButtonLink } from '@/components/ui/ButtonLink'
import { PageHeader } from '@/components/ui/PageHeader'
import { paths } from '@/config/routes'
import { journalTexts } from '@/data/journalPrompts'
import { useAuth } from '@/hooks/useAuth'
import { useDocumentTitle } from '@/hooks/useDocumentTitle'
import { useJournal } from '@/hooks/useJournal'
import { fileDate } from '@/utils/dates'
import { downloadText, journalToText } from '@/utils/journalExport'

export function JournalPage() {
  useDocumentTitle('Diário')
  const { session } = useAuth()
  const journal = useJournal()
  const location = useLocation()
  const notice = (location.state as { notice?: string } | null)?.notice

  function exportEntries() {
    const name = session?.user.preferences.preferredName || session?.user.displayName
    downloadText(`diario-essencia-raiz-${fileDate()}.txt`, journalToText(journal.entries, name))
  }

  return (
    <section>
      <PageHeader
        eyebrow="Só seu"
        title="Diário"
        description="Um espaço para escrever o que sente, percebe e descobre ao longo da jornada."
        actions={
          journal.status === 'ready' && (
            <div className="flex flex-col gap-3 sm:flex-row">
              {journal.entries.length > 0 && (
                <Button variant="secondary" onClick={exportEntries}>
                  <Download aria-hidden="true" className="size-4" /> Exportar
                </Button>
              )}
              <ButtonLink to={paths.journalNew}>
                <PenLine aria-hidden="true" className="size-4" /> Novo registro
              </ButtonLink>
            </div>
          )
        }
      />

      {notice && (
        <div className="mb-6">
          <FormAlert tone="sucesso">{notice}</FormAlert>
        </div>
      )}

      {journal.status === 'loading' && <LoadingState title="Abrindo o seu diário…" />}
      {journal.status === 'error' && <ErrorState description={journal.error ?? undefined} onRetry={journal.reload} />}

      {journal.status === 'ready' &&
        (journal.entries.length === 0 ? (
          <EmptyState
            title="Seu diário ainda está em branco"
            description={journalTexts.empty}
            action={<ButtonLink to={paths.journalNew}>Escrever o primeiro registro</ButtonLink>}
          />
        ) : (
          <>
            <p className="mb-4 text-apoio text-tinta-suave" aria-live="polite">
              {journal.entries.length === 1 ? '1 registro' : `${journal.entries.length} registros`}, do mais recente ao mais antigo.
            </p>
            <ul className="flex flex-col gap-4">
              {journal.entries.map((entry) => (
                <li key={entry.id}>
                  <JournalEntryCard entry={entry} />
                </li>
              ))}
            </ul>
          </>
        ))}

      <p className="mt-10 flex gap-2.5 text-apoio text-tinta-suave">
        <Lock aria-hidden="true" className="mt-0.5 size-4 shrink-0" />
        {journalTexts.privacyNote[journal.storage]}
      </p>
    </section>
  )
}
