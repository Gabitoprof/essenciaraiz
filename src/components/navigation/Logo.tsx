import { Link } from 'react-router-dom'
import { Sprout } from 'lucide-react'
import { appConfig } from '@/config/app'

export function Logo({ to = '/' }: { to?: string }) {
  return (
    <Link to={to} className="inline-flex items-center gap-2 font-serif text-lg font-semibold text-terra-700">
      <Sprout aria-hidden="true" className="size-6 text-folha-600" />
      <span>{appConfig.name}</span>
    </Link>
  )
}
