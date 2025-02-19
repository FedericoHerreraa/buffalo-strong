'use client'

import { useAuth } from "@/app/context/AuthContext"
import { useRouter } from "next/navigation"


export const ConfirmPurchaseComponent = () => {
    const { user } = useAuth()
    const router = useRouter()

    if (!user) router.push('/register')

    return (
        <div className="h-[80vh]">
            <h1>Confirm Purchase</h1>
        </div>
    )
}