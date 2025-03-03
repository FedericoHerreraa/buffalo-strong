'use client'

import { useState } from "react";
import { useCart } from "@/app/context/CartContext";
import { useAuth } from "@/app/context/AuthContext"
import { ProductDB } from "@/app/types/types";
import { redirect } from "next/navigation";

import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/app/components/ui/select";

export const AddToCart = ({ prod, color }: { prod: ProductDB, color: string }) => {
    const [count, setCount] = useState<number>(1);
    const { addToCart } = useCart()
    const { user } = useAuth()

    return (
        <>
            <h1 className="md:text-2xl text-xl text-zinc-600 font-bold mb-3">
                {prod.title}
            </h1>
            <div>
                <p className="text-zinc-600">{prod.description}</p>
                <p className="mt-6">Código: <span className="font-semibold">{prod.listCode}</span></p>
                <p className="mt-4">Marca: <span className="font-semibold">{prod.brand}</span></p>
                <p className="mt-2 text-lg">Precio: <span className="font-bold">${(user ? prod.listPrice : prod.sugestedPrice).toLocaleString('es-AR')}</span></p>
                <div className="flex items-center gap-3 mt-2">
                    <div className={`text-white font-thin py-3 px-3 w-fit rounded-full 
                        ${prod.stock > 10 
                            ? 'bg-green-600' 
                            : prod.stock > 0 
                                ? 'bg-yellow-600' 
                                : 'bg-red-700'
                        }`}>
                    </div>
                    <p className="text-zinc-500">Unidades Disponibles</p>
                </div>
            </div>
            <div className="flex flex-col gap-3 w-[200px] mt-10">
                <Select onValueChange={(value) => setCount(Number(value))}>
                    <SelectTrigger className="p-2 gap-3 border-zinc-300 text-zinc-500 w-[200px]">
                        <SelectValue placeholder="Seleccionar cantidad" />
                    </SelectTrigger>
                    <SelectContent className="p-2 border-zinc-300 bg-white text-zinc-600">
                        {Array.from({ length: prod.stock }, (_, i) => i + 1).map((qty) => (
                            <SelectItem key={qty} value={qty.toString()} className="border-none cursor-pointer hover:bg-zinc-500">
                                {qty}
                            </SelectItem>
                        ))}
                    </SelectContent>
                </Select>
                <button
                    disabled={count === 0}
                    onClick={() => {
                        if (!user) redirect('/register')

                        addToCart({ ...prod, quantity: count, color })
                        setCount(1)
                    }}
                    className="bg-zinc-800 px-4 py-2 rounded-lg text-zinc-300 hover:bg-zinc-600 hover:text-white transition-all duration-150"
                >
                    Agregar al carrito
                </button>
            </div>
        </>
    )
}