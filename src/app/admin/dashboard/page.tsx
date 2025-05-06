'use client';

import useAdminAuth from '@/lib/hooks/useAdminAuth';
import AdminNavbar from '@/components/admin/AdminNavbar';
import AddProductForm from '@/components/admin/AddProductForm';

export default function AdminDashboardPage() {
    const isAdmin = useAdminAuth();

    if (!isAdmin) return null;

    return (
        <>
        <AdminNavbar />
        <main className="min-h-screen p-8 bg-zinc-100">
            <AddProductForm />
        </main>
        </>
    );
}