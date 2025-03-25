'use client'

import { useAuth } from "@/app/context/AuthContext";
import { ProductDB } from "../types/types";


export const ProdPrice = ({ prod } : { prod: ProductDB }) => {
    const { user } = useAuth()

    return (
        <div className="text-zinc-800 p-1 flex flex-col">
            {!user ? (
                <>
                    <p className="text-zinc-800 flex md:gap-1 md:flex-row flex-col md:mb-0 mb-2">Precio público: <span className="font-semibold">${prod?.sugestedPrice.toLocaleString('es-AR')}</span></p>
                </>
            ) : (
                <>
                    <p className="text-zinc-800 flex md:gap-1 md:flex-row flex-col md:mb-0 mb-2">Precio comercio: <span className="font-semibold">${prod?.listPrice.toLocaleString('es-AR')}</span></p>
                    <p>Iva 21% | ${prod.listPrice * 0.21}</p>
                    <p className="font-semibold">PVP: ${prod.sugestedPrice.toLocaleString('es-AR')}</p>
                </>
            )}            
        </div>
    )
}