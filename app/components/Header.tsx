'use client'

import Link from "next/link";
import Image from "next/image";
import logobuffalo from "@/app/images/logos/Logobuffalo.png"
import { BreadCrumbs } from "@/app/components/Breadcrumbs";

import { FaUser, FaUserPlus,  } from "react-icons/fa6";
import { TfiSearch } from "react-icons/tfi";
import { CiLogout } from "react-icons/ci";

import { Cart } from "./Cart";
import { LoginController } from "./LoginController";

import { merriweather } from "@/app/fonts/fonts";
import { useAuth } from "@/app/context/AuthContext";

export const Header = () => {
  const { user, logOut } = useAuth()

  return (
    <header className="sticky top-0 z-50 flex flex-col">
      <nav className={`flex items-center justify-between h-12 px-6 py-4 bg-zinc-100 text-zinc-800 ${merriweather.className}`}>
        <div className="flex gap-7 text-md ">
          <div className="flex items-center gap-1 bg-[#1f1106] bg-opacity-90 text-sm rounded-full px-2 py-1 text-zinc-300">
            <FaUser size={10}/>
            <p>{user ? user?.role : 'Invitado'}</p>
          </div>
          {!user ? (
            <>
              <Link href='/register' className="flex items-center gap-2 cursor-pointer text-[#1f1106]">
                <FaUserPlus />
                <p>Registro Comercio</p>
              </Link>
              
              <LoginController />
            </>
          ) : (
            <div className="flex items-center gap-5">
              <p className="">Bienvenido <span className="font-semibold">{user.email}</span></p>
              <CiLogout 
                onClick={() => logOut()}
                size={25} 
                className="cursor-pointer"
              />
            </div>
          )}
        </div>

        <div className={`flex gap-6 text-md text-[#1f1106]  transition`}>
          <Link href="/" className="hover:text-[#8d572f]">
            Inicio
          </Link>
          <Link href="/about-us" className="hover:text-[#8d572f]">
            Nosotros
          </Link>
          <Link href="/contact-us" className="hover:text-[#8d572f]">
            Contáctanos
          </Link>
          <Link href="/news" className="hover:text-[#8d572f]">
            Novedades
          </Link>
          {user?.role === 'Admin' && (
            <Link href="/admin-dashboard" className="hover:text-[#8d572f]">
              Dashboard
            </Link>
          )}
        </div>
      </nav>

      <div>
        <section className="flex items-center justify-between px-6 py-2 bg-[#1f1106] bg-opacity-90">
          <Link href='/' className="text-xl font-bold w-1/5">
              <Image
                  src={logobuffalo} 
                  alt="Logo"
                  width={120} 
                  className={`transition-all duration-250 ease-in-out`}
              />
          </Link>
          <div className="relative w-3/5 rounded-lg">
              <input 
                  type="text" 
                  placeholder="Buscá tu producto aquí..." 
                  className="w-full bg-zinc-100 px-4 py-2 rounded-lg text-zinc-500 focus:outline-none"
              />
              <TfiSearch className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 cursor-pointer size-5" />
          </div>
          <div className="w-1/5 flex justify-end pr-5">
            <Cart />
          </div>
        </section>

        <section className="px-6 py-2 text-sm text-[#1f1106] font-semibold bg-[#ffdbbf] bg-opacity-90">
          <BreadCrumbs />
        </section>
      </div>
    </header>
  );
};

