
import Image from "next/image"
import Link from "next/link"
import { supabase } from "@/lib/supabaseClient"

export const Products = async () => {
    const { data: prods } = await supabase.from('products').select('*')
        
    return (
        <div className="min-h-[100vh]">
            <section className="flex justify-center gap-5 mt-20 mb-20 w-[95%] mx-auto flex-wrap">
                {categories.map(cat => {
                    const filteredProducts = prods?.filter(prod => prod.category === cat.keyValue);
                    return (
                        <div key={cat.keyValue} className="mb-6">
                            <div className="flex gap-5 items-center mb-10">
                                <h1 className="text-4xl font-bold whitespace-nowrap text-[#472913]">{cat.title}</h1>
                                <div className="flex-1 h-[1px] bg-zinc-300"></div>
                            </div>
                            <div className="flex flex-wrap gap-4 min-h-[50px]">
                                {filteredProducts && filteredProducts.length > 0 ? (
                                    filteredProducts.map((prod, index) => (
                                        <Link 
                                            href={`/products/${prod.id}`}
                                            key={index} 
                                            className="w-[350px] shadow-md p-5 border border-zinc-200 hover:border-zinc-300 rounded-md hover:scale-105 transition-all duration-200 cursor-pointer"
                                        >
                                            <div className="flex justify-between items-center">
                                                <h3 className="text-xl">{prod.title}</h3>
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
                                                    src={prod.img[0]} 
                                                    alt="Alt de la imagen"
                                                    width={300}
                                                    height={300}
                                                    className="p-4"
                                                />
                                            )}
                                            <p className="text-zinc-600">{prod.description}</p>
                                            <div className="mt-6 flex justify-between items-center">
                                                <p className="text-md text-zinc-800">Precio público: <span className="font-semibold">${prod.sugestedPrice}</span></p>
                                                <p>Marca: {prod.brand}</p>
                                            </div>
                                        </Link>
                                    ))
                                ) : (
                                    <p className="text-gray-500 text-xl">No hay productos en esta categoría.</p>
                                )}
                            </div>
                        </div>
                    );
                })}
            </section>
        </div>
    )
}


const categories = [
    {
        id: 1,
        keyValue: 'GuitarraCriolla',
        title: 'Guitarra Criolla',
        description: 'Guitarra criolla de calidad',
    },
    {
        id: 2,
        keyValue: 'GuitarraElectrica',
        title: 'Guitarra Electrica',
        description: 'Guitarra electrica de calidad',
    },
]