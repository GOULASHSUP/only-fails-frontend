'use client';

import React, { useState, useEffect } from 'react';
import { API_BASE_URL } from '@/lib/auth';

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
    const [upvotes, setUpvotes] = useState(product.upvotes);
    const [downvotes, setDownvotes] = useState(product.downvotes);
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');
    const [userVote, setUserVote] = useState<'upvote' | 'downvote' | null>(null);

    useEffect(() => {
        const token = localStorage.getItem('token');
        const payload = token ? JSON.parse(atob(token.split('.')[1])) : null;
        const userId = payload ? payload.id : null;
        setIsAuthenticated(!!token);

        if (userId) {
            const storedVote = localStorage.getItem(`vote_${userId}_${product._id}`);
            if (storedVote) {
                setUserVote(storedVote as 'upvote' | 'downvote');
            } else {
                setUserVote(null);
            }
        }

        const handleStorageChange = () => {
            const newToken = localStorage.getItem('token');
            const newPayload = newToken ? JSON.parse(atob(newToken.split('.')[1])) : null;
            const newUserId = newPayload ? newPayload.id : null;

            if (!newToken || newUserId !== userId) {
                setIsAuthenticated(false);
                setUserVote(null);
            } else {
                const newVote = localStorage.getItem(`vote_${newUserId}_${product._id}`);
                setUserVote(newVote as 'upvote' | 'downvote' || null);
            }
        };

        window.addEventListener('storage', handleStorageChange);

        return () => {
            window.removeEventListener('storage', handleStorageChange);
        };
    }, [product._id]);

    const handleVote = async (voteType: 'upvote' | 'downvote') => {
        if (!isAuthenticated) {
            setErrorMessage('Please login or register first: ');
            return;
        }

        if (userVote) {
            setErrorMessage('You have already voted on this product. You can only vote once per product.');
            return;
        }

        try {
            const token = localStorage.getItem('token');

            const res = await fetch(`${API_BASE_URL}/failed-products/${product._id}/vote`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'auth-token': token || '',
                },
                body: JSON.stringify({ voteType }),
            });

            if (!res.ok) {
                throw new Error('Failed to register vote');
            }

            const updatedProduct = await res.json();
            setUpvotes(updatedProduct.upvotes);
            setDownvotes(updatedProduct.downvotes);
            setUserVote(voteType);

            let userId = null;
            if (token) {
                const payload = JSON.parse(atob(token.split('.')[1]));
                userId = payload.id;
            }
            localStorage.setItem(`vote_${userId}_${product._id}`, voteType);
            setErrorMessage('');
        } catch (error) {
            console.error('[CatalogCard] Voting error:', error);
            setErrorMessage('Failed to register vote. Please try again.');
        }
    };

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

                {errorMessage && (
                    <p className="mt-2 text-zinc-50 text-md bg-red-400 p-3 rounded-full">
                        {errorMessage} <a href="/login" className="underline text-zinc-100">Login</a> / <a href="/register" className="underline text-zinc-100">Register</a>
                    </p>
                )}

                <div className="mt-4 flex gap-2">
                    <button
                        className={`${
                            userVote === 'upvote' ? 'bg-pink-500' : 'bg-pink-400 hover:bg-pink-300'
                        } text-zinc-50 px-4 py-2 rounded-full transition`}
                        onClick={() => handleVote('upvote')}
                        disabled={!!userVote}
                    >
                        <span className="flex items-center gap-1">
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
                                <path fillRule="evenodd" d="M12 2.25c-5.385 0-9.75 4.365-9.75 9.75s4.365 9.75 9.75 9.75 9.75-4.365 9.75-9.75S17.385 2.25 12 2.25Zm.53 5.47a.75.75 0 0 0-1.06 0l-3 3a.75.75 0 1 0 1.06 1.06l1.72-1.72v5.69a.75.75 0 0 0 1.5 0v-5.69l1.72 1.72a.75.75 0 1 0 1.06-1.06l-3-3Z" clipRule="evenodd" />
                            </svg>
                            {upvotes}
                        </span>
                    </button>

                    <button
                        className={`${
                            userVote === 'downvote' ? 'bg-pink-500' : 'bg-pink-400 hover:bg-pink-300'
                        } text-zinc-50 px-4 py-2 rounded-full transition`}
                        onClick={() => handleVote('downvote')}
                        disabled={!!userVote}
                    >
                        <span className="flex items-center gap-1">
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
                                <path fillRule="evenodd" d="M12 2.25c-5.385 0-9.75 4.365-9.75 9.75s4.365 9.75 9.75 9.75 9.75-4.365 9.75-9.75S17.385 2.25 12 2.25Zm-.53 14.03a.75.75 0 0 0 1.06 0l3-3a.75.75 0 1 0-1.06-1.06l-1.72 1.72V8.25a.75.75 0 0 0-1.5 0v5.69l-1.72-1.72a.75.75 0 0 0-1.06 1.06l3 3Z" clipRule="evenodd" />
                            </svg>
                            {downvotes}
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
