import Link from "next/link";
import Image from "next/image";
import logobuffalo from "@/app/images/logos/Logobuffalo.png"
import { BreadCrumbs } from "@/app/components/Breadcrumbs";

import { FaUser, FaUserPlus,  } from "react-icons/fa6";
import { TfiSearch } from "react-icons/tfi";
import { Cart } from "./Cart";
import { LoginController } from "./LoginController";


export const Header = () => {
  return (
    <header className="sticky top-0 z-50 flex flex-col border-b-2">
      <nav className="flex items-center justify-between h-12 px-6 py-4 border-b-2 bg-zinc-800 text-zinc-300">
        <div className="flex gap-7 text-md ">
          <div className="flex items-center gap-1 bg-zinc-600 text-sm rounded-full px-2 py-1 text-zinc-300">
            <FaUser size={13}/>
            <p>Invitado</p>
          </div>
          <Link href='/register' className="flex items-center gap-2 cursor-pointer">
            <FaUserPlus />
            <p>Registro Comercio</p>
          </Link>
          
          <LoginController />
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

      <div className="bg-white">
        <section className="flex items-center justify-between px-6 py-4 border-b-2">
          <Link href='/' className="text-xl font-bold w-1/2">
              <Image
                  src={logobuffalo} 
                  alt="Logo"
                  width={150} 
                  height={150}
              />
          </Link>
          <div className="relative w-1/2 border border-zinc-300 rounded-xl">
              <input 
                  type="text" 
                  placeholder="Buscá tu producto aquí..." 
                  className="w-full bg-zinc-100 px-4 py-2 rounded-xl text-zinc-500 focus:outline-none"
              />
              <TfiSearch className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 cursor-pointer size-5" />
          </div>
          <div className="w-1/2 flex justify-end pr-5">
            <Cart />
          </div>
        </section>

        <section className="px-6 p-1 text-sm text-gray-500 bg-zinc-100">
          <BreadCrumbs />
        </section>
      </div>
    </header>
  );
};

