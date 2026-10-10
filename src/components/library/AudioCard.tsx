import { Headphones } from 'lucide-react'
import { Link } from 'react-router-dom'
import { Badge } from '@/components/ui/Badge'
import { Card } from '@/components/ui/Card'
import { paths } from '@/config/routes'
import type { AudioPractice } from '@/types/library'
import { AudioPlayer } from './AudioPlayer'

/** Prática em áudio. Só mostra o player quando há um arquivo real publicado. */
export function AudioCard({ audio }: { audio: AudioPractice }) {
  const playable = audio.status === 'publicado' && Boolean(audio.src)
  const headingId = `audio-${audio.id}`

  return (
    <Card className={`flex h-full flex-col gap-4 ${playable ? '' : 'border-dashed bg-bege-100/50 shadow-none'}`}>
      <div className="flex items-start justify-between gap-3">
        <span className="grid size-11 shrink-0 place-items-center rounded-full bg-salvia-100 text-oliva-700">
          <Headphones aria-hidden="true" className="size-5" strokeWidth={1.5} />
        </span>
        {playable ? <Badge>Disponível</Badge> : <Badge tone="terra">Em produção</Badge>}
      </div>
      <div className="flex-1">
        <p className="text-legenda font-medium uppercase text-terra-600">
          {audio.category}
          {audio.durationMinutes ? ` · ${audio.durationMinutes} min` : ''}
        </p>
        <h3 id={headingId} className="mt-1 font-serif text-titulo-3 font-semibold">
          {audio.title}
        </h3>
        <p className="mt-1 text-apoio text-tinta-suave">{audio.description}</p>
      </div>
      {playable && audio.src ? (
        <AudioPlayer id={audio.id} src={audio.src} title={audio.title} />
      ) : (
        <div className="flex flex-col gap-2 text-apoio text-tinta-suave">
          <p>Este áudio ainda não foi gravado.</p>
          {audio.relatedDay && (
            <Link to={paths.journeyDay(audio.relatedDay)} className="self-start text-oliva-700 underline underline-offset-4">
              Ler o roteiro no dia {audio.relatedDay}
            </Link>
          )}
        </div>
      )}
    </Card>
  )
}
