import { Link } from 'react-router-dom'
import { LeafMark } from '@/components/decor/LeafMark'
import { appConfig } from '@/config/app'

/** Marca do site: raminho + nome em serifa + "Consciência" em caixa alta discreta. */
export function Logo({ to = '/' }: { to?: string }) {
  return (
    <Link to={to} className="group inline-flex items-center gap-2.5">
      <LeafMark className="size-7 text-oliva-600 transition-colors group-hover:text-oliva-700" />
      <span className="flex flex-col whitespace-nowrap leading-none">
        <span className="font-serif text-[1.4rem] font-semibold text-tinta">{appConfig.name}</span>
        <span className="mt-0.5 text-[0.625rem] font-medium uppercase tracking-[0.28em] text-terra-600">
          {appConfig.tagline}
        </span>
      </span>
    </Link>
  )
}
