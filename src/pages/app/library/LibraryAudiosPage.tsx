import { ArrowLeft } from 'lucide-react'
import { Link } from 'react-router-dom'
import { AudioCard } from '@/components/library/AudioCard'
import { PageHeader } from '@/components/ui/PageHeader'
import { paths } from '@/config/routes'
import { audioPractices } from '@/data/library'
import { useDocumentTitle } from '@/hooks/useDocumentTitle'

export function LibraryAudiosPage() {
  useDocumentTitle('Biblioteca de áudios')
  const available = audioPractices.filter((audio) => audio.status === 'publicado' && audio.src)
  const pending = audioPractices.filter((audio) => !(audio.status === 'publicado' && audio.src))

  return (
    <section>
      <Link to={paths.library} className="mb-8 inline-flex items-center gap-2 text-apoio text-oliva-700 underline-offset-4 hover:underline">
        <ArrowLeft aria-hidden="true" className="size-4" /> Voltar para a biblioteca
      </Link>
      <PageHeader
        eyebrow="Biblioteca"
        title="Áudios"
        description="Meditações, relaxamentos e práticas guiadas. São práticas de bem-estar e não substituem acompanhamento profissional."
      />

      <section aria-labelledby="audios-disponiveis" className="mb-12">
        <h2 id="audios-disponiveis" className="text-titulo-2">
          Disponíveis
        </h2>
        {available.length === 0 ? (
          <p className="mt-3 rounded-cartao border border-dashed border-areia-300 bg-bege-100/60 px-5 py-4 text-tinta-suave">
            Ainda não há áudios publicados. Enquanto eles são gravados, os roteiros das práticas estão nas páginas de cada dia da
            jornada.
          </p>
        ) : (
          <ul className="mt-5 grid gap-4 sm:grid-cols-2 md:grid-cols-1 lg:grid-cols-2">
            {available.map((audio) => (
              <li key={audio.id}>
                <AudioCard audio={audio} />
              </li>
            ))}
          </ul>
        )}
      </section>

      {pending.length > 0 && (
        <section aria-labelledby="audios-em-producao">
          <h2 id="audios-em-producao" className="text-titulo-2">
            Em produção
          </h2>
          <ul className="mt-5 grid gap-4 sm:grid-cols-2 md:grid-cols-1 lg:grid-cols-2">
            {pending.map((audio) => (
              <li key={audio.id}>
                <AudioCard audio={audio} />
              </li>
            ))}
          </ul>
        </section>
      )}
    </section>
  )
}
