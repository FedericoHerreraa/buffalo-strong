'use client'

import { useCart } from "@/app/context/CartContext"
import { useMemo } from "react";
import Image from "next/image";
import {
    Sheet,
    SheetContent,
    SheetDescription,
    SheetHeader,
    SheetTitle,
    SheetTrigger,
} from "@/app/components/ui/sheet"

import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import { Badge } from '@mui/material';

export const Cart = () => {
    const { 
        cart, 
        setCart, 
        deleteOne, 
        incrementOne, 
        decrementOne, 
        totalPurchase
    } = useCart()

    const total = useMemo(() => totalPurchase(), [totalPurchase]);

    return (
        <Sheet>
            <SheetTrigger>
                <Badge badgeContent={cart.length} color="success">
                    <ShoppingCartIcon fontSize="large" className="text-zinc-200"/>
                </Badge>
            </SheetTrigger>
            <SheetContent className="bg-white">
                <SheetHeader>
                    <SheetTitle>Carrito de compras</SheetTitle>
                    <SheetDescription>
                        Una vez que se confirme el carrito, sera redireccionado hacia el formulario de compra para luego finalizar el pedido.
                    </SheetDescription>
                </SheetHeader>
                <section className="mt-10 flex flex-col gap-5">
                    {cart.length !== 0 ? (
                        cart.map((item, index) => (
                           <div key={index} className="flex items-center gap-5 p-2 border-2 border-zinc-300 rounded-xl">
                                <Image 
                                   src={item.img[0]}
                                   alt={item.title}
                                   width={100}
                                   height={100}
                                />
                                <div className="flex flex-col gap-2">
                                    <div className="flex flex-col gap-1">
                                        <p className="text-lg font-semibold">{item.title}</p>
                                        <p className="text-sm text-zinc-600">Cantidad: {item.quantity}</p>
                                        <p className="text-sm text-zinc-600">Precio: ${item.sugestedPrice * item.quantity}</p>
                                    </div>
                                    <div className="flex gap-7 items-center">
                                        <button 
                                            onClick={() => deleteOne(item.id)}
                                            className="bg-red-700 text-zinc-200 px-2 py-1 rounded-md"
                                        >
                                            Eliminar
                                        </button>
                                        <div className="flex gap-3 items-center transition-all duration-150">
                                            <p 
                                                onClick={() => incrementOne(item.id)}
                                                className="text-lg border border-zinc-400 rounded-lg px-2 cursor-pointer bg-zinc-100 hover:bg-zinc-300">+</p>
                                            <p 
                                                onClick={() => decrementOne(item.id)}
                                                className="text-lg border border-zinc-400 rounded-lg px-2 cursor-pointer bg-zinc-100 hover:bg-zinc-300">-</p>
                                        </div>
                                    </div>
                                </div>
                                
                           </div>
                       ))
                    ) : (
                        <p className="text-gray-700 text-xl font-semibold text-center">No hay productos en el carrito.</p>
                    )}
                </section>
                {cart.length !== 0 && <p className="mt-5 text-zinc-700">Total de la compra: <span className="font-semibold">${total}</span></p>}
                <div className="flex gap-5 justify-center">
                    <button 
                        onClick={() => setCart([])}
                        className="mt-10 border border-zinc-700 hover:bg-zinc-100 rounded-md px-5 py-2"
                    >
                        Vaciar carrito
                    </button>
                    <button className="mt-10 bg-gray-600 border border-zinc-700 text-zinc-200 rounded-md px-5 py-2">
                        Finalizar compra
                    </button>
                </div>
            </SheetContent>
        </Sheet>

    )
}