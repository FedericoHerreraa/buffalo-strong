import { open_sans } from "@/app/fonts/fonts";

import { CiCreditCard1 } from "react-icons/ci";
import { BsCash } from "react-icons/bs";
import { SiMercadopago } from "react-icons/si";
import { TitleSection } from "./reusable/titleSection";




export const WaysOfPayment = () => {
    return (
        <div className={`min-h-[50vh] my-20 ${open_sans.className}`}>
            <TitleSection title="Formas de Pago" description="Aceptamos las siguientes formas de pago" color="from-amber-700 to-zinc-700" colorDescription="text-zinc-600"/>
            <section className="w-[90%] md:w-[60%] shadow-lg border border-zinc-100 mt-10 p-6 md:p-10 rounded-lg mx-auto flex flex-col md:flex-row items-center gap-6 md:gap-20 text-zinc-700">
                <div className="flex flex-col items-center text-center">
                    <CiCreditCard1 size={50} className="md:size-50" />
                    <h2 className="text-lg md:text-xl font-semibold">Tarjeta de Crédito</h2>
                    <p className="text-sm md:text-base">Realiza tus compras con tarjeta de crédito</p>
                </div>
                <div className="flex flex-col items-center text-center">
                    <BsCash size={50} className="md:size-50" />
                    <h2 className="text-lg md:text-xl font-semibold">Efectivo</h2>
                    <p className="text-sm md:text-base">Realiza tus compras con efectivo</p>
                </div>
                <div className="flex flex-col items-center text-center">
                    <SiMercadopago size={50} className="md:size-50" />
                    <h2 className="text-lg md:text-xl font-semibold">Mercado Pago</h2>
                    <p className="text-sm md:text-base">Realiza tus compras con Mercado Pago</p>
                </div>
            </section>
        </div>
    )
}