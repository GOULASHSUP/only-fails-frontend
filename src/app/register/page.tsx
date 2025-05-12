'use client';

import Navbar from '@/components/layout/navbar';
import UserRegisterForm from '@/components/forms/UserRegisterForm';

export default function RegisterPage() {
    return (
        <>
            <Navbar />
            <main className="min-h-screen flex items-center justify-center bg-zinc-100">
                <div className="w-full max-w-md bg-zinc-50 p-6 rounded-4xl shadow-md">
                    <h1 className="text-2xl text-blue-400 font-bold mb-4 text-center">Register</h1>
                    <UserRegisterForm />
                </div>
            </main>
        </>
    );
}