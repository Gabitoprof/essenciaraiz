import { ClosingSection } from '@/components/home/ClosingSection'
import { FaqSection } from '@/components/home/FaqSection'
import { HeroSection } from '@/components/home/HeroSection'
import { HowItWorksSection } from '@/components/home/HowItWorksSection'
import { JourneySection } from '@/components/home/JourneySection'
import { OfferingsSection } from '@/components/home/OfferingsSection'
import { WelcomeSection } from '@/components/home/WelcomeSection'
import { homeContent } from '@/data/home'
import { useDocumentTitle } from '@/hooks/useDocumentTitle'

export function HomePage() {
  useDocumentTitle()
  return (
    <>
      <HeroSection content={homeContent.hero} />
      <WelcomeSection content={homeContent.welcome} />
      <HowItWorksSection content={homeContent.howItWorks} />
      <JourneySection content={homeContent.journey} />
      <OfferingsSection content={homeContent.offerings} />
      <FaqSection content={homeContent.faq} />
      <ClosingSection content={homeContent.closing} />
    </>
  )
}
