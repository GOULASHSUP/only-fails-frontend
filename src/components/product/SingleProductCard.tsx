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
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 bg-zinc-100 p-4 rounded-2xl">
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
                    <p className={`${(product.upvotes - product.downvotes) <= 0 ? 'text-red-500' : 'text-blue-400'}`}>
                        <strong>Vote Score:</strong> {product.upvotes - product.downvotes}
                    </p>
                </div>
            </div>
        </div>
    );
}