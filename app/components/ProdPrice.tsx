'use client'

import { useAuth } from "@/app/context/AuthContext";
import { ProductDB } from "../types/types";


export const ProdPrice = ({ prod } : { prod: ProductDB }) => {
    const { user } = useAuth()

    return (
        <p className="text-md text-zinc-800">
            {user ? 'Precio comerciante: ' : 'Precio público: ' } 
            <span className="font-semibold">
                ${user ? prod.listPrice : prod.sugestedPrice}
            </span>
        </p>
    )

}