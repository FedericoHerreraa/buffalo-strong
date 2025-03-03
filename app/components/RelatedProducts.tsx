
import { supabase } from "@/lib/supabaseClient"
import { ProductDB } from "@/app/types/types"

import { TbCirclesRelation } from "react-icons/tb";
import { Product } from "./Product"


export const RelatedProducts = async ({ categoryKey } : { categoryKey: string }) => {
    const { data: prods } = await supabase.from('products').select('*').eq('category', categoryKey).limit(5)

    return (
        <div className="md:w-[90%] w-[95%] mx-auto min-h-[50vh]">
            <div className="flex items-center md:gap-3 gap-2">
                <h1 className="inline-block md:text-3xl text-xl font-bold bg-gradient-to-r from-amber-700 to-zinc-700 bg-clip-text text-transparent">Productos relacionados</h1>
                <TbCirclesRelation size={25}/>
            </div>
            <div className="flex md:gap-7 gap-1 mt-10 mb-10 overflow-x-auto whitespace-nowrap pb-5">
                {prods?.map((prod: ProductDB, index) => (
                    <Product key={index} prod={prod} index={index}/>
                ))}
            </div>
        </div>
    )
}