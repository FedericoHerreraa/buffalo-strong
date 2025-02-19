
import { supabase } from "@/lib/supabaseClient"
import { ProductDB } from "@/app/types/types"
import Link from "next/link"
import Image from "next/image"
import { ProdPrice } from "./ProdPrice"

import { TbCirclesRelation } from "react-icons/tb";


export const RelatedProducts = async ({ categoryKey } : { categoryKey: string }) => {
    const { data: prods } = await supabase.from('products').select('*').eq('category', categoryKey).limit(5)

    return (
        <div className="w-[90%] mx-auto min-h-[50vh]">
            <div className="flex items-center gap-3">
                <h1 className="inline-block text-3xl font-bold bg-gradient-to-r from-[#8B5E3B] via-[#6F4E37] to-[#371f0f] bg-clip-text text-transparent">Productos relacionados</h1>
                <TbCirclesRelation size={25}/>
            </div>
            <div className="flex gap-10 mt-10 mb-10 overflow-x-auto whitespace-nowrap pb-5">
                {prods?.map((prod: ProductDB, index) => (
                    <Link 
                        href={`/products/detail/${prod.id}`}
                        key={index} 
                        className="min-w-[250px] border border-zinc-200 hover:border-zinc-300 bg-white rounded-md hover:scale-105 transition-all duration-200 cursor-pointer"
                    >
                        <div className="flex justify-between items-center p-5">
                            <h3 className="text-xl font-semibold whitespace-normal">{prod.title}</h3>
                            <p className={`text-md bg-gradient-to-br text-zinc-800 w-fit px-3 py-3 rounded-full shadow-md 
                                ${prod.stock > 30 
                                    ? 'from-green-300 to-green-600' 
                                    : prod.stock > 0 
                                        ? 'from-yellow-300 to-yellow-600' 
                                        : 'from-red-300 to-red-600'}`
                            }>
                            </p>
                        </div>
                        {prod.img.length > 0 && (
                            <Image 
                                src={prod.img[0]} 
                                alt="Alt de la imagen"
                                width={250}
                                height={250}
                                className="p-4"
                            />
                        )}
                        <p className="text-zinc-600 text-sm p-3 pb-10 whitespace-normal">{prod.description.slice(0, 100)}...</p>
                        <div className="h-[20px] px-2 py-7 rounded-b-md bg-black text-zinc-300 flex justify-between items-center">
                            <ProdPrice prod={prod}/>
                        </div>
                    </Link>
                ))}
            </div>
        </div>
    )
}