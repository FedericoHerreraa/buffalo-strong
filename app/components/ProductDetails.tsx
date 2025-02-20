'use client'

import { ProductCart } from "@/app/types/types"
import { useAuth } from "@/app/context/AuthContext"

export const ProductDetails = ({ product } : { product: ProductCart}) => {
    const { user } = useAuth()

    return (
        <>
            <p className="text-zinc-600">{product.description}</p>
            <p className="mt-6">Código: {product.listCode}</p>
            <p className="mt-4 font-semibold">Marca: {product.brand}</p>
            <p className="mt-2 text-lg font-bold">Precio: ${user?.role === 'Invitado' ? product.sugestedPrice : product.listPrice}</p>
            <p className={`mt-2 text-white py-1 px-4 w-fit rounded-full ${product.stock > 10 ? 'bg-green-600' : product.stock > 0 ? 'bg-yellow-600' : 'bg-red-700'}`}>
                {product.stock} {product.stock > 1 ? 'Unidades' : 'Unidad'}
            </p> 
        </>
    )
}