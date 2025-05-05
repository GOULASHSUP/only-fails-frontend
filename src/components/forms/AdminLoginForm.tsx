'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { API_BASE_URL } from '@/lib/auth';

export default function AdminLoginForm() {
    const router = useRouter();
    const [formData, setFormData] = useState({
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
        const res = await fetch(`${API_BASE_URL}/auth/admin/login`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(formData),
    });

    const data = await res.json();

    if (!res.ok) {
        console.warn('[Admin Login] Authentication failed.');
        throw new Error(data.message || 'Admin login failed');
    }

    console.log('[Admin Login] Email:', formData.email);
    console.log('[Admin Login] Login successful. Redirecting to dashboard.');

    localStorage.setItem('token', data.token);
    router.push('/admin/dashboard');
    } catch (err: any) {
    console.error('[Admin Login] Error:', err.message);
    setError('Incorrect email or password');
    }
};

return (
    <form onSubmit={handleSubmit} className="space-y-4">
        {error && <p className="text-red-600 text-sm">{error}</p>}

        <div>
            <label className="block text-sm text-blue-400 font-medium pl-3">Admin Email</label>
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
            Log In as Admin
        </button>
    </form>
);
}