import { HeroSection } from '@/components/sections/HeroSection';
import { SocialProofSection } from '@/components/sections/SocialProofSection';
import { ProblemSection } from '@/components/sections/ProblemSection';
import { FeaturesSection } from '@/components/sections/FeaturesSection';
import { HowItWorksSection } from '@/components/sections/HowItWorksSection';
import { GallerySection } from '@/components/sections/GallerySection';
import { PricingSection } from '@/components/sections/PricingSection';
import { FaqSection } from '@/components/sections/FaqSection';
import { CtaSection } from '@/components/sections/CtaSection';

export function HomePage() {
  return (
    <>
      <HeroSection />
      <SocialProofSection />
      <ProblemSection />
      <FeaturesSection />
      <HowItWorksSection />
      <GallerySection />
      <PricingSection />
      <FaqSection />
      <CtaSection />
    </>
  );
}
