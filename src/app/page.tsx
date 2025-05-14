'use client';

import { useEffect, useState } from 'react';
import { API_BASE_URL } from '@/lib/config';
import Navbar from '@/components/layout/navbar';
import HeroSection from '@/components/homepage/HeroSection';
import AboutSection from '@/components/homepage/AboutSection';
import FeaturedFailsSection from '@/components/homepage/FeaturedFailsSection';
import FooterSection from '@/components/layout/footerSection';

interface Product {
  _id: string;
  name: string;
  imageURL: string;
  description: string;
  failureDate: string;
  upvotes: number;
  downvotes: number;
  category: string;
}

export default function HomePage() {
  const [topProduct, setTopProduct] = useState<Product | null>(null);
  const [recentProducts, setRecentProducts] = useState<Product[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch(`${API_BASE_URL}/failed-products`, {
          headers: { 'Accept': 'application/json' },
        });
        if (!res.ok) throw new Error('Failed to fetch products');

        const data = await res.json();

        const sortedByUpvotes = [...data].sort((a, b) => b.upvotes - a.upvotes);
        const sortedByFailureDate = [...data].sort(
          (a, b) => new Date(b.failureDate).getTime() - new Date(a.failureDate).getTime()
        );

        setTopProduct(sortedByUpvotes[0]);
        setRecentProducts(sortedByFailureDate.slice(0, 3));
      } catch (err) {
        console.error('[HomePage] Error loading products:', err);
      }
    };

    fetchData();
  }, []);

  return (
    <main className="min-h-screen flex flex-col items-center bg-zinc-100 gap-4">
      <Navbar />
      <HeroSection product={topProduct} />
      <AboutSection />
      <FeaturedFailsSection products={recentProducts} />
      <FooterSection />
    </main>
  );
}