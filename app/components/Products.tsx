
import Image from "next/image"
import { supabase } from "@/lib/supabaseClient"

export const Products = async () => {
    const { data: prods } = await supabase.from('products').select('*')
        
    return (
        <div className="min-h-[100vh]">
            <h1 className="text-center text-5xl mb-1">Nuestros Productos</h1>
            <p className="text-center text-zinc-400">Descubri nuestra magia.</p>

            <section className="flex justify-center gap-5 mt-20">
                {prods?.map((prod, index) => (
                    <div key={index} className="w-[350px] shadow-md p-5 rounded-md hover:scale-105 transition-all duration-200 cursor-pointer">
                        <h2 className="text-2xl">{prod.title}</h2>
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
                        <p className="text-zinc-600">{prod.description}</p>
                        <p>Marca: {prod.brand}</p>
                        <div className="mt-6 flex justify-between items-center">
                            <p className="text-md text-zinc-800 font-semibold">Publico: ${prod.sugestedPrice}</p>
                            <p className={`text-md text-zinc-800 w-fit px-4 py-1 rounded-full ${prod.stock > 10 ? 'bg-green-600' : prod.stock > 0 ? 'bg-yellow-600' : 'bg-red-700'}`}>Stock: {prod.stock}</p>
                        </div>
                    </div>
                ))}
            </section>
        </div>
    )
}