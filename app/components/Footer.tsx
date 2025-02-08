
import Link from "next/link"
import { FaInstagram } from "react-icons/fa";
import { FaWhatsapp } from "react-icons/fa";

export const Footer = () => {
    return (
        <div className="bg-zinc-100 h-[50vh]">
            <footer className="flex gap-24 w-[90%] mx-auto pt-20">
                <div className="w-1/3">
                    <p className="text-2xl mb-4">Buffalo Strong</p>
                    <p className="text-zinc-600">Lorem ipsum dolor sit amet consectetur, adipisicing elit. Nihil nisi eaque reiciendis consectetur quae aspernatur voluptas dicta quam sapiente incidunt quibusdam, fugiat, unde sit autem repellat voluptates blanditiis, aliquid sed.</p>
                </div>
                <div className="w-1/3">
                    <p className="text-2xl mb-4">Segui Navegando</p>
                    <div className="flex flex-col gap-5 text-zinc-600">
                        {links.map((link, index) => (
                            <Link href={link.url} key={index}>
                                <p className="text-lg hover:underline">{link.name}</p>
                            </Link>
                        ))}
                    </div>
                </div>
                <div className="w-1/3">
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