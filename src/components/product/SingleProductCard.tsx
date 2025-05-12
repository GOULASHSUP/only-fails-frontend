'use client';

import React, { useEffect, useState } from 'react';
import { API_BASE_URL } from '@/lib/auth';

interface Product {
    _id: string;
    name: string;
    description: string;
    imageURL: string;
    category: string;
    designedBy: string;
    upvotes: number;
    downvotes: number;
    startDate: string;
    failureDate: string;
}

interface SingleProductCardProps {
    productId: string;
}

export default function SingleProductCard({ productId }: SingleProductCardProps) {
    const [product, setProduct] = useState<Product | null>(null);
    const [error, setError] = useState('');

    useEffect(() => {
        const fetchProduct = async () => {
            try {
                const res = await fetch(`${API_BASE_URL}/failed-products/${productId}`);
                
                if (!res.ok) {
                    throw new Error('Failed to fetch product');
                }

                const data = await res.json();
                setProduct(data);
            } catch (err: any) {
                console.error('[SingleProductCard] Error fetching product:', err.message);
                setError('Could not load product');
            }
        };

        fetchProduct();
    }, [productId]);

    if (error) return <p className="text-red-500">{error}</p>;
    if (!product) return <p>Loading...</p>;

    const daysAlive = Math.ceil(
        (new Date(product.failureDate).getTime() - new Date(product.startDate).getTime()) /
        (1000 * 60 * 60 * 24)
    );

    return (
        <div className="max-w-7xl mx-auto bg-white rounded-4xl overflow-hidden shadow-lg">
            {/* Image Section */}
            <div className="w-full aspect-[16/9] overflow-hidden rounded-t-4xl">
                <img src={product.imageURL} alt={product.name} className="w-full h-full object-cover" />
            </div>
            
            {/* Product Details Section */}
            <div className="p-8">
                <h1 className="sm:text-4xl text-2xl font-extrabold text-blue-400 mb-4">{product.name}</h1>
                <p className="sm:text-lg text-md text-zinc-700 mb-6">{product.description}</p>

                {/* Product Metadata */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 bg-zinc-100 p-4 rounded-2xl sm:text-lg text-md">
                    <p className="text-zinc-600">
                        <strong>Category:</strong> {product.category}
                    </p>
                    <p className="text-zinc-600">
                        <strong>Start Date:</strong> {new Date(product.startDate).toLocaleDateString()}
                    </p>
                    <p className="text-zinc-600">
                        <strong>Failure Date:</strong> {new Date(product.failureDate).toLocaleDateString()}
                    </p>
                    <p className="text-zinc-600">
                        <strong>Designed By:</strong> {product.designedBy}
                    </p>

                    <p className="text-zinc-600">
                        <strong>Alive For:</strong> {daysAlive} days
                    </p>
                    <button
                        onClick={() => {
                            const toast = document.createElement('div');
                            toast.textContent = 'We calculate the vote score by subtracting the downvotes from the upvotes.';
                            toast.className = 'fixed bottom-8 left-1/2 transform -translate-x-1/2 bg-pink-400 text-zinc-50 sm:text-md text-sm py-2 px-4 rounded-2xl shadow-lg z-50 transition-opacity duration-500 opacity-0';

                            document.body.appendChild(toast);

                            setTimeout(() => {
                                toast.classList.remove('opacity-0');
                            }, 100);

                            setTimeout(() => {
                                toast.classList.add('opacity-0');
                                setTimeout(() => toast.remove(), 500);
                            }, 3000);
                        }}
                        className={`${
                            (product.upvotes - product.downvotes) <= 0 
                                ? 'text-red-400 bg-red-200 p-4 rounded-2xl flex items-center gap-2 hover:bg-red-300 hover:text-zinc-50 transition' 
                                : 'text-blue-400 p-4 bg-blue-200 rounded-2xl flex items-center gap-2 hover:bg-blue-300 hover:text-zinc-50 transition'
                        }`}
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-6 h-6">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M3 13.125C3 12.504 3.504 12 4.125 12h2.25c.621 0 1.125.504 1.125 1.125v6.75C7.5 20.496 6.996 21 6.375 21h-2.25A1.125 1.125 0 0 1 3 19.875v-6.75ZM9.75 8.625c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125v11.25c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 0 1-1.125-1.125V8.625ZM16.5 4.125c0-.621.504-1.125 1.125-1.125h2.25C20.496 3 21 3.504 21 4.125v15.75c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 0 1-1.125-1.125V4.125Z" />
                        </svg>
                        <strong>Vote Score:</strong> {product.upvotes - product.downvotes}
                    </button>
                </div>
            </div>
        </div>
    );
}