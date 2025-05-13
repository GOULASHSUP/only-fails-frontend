'use client';

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/lib/hooks/useAuth";
import AdminNavbar from '@/components/admin/AdminNavbar';
import AddProductForm from '@/components/admin/AddProductForm';
import ProductListSection from '@/components/admin/ProductListSection';

export default function AdminDashboardPage() {
    const { user, initialized } = useAuth();
    const router = useRouter();

    useEffect(() => {
        if (!initialized) return;
        if (!user || user.role !== "admin") {
            router.replace("/admin/login");
        }
    }, [initialized, user, router]);

    if (!initialized || !user || user.role !== "admin") {
        return null;
    }

    return (
        <>
        <AdminNavbar />
        <main className="min-h-screen p-8 bg-zinc-100">
            <AddProductForm />
            <ProductListSection />
        </main>
        </>
    );
}