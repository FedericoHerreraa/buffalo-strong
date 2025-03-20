"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { Suspense, useEffect, useState } from "react";

import logobuffalo from "@/app/images/logos/logoBlanco.png";
import { BreadCrumbs } from "@/app/components/Breadcrumbs";
import { open_sans } from "@/app/fonts/fonts";
import { useAuth } from "@/app/context/AuthContext";
import { useMobileView } from "@/app/context/MobileContext";
import { User } from "@/app/types/types";
import { Cart } from "./Cart";
import { LoginController } from "./LoginController";

import { FaUserPlus } from "react-icons/fa6";
import { VscListSelection } from "react-icons/vsc";
import { CiLogout } from "react-icons/ci";
import { FaIdBadge } from "react-icons/fa";
import { CiLocationOn } from "react-icons/ci";

import { Sheet, SheetContent, SheetTrigger } from "@/app/components/ui/sheet";
import { SearchBar } from "./SearchBar";
import { ProfileView } from "./ProfileView";

import {
  AlertDialog,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/app/components/ui/alert-dialog"


export const Header = () => {
  const { user, logOut } = useAuth();
  const { isMobile } = useMobileView();

  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  return (
    <header className="sticky top-0 z-50">
      <div>
        <nav
          className={`flex items-center transition-all duration-300 transform justify-between w-full md:px-6 px-3 py-2 bg-zinc-900 text-zinc-300 ${open_sans.className}`}
        >
          <div className="flex justify-between gap-7 text-md  md:w-[85%] w-[98%] mx-auto">
            <div className="flex items-center gap-1 bg-zinc-200 text-sm rounded-full h-fit px-3 py-1 text-zinc-800">
              <FaIdBadge size={18} />
              <p>{user ? user.role : "Invitado"}</p>
            </div>
            {isMobile
              ? mobileTabs({ user, logOut, open, setOpen })
              : desktopTabs({ user, logOut })}
          </div>
        </nav>

        <nav className="bg-gradient-to-b from-zinc-800 to-zinc-700 bg-opacity-50">
          <section
            className={`flex items-center md:w-[85%] w-[98%] mx-auto justify-between md:px-6 md:py-1 py-2  ${open_sans.className}`}
          >
            <Link href="/" className="text-xl font-bold w-fit flex items-center md:ml-0 ml-5">
              <Image
                src={logobuffalo}
                alt="Logo"
                width={isMobile ? 50 : 70}
                className={`transition-all duration-250 ease-in-out`}
              />
            </Link>

            <div className="flex md:flex-row flex-col items-center justify-center gap-5 w-full mx-auto">
              <Suspense>
                <SearchBar />
              </Suspense>

              {!isMobile && (
                <div className="md:w-fit flex items-center md:gap-1 bg-gradient-to-br from-amber-600 to-zinc-300 px-3 py-2 rounded-full">
                  <CiLocationOn size={20} />
                  <p className="text-zinc-900 md:text-sm text-xs">Buenos Aires, Argentina (CABA)</p>
                </div>
              )}
            </div>

            <div className="w-fit flex md:gap-5 gap-2 justify-end pr-5">
              {user && <ProfileView />}
              <Cart />
            </div>
          </section>
          <section className="px-6 py-2 text-sm text-zinc-300 md:w-[85%] font-semibold w-[98%] mx-auto">
            <BreadCrumbs />
          </section>
        </nav>
      </div>
    </header>
  );
};

const mobileTabs = ({
  user,
  logOut,
  open,
  setOpen,
}: {
  user: User | null | undefined;
  logOut: () => void;
  open: boolean;
  setOpen: (open: boolean) => void;
}) => {
  return (
    <>
      <Sheet open={open} onOpenChange={setOpen}>
        <SheetTrigger>
          <VscListSelection size={25} className="cursor-pointer" />
        </SheetTrigger>
        <SheetContent className="bg-white pt-20">
          {!user ? (
            <div className="flex flex-col gap-5 border-b border-b-zinc-400 pb-5">
              <Link
                href="/register"
                className="flex items-center gap-2 cursor-pointer text-[#1f1106]"
              >
                <FaUserPlus />
                <p>Registro Comercio</p>
              </Link>

              <LoginController />
            </div>
          ) : (
            <div className="flex items-center gap-5 border-b border-b-zinc-400 pb-10">
              <p className="">
                Bienvenido <span className="font-semibold"> {user.name}</span>
              </p>
              <CiLogout
                onClick={() => logOut()}
                size={25}
                className="cursor-pointer"
              />
            </div>
          )}
          <div
            className={`flex flex-col gap-5 ml-3 text-md mt-5 text-[#1f1106]`}
          >
            <Link href="/" className="cursor-pointer">
              Inicio
            </Link>
            <Link href="/about-us" className="cursor-pointer">
              Nosotros
            </Link>
            <Link href="/contact-us" className="cursor-pointer">
              Contáctanos
            </Link>
            <AlertDialog>
              <AlertDialogTrigger>
                <p
                  className="cursor-pointer text-left"
                >
                  Novedades
                </p>
              </AlertDialogTrigger>
              <AlertDialogContent className="bg-white w-[90%] rounded-lg">
                <AlertDialogHeader>
                  <AlertDialogTitle>Proximamente!</AlertDialogTitle>
                  <AlertDialogDescription>
                    En esta sección podrás encontrar todas las novedades de Buffalo Strong mas promociones.
                  </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                  <AlertDialogCancel>Cancel</AlertDialogCancel>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>
            {user?.role === "Admin" && (
              <Link href="/admin-dashboard" className="cursor-pointer">
                Dashboard
              </Link>
            )}
          </div>
        </SheetContent>
      </Sheet>
    </>
  );
};

const desktopTabs = ({
  user,
  logOut,
}: {
  user: User | null | undefined;
  logOut: () => void;
}) => {
  return (
    <div className="flex justify-between w-full items-center">
      {!user ? (
        <div className="flex items-center gap-5">
          <Link
            href="/register"
            className="flex items-center gap-2 cursor-pointer text-zinc-300"
          >
            <FaUserPlus />
            <p>Registro Comercio</p>
          </Link>

          <LoginController />
        </div>
      ) : (
        <div className="flex items-center gap-5">
          <p className="">
            Bienvenido <span className="font-semibold"> {user.name}</span>
          </p>
          <CiLogout
            onClick={() => logOut()}
            size={25}
            className="cursor-pointer"
          />
        </div>
      )}
      <div className={`flex gap-6 text-md text-zinc-300`}>
        <Link
          href="/"
          className="hover:text-[#8d572f] hover:scale-110 transition-all duration-150 cursor-pointer"
        >
          Inicio
        </Link>
        <Link
          href="/about-us"
          className="hover:text-[#8d572f] hover:scale-110 transition-all duration-150 cursor-pointer"
        >
          Nosotros
        </Link>
        <Link
          href="/contact-us"
          className="hover:text-[#8d572f] hover:scale-110 transition-all duration-150 cursor-pointer"
        >
          Contáctanos
        </Link>
        <AlertDialog>
          <AlertDialogTrigger>
            <p
              className="hover:text-[#8d572f] hover:scale-110 transition-all duration-150 cursor-pointer"
            >
              Novedades
            </p>
          </AlertDialogTrigger>
          <AlertDialogContent className="bg-white">
            <AlertDialogHeader>
              <AlertDialogTitle>Proximamente!</AlertDialogTitle>
              <AlertDialogDescription>
                En esta sección podrás encontrar todas las novedades de Buffalo Strong mas promociones.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel>Cancel</AlertDialogCancel>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>

        {user?.role === "Admin" && (
          <Link
            href="/admin-dashboard"
            className="hover:text-[#8d572f] hover:scale-110 transition-all duration-150 cursor-pointer"
          >
            Dashboard
          </Link>
        )}
      </div>
    </div>
  );
};