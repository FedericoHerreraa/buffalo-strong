
import {
    Drawer,
    DrawerClose,
    DrawerContent,
    DrawerFooter,
    DrawerHeader,
    DrawerTitle,
    DrawerTrigger,
} from "@/app/components/ui/drawer"

import { FaUser } from "react-icons/fa";
import { useAuth } from '@/app/context/AuthContext'

export const ProfileView = () => {
    const { user } = useAuth()

    return (
        <Drawer>
            <DrawerTrigger>
                <div className={`flex items-center gap-2 cursor-pointer`}>
                    <FaUser size={25} className="text-zinc-200"/>
                </div>
            </DrawerTrigger>
            <DrawerContent className="border-t border-t-zinc-600 rounded-none border-x-zinc-800 border-b-zinc-800 h-[90vh] bg-zinc-900 opacity-100">
                <DrawerHeader>
                    <DrawerTitle className="text-zinc-300 text-center text-3xl">Perfil de {user?.name}</DrawerTitle>
                </DrawerHeader>
                <div className="flex flex-col items-center mt-20 text-zinc-400 text-lg">
                    <h1>Hola {user?.name}</h1>
                    <p>Email: {user?.email}</p>
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