'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

export default function AdminDashboardPage() {
    const [isAdmin, setIsAdmin] = useState(false);
    const router = useRouter();

useEffect(() => {
    const token = localStorage.getItem('token');

    if (!token) {
        router.push('/admin/login');
        return;
    }

    try {
        const payload = JSON.parse(atob(token.split('.')[1]));
    if (payload.role === 'admin') {
        setIsAdmin(true);
    } else {
        router.push('/admin/login');
    }
    } catch {
        router.push('/admin/login');
    }
    }, [router]);

    const handleLogout = () => {
        localStorage.removeItem('token');
        router.push('/');
    };

    if (!isAdmin) {
        return null;
    }

    return (
        <main className="min-h-screen flex flex-col items-center justify-center bg-zinc-100 gap-4">
        <h1 className="text-2xl font-bold text-pink-400">You are on the admin panel.</h1>
        <button
            className="bg-pink-400 hover:bg-pink-300 text-zinc-50 px-4 py-2 rounded-full transition"
            onClick={handleLogout}
        >
            Logout
        </button>
        </main>
    );
}