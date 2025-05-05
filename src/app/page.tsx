'use client';

import Navbar from '@/components/layout/navbar';
import HeroSection from '@/components/homepage/HeroSection';

export default function HomePage() {
  return (
    <main className="min-h-screen flex flex-col items-center bg-zinc-100 gap-4">
      <Navbar />
      <HeroSection />
    </main>
  );
}