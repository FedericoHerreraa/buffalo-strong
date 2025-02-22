'use client'

import { redirect } from 'next/navigation';
import { useAuth } from '@/app/context/AuthContext';

export default function Layout({ children }: { children: React.ReactNode }) {
    const { user } = useAuth()

    if (!user) {
        redirect('/register'); 
    }
    
    return (
        <div className="layout">
            <main className="main">{children}</main>
        </div>
    );
}