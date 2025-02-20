
import { supabase } from "@/lib/supabaseClient"
import { ProductDB } from "@/app/types/types"

import { TbCirclesRelation } from "react-icons/tb";
import { Product } from "./Product"


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
                    <Product key={index} prod={prod} index={index}/>
                ))}
            </div>
        </div>
    )
}