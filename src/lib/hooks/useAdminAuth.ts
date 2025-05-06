'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

export default function useAdminAuth() {
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

    return isAdmin;
}