'use client';

import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { useAuth } from "@/lib/hooks/useAuth";

// This component handles the navigation bar for the application
export default function Navbar() {
    const router = useRouter();
    const { user, initialized, logout } = useAuth();
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

    // Close mobile menu on route change
    const handleLogout = () => {
        logout();
        setMobileMenuOpen(false);
    };

    const navButtons = (
        <>
            {/* Home */}
            <button
                className="flex items-center gap-1 text-zinc-100 hover:text-pink-400 transition"
                onClick={() => { router.push('/'); setMobileMenuOpen(false); }}
                aria-label="Home"
            >
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
                    <path d="M11.47 3.841a.75.75 0 0 1 1.06 0l8.69 8.69a.75.75 0 1 0 1.06-1.061l-8.689-8.69a2.25 2.25 0 0 0-3.182 0l-8.69 8.69a.75.75 0 1 0 1.061 1.06l8.69-8.689Z" />
                    <path d="m12 5.432 8.159 8.159c.03.03.06.058.091.086v6.198c0 1.035-.84 1.875-1.875 1.875H15a.75.75 0 0 1-.75-.75v-4.5a.75.75 0 0 0-.75-.75h-3a.75.75 0 0 0-.75.75V21a.75.75 0 0 1-.75.75H5.625a1.875 1.875 0 0 1-1.875-1.875v-6.198a2.29 2.29 0 0 0 .091-.086L12 5.432Z" />
                </svg>
                <span>Home</span>
            </button>
            {/* About */}
            <button
                className="flex items-center gap-1 text-zinc-100 hover:text-pink-400 transition"
                onClick={() => { router.push('/about'); setMobileMenuOpen(false); }}
                aria-label="About"
            >
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
                    <path d="M12 .75a8.25 8.25 0 0 0-4.135 15.39c.686.398 1.115 1.008 1.134 1.623a.75.75 0 0 0 .577.706c.352.083.71.148 1.074.195.323.041.6-.218.6-.544v-4.661a6.714 6.714 0 0 1-.937-.171.75.75 0 1 1 .374-1.453 5.261 5.261 0 0 0 2.626 0 .75.75 0 1 1 .374 1.452 6.712 6.712 0 0 1-.937.172v4.66c0 .327.277.586.6.545.364-.047.722-.112 1.074-.195a.75.75 0 0 0 .577-.706c.02-.615.448-1.225 1.134-1.623A8.25 8.25 0 0 0 12 .75Z" />
                    <path fillRule="evenodd" d="M9.013 19.9a.75.75 0 0 1 .877-.597 11.319 11.319 0 0 0 4.22 0 .75.75 0 1 1 .28 1.473 12.819 12.819 0 0 1-4.78 0 .75.75 0 0 1-.597-.876ZM9.754 22.344a.75.75 0 0 1 .824-.668 13.682 13.682 0 0 0 2.844 0 .75.75 0 1 1 .156 1.492 15.156 15.156 0 0 1-3.156 0 .75.75 0 0 1-.668-.824Z" clipRule="evenodd" />
                </svg>
                <span>About</span>
            </button>
            {/* Catalog */}
            <button
                className="flex items-center gap-1 text-zinc-100 hover:text-pink-400 transition"
                onClick={() => { router.push('/catalog'); setMobileMenuOpen(false); }}
                aria-label="Catalog"
            >
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
                    <path d="M11.25 4.533A9.707 9.707 0 0 0 6 3a9.735 9.735 0 0 0-3.25.555.75.75 0 0 0-.5.707v14.25a.75.75 0 0 0 1 .707A8.237 8.237 0 0 1 6 18.75c1.995 0 3.823.707 5.25 1.886V4.533ZM12.75 20.636A8.214 8.214 0 0 1 18 18.75c.966 0 1.89.166 2.75.47a.75.75 0 0 0 1-.708V4.262a.75.75 0 0 0-.5-.707A9.735 9.735 0 0 0 18 3a9.707 9.707 0 0 0-5.25 1.533v16.103Z" />
                </svg>
                <span>Catalog</span>
            </button>
            {/* Login/Logout */}
            {initialized && user?.role === 'user' ? (
                <button
                    className="bg-pink-500 hover:bg-pink-400 text-white px-4 py-2 rounded-full transition"
                    onClick={handleLogout}
                >
                    Logout
                </button>
            ) : (
                <button
                    className="bg-blue-400 hover:bg-blue-300 text-white px-4 py-2 rounded-full transition"
                    onClick={() => { router.push('/login'); setMobileMenuOpen(false); }}
                >
                    Login
                </button>
            )}
        </>
    );

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
                {/* Desktop nav buttons */}
                <div className="hidden md:flex items-center gap-6">
                    {navButtons}
                </div>
                {/* Mobile menu toggle */}
                <button
                    className="md:hidden text-zinc-100"
                    onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                    aria-label="Open mobile menu"
                >
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
                        <path fillRule="evenodd" d="M3 9a.75.75 0 0 1 .75-.75h16.5a.75.75 0 0 1 0 1.5H3.75A.75.75 0 0 1 3 9Zm0 6.75a.75.75 0 0 1 .75-.75h16.5a.75.75 0 0 1 0 1.5H3.75a.75.75 0 0 1-.75-.75Z" clipRule="evenodd" />
                    </svg>
                </button>
            </nav>
            {/* Mobile menu */}
            {mobileMenuOpen && (
                <div className="md:hidden flex flex-col gap-4 bg-blue-500 px-4 pb-4">
                    {navButtons}
                </div>
            )}
        </header>
    );
}