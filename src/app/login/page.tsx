'use client';

import UserLoginForm from '@/components/forms/UserLoginForm';
import Navbar from '@/components/layout/navbar';

export default function LoginPage() {
    return (
        <>
            <Navbar />
            <main className="min-h-screen flex items-center justify-center bg-zinc-100">
                <div className="w-full max-w-md bg-zinc-50 p-6 rounded-4xl shadow-md">
                    <h1 className="text-2xl text-blue-400 font-bold mb-4 text-center">Login</h1>
                    <UserLoginForm />
                </div>
            </main>
        </>
    );
}