import { BenefitsSection } from '@/components/home/BenefitsSection'
import { ClosingSection } from '@/components/home/ClosingSection'
import { HeroSection } from '@/components/home/HeroSection'
import { homeContent } from '@/data/home'
import { useDocumentTitle } from '@/hooks/useDocumentTitle'

export function HomePage() {
  useDocumentTitle()
  return (
    <>
      <HeroSection content={homeContent.hero} />
      <BenefitsSection benefits={homeContent.benefits} />
      <ClosingSection content={homeContent.closing} />
    </>
  )
}
