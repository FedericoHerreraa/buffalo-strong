
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

import { MdOutlineLogin } from "react-icons/md";
import { LoginViewProps } from "../types/types";
import { Spinner } from "@/app/images/icons/Spinner";
import { IoEyeOutline } from "react-icons/io5";
import { IoEyeOffOutline } from "react-icons/io5";

export const LoginView = ({
  register,
  handleSubmit,
  errors,
  error,
  isSubmitting,
  loginUser,
  isMobile,
  isVisible,
  setIsVisible
}: LoginViewProps) => {
  return (
    <Drawer>
      <DrawerTrigger>
        <div className={`flex items-center gap-2 cursor-pointer ${isMobile ? 'text-zinc-900' : 'text-zinc-300'}`}>
          <MdOutlineLogin />
          <p>Ingresá a tu cuenta</p>
        </div>
      </DrawerTrigger>
      <DrawerContent className="border-t border-t-zinc-600 rounded-none border-x-zinc-800 border-b-zinc-800 h-[90vh] bg-zinc-900 opacity-100">
        <DrawerHeader>
          <DrawerTitle className="text-zinc-300 text-center text-3xl">Ingresá a tu cuenta</DrawerTitle>
          <DrawerDescription className="text-zinc-400 text-center">Ingresá a tu cuenta ya creada.</DrawerDescription>
        </DrawerHeader>
        <form onSubmit={handleSubmit(loginUser)} className="md:w-[300px] w-[60%] mx-auto mt-20 flex flex-col gap-10 items-center justify-center">
          <div>
            <label htmlFor="email" className="text-zinc-300 ml-1">Ingrese su correo electrónico</label>
            <input
              {...register("email")}
              placeholder="tu@servicio.com"
              type="email"
              className="w-[300px] mt-2 bg-zinc-800 border border-zinc-600 px-4 py-2 rounded-lg text-zinc-300 focus:outline-none"
            />
          </div>
          {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>}
          <div>
            <label htmlFor="password" className="text-zinc-300 ml-1">Ingrese su contraseña</label>
            <div className="w-[300px] mt-2 bg-zinc-800 px-4 py-2 border border-zinc-600 rounded-lg flex gap-3 items-center justify-between">
              <input
                {...register("password")}
                placeholder="clave"
                type={isVisible ? 'text' : 'password'}
                className="text-zinc-300 focus:outline-none bg-zinc-800 w-full"
              />
              <button
                type="button"
                className="focus:outline-none"
                onClick={() => setIsVisible(!isVisible)}
              >
                {isVisible ? <IoEyeOffOutline className="text-zinc-300" /> : <IoEyeOutline className="text-zinc-300" />}
              </button>
            </div>
          </div>
          {errors.password && <p className="text-red-500 text-sm mt-1">{errors.password.message}</p>}
          <div className="flex justify-center mt-10">
            <button
              className="bg-zinc-700 border border-zinc-500 hover:bg-zinc-600 w-fit px-5 py-2 rounded-md">
              <span className="text-zinc-300">{isSubmitting ? <Spinner /> : 'Ingresar'}</span>
            </button>
          </div>
          {error && <p className="text-red-500 text-sm mt-1">{error}</p>}
        </form>
        <DrawerFooter className="flex items-center">
          <DrawerClose className="bg-gray-800 hover:scale-105 transition rounded-md px-4 py-2 w-fit mx-auto">
            <span className="text-zinc-300">Cerrar</span>
          </DrawerClose>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  )
}