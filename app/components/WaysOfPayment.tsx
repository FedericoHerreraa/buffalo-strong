
import { CiCreditCard1 } from "react-icons/ci";
import { BsCash } from "react-icons/bs";
import { SiMercadopago } from "react-icons/si";



export const WaysOfPayment = () => {
    return (
        <div className="h-[80vh] mt-20 shadow-md">
            <div className="flex justify-center">
                <h1 className="inline-block text-4xl  font-bold bg-gradient-to-r from-[#8B5E3B] via-[#6F4E37] to-[#472913] bg-clip-text text-transparent">
                    Formas de Pago
                </h1>
            </div>

            <section className="w-[60%] mx-auto flex items-center gap-20 mt-10 text-zinc-800">
                <div className="flex flex-col items-center">
                    <CiCreditCard1 size={50}/>
                    <h2 className="text-2xl font-semibold">Tarjeta de Credito</h2>
                    <p className="text-center">Realiza tus compras con tarjeta de credito</p>
                </div>
                <div className="flex flex-col items-center">
                    <BsCash size={50}/>
                    <h2 className="text-2xl font-semibold">Efectivo</h2>
                    <p className="text-center">Realiza tus compras con efectivo</p>
                </div>
                <div className="flex flex-col items-center">
                    <SiMercadopago size={50}/>
                    <h2 className="text-2xl font-semibold">Mercado Pago</h2>
                    <p className="text-center">Realiza tus compras con Mercado Pago</p>
                </div>
            </section>
        </div>
    )
}