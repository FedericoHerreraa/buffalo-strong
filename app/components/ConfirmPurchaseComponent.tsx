'use client'

import { useAuth } from "@/app/context/AuthContext"
import { useRouter } from "next/navigation"
import { merriweather_sans } from "@/app/fonts/fonts"


export const ConfirmPurchaseComponent = () => {
    const { user } = useAuth()
    const router = useRouter()

    if (!user) router.push('/register')

    return (
        <div className={`h-[80vh] ${merriweather_sans.className}`}>
            <div className="flex md:justify-start justify-center items-center gap-4 mt-10">
                <div className="md:w-full w-0 md:h-[1px] h-0 bg-zinc-300"></div>
                <h1 className="md:text-4xl text-3xl font-bold whitespace-nowrap bg-gradient-to-r from-[#8B5E3B] via-[#6F4E37] to-[#472913] bg-clip-text text-transparent text-center">Finalizar Compra</h1>
                <div className="md:w-full w-0 md:h-[1px] h-0 bg-zinc-300"></div>
            </div>
        </div>
    )
}