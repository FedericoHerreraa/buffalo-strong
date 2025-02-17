
import { supabase } from "@/lib/supabaseClient"
import { ProductDB } from "@/app/types/types"

export const RelatedProducts = async ({ categoryKey } : { categoryKey: string }) => {
    const { data: prods } = await supabase.from('products').select('*').eq('category', categoryKey).limit(5)

    return (
        <div className="w-[80%] mx-auto min-h-[50vh]">
            <h1 className="text-3xl font-bold">Productos relacionados</h1>
            <div className="flex gap-10 mt-20">
                {prods?.map((prod: ProductDB) => (
                    <div key={prod.id} className="flex gap-5">
                        <h3 className="text-xl font-semibold">{prod.title}</h3>
                        <p className="text-md bg-gradient-to-br text-zinc-800 w-fit px-3 py-3 rounded-full shadow-md 
                            from-green-300 to-green-600"
                        >
                            {prod.stock}
                        </p>
                    </div>
                ))}
            </div>
        </div>
    )
}