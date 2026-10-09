import { Link } from 'react-router-dom'

const destaques = [
  { titulo: 'Recurso 1', texto: 'Descrição provisória do primeiro recurso do app.' },
  { titulo: 'Recurso 2', texto: 'Descrição provisória do segundo recurso do app.' },
  { titulo: 'Recurso 3', texto: 'Descrição provisória do terceiro recurso do app.' },
]

export default function Inicio() {
  return (
    <main className="min-h-screen">
      <header className="px-6 py-5 flex items-center justify-between max-w-6xl mx-auto">
        <Link to="/" className="text-xl font-semibold text-raiz-700">
          Essência Raiz
        </Link>
      </header>

      <section className="max-w-6xl mx-auto px-6 py-16">
        <h1 className="text-3xl sm:text-4xl font-bold">Boas-vindas à Essência Raiz</h1>
        <p className="mt-4 max-w-2xl text-raiz-700">
          Página inicial do app, feita para convidar o usuário a começar. Texto provisório.
        </p>

        <div className="mt-12 grid gap-6 sm:grid-cols-3">
          {destaques.map((d) => (
            <div key={d.titulo} className="rounded-2xl bg-white p-6 shadow-sm ring-1 ring-raiz-100">
              <h2 className="font-semibold text-folha-700">{d.titulo}</h2>
              <p className="mt-2 text-sm text-raiz-700">{d.texto}</p>
            </div>
          ))}
        </div>

        <button className="mt-12 rounded-full bg-folha-500 px-8 py-3 font-medium text-white hover:bg-folha-700">
          Começar agora
        </button>
      </section>
    </main>
  )
}
