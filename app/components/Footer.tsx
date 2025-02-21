
import Link from "next/link"
import { FaInstagram } from "react-icons/fa";
import { FaWhatsapp } from "react-icons/fa";
import { merriweather_sans } from "@/app/fonts/fonts";

export const Footer = () => {
    return (
        <div className={`bg-gradient-to-b from-white to-zinc-400 min-h-[50vh] ${merriweather_sans.className}`}>
            <footer className="flex md:flex-row flex-col gap-24 w-[90%] mx-auto py-20">
                <div className="md:w-1/3">
                    <p className="text-2xl mb-4">Buffalo Strong</p>
                    <p className="text-zinc-600">🎵 Tu pasión, nuestra música. En Buffalo{"'"}s Strong, vivimos y respiramos música. Ofrecemos instrumentos, accesorios y equipos de sonido de las mejores marcas para que des rienda suelta a tu creatividad. Ya seas un músico profesional o estés dando tus primeros acordes, aquí encontrarás todo lo que necesitas. Visítanos y deja que la música hable por ti. 🎸🥁🎹</p>
                </div>
                <div className="md:w-1/3">
                    <p className="text-2xl mb-4">Segui Navegando</p>
                    <div className="flex flex-col gap-5 text-zinc-600">
                        {links.map((link, index) => (
                            <Link href={link.url} key={index}>
                                <p className="text-lg hover:underline">{link.name}</p>
                            </Link>
                        ))}
                    </div>
                </div>
                <div className="md:w-1/3">
                    <p className="text-2xl mb-4">Redes Sociales</p>
                    <p className="text-zinc-600">Seguinos en nuestras redes sociales asi te mantenes actualizado!</p>
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