import { useRef, useState } from 'react'
import { RotateCcw } from 'lucide-react'
import { Button } from '@/components/ui/Button'
import { localKeys } from '@/services/localKeys'

interface AudioPlayerProps {
  /** Identifica a posição salva para retomar. */
  id: string
  src: string
  title: string
}

const POSITION_PREFIX = localKeys.audioPositionPrefix
const SAVE_EVERY_SECONDS = 5

function formatTime(seconds: number) {
  const whole = Math.floor(seconds)
  return `${Math.floor(whole / 60)}:${String(whole % 60).padStart(2, '0')}`
}

function readPosition(id: string) {
  try {
    return Number(localStorage.getItem(POSITION_PREFIX + id)) || 0
  } catch {
    return 0
  }
}

function writePosition(id: string, seconds: number | null) {
  try {
    if (seconds === null) localStorage.removeItem(POSITION_PREFIX + id)
    else localStorage.setItem(POSITION_PREFIX + id, String(Math.floor(seconds)))
  } catch {
    // Sem armazenamento disponível: o áudio funciona, só não retoma.
  }
}

/**
 * Reprodutor com os controles nativos do navegador (acessíveis por teclado e leitores de tela),
 * mais estados de carregamento e erro e a opção de retomar de onde parou neste aparelho.
 * Só é usado quando existe um arquivo de áudio real.
 */
export function AudioPlayer({ id, src, title }: AudioPlayerProps) {
  const audioRef = useRef<HTMLAudioElement>(null)
  const lastSaved = useRef(0)
  const [status, setStatus] = useState<'loading' | 'ready' | 'error'>('loading')
  const [resumedFrom, setResumedFrom] = useState<number | null>(null)

  function handleLoadedMetadata() {
    const audio = audioRef.current
    if (!audio) return
    setStatus('ready')
    const saved = readPosition(id)
    if (saved > 5 && Number.isFinite(audio.duration) && saved < audio.duration - 5) {
      audio.currentTime = saved
      lastSaved.current = saved
      setResumedFrom(saved)
    }
  }

  function savePosition() {
    const audio = audioRef.current
    if (!audio || audio.ended) return
    lastSaved.current = audio.currentTime
    writePosition(id, audio.currentTime)
  }

  function handleTimeUpdate() {
    const audio = audioRef.current
    if (audio && Math.abs(audio.currentTime - lastSaved.current) >= SAVE_EVERY_SECONDS) savePosition()
  }

  function restart() {
    const audio = audioRef.current
    if (!audio) return
    audio.currentTime = 0
    lastSaved.current = 0
    writePosition(id, null)
    setResumedFrom(null)
  }

  function retry() {
    setStatus('loading')
    audioRef.current?.load()
  }

  return (
    <div className="flex flex-col gap-2">
      <audio
        ref={audioRef}
        src={src}
        controls
        preload="metadata"
        aria-label={`Áudio: ${title}`}
        className={`w-full ${status === 'error' ? 'hidden' : ''}`}
        onLoadedMetadata={handleLoadedMetadata}
        onTimeUpdate={handleTimeUpdate}
        onPause={savePosition}
        onEnded={() => {
          writePosition(id, null)
          setResumedFrom(null)
        }}
        onError={() => setStatus('error')}
      />
      <div aria-live="polite" className="text-apoio">
        {status === 'loading' && <p className="text-tinta-suave">Carregando o áudio…</p>}
        {status === 'error' && (
          <div role="alert" className="flex flex-col items-start gap-3 rounded-campo bg-erro-100 px-4 py-3 text-erro-600">
            <p>Não foi possível carregar este áudio. Verifique a sua conexão e tente de novo.</p>
            <Button variant="secondary" size="sm" onClick={retry}>
              Tentar novamente
            </Button>
          </div>
        )}
        {status === 'ready' && resumedFrom !== null && (
          <p className="flex flex-wrap items-center gap-x-3 gap-y-1 text-tinta-suave">
            Continuando de onde você parou ({formatTime(resumedFrom)}).
            <button type="button" onClick={restart} className="inline-flex items-center gap-1 text-oliva-700 underline underline-offset-4">
              <RotateCcw aria-hidden="true" className="size-3.5" /> Ouvir do início
            </button>
          </p>
        )}
      </div>
    </div>
  )
}
