import { useState, type FormEvent } from 'react'
import { ArrowLeft, Trash2 } from 'lucide-react'
import { Link, useNavigate, useParams, useSearchParams } from 'react-router-dom'
import { ConfirmDialog } from '@/components/feedback/ConfirmDialog'
import { EmptyState } from '@/components/feedback/EmptyState'
import { ErrorState } from '@/components/feedback/ErrorState'
import { FormAlert } from '@/components/feedback/FormAlert'
import { LoadingState } from '@/components/feedback/LoadingState'
import { PromptPicker } from '@/components/journal/PromptPicker'
import { Button } from '@/components/ui/Button'
import { ButtonLink } from '@/components/ui/ButtonLink'
import { PageHeader } from '@/components/ui/PageHeader'
import { SelectField } from '@/components/ui/SelectField'
import { TextAreaField } from '@/components/ui/TextAreaField'
import { TextField } from '@/components/ui/TextField'
import { paths } from '@/config/routes'
import { journeyDays } from '@/data/journey'
import { useDocumentTitle } from '@/hooks/useDocumentTitle'
import { useJournal } from '@/hooks/useJournal'
import type { JournalDraft, JournalEntry } from '@/types/journal'
import { formatDateTime } from '@/utils/dates'

const TITLE_MAX = 120

/** Rota de novo registro e de edição. Espera a lista carregar para saber qual registro abrir. */
export function JournalEntryPage() {
  const { id } = useParams()
  const journal = useJournal()
  const isNew = !id
  useDocumentTitle(isNew ? 'Novo registro' : 'Registro do diário')

  if (journal.status === 'loading') return <LoadingState title="Abrindo o seu diário…" />
  if (journal.status === 'error') return <ErrorState description={journal.error ?? undefined} onRetry={journal.reload} />

  const entry = id ? journal.entries.find((item) => item.id === id) : undefined
  if (!isNew && !entry) {
    return (
      <EmptyState
        title="Registro não encontrado"
        description="Ele pode ter sido excluído ou estar salvo em outro aparelho."
        action={<ButtonLink to={paths.journal}>Voltar para o diário</ButtonLink>}
      />
    )
  }

  return <JournalEntryForm key={entry?.id ?? 'novo'} entry={entry} journal={journal} />
}

interface JournalEntryFormProps {
  entry?: JournalEntry
  journal: ReturnType<typeof useJournal>
}

function JournalEntryForm({ entry, journal }: JournalEntryFormProps) {
  const navigate = useNavigate()
  const [searchParams] = useSearchParams()
  const dayParam = Number(searchParams.get('dia'))
  const [draft, setDraft] = useState<JournalDraft>(() => ({
    title: entry?.title ?? '',
    body: entry?.body ?? '',
    day: entry ? entry.day : Number.isInteger(dayParam) && dayParam >= 1 && dayParam <= journeyDays.length ? dayParam : undefined,
    prompt: entry ? entry.prompt : searchParams.get('pergunta') || undefined,
  }))
  const [bodyError, setBodyError] = useState<string>()
  const [formError, setFormError] = useState<string>()
  const [isSaving, setIsSaving] = useState(false)
  const [confirmOpen, setConfirmOpen] = useState(false)
  const [isDeleting, setIsDeleting] = useState(false)

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    setFormError(undefined)
    if (!draft.body.trim()) {
      setBodyError('Escreva algo antes de salvar.')
      event.currentTarget.querySelector<HTMLTextAreaElement>('textarea')?.focus()
      return
    }
    setIsSaving(true)
    try {
      if (entry) await journal.update(entry.id, draft)
      else await journal.create(draft)
      navigate(paths.journal, { state: { notice: entry ? 'Registro atualizado.' : 'Registro salvo no seu diário.' } })
    } catch (err) {
      setFormError(err instanceof Error ? err.message : 'Não foi possível salvar agora. Tente de novo.')
      setIsSaving(false)
    }
  }

  async function handleDelete() {
    if (!entry) return
    setIsDeleting(true)
    try {
      await journal.remove(entry.id)
      navigate(paths.journal, { state: { notice: 'Registro excluído.' } })
    } catch (err) {
      setConfirmOpen(false)
      setIsDeleting(false)
      setFormError(err instanceof Error ? err.message : 'Não foi possível excluir agora. Tente de novo.')
    }
  }

  return (
    <section>
      <Link
        to={paths.journal}
        className="mb-8 inline-flex items-center gap-2 text-apoio text-oliva-700 underline-offset-4 hover:underline"
      >
        <ArrowLeft aria-hidden="true" className="size-4" /> Voltar para o diário
      </Link>
      <PageHeader eyebrow="Diário" title={entry ? 'Editar registro' : 'Novo registro'} />

      {entry && (
        <p className="-mt-6 mb-8 text-apoio text-tinta-suave">
          Criado em {formatDateTime(entry.createdAt)}
          {entry.updatedAt !== entry.createdAt && ` · Atualizado em ${formatDateTime(entry.updatedAt)}`}
        </p>
      )}

      <form noValidate onSubmit={handleSubmit} className="flex max-w-2xl flex-col gap-6">
        {formError && <FormAlert>{formError}</FormAlert>}

        <PromptPicker value={draft.prompt} onChange={(prompt) => setDraft((current) => ({ ...current, prompt }))} />

        <TextAreaField
          label={draft.prompt ? draft.prompt : 'O que você quer escrever?'}
          hint={draft.prompt ? 'Responda do seu jeito, ou escreva sobre outra coisa.' : undefined}
          name="body"
          rows={12}
          value={draft.body}
          error={bodyError}
          onChange={(event) => {
            setDraft((current) => ({ ...current, body: event.target.value }))
            if (bodyError) setBodyError(undefined)
          }}
        />

        <div className="grid gap-6 sm:grid-cols-2">
          <TextField
            label="Título (opcional)"
            name="title"
            maxLength={TITLE_MAX}
            value={draft.title ?? ''}
            onChange={(event) => setDraft((current) => ({ ...current, title: event.target.value }))}
          />
          <SelectField
            label="Dia da jornada (opcional)"
            name="day"
            value={draft.day ?? ''}
            onChange={(event) => setDraft((current) => ({ ...current, day: event.target.value ? Number(event.target.value) : undefined }))}
          >
            <option value="">Nenhum</option>
            {journeyDays.map((day) => (
              <option key={day.day} value={day.day}>
                Dia {day.day}: {day.title}
              </option>
            ))}
          </SelectField>
        </div>

        <div className="flex flex-col gap-3 border-t border-areia-300/60 pt-6 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex flex-col gap-3 sm:flex-row">
            <Button type="submit" isLoading={isSaving}>
              {entry ? 'Salvar alterações' : 'Salvar registro'}
            </Button>
            <ButtonLink to={paths.journal} variant="ghost">
              Cancelar
            </ButtonLink>
          </div>
          {entry && (
            <Button variant="ghost" onClick={() => setConfirmOpen(true)} className="text-erro-600 hover:bg-erro-100">
              <Trash2 aria-hidden="true" className="size-4" /> Excluir registro
            </Button>
          )}
        </div>
      </form>

      <ConfirmDialog
        open={confirmOpen}
        title="Excluir este registro?"
        confirmLabel="Excluir"
        isConfirming={isDeleting}
        onConfirm={() => void handleDelete()}
        onCancel={() => setConfirmOpen(false)}
      >
        O registro será apagado deste navegador e não poderá ser recuperado. Se quiser guardar uma cópia, use
        "Exportar" na página do diário antes.
      </ConfirmDialog>
    </section>
  )
}
