'use client';

import { useEffect, useState } from 'react';

interface Product {
    _id: string;
    name: string;
    category: string;
    failureDate: string;
    startDate: string;
    description: string;
    designedBy: string;
    imageURL: string;
    upvotes: number;
    downvotes: number;
}

export default function ProductListSection() {
    const [products, setProducts] = useState<Product[]>([]);
    const [error, setError] = useState('');
    const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
    const [showModal, setShowModal] = useState(false);

    const handleView = (product: Product) => {
        setSelectedProduct(product);
        setShowModal(true);
    };

    useEffect(() => {
        const fetchProducts = async () => {
        try {
            const res = await fetch('http://localhost:4000/api/failed-products');
            if (!res.ok) {
            throw new Error('Failed to fetch products');
            }
            const data = await res.json();
            setProducts(data);
        } catch (err: any) {
            console.error('[ProductListSection] Error fetching products:', err.message);
            setError('Unable to load products.');
        }
        };

    fetchProducts();
}, []);

    return (
        <section className="w-full max-w-4xl mx-auto bg-zinc-50 shadow-md rounded-4xl p-6 mt-8">
        <h2 className="text-2xl font-bold mb-6 text-center text-blue-400">All Failed Products</h2>
        {error && <p className="text-red-500 mb-4">{error}</p>}
            <ul className="space-y-4">
                {products.map((product) => (
                <li key={product._id} className="flex justify-between items-center border-b pb-2">
                    <div className="flex items-center gap-4">
                        <img
                            src={product.imageURL}
                            alt={product.name}
                            className="w-16 h-16 object-cover rounded-lg"
                        />
                        <div className="flex flex-col">
                            <p className="font-semibold text-zinc-600">{product.name}</p>
                            <p className="text-sm text-zinc-600">Category: {product.category} | Failed: {new Date(product.failureDate).toLocaleDateString()}</p>
                        </div>
                    </div>
                    <div className="flex gap-2">
                        <button className="flex items-center gap-1 bg-blue-400 hover:bg-blue-300 text-zinc-50 px-3 py-1 rounded-full">
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4">
                                <path d="M21.731 2.269a2.625 2.625 0 0 0-3.712 0l-1.157 1.157 3.712 3.712 1.157-1.157a2.625 2.625 0 0 0 0-3.712ZM19.513 8.199l-3.712-3.712-8.4 8.4a5.25 5.25 0 0 0-1.32 2.214l-.8 2.685a.75.75 0 0 0 .933.933l2.685-.8a5.25 5.25 0 0 0 2.214-1.32l8.4-8.4Z" />
                            <path d="M5.25 5.25a3 3 0 0 0-3 3v10.5a3 3 0 0 0 3 3h10.5a3 3 0 0 0 3-3V13.5a.75.75 0 0 0-1.5 0v5.25a1.5 1.5 0 0 1-1.5 1.5H5.25a1.5 1.5 0 0 1-1.5-1.5V8.25a1.5 1.5 0 0 1 1.5-1.5h5.25a.75.75 0 0 0 0-1.5H5.25Z" />
                            </svg>
                            Edit
                        </button>
                        <button
                            onClick={() => handleView(product)}
                            className="flex items-center gap-1 bg-blue-400 hover:bg-blue-300 text-zinc-50 px-3 py-1 rounded-full"
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4">
                                <path fillRule="evenodd" d="M10.5 3.75a6.75 6.75 0 1 0 0 13.5 6.75 6.75 0 0 0 0-13.5ZM2.25 10.5a8.25 8.25 0 1 1 14.59 5.28l4.69 4.69a.75.75 0 1 1-1.06 1.06l-4.69-4.69A8.25 8.25 0 0 1 2.25 10.5Z" clipRule="evenodd" />
                            </svg>
                            View
                        </button>
                        <button className="flex items-center gap-1 bg-red-400 hover:bg-red-300 text-zinc-50 px-3 py-1 rounded-full">
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4">
                                <path fillRule="evenodd" d="M16.5 4.478v.227a48.816 48.816 0 0 1 3.878.512.75.75 0 1 1-.256 1.478l-.209-.035-1.005 13.07a3 3 0 0 1-2.991 2.77H8.084a3 3 0 0 1-2.991-2.77L4.087 6.66l-.209.035a.75.75 0 0 1-.256-1.478A48.567 48.567 0 0 1 7.5 4.705v-.227c0-1.564 1.213-2.9 2.816-2.951a52.662 52.662 0 0 1 3.369 0c1.603.051 2.815 1.387 2.815 2.951Zm-6.136-1.452a51.196 51.196 0 0 1 3.273 0C14.39 3.05 15 3.684 15 4.478v.113a49.488 49.488 0 0 0-6 0v-.113c0-.794.609-1.428 1.364-1.452Zm-.355 5.945a.75.75 0 1 0-1.5.058l.347 9a.75.75 0 1 0 1.499-.058l-.346-9Zm5.48.058a.75.75 0 1 0-1.498-.058l-.347 9a.75.75 0 0 0 1.5.058l.345-9Z" clipRule="evenodd" />
                            </svg>
                            Delete
                        </button>
                    </div>
                </li>
                ))}
            </ul>

            {/* Modal */}
            {showModal && selectedProduct && (
                <div className="fixed inset-0 flex items-center justify-center bg-black/60 z-50 p-4">
                    <div className="bg-zinc-50 rounded-4xl shadow-lg w-full p-6 relative max-w-3xl">
                        <h3 className="text-xl font-bold mb-4 text-blue-400">Product Details</h3>
                        <img src={selectedProduct.imageURL} alt={selectedProduct.name} className="w-full aspect-video object-cover rounded-3xl mb-4" />
                        <div className='text-zinc-600 gap-3 flex flex-col'>
                            <div className='flex gap-4'>
                                <p><strong>Name:</strong> {selectedProduct.name}</p>
                                <p><strong>ID:</strong> {selectedProduct._id}</p>
                            </div>
                            <p><strong>Category:</strong> {selectedProduct.category}</p>
                            <div className='flex gap-4'>
                                <p><strong>Start Date:</strong> {new Date(selectedProduct.startDate).toLocaleDateString()}</p>
                                <p><strong>Failure Date:</strong> {new Date(selectedProduct.failureDate).toLocaleDateString()}</p>
                            </div>
                            <p><strong>Description:</strong> {selectedProduct.description}</p>
                            <p><strong>Designed By:</strong> {selectedProduct.designedBy}</p>
                            <div className='flex gap-4 text-pink-400'>
                                <p><strong>Upvotes:</strong> {selectedProduct.upvotes}</p>
                                <p><strong>Downvotes:</strong> {selectedProduct.downvotes}</p>
                            </div>
                        </div>
                        <button
                            onClick={() => { setShowModal(false); setSelectedProduct(null); }}
                            className="mt-4 bg-pink-400 hover:bg-pink-300 text-zinc-50 px-4 py-2 rounded-full"
                        >
                            Close
                        </button>
                    </div>
                </div>
            )}
        </section>
    );
}