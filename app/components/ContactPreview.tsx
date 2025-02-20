
import Link from "next/link";

import { BsMusicNoteList } from "react-icons/bs";
import { BsMusicPlayerFill } from "react-icons/bs";
import { BsMusicNoteBeamed } from "react-icons/bs";

export const ContactPreview = () => {
    return (
        <section className="md:w-[70%] w-[85%] mx-auto min-h-[50vh] md:mt-10">
            <div className="border-l-4 border-l-[#6F4E37] px-5 flex md:flex-row flex-col justify-between md:gap-0 gap-10 items-center">
                <div className="md:w-1/2">
                    <div className="flex items-center gap-3 mb-2">
                        <BsMusicNoteList size={20}/>
                        <BsMusicPlayerFill size={20}/>
                        <BsMusicNoteBeamed size={20}/>
                    </div>
                    <h1 className="text-4xl inline-block font-semibold bg-gradient-to-r from-[#8B5E3B] via-[#6F4E37] to-[#472913] bg-clip-text text-transparent">Tenes alguna duda?</h1>
                    <p className="text-zinc-700 mt-3 text-xl">Envianos un mensaje con tu pregunta o duda en cuestion, y nuestro equipo te respondera a la brevedad</p>
                </div>
                <div className="md:w-1/2 text-end">
                    <Link href='/contact-us' className="text-lg bg-zinc-50 border border-zinc-400 px-7 py-2 rounded-md">
                        Contactanos
                    </Link>
                </div>
            </div>
        </section>
    )
}