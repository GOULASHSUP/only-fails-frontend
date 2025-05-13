'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from "@/lib/hooks/useAuth";
import { API_BASE_URL } from '@/lib/config';

export default function UserRegisterForm() {
const { login } = useAuth();
const router = useRouter();
const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
});
const [error, setError] = useState('');

const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
};

const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    try {
    console.log('[Register] Submitting form:', { username: formData.username, email: formData.email });
    const res = await fetch(`${API_BASE_URL}/auth/register`, {
        method: 'POST',
        headers: {
        'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
    });
    console.log('[Register] Server response status:', res.status);

    if (!res.ok) {
        const data = await res.json();
        throw new Error(data.message || 'Registration failed');
    }
    await login({ email: formData.email, password: formData.password });
    router.push("/");
    } catch (err: any) {
        console.error('[Register] Registration error:', err.message);
        setError(err.message);
    }
};

return (
    <form onSubmit={handleSubmit} className="space-y-4">
        {error && <p className="text-red-600 text-sm">{error}</p>}

        <div>
            <label className="block text-sm text-blue-400 font-medium pl-3">Username</label>
            <input
            name="username"
            type="text"
            className="w-full border text-zinc-600 border-blue-400 rounded-full px-3 py-2"
            value={formData.username}
            onChange={handleChange}
            required
            minLength={6}
            maxLength={25}
            />
        </div>

        <div>
            <label className="block text-sm  text-blue-400 font-medium pl-3">Email</label>
            <input
            name="email"
            type="email"
            className="w-full border text-zinc-600 border-blue-400 rounded-full px-3 py-2"
            value={formData.email}
            onChange={handleChange}
            required
            minLength={6}
            maxLength={50}
            />
        </div>

        <div>
            <label className="block text-sm text-blue-400 font-medium pl-3">Password</label>
            <input
            name="password"
            type="password"
            className="w-full border text-zinc-600 border-blue-400 rounded-full px-3 py-2"
            value={formData.password}
            onChange={handleChange}
            required
            minLength={8}
            maxLength={100}
            />
        </div>

        <button
            type="submit"
            className="w-full bg-pink-400 text-zinc-50 py-2 rounded-full hover:bg-pink-300 transition"
        >
            Register
        </button>
        <p className="text-sm text-center text-zinc-600">
            Already have an account?{' '}
            <a href="/login" className="text-blue-400 hover:underline">
                Log in
            </a>
        </p>
    </form>
);
}