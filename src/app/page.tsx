'use client';

import Navbar from '@/components/layout/navbar';

export default function HomePage() {
  return (
    <main className="min-h-screen flex flex-col items-center justify-center bg-zinc-100 gap-4">
      <Navbar />
      <h1 className="text-2xl text-pink-400 font-bold">You are on the home page!</h1>
    </main>
  );
}