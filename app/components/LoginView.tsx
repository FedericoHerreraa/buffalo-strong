
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

export const LoginView = ({
    email,
    setEmail,
    password,
    setPassword,
    loginUser,
    loading
}: {
    email: string
    setEmail: (email: string) => void
    password: string
    setPassword: (password: string) => void
    loginUser: () => void
    loading: boolean
}) => {
    return (
        <Drawer>
            <DrawerTrigger>
              <div className="flex items-center gap-2 cursor-pointer text-zinc-300">
                <MdOutlineLogin />
                <p>Ingresa a tu cuenta</p>
              </div>
            </DrawerTrigger>
            <DrawerContent className="border-t border-t-zinc-600 rounded-none border-x-zinc-800 border-b-zinc-800 h-[90vh] bg-zinc-900 opacity-100">
              <DrawerHeader>
                <DrawerTitle className="text-zinc-300 text-center text-3xl">Ingresa a tu cuenta</DrawerTitle>
                <DrawerDescription className="text-zinc-400 text-center">Ingresa a tu cuenta ya creada.</DrawerDescription>
              </DrawerHeader>
              <form className="w-[20%] mx-auto mt-20 flex flex-col gap-10 items-center">
                <div>
                    <label htmlFor="email" className="text-zinc-300 ml-1">Ingrese su correo electrónico</label>
                    <input 
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="tu@servicio.com"
                        type="email" 
                        className="w-full mt-2 bg-zinc-800 px-4 py-2 rounded-xl text-zinc-300 focus:outline-none" 
                    />
                </div>
                <div>
                    <label htmlFor="password" className="text-zinc-300 ml-1">Ingrese su contraseña</label>
                    <input 
                        placeholder="clave"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        type="password" 
                        className="w-full mt-2 bg-zinc-800 px-4 py-2 rounded-xl text-zinc-300 focus:outline-none" 
                    />
                </div>
              </form>
              <div className="flex justify-center mt-10">
                <button 
                  onClick={loginUser}
                  className="bg-zinc-600 hover:bg-zinc-500 w-fit px-4 py-1 rounded-md">
                    <span className="text-zinc-300">{loading ? 'Ingresando...' : 'Ingresar'}</span>
                </button>
              </div>
              <DrawerFooter className="flex items-center">
                <DrawerClose className="bg-gray-800 hover:scale-105 transition rounded-md px-4 py-2 w-fit mx-auto">
                  <span className="text-zinc-300">Cerrar</span>
                </DrawerClose>
              </DrawerFooter>
            </DrawerContent>
        </Drawer>
    )
}