import { Navigate, Outlet, useLocation } from 'react-router-dom'
import { paths } from '@/config/routes'
import { useAuth } from '@/hooks/useAuth'

/**
 * Garante a ordem da primeira entrada: quem ainda não concluiu o onboarding vai para ele,
 * e quem já concluiu não volta para ele por engano.
 * Deve ficar dentro de <ProtectedRoute>, que já garante a sessão.
 */
export function OnboardingGate() {
  const { session } = useAuth()
  const { pathname } = useLocation()
  const onOnboarding = pathname === paths.onboarding
  const completed = session?.user.onboardingCompleted ?? false

  if (!completed && !onOnboarding) return <Navigate to={paths.onboarding} replace />
  if (completed && onOnboarding) return <Navigate to={paths.dashboard} replace />
  return <Outlet />
}
