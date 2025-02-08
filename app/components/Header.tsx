import Link from "next/link";
import Image from "next/image";
import logobuffalo from "@/app/images/logos/Logobuffalo.png"


import { FaUser, FaUserPlus, FaCartShopping } from "react-icons/fa6";
import { MdOutlineLogin } from "react-icons/md";
import { TfiSearch } from "react-icons/tfi";

const Header = () => {
  return (
    <header className="flex flex-col border-b-2">
      {/* Barra superior de navegación */}
      <nav className="flex items-center justify-between h-12 px-6 py-4 border-b-2">
        {/* Sección de registro */}
        <div className="flex gap-7 text-md ">
          <div className="flex items-center gap-2 cursor-pointer">
            <FaUser />
            <p>Invitado</p>
          </div>
          <div className="flex items-center gap-2 cursor-pointer">
            <FaUserPlus />
            <p>Registro Mayorista</p>
          </div>
          <div className="flex items-center gap-2 cursor-pointer">
            <MdOutlineLogin />
            <p>Acceso Comercio</p>
          </div>
        </div>

        {/* Menú de navegación */}
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

      {/* Sección de logo, búsqueda y carrito */}
      <div className="flex items-center justify-between px-6 py-4 border-b-2">
        <div className="text-xl font-bold">
            <Image
                src={logobuffalo} // Ruta de la imagen (puede ser local o remota)
                alt="Logo"
                width={150} // Ancho en píxeles
                height={150} // Alto en píxeles
            />
        </div>
        <div className="relative w-1/2">
            <input 
                type="text" 
                placeholder="Buscá tu producto aquí..." 
                className="w-full bg-gray-200 px-4 py-2 pl-10 rounded-xl text-zinc-500 focus:outline-none"
            />
            <TfiSearch className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 cursor-pointer size-6" />
            </div>
        <FaCartShopping className="text-2xl cursor-pointer hover:text-[#8d572f]  transition" />
      </div>

      {/* Breadcrumb (Opcional) */}
      <div className="px-6 py-2 text-sm text-gray-500">breadcrumb</div>
    </header>
  );
};

export default Header;
