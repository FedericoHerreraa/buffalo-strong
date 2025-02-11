'use client'

import { useState } from "react";
import { useCart } from "@/app/context/CartContext";
import { ProductDB } from "@/app/types/types";

export const AddToCart = ({ prod } : { prod: ProductDB }) => {
    const [count, setCount] = useState<number>(1);
    const { addToCart } = useCart()

    return (
        <div className="flex flex-col gap-3 w-[200px] mt-10">
            <div className="flex items-center justify-between mx-2">
                <p 
                    onClick={() => setCount(count + 1)}
                    className="text-xl cursor-pointer"
                >
                    +
                </p>
                <p>{count}</p>
                <p 
                    onClick={count > 0 ? () => setCount(count - 1) : () => {}}
                    className="text-xl cursor-pointer"
                >
                    -
                </p>
            </div>
            <button 
                onClick={() => {
                    addToCart({...prod, quantity: count})
                    setCount(1)
                }}
                className="bg-zinc-800 px-4 py-2 rounded-lg text-zinc-300 hover:bg-zinc-200 hover:text-white transition-all duration-150"
            >
                Agregar al carrito
            </button>
        </div>
    )
}