'use client';

import Navbar from '@/components/layout/navbar';
import HeroSection from '@/components/homepage/HeroSection';
import AboutSection from '@/components/homepage/AboutSection';
import FeaturedFailsSection from '@/components/homepage/FeaturedFailsSection';
import FooterSection from '@/components/layout/footerSection';

export default function HomePage() {
  return (
    <main className="min-h-screen flex flex-col items-center bg-zinc-100 gap-4">
      <Navbar />
      <HeroSection />
      <AboutSection />
      <FeaturedFailsSection />
      <FooterSection />
    </main>
  );
}