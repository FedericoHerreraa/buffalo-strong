'use client'

import { useMemo } from "react"
import { useCart } from "@/app/context/CartContext"
import { merriweather_sans } from "@/app/fonts/fonts"
import Image from "next/image"
import Link from "next/link"

export const ConfirmPurchaseComponent = () => {
    const { cart, totalPurchase } = useCart()

    const total = useMemo(() => totalPurchase(), [totalPurchase]);

    return (
        <div className={`min-h-[80vh] ${merriweather_sans.className}`}>
            <div className="flex md:justify-start justify-center items-center gap-4 mt-10">
                <h1 className="md:text-4xl ml-5 text-3xl font-bold whitespace-nowrap bg-gradient-to-r from-[#8B5E3B] via-[#6F4E37] to-[#472913] bg-clip-text text-transparent text-center">Resumen de Compra</h1>
                <div className="md:w-full w-0 md:h-[1px] h-0 bg-zinc-300"></div>
            </div>

            <section className="md:w-[80%] w-[95%] border border-zinc-100 mx-auto mt-20 p-6 shadow-lg rounded-lg">
                <div className="w-full pb-4">
                    {cart.map((product, index) => (
                        <div key={index} className="flex items-center justify-between border-b border-b-zinc-300 py-4">
                            <div className="flex items-center gap-4">
                                <Image
                                    src={product.img[0]}
                                    alt={product.title}
                                    width={80}
                                    height={80}
                                    className="rounded"
                                />
                                <div>
                                    <h3 className="text-lg font-semibold">{product.title}</h3>
                                    <p className="text-sm text-gray-600">Cantidad: {product.quantity}</p>
                                </div>
                            </div>
                            <div className="text-right">
                                <p className="text-lg font-semibold">${product.listPrice}</p>
                            </div>
                        </div>
                    ))}
                </div>

                <div className="mt-6 flex flex-col gap-2 text-right">
                    <p className="text-lg">Subtotal: <span className="font-semibold">${(total).toLocaleString('es-AR')}</span></p>
                    <p className="text-lg">IVA: <span className="font-semibold">${parseFloat((total * 0.21).toFixed(2)).toLocaleString('es-AR')}</span></p>
                    <p className="text-lg">Total: <span className="font-bold">${(total + parseFloat((total * 0.21).toFixed(2))).toLocaleString('es-AR')}</span></p>
                </div>
            </section>

            <div className="flex justify-center my-10 items-center md:gap-10 gap-3">
                <Link href='/'>
                    <div className="border border-zinc-300 px-5 py-2 rounded-md">
                        <p>Seguir comprando</p>
                    </div>
                </Link>
                <button>
                    <div className="bg-zinc-300 border border-zinc-400 px-5 py-2 rounded-md">
                        <p>Confirmar pedido</p>
                    </div>
                </button>
            </div>
        </div>
    )
}