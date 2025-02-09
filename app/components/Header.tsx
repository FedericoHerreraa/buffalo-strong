import Link from "next/link";
import Image from "next/image";
import logobuffalo from "@/app/images/logos/Logobuffalo.png"
import { BreadCrumbs } from "@/app/components/Breadcrumbs";

import { FaUser, FaUserPlus, FaCartShopping } from "react-icons/fa6";
import { MdOutlineLogin } from "react-icons/md";
import { TfiSearch } from "react-icons/tfi";

import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/app/components/ui/drawer"


export const Header = () => {
  return (
    <header className="flex flex-col border-b-2">
      <nav className="flex items-center justify-between h-12 px-6 py-4 border-b-2 bg-zinc-100">
        <div className="flex gap-7 text-md ">
          <div className="flex items-center gap-2 bg-zinc-700 rounded-full px-3 py-1 text-zinc-300">
            <FaUser size={13}/>
            <p>Invitado</p>
          </div>
          <Link href='/register' className="flex items-center gap-2 cursor-pointer">
            <FaUserPlus />
            <p>Registro Comercio</p>
          </Link>
          
          <Drawer>
            <DrawerTrigger>
              <div className="flex items-center gap-2 cursor-pointer">
                <MdOutlineLogin />
                <p>Ingresa a tu cuenta</p>
              </div>
            </DrawerTrigger>
            <DrawerContent className="border-t border-t-zinc-600 rounded-none border-x-zinc-800 border-b-zinc-800 h-[90vh] bg-zinc-900 opacity-100">
              <DrawerHeader>
                <DrawerTitle className="text-zinc-300 text-center text-3xl">Ingresa a tu cuenta</DrawerTitle>
                <DrawerDescription className="text-zinc-400 text-center">Ingresa a tu cuenta ya creada.</DrawerDescription>
              </DrawerHeader>
              <DrawerFooter className="flex items-center">
                <span className="text-zinc-300">Ingresar</span>
                <DrawerClose className="bg-zinc-600 rounded-xl px-3 py-1 w-fit mx-auto">
                  <span className="text-zinc-300">Cerrar</span>
                </DrawerClose>
              </DrawerFooter>
            </DrawerContent>
          </Drawer>

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

      <div className="sticky top-0 bg-white z-50">
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
      </div>
    </header>
  );
};

