import { getJourneyDay } from '@/data/journey'
import type { JournalEntry } from '@/types/journal'
import { formatDateTime } from './dates'

/** Monta um texto simples e legível com todos os registros, do mais antigo ao mais recente. */
export function journalToText(entries: JournalEntry[], ownerName?: string): string {
  const sorted = [...entries].sort((a, b) => a.createdAt.localeCompare(b.createdAt))
  const header = [
    'Diário — Essência Raiz | Consciência',
    ownerName ? `Registros de ${ownerName}` : '',
    `Exportado em ${formatDateTime(new Date().toISOString())}`,
    `${sorted.length} ${sorted.length === 1 ? 'registro' : 'registros'}`,
  ].filter(Boolean)

  const blocks = sorted.map((entry) => {
    const day = entry.day ? getJourneyDay(entry.day) : undefined
    const lines = [
      entry.title || 'Sem título',
      `Criado em ${formatDateTime(entry.createdAt)}` +
        (entry.updatedAt !== entry.createdAt ? ` · Atualizado em ${formatDateTime(entry.updatedAt)}` : ''),
    ]
    if (day) lines.push(`Dia ${day.day} da jornada: ${day.title}`)
    if (entry.prompt) lines.push(`Pergunta: ${entry.prompt}`)
    lines.push('', entry.body)
    return lines.join('\n')
  })

  return [header.join('\n'), ...blocks].join('\n\n────────────────────\n\n') + '\n'
}

/** Baixa o arquivo direto no aparelho da participante. Nada é enviado a servidores. */
export function downloadText(filename: string, text: string) {
  const blob = new Blob([text], { type: 'text/plain;charset=utf-8' })
  const url = URL.createObjectURL(blob)
  const link = document.createElement('a')
  link.href = url
  link.download = filename
  document.body.append(link)
  link.click()
  link.remove()
  URL.revokeObjectURL(url)
}
