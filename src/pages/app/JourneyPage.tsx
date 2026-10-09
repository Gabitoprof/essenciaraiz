import { Link } from 'react-router-dom'
import { Card } from '@/components/ui/Card'
import { PageHeader } from '@/components/ui/PageHeader'
import { paths } from '@/config/routes'
import { journeyWeeks } from '@/data/journey'
import { useDocumentTitle } from '@/hooks/useDocumentTitle'

export function JourneyPage() {
  useDocumentTitle('Jornada dos 21 dias')
  return (
    <section>
      <PageHeader title="Jornada dos 21 dias" description="Um dia de cada vez. Os conteúdos ainda são provisórios." />
      <div className="flex flex-col gap-6">
        {journeyWeeks.map((week) => (
          <Card key={week.week}>
            <h2 className="text-xl font-semibold">{week.title}</h2>
            <p className="mt-1 text-sm text-raiz-700">{week.description}</p>
            <ol className="mt-4 grid grid-cols-4 gap-2 sm:grid-cols-7">
              {week.days.map((day) => (
                <li key={day}>
                  <Link
                    to={paths.journeyDay(day)}
                    aria-label={`Abrir dia ${day}`}
                    className="flex aspect-square items-center justify-center rounded-xl bg-areia-100 font-semibold text-terra-700 hover:bg-areia-200"
                  >
                    {day}
                  </Link>
                </li>
              ))}
            </ol>
          </Card>
        ))}
      </div>
    </section>
  )
}
