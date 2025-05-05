'use client';

import AdminLoginForm from '@/components/forms/AdminLoginForm';

export default function AdminLoginPage() {
    return (
        <main className="min-h-screen flex items-center justify-center bg-zinc-100">
            <div className="w-full max-w-md p-6 bg-zinc-50 rounded-4xl shadow">
                <h1 className="text-2xl font-bold mb-4 text-center text-blue-400">
                Admin Login
                </h1>
                <AdminLoginForm />
            </div>
        </main>
    );
}