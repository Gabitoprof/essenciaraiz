import { Link } from 'react-router-dom'

const ano = new Date().getFullYear()

export default function Captacao() {
  return (
    <main className="min-h-screen flex flex-col">
      <header className="px-6 py-5 flex items-center justify-between max-w-6xl w-full mx-auto">
        <span className="text-xl font-semibold text-raiz-700">Essência Raiz</span>
        <Link to="/inicio" className="text-sm font-medium text-folha-700 hover:underline">
          Entrar
        </Link>
      </header>

      <section className="flex-1 flex items-center">
        <div className="max-w-3xl mx-auto px-6 py-20 text-center">
          <h1 className="text-4xl sm:text-5xl font-bold leading-tight">
            Título principal da landing de atração
          </h1>
          <p className="mt-6 text-lg text-raiz-700">
            Subtítulo explicando o que a Essência Raiz oferece. Texto provisório até
            recebermos o conteúdo definitivo.
          </p>
          <Link
            to="/inicio"
            className="mt-10 inline-block rounded-full bg-folha-500 px-8 py-3 font-medium text-white hover:bg-folha-700"
          >
            Quero conhecer
          </Link>
        </div>
      </section>

      <footer className="py-6 text-center text-sm text-raiz-500">
        © {ano} Essência Raiz
      </footer>
    </main>
  )
}
