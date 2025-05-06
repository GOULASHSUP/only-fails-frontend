'use client';

import { useEffect, useState } from 'react';
import Navbar from '@/components/layout/navbar';
import Footer from '@/components/layout/footerSection';
import CatalogCard from '@/components/catalog/CatalogCard';

interface Product {
    _id: string;
    name: string;
    description: string;
    imageURL: string;
    upvotes: number;
    downvotes: number;
}

export default function CatalogPage() {
    const [products, setProducts] = useState<Product[]>([]);
    const [error, setError] = useState('');

useEffect(() => {
    const fetchProducts = async () => {
    try {
        const res = await fetch('http://localhost:4000/api/failed-products');
        if (!res.ok) {
        throw new Error('Failed to fetch products');
        }

        const data = await res.json();

        const sorted = data.sort((a: Product, b: Product) => b.upvotes - a.upvotes);

        setProducts(sorted);
    } catch (err: any) {
        console.error('[CatalogPage] Error fetching products:', err.message);
        setError('Could not load products');
    }
};

    fetchProducts();
}, []);

    return (
        <>
        <Navbar />
        <main className="min-h-screen bg-zinc-100 pt-24">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <h1 className="text-3xl font-bold text-center text-blue-400 mb-8">Failed Product Catalog</h1>

                {error && <p className="text-red-500 text-center mb-4">{error}</p>}

                <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3 pb-16">
                    {products.map((product) => (
                    <CatalogCard key={product._id} product={product} />
                    ))}
                </div>
            </div>
        </main>
        <Footer />
        </>
    );
}