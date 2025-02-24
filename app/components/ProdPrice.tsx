'use client'

import { useAuth } from "@/app/context/AuthContext";
import { ProductDB } from "../types/types";


export const ProdPrice = ({ prod } : { prod: ProductDB }) => {
    const { user } = useAuth()

    return (
        <p className="text-lg text-zinc-800 p-3">
            $ {(user ? prod.listPrice : prod.sugestedPrice).toLocaleString('es-AR')}
        </p>
    )

}