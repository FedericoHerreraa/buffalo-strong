'use client'

import { useAuth } from "@/app/context/AuthContext";
import { useRouter } from "next/navigation";


export default function Layout({ children }: { children: React.ReactNode }) {
    const { user } = useAuth()
    const router = useRouter()

    if (!user) {
        router.push('/register')
        return null
    } else {
        return (
            <div className="layout">
                <main className="main">{children}</main>
            </div>
        );
    }
}