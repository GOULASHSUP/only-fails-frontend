'use client';

import { useParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import Navbar from '@/components/layout/navbar';
import Footer from '@/components/layout/footerSection';
import SingleProductCard from '@/components/product/SingleProductCard';

export default function SingleProductPage() {
    const params = useParams();
    const productId = Array.isArray(params?.id) ? params.id[0] : params.id || '';

    return (
        <>
            <Navbar />
            <main className="bg-zinc-100 min-h-screen pt-24 pb-12 px-4">
                {productId ? (
                    <SingleProductCard productId={productId} />
                ) : (
                    <p className="text-center text-red-500">Product ID not found.</p>
                )}
            </main>
            <Footer />
        </>
    );
}