'use client';

import { useEffect, useState } from 'react';
import { API_BASE_URL } from '@/lib/auth';

interface FailedProduct {
    _id: string;
    name: string;
    imageURL: string;
    upvotes: number;
    description?: string;
}

export default function HeroSection() {
    const [topProducts, setTopProducts] = useState<FailedProduct[]>([]);

    useEffect(() => {
        const fetchTopProducts = async () => {
        try {
            const res = await fetch(`${API_BASE_URL}/failed-products`);
            const data: FailedProduct[] = await res.json();
            const sorted = [...data].sort((a, b) => b.upvotes - a.upvotes).slice(0, 1);
            setTopProducts(sorted);
        } catch (err) {
            console.error('[HeroSection] Failed to load products:', err);
        }
    };

    fetchTopProducts();
    }, []);

    return (
        <section
            className="relative w-full h-screen bg-cover bg-center flex items-center text-zinc-100"
            style={{ backgroundImage: `url(${topProducts[0]?.imageURL || ''})` }}
        >
            <div className="absolute inset-0 bg-black opacity-60 z-0"></div>
            <div className="relative z-10 p-10 px-4 sm:px-8 max-w-7xl mx-auto text-center">
            <p className="text-3xl uppercase text-pink-400 tracking-widest mb-3">The most upvoted product</p>
            <h1 className="text-5xl font-bold mb-4">{topProducts[0]?.name}</h1>
            <p className="text-lg font-black text-pink-400 mb-6">Upvotes: {topProducts[0]?.upvotes}</p>
            <button
                className="bg-blue-400 hover:bg-blue-300 text-zinc-100 font-semibold px-6 py-3 rounded-full transition"
                onClick={() => {
                    if (topProducts[0]?._id) {
                        window.location.href = `/product/${topProducts[0]._id}`;
                    }
                }}
            >
                See this fail
            </button>
            </div>
        </section>
    );
}