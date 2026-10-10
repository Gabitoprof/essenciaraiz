import { Outlet } from 'react-router-dom'
import { PublicHeader } from '@/components/navigation/PublicHeader'
import { SiteFooter } from '@/components/navigation/SiteFooter'
import { MAIN_CONTENT_ID } from '@/components/navigation/SkipLink'

export function PublicLayout() {
  return (
    <div className="flex min-h-screen flex-col">
      <PublicHeader />
      <main id={MAIN_CONTENT_ID} className="flex-1">
        <Outlet />
      </main>
      <SiteFooter />
    </div>
  )
}
