'use client'

import { useCart } from "@/app/context/CartContext"
import { useAuth } from "@/app/context/AuthContext";
import { useMemo, useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";

import {
    Sheet,
    SheetContent,
    SheetDescription,
    SheetHeader,
    SheetTitle,
    SheetTrigger,
} from "@/app/components/ui/sheet"

import { merriweather_sans } from "@/app/fonts/fonts";

import { FiShoppingCart } from "react-icons/fi";
import { Badge } from '@mui/material';
import { useMobileView } from "@/app/context/MobileContext";

export const Cart = () => {
    const { 
        cart, 
        setCart, 
        deleteOne, 
        incrementOne, 
        decrementOne, 
        totalPurchase
    } = useCart()

    const { isMobile } = useMobileView()
    const { user } = useAuth()
    const total = useMemo(() => totalPurchase(), [totalPurchase]);

    const pathname = usePathname();
    const [open, setOpen] = useState(false);

    useEffect(() => {
        setOpen(false);
    }, [pathname]);

    return (
        <Sheet open={open} onOpenChange={setOpen}>
            <SheetTrigger className={merriweather_sans.className}>
                <Badge badgeContent={cart.length} color="success">
                    <FiShoppingCart style={{ fontSize: isMobile ? "25px" : "32px" }} className="text-zinc-800"/>
                </Badge>
            </SheetTrigger>
            <SheetContent className={`bg-white ${merriweather_sans.className}`}>
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
                                        <p className="text-sm text-zinc-600">Precio: ${(user?.role === 'Invitado' ? item.sugestedPrice : item.listPrice) * item.quantity}</p>
                                    </div>
                                    <div className="flex md:flex-row flex-col md:gap-7 gap-2 items-center">
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
                <div className="flex md:gap-5 gap-2 justify-center">
                    <button 
                        onClick={() => setCart([])}
                        className="mt-10 border border-zinc-700 md:text-base text-sm hover:bg-zinc-100 rounded-md md:px-5 px-3 md:py-2 py-1"
                    >
                        Vaciar carrito
                    </button>
                    <Link href='/confirm-purchase' className="mt-10 bg-gray-600 border md:text-base text-sm border-zinc-700 text-zinc-200 rounded-md md:px-5 px-3 md:py-2 py-1">
                        Finalizar compra
                    </Link>
                </div>
            </SheetContent>
        </Sheet>

    )
}