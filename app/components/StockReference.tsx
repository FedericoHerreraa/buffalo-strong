'use client'

import { CiCircleInfo } from "react-icons/ci";
import { useMobileView } from "../context/MobileContext";


export const StockReference = () => {
    const { isMobile } = useMobileView()

    const classname = 'text-md bg-gradient-to-br text-zinc-200 w-fit px-2 py-2 rounded-full shadow-md'
    return (
<<<<<<< HEAD
        <div className="flex md:w-fit w-full justify-center items-center gap-5 text-zinc-200 border border-zinc-200  md:p-3 p-2 md:rounded-lg rounded-md bg-zinc-800">
=======
        <div className="flex md:w-fit w-full items-center gap-5 text-zinc-200 border border-zinc-200  md:p-3 p-2 md:rounded-lg rounded-md bg-zinc-800">
>>>>>>> b89a5ac (updating geader)
            <div className="flex items-center gap-3">
                <CiCircleInfo className="text-zinc-200" size={25}/>
                <h1 className="md:text-xl text-base text-zinc-200">Stock</h1>
                {!isMobile && <div className="w-12 h-[1px] bg-zinc-300"></div>}
            </div>
            <div className="flex items-center gap-5 md:text-base text-xs">
                <div className="flex md:flex-row flex-col items-center gap-3">
                    <p className={`${classname} from-green-300 to-green-600`}></p>
                    <p>30 o mas</p>
                </div>
                <div className="flex md:flex-row flex-col items-center gap-3 border-x border-x-zinc-300 px-5">
                    <p className={`${classname} from-yellow-300 to-yellow-600`}></p>
                    <p>29 - 5</p>
                </div>
                <div className="flex md:flex-row flex-col items-center gap-3">
                    <p className={`${classname} from-red-300 to-red-600`}></p>
                    <p>4 - 0</p>
                </div>
            </div>
        </div>
    )
}