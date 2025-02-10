
import {
    Sheet,
    SheetContent,
    SheetDescription,
    SheetHeader,
    SheetTitle,
    SheetTrigger,
} from "@/app/components/ui/sheet"

import { FaCartShopping } from "react-icons/fa6"
  

export const Cart = () => {
    return (
        <Sheet>
            <SheetTrigger>
                <FaCartShopping className="text-2xl cursor-pointer hover:text-[#8d572f] transition-all" />
            </SheetTrigger>
            <SheetContent className="bg-white">
                <SheetHeader>
                    <SheetTitle>Carrito de compras</SheetTitle>
                    <SheetDescription>
                        This action cannot be undone. This will permanently delete your account
                        and remove your data from our servers.
                    </SheetDescription>
                </SheetHeader>
                <section className="mt-10 flex flex-col gap-5">
                    <div className="h-16 w-full rounded-md border border-zinc-400">
                    </div>
                    <div className="h-16 w-full rounded-md border border-zinc-400">
                    </div>
                    <div className="h-16 w-full rounded-md border border-zinc-400">
                    </div>
                    <div className="h-16 w-full rounded-md border border-zinc-400">
                    </div>
                    <div className="h-16 w-full rounded-md border border-zinc-400">
                    </div>
                </section>
                <div className="flex justify-center">
                    <button className="mt-10 bg-gray-400 rounded-md px-5 py-2">
                        Finalizar compra
                    </button>
                </div>
            </SheetContent>
        </Sheet>

    )
}