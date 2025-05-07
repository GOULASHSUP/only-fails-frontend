// src/components/product/SingleProductCard.tsx
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
                <h1 className="text-4xl font-extrabold text-blue-400 mb-4">{product.name}</h1>
                <p className="text-lg text-zinc-700 mb-6">{product.description}</p>

                {/* Product Metadata */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-8 bg-zinc-100 p-4 rounded-2xl">
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
                </div>

                {/* Actions Section */}
                <div className="flex flex-col sm:flex-row gap-4">
                    <button className="bg-pink-500 hover:bg-pink-400 text-zinc-50 px-6 py-3 rounded-full transition">
                        <span className="flex items-center gap-2">
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
                                <path fillRule="evenodd" d="M12 2.25c-5.385 0-9.75 4.365-9.75 9.75s4.365 9.75 9.75 9.75 9.75-4.365 9.75-9.75S17.385 2.25 12 2.25Zm.53 5.47a.75.75 0 0 0-1.06 0l-3 3a.75.75 0 1 0 1.06 1.06l1.72-1.72v5.69a.75.75 0 0 0 1.5 0v-5.69l1.72 1.72a.75.75 0 1 0 1.06-1.06l-3-3Z" clipRule="evenodd" />
                            </svg>
                            {product.upvotes}
                        </span>
                    </button>
                    <button className="bg-pink-500 hover:bg-pink-400 text-zinc-50 px-6 py-3 rounded-full transition">
                        <span className="flex items-center gap-2">
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
                                <path fillRule="evenodd" d="M12 2.25c-5.385 0-9.75 4.365-9.75 9.75s4.365 9.75 9.75 9.75 9.75-4.365 9.75-9.75S17.385 2.25 12 2.25Zm-.53 14.03a.75.75 0 0 0 1.06 0l3-3a.75.75 0 1 0-1.06-1.06l-1.72 1.72V8.25a.75.75 0 0 0-1.5 0v5.69l-1.72-1.72a.75.75 0 0 0-1.06 1.06l3 3Z" clipRule="evenodd" />
                            </svg>
                            {product.downvotes}
                        </span>
                    </button>
                </div>
            </div>
        </div>
    );
}