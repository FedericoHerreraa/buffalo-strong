'use client'

import { redirect } from 'next/navigation';
import { useAuth } from '@/app/context/AuthContext';
import { Toaster } from '@/app/components/ui/sonner';

export default function Layout({ children }: { children: React.ReactNode }) {
    const { user, loading } = useAuth()

    if (!loading && user?.role.toLowerCase() !== 'admin') {
        redirect('/register'); 
    }

    return (
        <div className="layout">
            <main className="main">{children}</main>
            <Toaster />
        </div>
    );
}