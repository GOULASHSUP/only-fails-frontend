'use client';

import React from 'react';

interface CatalogCardProps {
product: {
    _id: string;
    name: string;
    description: string;
    imageURL: string;
    upvotes: number;
    downvotes: number;
};
}

export default function CatalogCard({ product }: CatalogCardProps) {
    return (
        <div className="w-full max-w-full bg-zinc-50 rounded-4xl overflow-hidden shadow-md">
        <img
            src={product.imageURL}
            alt={product.name}
            className="aspect-[16/11] w-full object-cover"
        />

            <div className="p-4">
                <h3 className="text-lg font-bold text-blue-400 sm:text-xl line-clamp-1">{product.name}</h3>
                <p className="mt-2 text-zinc-600 line-clamp-2">{product.description}</p>
                <div className="mt-4 flex gap-2">
                    <button className="bg-pink-400 hover:bg-pink-300 text-zinc-50 px-4 py-2 rounded-full transition">
                        <span className="flex items-center gap-1">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
                            <path fillRule="evenodd" d="M12 2.25c-5.385 0-9.75 4.365-9.75 9.75s4.365 9.75 9.75 9.75 9.75-4.365 9.75-9.75S17.385 2.25 12 2.25Zm.53 5.47a.75.75 0 0 0-1.06 0l-3 3a.75.75 0 1 0 1.06 1.06l1.72-1.72v5.69a.75.75 0 0 0 1.5 0v-5.69l1.72 1.72a.75.75 0 1 0 1.06-1.06l-3-3Z" clipRule="evenodd" />
                        </svg>
                        {product.upvotes}
                        </span>
                    </button>
                    <button className="bg-pink-400 hover:bg-pink-300 text-zinc-50 px-4 py-2 rounded-full transition">
                        <span className="flex items-center gap-1">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
                            <path fillRule="evenodd" d="M12 2.25c-5.385 0-9.75 4.365-9.75 9.75s4.365 9.75 9.75 9.75 9.75-4.365 9.75-9.75S17.385 2.25 12 2.25Zm-.53 14.03a.75.75 0 0 0 1.06 0l3-3a.75.75 0 1 0-1.06-1.06l-1.72 1.72V8.25a.75.75 0 0 0-1.5 0v5.69l-1.72-1.72a.75.75 0 0 0-1.06 1.06l3 3Z" clipRule="evenodd" />
                        </svg>
                        {product.downvotes}
                        </span>
                    </button>
                    <button className="bg-blue-400 hover:bg-blue-300 text-zinc-50 px-4 py-2 rounded-full transition">
                        Read More
                    </button>
                </div>
            </div>
        </div>
    );
}
