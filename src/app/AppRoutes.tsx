import { Route, Routes } from 'react-router-dom'
import { AppLayout } from '@/layouts/AppLayout'
import { AuthLayout } from '@/layouts/AuthLayout'
import { PublicLayout } from '@/layouts/PublicLayout'
import { DashboardPage } from '@/pages/app/DashboardPage'
import { JournalPage } from '@/pages/app/JournalPage'
import { JourneyDayPage } from '@/pages/app/JourneyDayPage'
import { JourneyPage } from '@/pages/app/JourneyPage'
import { LibraryPage } from '@/pages/app/LibraryPage'
import { OnboardingPage } from '@/pages/app/OnboardingPage'
import { ProfilePage } from '@/pages/app/ProfilePage'
import { ProgressPage } from '@/pages/app/ProgressPage'
import { ForgotPasswordPage } from '@/pages/auth/ForgotPasswordPage'
import { LoginPage } from '@/pages/auth/LoginPage'
import { SignupPage } from '@/pages/auth/SignupPage'
import { StyleGuidePage } from '@/pages/dev/StyleGuidePage'
import { PrivacyPage } from '@/pages/legal/PrivacyPage'
import { SafetyPage } from '@/pages/legal/SafetyPage'
import { TermsPage } from '@/pages/legal/TermsPage'
import { HomePage } from '@/pages/public/HomePage'
import { NotFoundPage } from '@/pages/public/NotFoundPage'
import { paths } from '@/config/routes'
import { ProtectedRoute } from './ProtectedRoute'

export function AppRoutes() {
  return (
    <Routes>
      {/* Páginas públicas */}
      <Route element={<PublicLayout />}>
        <Route path={paths.home} element={<HomePage />} />
        <Route path={paths.privacy} element={<PrivacyPage />} />
        <Route path={paths.terms} element={<TermsPage />} />
        <Route path={paths.safety} element={<SafetyPage />} />
        {import.meta.env.DEV && <Route path={paths.styleGuide} element={<StyleGuidePage />} />}
        <Route path="*" element={<NotFoundPage />} />
      </Route>

      {/* Cadastro, login e recuperação de senha */}
      <Route element={<AuthLayout />}>
        <Route path={paths.login} element={<LoginPage />} />
        <Route path={paths.signup} element={<SignupPage />} />
        <Route path={paths.forgotPassword} element={<ForgotPasswordPage />} />
      </Route>

      {/* Área da participante: exige sessão */}
      <Route element={<ProtectedRoute />}>
        <Route element={<AppLayout />}>
          <Route path={paths.dashboard} element={<DashboardPage />} />
          <Route path={paths.onboarding} element={<OnboardingPage />} />
          <Route path={paths.journey} element={<JourneyPage />} />
          <Route path={paths.journeyDay(':day')} element={<JourneyDayPage />} />
          <Route path={paths.library} element={<LibraryPage />} />
          <Route path={paths.journal} element={<JournalPage />} />
          <Route path={paths.progress} element={<ProgressPage />} />
          <Route path={paths.profile} element={<ProfilePage />} />
        </Route>
      </Route>
    </Routes>
  )
}
