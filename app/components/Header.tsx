import Link from "next/link";
import Image from "next/image";
import logobuffalo from "@/app/images/logos/Logobuffalo.png"
import { BreadCrumbs } from "@/app/components/Breadcrumbs";

import { FaUserPlus, FaCartShopping } from "react-icons/fa6";
import { MdOutlineLogin } from "react-icons/md";
import { TfiSearch } from "react-icons/tfi";

export const Header = () => {
  return (
    <header className="flex flex-col border-b-2">
      <nav className="flex items-center justify-between h-12 px-6 py-4 border-b-2 bg-zinc-100">
        <div className="flex gap-7 text-md ">
          <div className="flex items-center gap-2 bg-zinc-700 rounded-full px-3 py-1 text-zinc-300">
            {/* <FaUser /> */}
            <p>Invitado</p>
          </div>
          <Link href='/register' className="flex items-center gap-2 cursor-pointer">
            <FaUserPlus />
            <p>Registro Mayorista</p>
          </Link>
          <div className="flex items-center gap-2 cursor-pointer">
            <MdOutlineLogin />
            <p>Acceso Comercio</p>
          </div>
        </div>
        <div className="flex gap-6 text-md font-semibold ">
          <Link href="/" className="hover:text-[#8d572f]  transition">
            Inicio
          </Link>
          <Link href="/about-us" className="hover:text-[#8d572f] transition">
            Nosotros
          </Link>
          <Link href="/contact-us" className="hover:text-[#8d572f]  transition">
            Contáctanos
          </Link>
          <Link href="/news" className="hover:text-[#8d572f]  transition">
            Novedades
          </Link>
        </div>
      </nav>

      <section className="flex items-center justify-between px-6 py-4 border-b-2">
        <Link href='/' className="text-xl font-bold w-1/2">
            <Image
                src={logobuffalo} 
                alt="Logo"
                width={150} 
                height={150}
            />
        </Link>
        <div className="relative w-1/2">
            <input 
                type="text" 
                placeholder="Buscá tu producto aquí..." 
                className="w-full bg-zinc-100 px-4 py-2 rounded-xl text-zinc-500 focus:outline-none"
            />
            <TfiSearch className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 cursor-pointer size-5" />
        </div>
        <div className="w-1/2 flex justify-end pr-5">
          <FaCartShopping className="text-2xl cursor-pointer hover:text-[#8d572f] transition-all" />
        </div>
      </section>

      <section className="px-6 py-2 text-sm text-gray-500">
        <BreadCrumbs />
      </section>
    </header>
  );
};

