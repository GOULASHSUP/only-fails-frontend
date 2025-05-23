'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from "@/lib/hooks/useAuth";

export default function AdminNavbar() {
    const router = useRouter();
    const { user, initialized, logout } = useAuth();
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

    // Logout function and close mobile menu 
    const handleLogout = () => {
        logout();
        setMobileMenuOpen(false);
    };

    if (!initialized || user?.role !== "admin") return null;

    const navButtons = (
        <>
            <button
                className="text-zinc-100 hover:text-pink-400 transition"
                onClick={() => {
                    router.push('/admin/dashboard#add-product');
                    setMobileMenuOpen(false);
                }}
            >
                <span className="flex items-center gap-1">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
                        <path fillRule="evenodd" d="M12 2.25c-5.385 0-9.75 4.365-9.75 9.75s4.365 9.75 9.75 9.75 9.75-4.365 9.75-9.75S17.385 2.25 12 2.25ZM12.75 9a.75.75 0 0 0-1.5 0v2.25H9a.75.75 0 0 0 0 1.5h2.25V15a.75.75 0 0 0 1.5 0v-2.25H15a.75.75 0 0 0 0-1.5h-2.25V9Z" clipRule="evenodd" />
                    </svg>
                    Add Product
                </span>
            </button>
            <button
                className="text-zinc-100 hover:text-pink-400 transition"
                onClick={() => {
                    router.push('/admin/dashboard#product-list');
                    setMobileMenuOpen(false);
                }}
            >
                <span className="flex items-center gap-1">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
                        <path fillRule="evenodd" d="M7.502 6h7.128A3.375 3.375 0 0 1 18 9.375v9.375a3 3 0 0 0 3-3V6.108c0-1.505-1.125-2.811-2.664-2.94a48.972 48.972 0 0 0-.673-.05A3 3 0 0 0 15 1.5h-1.5a3 3 0 0 0-2.663 1.618c-.225.015-.45.032-.673.05C8.662 3.295 7.554 4.542 7.502 6ZM13.5 3A1.5 1.5 0 0 0 12 4.5h4.5A1.5 1.5 0 0 0 15 3h-1.5Z" clipRule="evenodd" />
                        <path fillRule="evenodd" d="M3 9.375C3 8.339 3.84 7.5 4.875 7.5h9.75c1.036 0 1.875.84 1.875 1.875v11.25c0 1.035-.84 1.875-1.875 1.875h-9.75A1.875 1.875 0 0 1 3 20.625V9.375Zm9.586 4.594a.75.75 0 0 0-1.172-.938l-2.476 3.096-.908-.907a.75.75 0 0 0-1.06 1.06l1.5 1.5a.75.75 0 0 0 1.116-.062l3-3.75Z" clipRule="evenodd" />
                    </svg>
                    Products
                </span>
            </button>
            <button
                className="text-zinc-100 hover:text-pink-400 transition"
                onClick={() => {
                    router.push('/admin/dashboard#user-list');
                    setMobileMenuOpen(false);
                }}
            >
                <span className="flex items-center gap-1">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
                        <path fillRule="evenodd" d="M8.25 6.75a3.75 3.75 0 1 1 7.5 0 3.75 3.75 0 0 1-7.5 0ZM15.75 9.75a3 3 0 1 1 6 0 3 3 0 0 1-6 0ZM2.25 9.75a3 3 0 1 1 6 0 3 3 0 0 1-6 0ZM6.31 15.117A6.745 6.745 0 0 1 12 12a6.745 6.745 0 0 1 6.709 7.498.75.75 0 0 1-.372.568A12.696 12.696 0 0 1 12 21.75c-2.305 0-4.47-.612-6.337-1.684a.75.75 0 0 1-.372-.568 6.787 6.787 0 0 1 1.019-4.38Z" clipRule="evenodd" />
                        <path d="M5.082 14.254a8.287 8.287 0 0 0-1.308 5.135 9.687 9.687 0 0 1-1.764-.44l-.115-.04a.563.563 0 0 1-.373-.487l-.01-.121a3.75 3.75 0 0 1 3.57-4.047ZM20.226 19.389a8.287 8.287 0 0 0-1.308-5.135 3.75 3.75 0 0 1 3.57 4.047l-.01.121a.563.563 0 0 1-.373.486l-.115.04c-.567.2-1.156.349-1.764.441Z" />
                    </svg>
                    Users
                </span>
            </button>
            <button
                className="bg-pink-500 hover:bg-pink-400 text-white px-4 py-2 rounded-full transition"
                onClick={() => {
                    handleLogout();
                }}
            >
                Logout
            </button>
        </>
    );

    // Render header with navigation for desktop and a toggleable menu for mobile
    return (
        <header className="w-full bg-blue-500 shadow-md fixed top-0 left-0 z-50">
            <nav className="max-w-7xl mx-auto px-4 py-3 flex justify-between items-center">
                <div
                    className="text-3xl font-extrabold text-zinc-100 cursor-pointer"
                    onClick={() => router.push('/admin/dashboard')}
                >
                    OnlyFails Admin
                </div>
                <div className="hidden md:flex items-center gap-6">
                    {navButtons}
                </div>
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
            {mobileMenuOpen && (
                <div className="md:hidden flex flex-col gap-4 bg-blue-500 px-4 pb-4">
                    {navButtons}
                </div>
            )}
        </header>
    );
}