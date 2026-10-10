/** Um registro do diário. Conteúdo pessoal e sensível: nunca é público nem enviado a terceiros. */
export interface JournalEntry {
  id: string
  /** Opcional: sem título, a lista mostra o começo do texto. */
  title?: string
  body: string
  /** Dia da jornada associado (1 a 21), se a participante escolher. */
  day?: number
  /** Pergunta de escrita usada, se a participante escolheu uma. */
  prompt?: string
  /** Datas em ISO 8601. */
  createdAt: string
  updatedAt: string
}

export type JournalDraft = Pick<JournalEntry, 'title' | 'body' | 'day' | 'prompt'>
