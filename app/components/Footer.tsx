'use client'

import Link from "next/link"
import Image from "next/image"
import { FaInstagram } from "react-icons/fa";
import { FaWhatsapp } from "react-icons/fa";
import { open_sans } from "@/app/fonts/fonts";
import logobuffalo from "@/app/images/logos/logoBlanco.png";
import { useMobileView } from "@/app/context/MobileContext";

export const Footer = () => {
    const { isMobile } = useMobileView();

    return (
        <div className={`bg-zinc-900 text-zinc-300 min-h-[50vh] ${open_sans.className}`}>
            <footer className="flex md:flex-row flex-col gap-24 w-[80%] mx-auto py-20">
                <div className="md:w-1/3">
                    <div className="flex items-center gap-5 mb-5">
                        <p className="text-2xl">Strong Buffalo Music</p>
                        <Image
                            src={logobuffalo}
                            alt="Logo"
                            width={isMobile ? 30 : 50}
                            className={`transition-all duration-250 ease-in-out`}
                        />
                    </div>
                    <p className="text-zinc-400">🎵 Tu pasión, nuestra música. En Strong Buffalo Music, vivimos y respiramos música. Ofrecemos instrumentos, accesorios y equipos de sonido de las mejores marcas para que des rienda suelta a tu creatividad. Ya seas un músico profesional o estés dando tus primeros acordes, aquí encontrarás todo lo que necesitas. Visítanos y deja que la música hable por ti. 🎸🥁🎹</p>
                </div>
                <div className="md:w-1/3">
                    <p className="text-2xl mb-4">Seguí Navegando</p>
                    <div className="flex flex-col gap-5 text-zinc-400">
                        {links.map((link, index) => (
                            <Link href={link.url} key={index}>
                                <p className="text-lg hover:underline">{link.name}</p>
                            </Link>
                        ))}
                    </div>
                </div>
                <div className="md:w-1/3">
                    <p className="text-2xl mb-4">Redes Sociales</p>
                    <p className="text-zinc-400">¡Seguinos en nuestras redes sociales así te mantenés actualizado!</p>
                    <div className="flex items-center gap-3 mt-5">
                        <FaInstagram size={30} className="text-violet-700"/>
                        <FaWhatsapp size={30} className="text-green-600"/>
                    </div>
                </div>
            </footer>
        </div>
    )
}

const links = [
    {
        name: "Sobre Nosotros",
        url: "/about-us"
    },
    {
        name: "Contactanos",
        url: "/contact-us"
    },
    {
        name: "Novedades",
        url: "/news"
    }
]