'use client';

import { useEffect, useState } from 'react';
import { API_BASE_URL } from "@/lib/config";

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

// Main component definition
export default function ProductListSection() {
    const [products, setProducts] = useState<Product[]>([]);
    const [error, setError] = useState('');
    const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
    const [showModal, setShowModal] = useState(false);
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [productToDelete, setProductToDelete] = useState<string | null>(null);
    const [showEditModal, setShowEditModal] = useState(false);
    const [productToEdit, setProductToEdit] = useState<Product | null>(null);

    const handleView = (product: Product) => {
        setSelectedProduct(product);
        setShowModal(true);
    };

    // Async function to get all products from the API
    useEffect(() => {
        const fetchProducts = async () => {
        try {
            const res = await fetch(`${API_BASE_URL}/failed-products`);
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

    const handleDelete = async (productId: string) => {
        const token = localStorage.getItem('token');
        if (!token) {
            alert('You are not authorized to delete this product.');
            return;
        }

        setProductToDelete(productId);
        setShowDeleteModal(true);
        return;
    };

    // Main UI for displaying product list
    return (
        <section id="product-list" className="w-full max-w-7xl mx-auto bg-zinc-50 shadow-md rounded-4xl p-6 mt-8">
        <h2 className="text-2xl font-bold mb-6 text-center text-blue-400">All Failed Products</h2>
        {error && <p className="text-red-500 mb-4">{error}</p>}
            <ul className="space-y-4">
                {products.map((product) => (
                <li key={product._id} className="flex justify-between items-center border-b-2 text-zinc-600 pb-4">
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
                    <div className="flex flex-col gap-2 sm:flex-row">
                        <button
                            onClick={() => {
                                setProductToEdit(product);
                                setShowEditModal(true);
                            }}
                            className="flex items-center gap-1 bg-blue-400 hover:bg-blue-300 text-zinc-50 px-3 py-1 rounded-full"
                        >
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
                        <button
                            onClick={() => handleDelete(product._id)}
                            className="flex items-center gap-1 bg-red-400 hover:bg-red-300 text-zinc-50 px-3 py-1 rounded-full"
                        >
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

            {showDeleteModal && productToDelete && (
                <div className="fixed inset-0 flex items-center justify-center bg-black/60 z-50 p-4">
                    <div className="bg-zinc-50 rounded-4xl shadow-lg w-full max-w-md p-6 text-center">
                        <h3 className="text-xl font-bold text-red-400 mb-4">Confirm Deletion</h3>
                        <p className="text-zinc-600 mb-6">Are you sure you want to delete this product? This action cannot be undone.</p>
                        <div className="flex justify-center gap-4">
                        <button
                            onClick={async () => {
                            const token = localStorage.getItem('token');
                            if (!token) {
                                alert('You are not authorized to delete this product.');
                                return;
                            }
                            try {
                                const res = await fetch(`${API_BASE_URL}/failed-products/${productToDelete}`, {
                                method: 'DELETE',
                                headers: {
                                    'Content-Type': 'application/json',
                                    'auth-token': token,
                                },
                                });
                                if (!res.ok) {
                                throw new Error('Failed to delete the product');
                                }
                                setProducts(products.filter((p) => p._id !== productToDelete));
                                console.log('[ProductListSection] Product deleted successfully');
                            } catch (err: any) {
                                console.error('[ProductListSection] Error deleting product:', err.message);
                                alert('Failed to delete product. Please try again.');
                            } finally {
                                setShowDeleteModal(false);
                                setProductToDelete(null);
                            }
                            }}
                            className="bg-red-400 hover:bg-red-300 text-zinc-50 px-4 py-2 rounded-full"
                        >
                            Delete
                        </button>
                        <button
                            onClick={() => {
                            setShowDeleteModal(false);
                            setProductToDelete(null);
                            }}
                            className="bg-blue-400 hover:bg-blue-300 text-zinc-50 px-4 py-2 rounded-full"
                        >
                            Cancel
                        </button>
                        </div>
                    </div>
                </div>
            )}

            {showEditModal && productToEdit && (
                <div className="fixed inset-0 flex items-center justify-center bg-black/60 z-50 p-4">
                    <div className="bg-zinc-50 rounded-4xl shadow-lg w-full p-6 relative max-w-3xl">
                        <h3 className="text-xl font-bold mb-4 text-blue-400">Edit Product</h3>
                        <form
                            onSubmit={async (e) => {
                                e.preventDefault();
                                const token = localStorage.getItem('token');
                                if (!token || !productToEdit) {
                                alert('You are not authorized to update this product.');
                                return;
                                }
                                try {
                                const res = await fetch(` ${API_BASE_URL}/failed-products/${productToEdit._id}`, {
                                    method: 'PUT',
                                    headers: {
                                    'Content-Type': 'application/json',
                                    'auth-token': token,
                                    },
                                    body: JSON.stringify(productToEdit),
                                });
                                const contentType = res.headers.get('content-type');

                                if (!res.ok) {
                                    const errorText = await res.text();
                                    console.error(`[ProductListSection] Update failed: ${res.status}`);
                                    throw new Error(errorText || 'Failed to update the product');
                                }

                                if (contentType && contentType.includes('application/json')) {
                                    const updated = await res.json();
                                    setProducts((prev) => prev.map((p) => (p._id === updated._id ? updated : p)));
                                    console.log('[ProductListSection] Product updated successfully');
                                } else {
                                    const successText = await res.text();
                                    console.log('[ProductListSection] Server message:', successText);
                                }

                                setShowEditModal(false);
                                setProductToEdit(null);
                                } catch (err: any) {
                                console.error('[ProductListSection] Error updating product:', err.message);
                                alert('Failed to update product. Please try again.');
                                }
                            }}
                            className="grid grid-cols-1 gap-4 text-zinc-600"
                            >
                            <div>
                                <label className="block text-sm text-blue-400 font-medium pl-3">Product Name – Min 20 characters</label>
                                <input
                                    name="name"
                                    value={productToEdit.name}
                                    onChange={(e) => setProductToEdit({ ...productToEdit, name: e.target.value })}
                                    className="w-full border text-zinc-600 border-blue-400 rounded-full px-3 py-2"
                                    required
                                    minLength={20}
                                    maxLength={500}
                                    placeholder="Enter the product name"
                                />
                            </div>
                            <div>
                                <label className="block text-sm text-blue-400 font-medium pl-3">Start Date</label>
                                <input
                                    name="startDate"
                                    type="date"
                                    value={new Date(productToEdit.startDate).toISOString().split('T')[0]}
                                    onChange={(e) => setProductToEdit({ ...productToEdit, startDate: e.target.value })}
                                    className="w-full border text-zinc-600 border-blue-400 rounded-full px-3 py-2"
                                    required
                                    placeholder="YYYY-MM-DD"
                                />
                            </div>
                            <div>
                                <label className="block text-sm text-blue-400 font-medium pl-3">Failure Date</label>
                                <input
                                    name="failureDate"
                                    type="date"
                                    value={new Date(productToEdit.failureDate).toISOString().split('T')[0]}
                                    onChange={(e) => setProductToEdit({ ...productToEdit, failureDate: e.target.value })}
                                    className="w-full border text-zinc-600 border-blue-400 rounded-full px-3 py-2"
                                    required
                                    placeholder="YYYY-MM-DD"
                                />
                            </div>
                            <div>
                                <label className="block text-sm text-blue-400 font-medium pl-3">Description – Min 20 characters</label>
                                <textarea
                                    name="description"
                                    value={productToEdit.description}
                                    onChange={(e) => setProductToEdit({ ...productToEdit, description: e.target.value })}
                                    className="w-full border text-zinc-600 border-blue-400 rounded-4xl px-3 py-2"
                                    required
                                    minLength={20}
                                    maxLength={500}
                                    rows={4}
                                    placeholder="Write a short description"
                                />
                            </div>
                            <div>
                                <label className="block text-sm text-blue-400 font-medium pl-3">Designed By – Max 50 characters</label>
                                <input
                                    name="designedBy"
                                    value={productToEdit.designedBy}
                                    onChange={(e) => setProductToEdit({ ...productToEdit, designedBy: e.target.value })}
                                    className="w-full border text-zinc-600 border-blue-400 rounded-full px-3 py-2"
                                    required
                                    maxLength={50}
                                    placeholder="Enter the designer's name"
                                />
                            </div>
                            <div>
                                <label className="block text-sm text-blue-400 font-medium pl-3">Image URL</label>
                                <input
                                    name="imageURL"
                                    value={productToEdit.imageURL}
                                    onChange={(e) => setProductToEdit({ ...productToEdit, imageURL: e.target.value })}
                                    className="w-full border text-zinc-600 border-blue-400 rounded-full px-3 py-2"
                                    required
                                    placeholder="Paste image URL"
                                />
                            </div>
                            <div>
                                <label className="block text-sm text-blue-400 font-medium pl-3">Category</label>
                                <input
                                    name="category"
                                    value={productToEdit.category}
                                    onChange={(e) => setProductToEdit({ ...productToEdit, category: e.target.value })}
                                    className="w-full border text-zinc-600 border-blue-400 rounded-full px-3 py-2"
                                    required
                                    placeholder="Enter category"
                                />
                            </div>

                            <div className="flex justify-end gap-4 mt-4">
                                <button
                                type="button"
                                onClick={() => {
                                    setShowEditModal(false);
                                    setProductToEdit(null);
                                }}
                                className="bg-blue-400 hover:bg-blue-300 text-zinc-50 px-4 py-2 rounded-full"
                                >
                                Cancel
                                </button>
                                <button
                                type="submit"
                                className="bg-pink-400 hover:bg-pink-300 text-zinc-50 px-4 py-2 rounded-full"
                                >
                                Save
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </section>
    );
}