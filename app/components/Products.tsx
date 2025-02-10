
import Image from "next/image"
import { supabase } from "@/lib/supabaseClient"

export const Products = async () => {
    const { data: prods } = await supabase.from('products').select('*')
        
    return (
        <div className="min-h-[100vh]">
            <h1 className="text-center text-5xl mb-1">Nuestros Productos</h1>
            <p className="text-center text-zinc-400">Descubri nuestra magia.</p>

            <section className="flex justify-center gap-20 mt-20">
                {prods?.map((prod, index) => (
                    <div key={index} className="w-[350px] mx-10 text-center shadow-lg p-5 rounded-2xl hover:scale-105 transition-all duration-150 cursor-pointer">
                        <h2>{prod.title}</h2>
                        {prod.img.length > 0 && (
                            <Image 
                                key={0}
                                src={prod.img[0]} 
                                alt="Alt de la imagen"
                                width={300}
                                height={300}
                                unoptimized={true}
                            />
                        )}
                        <p>{prod.description}</p>
                    </div>
                ))}
            </section>
        </div>
    )
}