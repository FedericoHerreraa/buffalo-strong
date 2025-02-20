import { merriweather_sans } from "@/app/fonts/fonts";

import { CiCreditCard1 } from "react-icons/ci";
import { BsCash } from "react-icons/bs";
import { SiMercadopago } from "react-icons/si";

import { BsMusicNoteList } from "react-icons/bs";
import { BsMusicPlayerFill } from "react-icons/bs";
import { BsMusicNoteBeamed } from "react-icons/bs";




export const WaysOfPayment = () => {
    return (
        <div className={`h-[50vh] mt-20 ${merriweather_sans.className}`}>
            <div className="flex justify-center items-center flex-col gap-3">
                <div className="flex items-center gap-3">
                    <BsMusicNoteList size={20}/>
                    <BsMusicPlayerFill size={20}/>
                    <BsMusicNoteBeamed size={20}/>
                </div>
                <h1 className="text-4xl font-semibold bg-gradient-to-r from-[#8B5E3B] via-[#6F4E37] to-[#472913] bg-clip-text text-transparent">
                    Formas de Pago
                </h1>
                <p className="text-zinc-700">Aceptamos las siguientes formas de pago</p>
            </div>

            <section className="w-[60%] p-10 rounded-lg mx-auto flex items-center gap-20 text-zinc-700">
                <div className="flex flex-col items-center">
                    <CiCreditCard1 size={60}/>
                    <h2 className="text-xl font-semibold">Tarjeta de Credito</h2>
                    <p className="text-center">Realiza tus compras con tarjeta de credito</p>
                </div>
                <div className="flex flex-col items-center">
                    <BsCash size={60}/>
                    <h2 className="text-xl font-semibold">Efectivo</h2>
                    <p className="text-center">Realiza tus compras con efectivo</p>
                </div>
                <div className="flex flex-col items-center">
                    <SiMercadopago size={60}/>
                    <h2 className="text-xl font-semibold">Mercado Pago</h2>
                    <p className="text-center">Realiza tus compras con Mercado Pago</p>
                </div>
            </section>
        </div>
    )
}