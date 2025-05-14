'use client';

import React, { useState, useEffect, useRef } from 'react';
import { API_BASE_URL } from '@/lib/config';
import { useAuth } from "@/lib/hooks/useAuth";

// Props definition for CatalogCard component
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
    const { user, initialized } = useAuth();

    // State and logic for managing toast message visibility
    const [toastMessage, setToastMessage] = useState<string | null>(null);
    const toastTimer = useRef<NodeJS.Timeout | null>(null);
    const showToast = (message: string) => {
      setToastMessage(message);
      if (toastTimer.current) {
        clearTimeout(toastTimer.current);
      }
      toastTimer.current = setTimeout(() => {
        setToastMessage(null);
        toastTimer.current = null;
      }, 3000);
    };

    const [upvotes, setUpvotes] = useState(product.upvotes);
    const [downvotes, setDownvotes] = useState(product.downvotes);
    const [userVote, setUserVote] = useState<'upvote' | 'downvote' | null>(null);

    useEffect(() => {
        const handleStorageChange = () => {
            // No localStorage vote tracking, so clear userVote on storage change
            setUserVote(null);
        };

        window.addEventListener('storage', handleStorageChange);

        return () => {
            window.removeEventListener('storage', handleStorageChange);
        };
    }, [product._id]);

    useEffect(() => {
      return () => {
        if (toastTimer.current) clearTimeout(toastTimer.current);
      };
    }, []);

    const handleVote = async (voteType: 'upvote' | 'downvote') => {
        try {
            const token = localStorage.getItem('token');
            if (!token) {
                showToast('You must be logged in to vote.');
                return;
            }

            const res = await fetch(`${API_BASE_URL}/failed-products/${product._id}/vote`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'auth-token': token,
                },
                body: JSON.stringify({ voteType }),
            });

            if (res.status === 403) {
                showToast('You have already voted on this product.');
                return;
            }

            if (!res.ok) {
                throw new Error('Failed to register vote');
            }

            const updatedProduct = await res.json();
            setUpvotes(updatedProduct.upvotes);
            setDownvotes(updatedProduct.downvotes);
            setUserVote(voteType);
            showToast('Vote registered!');
        } catch (error) {
            console.error('[CatalogCard] Voting error:', error);
            showToast('An error occurred while voting.');
        }
    };
    
    // Render product card with image, details, voting buttons, and "Read More" link
    return (
      <>
        <div className="w-full max-w-full bg-zinc-50 rounded-4xl overflow-hidden shadow-md">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
                src={product.imageURL}
                alt={product.name}
                className="aspect-[16/11] w-full object-cover"
            />

            <div className="p-4">
                <h3 className="text-lg font-bold text-blue-400 sm:text-xl line-clamp-1">{product.name}</h3>
                <p className="mt-2 text-zinc-600 line-clamp-2">{product.description}</p>

                <div className="mt-4 flex gap-2">
                  {(['upvote', 'downvote'] as const).map((type) => {
                    // Render a voting button with dynamic style and count
                    const count = type === 'upvote' ? upvotes : downvotes;
                    const Icon = (
                      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
                        {type === 'upvote' ? (
                          <path fillRule="evenodd" d="M12 2.25c-5.385 0-9.75 4.365-9.75 9.75s4.365 9.75 9.75 9.75 9.75-4.365 9.75-9.75S17.385 2.25 12 2.25Zm.53 5.47a.75.75 0 0 0-1.06 0l-3 3a.75.75 0 1 0 1.06 1.06l1.72-1.72v5.69a.75.75 0 0 0 1.5 0v-5.69l1.72 1.72a.75.75 0 1 0 1.06-1.06l-3-3Z" clipRule="evenodd" />
                        ) : (
                          <path fillRule="evenodd" d="M12 2.25c-5.385 0-9.75 4.365-9.75 9.75s4.365 9.75 9.75 9.75 9.75-4.365 9.75-9.75S17.385 2.25 12 2.25Zm-.53 14.03a.75.75 0 0 0 1.06 0l3-3a.75.75 0 1 0-1.06-1.06l-1.72 1.72V8.25a.75.75 0 0 0-1.5 0v5.69l-1.72-1.72a.75.75 0 0 0-1.06 1.06l3 3Z" clipRule="evenodd" />
                        )}
                      </svg>
                    );
                    const isUser = initialized && user?.role === 'user';
                    return (
                      <button
                        key={type}
                        onClick={() =>
                          isUser
                            ? handleVote(type)
                            : showToast('You need a user account to vote. Please register or log in.')
                        }
                        disabled={isUser ? userVote !== null : false}
                        className={`
                          flex items-center gap-1 px-4 py-2 rounded-full transition
                          ${isUser
                            ? userVote === type
                              ? 'bg-pink-600 text-white font-semibold'
                              : 'bg-pink-400 hover:bg-pink-300 text-zinc-50'
                            : 'bg-pink-400 text-zinc-50 cursor-pointer'}
                        `}
                      >
                        {Icon}
                        <span>{count}</span>
                      </button>
                    );
                  })}
                  <a
                    href={`/product/${product._id}`}
                    className="bg-blue-400 hover:bg-blue-300 text-zinc-50 px-4 py-2 rounded-full transition flex items-center"
                  >
                    Read More
                  </a>
                </div>
            </div>
        </div>
        {toastMessage && (
          <div className="fixed bottom-6 left-1/2 transform -translate-x-1/2 bg-red-400 text-white px-4 py-2 rounded-4xl shadow-lg z-50">
            {toastMessage}
          </div>
        )}
      </>
    );
}
