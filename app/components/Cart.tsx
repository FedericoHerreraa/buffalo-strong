'use client'

import { useCart } from "@/app/context/CartContext"
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
    const { cart } = useCart()

    return (
        <Sheet>
            <SheetTrigger>
                <Badge badgeContent={cart.length} color="success">
                    <ShoppingCartIcon fontSize="large" className="text-zinc-800"/>
                </Badge>
            </SheetTrigger>
            <SheetContent className="bg-white">
                <SheetHeader>
                    <SheetTitle>Carrito de compras</SheetTitle>
                    <SheetDescription>
                        This action cannot be undone. This will permanently delete your account
                        and remove your data from our servers.
                    </SheetDescription>
                </SheetHeader>
                <section className="mt-10 flex flex-col gap-5">
                    {cart.map((item, index) => (
                        <div key={index} className="flex items-center gap-5 p-2 border border-zinc-300 rounded-xl">
                            <Image 
                                src={item.img[0]}
                                alt={item.title}
                                width={100}
                                height={100}
                            />
                            <div className="flex flex-col gap-1">
                                <p className="text-lg font-semibold">{item.title}</p>
                                <p className="text-sm text-zinc-600">Cantidad: {item.quantity}</p>
                                <p className="text-sm text-zinc-600">Precio: ${item.sugestedPrice}</p>
                            </div>
                        </div>
                    ))}
                </section>
                <div className="flex justify-center">
                    <button className="mt-10 bg-gray-400 rounded-md px-5 py-2">
                        Finalizar compra
                    </button>
                </div>
            </SheetContent>
        </Sheet>

    )
}