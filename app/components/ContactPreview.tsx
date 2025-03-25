
import Link from "next/link";

import { BsMusicNoteList } from "react-icons/bs";
import { BsMusicPlayerFill } from "react-icons/bs";
import { BsMusicNoteBeamed } from "react-icons/bs";

export const ContactPreview = () => {
    return (
        <section className="md:w-[80%] w-[85%] mx-auto md:my-0 my-20 min-h-[40vh]">
            <div className="border-l-4 border-l-[#6F4E37] px-5 flex md:flex-row flex-col justify-between md:gap-0 gap-10 items-center">
                <div className="md:w-1/2">
                    <div className="flex items-center gap-3 mb-2">
                        <BsMusicNoteList size={20}/>
                        <BsMusicPlayerFill size={20}/>
                        <BsMusicNoteBeamed size={20}/>
                    </div>
                    <h1 className="md:text-4xl text-3xl inline-block font-semibold bg-gradient-to-r from-amber-700 to-zinc-700 bg-clip-text text-transparent h-12">¿Tenés alguna duda?</h1>
                    <p className="text-zinc-700 mt-3 md:text-xl text-lg">Envianos un mensaje con tu pregunta o duda en cuestión, y nuestro equipo te responderá a la brevedad</p>
                </div>
                <div className="md:w-1/2 text-end">
                    <Link href='/contact-us' className="md:text-lg text-base bg-zinc-50 border border-zinc-400 hover:bg-zinc-500 transition-all duration-150 hover:text-white px-7 py-2 rounded-md">
                        Contactanos
                    </Link>
                </div>
            </div>
        </section>
    )
}