
import Image from "next/image"
import Link from "next/link"
import { supabase } from "@/lib/supabaseClient"

export const Products = async () => {
    const { data: prods } = await supabase.from('products').select('*')
        
    return (
        <div className="min-h-[100vh]">
            <h1 className="text-center text-5xl mb-1">Nuestros Productos</h1>
            <p className="text-center text-zinc-400">Descubri nuestra magia.</p>

            <section className="flex justify-center gap-5 mt-20 mb-20 w-[95%] mx-auto flex-wrap">
                {prods?.map((prod, index) => (
                    <Link 
                        href={`/products/${prod.id}`}
                        key={index} 
                        className="w-[350px] shadow-md p-5 rounded-md hover:scale-105 transition-all duration-200 cursor-pointer"
                    >
                        <div className="flex justify-between items-center">
                            <h2 className="text-2xl">{prod.title}</h2>
                            <p className={`text-md text-zinc-800 w-fit px-3 py-1 rounded-full 
                                ${prod.stock > 10 
                                    ? 'bg-green-600' 
                                    : prod.stock > 0 
                                        ? 'bg-yellow-500' 
                                        : 'bg-red-700'}`
                            }>
                                {prod.stock} {prod.stock > 1 ? 'Unidades' : 'Unidad'}
                            </p>
                        </div>
                        {prod.img.length > 0 && (
                            <Image 
                                key={0}
                                src={prod.img[0]} 
                                alt="Alt de la imagen"
                                width={300}
                                height={300}
                                className="p-4"
                            />
                        )}
                        <p className="text-zinc-600">{prod.description}</p>
                        <div className="mt-6 flex justify-between items-center">
                            <p className="text-md text-zinc-800">Publico: <span className="font-semibold">${prod.sugestedPrice}</span></p>
                            <p>Marca: {prod.brand}</p>
                        </div>
                    </Link>
                ))}
            </section>
        </div>
    )
}