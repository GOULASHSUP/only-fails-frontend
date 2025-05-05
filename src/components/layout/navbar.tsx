'use client';

import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

export default function Navbar() {
    const router = useRouter();
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    useEffect(() => {
        const token = localStorage.getItem('token');
        setIsLoggedIn(!!token);
    }, []);

    const handleLogout = () => {
        localStorage.removeItem('token');
        setIsLoggedIn(false);
        router.refresh();
    };

    return (
        <header className="w-full bg-blue-500 shadow-md fixed top-0 left-0 z-50">
            <nav className="max-w-7xl mx-auto px-4 py-3 flex justify-between items-center">
                {/* Logo */}
                <div
                    className="text-3xl font-extrabold text-zinc-100 cursor-pointer"
                    onClick={() => router.push('/')}
                >
                    OnlyFails
                </div>

                <div className="flex items-center gap-4">
                    {/* Home text button */}
                    <button
                        className="text-zinc-100 hover:text-pink-400 transition"
                        onClick={() => router.push('/')}
                        aria-label="Home"
                        >
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
                            <path d="M11.47 3.841a.75.75 0 0 1 1.06 0l8.69 8.69a.75.75 0 1 0 1.06-1.061l-8.689-8.69a2.25 2.25 0 0 0-3.182 0l-8.69 8.69a.75.75 0 1 0 1.061 1.06l8.69-8.689Z" />
                            <path d="m12 5.432 8.159 8.159c.03.03.06.058.091.086v6.198c0 1.035-.84 1.875-1.875 1.875H15a.75.75 0 0 1-.75-.75v-4.5a.75.75 0 0 0-.75-.75h-3a.75.75 0 0 0-.75.75V21a.75.75 0 0 1-.75.75H5.625a1.875 1.875 0 0 1-1.875-1.875v-6.198a2.29 2.29 0 0 0 .091-.086L12 5.432Z" />
                        </svg>
                    </button>

                    {/* Login/Logout button */}
                    {isLoggedIn ? (
                        <button
                            className="bg-pink-400 hover:bg-pink-300 text-zinc-50 px-4 py-2 rounded-full transition"
                            onClick={handleLogout}
                        >
                            Logout
                        </button>
                    ) : (
                        <button
                            className="bg-blue-400 hover:bg-blue-300 text-zinc-50 px-4 py-2 rounded-full transition"
                            onClick={() => router.push('/login')}
                        >
                            Login
                        </button>
                    )}
                </div>
            </nav>
        </header>
    );
}