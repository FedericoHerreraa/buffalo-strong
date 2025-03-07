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

import { open_sans } from "@/app/fonts/fonts";

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
            <SheetTrigger className={open_sans.className}>
                <Badge badgeContent={cart.length} color="success">
                    <FiShoppingCart style={{ fontSize: isMobile ? "23px" : "28px" }} className="text-zinc-800" />
                </Badge>
            </SheetTrigger>
            <SheetContent className={`bg-white overflow-y-auto md:p-6 p-4 ${open_sans.className}`}>
                <SheetHeader>
                    <SheetTitle>Carrito de compras</SheetTitle>
                    <SheetDescription>
                        Una vez que se confirme el carrito, sera redireccionado hacia el formulario de compra para luego finalizar el pedido.
                    </SheetDescription>
                </SheetHeader>
                <section className="mt-10 flex flex-col gap-5">
                    {cart.length !== 0 ? (
                        cart.map((item, index) => (
                            <div key={index} className="flex flex-col gap-4 p-4 border border-zinc-200 rounded-lg shadow-md bg-white">
                                <div className="flex items-center gap-5">
                                    <Image
                                        src={item.img[0]}
                                        alt={item.title}
                                        width={80}
                                        height={80}
                                        className="rounded-lg p-1 border border-zinc-200"
                                    />

                                    <div className="flex flex-col gap-1 flex-1">
                                        <p className="font-semibold text-lg">{item.title}</p>
                                        <p className="text-sm text-zinc-600">Cantidad: <span className="font-semibold">x{item.quantity}</span></p>
                                        <p className="text-sm text-zinc-600">Color: <span className="font-semibold">{item.color}</span></p>
                                        <p className="text-sm font-semibold text-amber-600">
                                            ${((user ? item.listPrice : item.sugestedPrice) * item.quantity).toLocaleString('es-AR')}
                                        </p>
                                    </div>
                                </div>

                                <div className="flex justify-between items-center">
                                    <button
                                        onClick={() => deleteOne(item.id)}
                                        className="flex items-center gap-2 bg-red-600 text-white px-3 py-1.5 text-sm rounded-md hover:bg-red-700 transition">
                                        <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12"></path>
                                        </svg>
                                        Eliminar
                                    </button>

                                    <div className="flex items-center gap-3">
                                        <button
                                            onClick={() => incrementOne(item.id)}
                                            className="w-7 h-7 flex items-center justify-center md:text-base text-sm font-semibold border border-zinc-400 rounded-md bg-zinc-100 hover:bg-zinc-300 transition">
                                            +
                                        </button>
                                        <span className="md:text-base text-sm font-medium">{item.quantity}</span>
                                        <button
                                            onClick={() => decrementOne(item.id)}
                                            className="w-7 h-7 flex items-center justify-center md:text-base text-sm font-semibold border border-zinc-400 rounded-md bg-zinc-100 hover:bg-zinc-300 transition">
                                            -
                                        </button>
                                    </div>
                                </div>
                            </div>
                        ))
                    ) : (
                        <p className="text-gray-700 md:text-xl text-base font-semibold text-center">No hay productos en el carrito.</p>
                    )}
                </section>
                {cart.length !== 0 && <p className="mt-5 text-zinc-700">Total de la compra: <span className="font-semibold">${(total).toLocaleString('es-AR')}</span></p>}
                <div className="flex md:gap-5 gap-2 justify-center transition-all duration-150">
                    <button
                        onClick={() => setCart([])}
                        className="mt-10 border border-zinc-400 md:text-base text-sm hover:border-zinc-500 rounded-md md:px-5 px-3 md:py-2 py-1"
                    >
                        Vaciar carrito
                    </button>
                    <Link href='/confirm-purchase' className="mt-10 bg-zinc-200 hover:bg-zinc-300 border md:text-base text-sm border-zinc-700 text-zinc-800 rounded-md md:px-5 px-3 md:py-2 py-1">
                        Finalizar compra
                    </Link>
                </div>
            </SheetContent>
        </Sheet>

    )
}