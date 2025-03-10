
import {
    Drawer,
    DrawerClose,
    DrawerContent,
    DrawerFooter,
    DrawerHeader,
    DrawerTitle,
    DrawerTrigger,
} from "@/app/components/ui/drawer"

import { CiLogout } from "react-icons/ci";
import { FaUser } from "react-icons/fa";

import { useAuth } from '@/app/context/AuthContext'
import { useMobileView } from "@/app/context/MobileContext";

export const ProfileView = () => {
    const { user, logOut } = useAuth()
    const { isMobile } = useMobileView()

    return (
        <Drawer>
            <DrawerTrigger>
                <div className={`flex items-center gap-2 cursor-pointer`}>
                    <FaUser size={isMobile ? 20 : 25} className="text-zinc-200"/>
                </div>
            </DrawerTrigger>
            <DrawerContent className="border-t border-t-zinc-600 rounded-none border-x-zinc-800 border-b-zinc-800 h-[50vh] bg-zinc-900 opacity-100">
                <DrawerHeader>
                    <DrawerTitle className="text-zinc-300 text-center md:text-3xl text-2xl">Perfil de {user?.name}</DrawerTitle>
                </DrawerHeader>
                <div className="flex flex-col items-center mt-20 text-zinc-400 md:text-lg">
                    <p>Nombre: <span className="font-semibold text-zinc-200">{user?.name}</span></p>
                    <p>Email: <span className="font-semibold text-zinc-200">{user?.email}</span></p>
                    <p>Direccion: <span className="font-semibold text-zinc-200">{user?.address}</span></p>
                    <p>CUIT: <span className="font-semibold text-zinc-200">{user?.cuit}</span></p>

                    <div className="flex items-center cursor-pointer border hover:border-white transition-all duration-150 border-zinc-300 text-zinc-300 gap-2 rounded-md px-2 py-1 mt-10" onClick={() => logOut()}>
                        <p>Cerrar sesion</p>
                        <CiLogout
                            size={20}
                            className="cursor-pointer"
                        />
                    </div>
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