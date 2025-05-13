'use client';

import { useState } from 'react';
import { API_BASE_URL } from "@/lib/config";

export default function AddProductForm() {
    // State to track form inputs
    const [formData, setFormData] = useState({
        name: '',
        startDate: '',
        failureDate: '',
        description: '',
        designedBy: '',
        imageURL: '',
        category: '',
    });

    // State to handle API success or error messages
    const [error, setError] = useState('');
    const [successMessage, setSuccessMessage] = useState('');

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    // Handles form submission. Validates token, sends request to backend, and resets form
    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError('');
        setSuccessMessage('');

    const token = localStorage.getItem('token');
        // Get the token from local storage
        if (!token) {
            setError('Admin token not found.');
        return;
    }

    try {
    const response = await fetch(`${API_BASE_URL}/failed-products`, {
        // Send a POST request to the backend API to add a new product
        method: 'POST',
        headers: {
        'Content-Type': 'application/json',
        'auth-token': token || '',
        },
        body: JSON.stringify(formData),
    });

    if (!response.ok) {
        throw new Error('Failed to add product');
    }

        // Send success message + reset form
        setSuccessMessage('Product added successfully!');
        console.log('[AddProductForm] Product added successfully:', formData);
        setFormData({
            name: '',
            startDate: '',
            failureDate: '',
            description: '',
            designedBy: '',
            imageURL: '',
            category: '',
        });
        } catch (err) {
        console.error('[AddProductForm] Error:', err);
        setError('Failed to add product');
        console.log('[AddProductForm] Failed to add product:', err);
        }
    };

    // Render the form UI with input fields and feedback messages
    return (
        <section id="add-product" className="w-full max-w-7xl mx-auto p-6 bg-zinc-50 rounded-4xl shadow-md mt-24">
            <h2 className="text-2xl font-bold mb-6 text-center text-blue-400">Add New Failed Product</h2>
            <form onSubmit={handleSubmit} className="grid grid-cols-1 gap-4">
                <div>
                    <label className="block text-sm text-blue-400 font-medium pl-3">Product Name – Min 20 characters</label>
                    <input
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        className="w-full border text-zinc-600 border-blue-400 rounded-full px-3 py-2"
                        required
                        minLength={20}
                        maxLength={500}
                    />
                </div>
                <div>
                    <label className="block text-sm text-blue-400 font-medium pl-3">Start Date</label>
                    <input name="startDate" type="date" value={formData.startDate} onChange={handleChange} className="w-full border text-zinc-600 border-blue-400 rounded-full px-3 py-2" required />
                </div>
                <div>
                    <label className="block text-sm text-blue-400 font-medium pl-3">Failure Date</label>
                    <input name="failureDate" type="date" value={formData.failureDate} onChange={handleChange} className="w-full border text-zinc-600 border-blue-400 rounded-full px-3 py-2" required />
                </div>
                <div>
                    <label className="block text-sm text-blue-400 font-medium pl-3">Description – Min 20 characters</label>
                    <textarea
                        name="description"
                        value={formData.description}
                        onChange={handleChange}
                        className="w-full border text-zinc-600 border-blue-400 rounded-4xl px-3 py-2"
                        required
                        minLength={20}
                        maxLength={500}
                    />
                </div>
                <div>
                    <label className="block text-sm text-blue-400 font-medium pl-3">Designed By – Max 50 characters</label>
                    <input
                        name="designedBy"
                        value={formData.designedBy}
                        onChange={handleChange}
                        className="w-full border text-zinc-600 border-blue-400 rounded-full px-3 py-2"
                        required
                        maxLength={50}
                    />
                </div>
                <div>
                    <label className="block text-sm text-blue-400 font-medium pl-3">Image URL</label>
                    <input name="imageURL" value={formData.imageURL} onChange={handleChange} className="w-full border text-zinc-600 border-blue-400 rounded-full px-3 py-2" required />
                </div>
                <div>
                    <label className="block text-sm text-blue-400 font-medium pl-3">Category</label>
                    <input name="category" value={formData.category} onChange={handleChange} className="w-full border text-zinc-600 border-blue-400 rounded-full px-3 py-2" required />
                </div>

                {error && <p className="text-red-500">{error}</p>}
                {successMessage && <p className="text-blue-400">{successMessage}</p>}

                <div className="flex justify-end w-full mt-4 md:mt-0">
                    <button type="submit" className="bg-pink-400 hover:bg-pink-300 text-zinc-50 px-4 py-2 rounded-full transition w-full md:w-auto">
                        Add Product
                    </button>
                </div>
            </form>
        </section>
    );
}