import { BrowserRouter } from 'react-router-dom'
import { ScrollToTop } from '@/components/navigation/ScrollToTop'
import { SkipLink } from '@/components/navigation/SkipLink'
import { AuthProvider } from '@/providers/AuthProvider'
import { routerBasename } from '@/utils/baseUrl'
import { AppRoutes } from './AppRoutes'

export function App() {
  return (
    <AuthProvider>
      <BrowserRouter basename={routerBasename || undefined}>
        <SkipLink />
        <ScrollToTop />
        <AppRoutes />
      </BrowserRouter>
    </AuthProvider>
  )
}
