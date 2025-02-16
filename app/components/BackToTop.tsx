'use client'

import { IoArrowUp } from "react-icons/io5";

export const BackToTop = () => {
    return (
        <div 
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            className={`border rounded-lg bg-zinc-800 text-zinc-300 fixed bottom-4 right-4 p-2  cursor-pointer shadow-lg hover:scale-110 transition-transform duration-300 z-50`}
        >
            <IoArrowUp size={20}/>
        </div>
    )
}