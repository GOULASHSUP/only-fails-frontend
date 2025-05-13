'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from "@/lib/hooks/useAuth";

export default function UserLoginForm() {
    const { login } = useAuth();
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
        setError("");
        try {
          await login({ email: formData.email, password: formData.password });
          router.push("/");
        } catch (err: any) {
          console.error("[Login] Error:", err.message);
          setError(err.message || "Login failed");
        }
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-4">
            {error && <p className="text-red-600 text-sm">{error}</p>}

            <div>
                <label className="block text-sm text-blue-400 font-medium pl-3">Email</label>
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
                Log In
            </button>
            <p className="text-sm text-center text-zinc-600">
                Don&apos;t have an account yet?{' '}
                <a href="/register" className="text-blue-400 hover:underline">
                    Register
                </a>
            </p>
        </form>
    );
}