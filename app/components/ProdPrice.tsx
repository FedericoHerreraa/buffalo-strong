'use client'

import { useAuth } from "@/app/context/AuthContext";
import { ProductDB } from "../types/types";


export const ProdPrice = ({ prod } : { prod: ProductDB }) => {
    const { user } = useAuth()

    const price = (user ? prod.listPrice : prod.sugestedPrice)

    return (
        <div className="text-zinc-800 p-3 flex flex-col">
            $ {price.toLocaleString('es-AR')}
            <p className="line-through text-xs text-zinc-500">${(price * 1.4).toLocaleString('es-AR')}</p>
        </div>
    )
}