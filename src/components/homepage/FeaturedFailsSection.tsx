'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { API_BASE_URL } from '@/lib/config';

interface FailedProduct {
  _id: string;
  name: string;
  description: string;
  imageURL: string;
  category: string;
  startDate: string;
  failureDate: string;
  upvotes: number;
  downvotes: number;
  _createdBy: string;
}

export default function FeaturedFailsSection() {
  const [products, setProducts] = useState<FailedProduct[]>([]);
  const router = useRouter();

  // Fetch the most recent failed products from the API
  useEffect(() => {
    const fetchRecentFails = async () => {
      try {
        const res = await fetch(`${API_BASE_URL}/failed-products`);
        const data: FailedProduct[] = await res.json();
        const sorted = [...data]
          .sort(
            (a, b) => new Date(b.failureDate).getTime() - new Date(a.failureDate).getTime()
          )
          // Sort by failure date in descending order
          .slice(0, 3);
        setProducts(sorted);
      } catch (err) {
        console.error('[FeaturedFails] Failed to load products:', err);
      }
    };

    fetchRecentFails();
}, []);

  // Render the section with a title and a grid of product cards
  return (
      <section className="py-16 px-4 sm:px-8">
          <div className="max-w-7xl mx-auto">
              <h2 className="text-4xl font-bold text-blue-400 text-center mb-10">
              Recently Failed
              </h2>

              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
                  {products.map((product) => (
                      <a
                          key={product._id}
                          href={`/product/${product._id}`}
                          className="group relative block bg-black overflow-hidden rounded-4xl"
                      >
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img
                          alt={product.name}
                          src={product.imageURL}
                          className="absolute inset-0 h-full w-full object-cover opacity-75 transition-opacity group-hover:opacity-50"
                      />

                      <div className="relative p-4 sm:p-6 lg:p-8">
                          <p className="text-sm font-medium tracking-widest text-pink-400 uppercase">
                          {product.category}
                          </p>

                          <p className="text-xl font-bold text-zinc-50 sm:text-2xl line-clamp-1">{product.name}</p>
                          <p className="text-sm text-zinc-200 mt-1">
                          Failed on: {new Date(product.failureDate).toLocaleDateString()}
                          </p>

                          <div className="mt-32 sm:mt-48 lg:mt-64">
                          <div className="translate-y-8 transform opacity-0 transition-all group-hover:translate-y-0 group-hover:opacity-100">
                              <p className="text-sm text-zinc-50 line-clamp-2">{product.description}</p>
                              <div className="mt-2 flex items-center gap-4 text-lg text-zinc-200">
                              <span className="flex items-center gap-1">
                                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
                                  <path fillRule="evenodd" d="M12 2.25c-5.385 0-9.75 4.365-9.75 9.75s4.365 9.75 9.75 9.75 9.75-4.365 9.75-9.75S17.385 2.25 12 2.25Zm.53 5.47a.75.75 0 0 0-1.06 0l-3 3a.75.75 0 1 0 1.06 1.06l1.72-1.72v5.69a.75.75 0 0 0 1.5 0v-5.69l1.72 1.72a.75.75 0 1 0 1.06-1.06l-3-3Z" clipRule="evenodd" />
                                  </svg>
                                  {product.upvotes}
                              </span>
                              <span className="flex items-center gap-1">
                                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
                                  <path fillRule="evenodd" d="M12 2.25c-5.385 0-9.75 4.365-9.75 9.75s4.365 9.75 9.75 9.75 9.75-4.365 9.75-9.75S17.385 2.25 12 2.25Zm-.53 14.03a.75.75 0 0 0 1.06 0l3-3a.75.75 0 1 0-1.06-1.06l-1.72 1.72V8.25a.75.75 0 0 0-1.5 0v5.69l-1.72-1.72a.75.75 0 0 0-1.06 1.06l3 3Z" clipRule="evenodd" />
                                  </svg>
                                  {product.downvotes}
                              </span>
                              </div>
                          </div>
                          </div>
                      </div>
                      </a>
                  ))}
              </div>

              <div className="mt-10 text-center">
              <button
                  onClick={() => router.push('/catalog')}
                  className="bg-pink-400 hover:bg-pink-300 text-zinc-50 font-semibold px-6 py-3 rounded-full transition"
              >
                  See All Fails
              </button>
              </div>
          </div>
      </section>
  );
}