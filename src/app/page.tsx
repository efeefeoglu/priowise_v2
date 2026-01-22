import { Hero } from '@/components/home/Hero';
import { Features } from '@/components/home/Features';
import { WhyPriowise } from '@/components/home/WhyPriowise';
import { FAQ } from '@/components/home/FAQ';
import { CTASection } from '@/components/home/CTASection';
import { Footer } from '@/components/Footer';
import { OrganicShapes } from '@/components/home/OrganicShapes';
import { Header } from '@/components/home/Header';

export default function Home() {
  return (
    <div className="relative min-h-screen bg-[#faf9f6] overflow-hidden">
      <OrganicShapes />
      <Header />
      <Hero />
      <Features />
      <WhyPriowise />
      <FAQ />
      <CTASection />
      <Footer />
    </div>
  );
}
