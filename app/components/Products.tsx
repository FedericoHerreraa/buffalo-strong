
import Image from "next/image"
import Link from "next/link"
import { supabase } from "@/lib/supabaseClient"
import { merriweather } from "@/app/fonts/fonts";

export const Products = async () => {
    const { data: prods } = await supabase.from('products').select('*')
        
    return (
        <div className="min-h-[100vh]">
            <section className="flex gap-5 mt-20 mb-20 w-[95%] mx-auto flex-wrap">
                {categories.map(cat => {
                    const filteredProducts = prods?.filter(prod => prod.category === cat.keyValue);
                    return (
                        <div key={cat.keyValue} className="mb-6 w-full">
                            <div className="flex gap-5 items-center mb-10">
                                <h1 className={`text-4xl font-bold whitespace-nowrap text-[#472913] ${merriweather.className}`}>{cat.title}</h1>
                                <div className="w-full h-[1px] bg-zinc-300"></div>
                            </div>
                            <div className="flex flex-wrap gap-4 min-h-[50px]">
                                {filteredProducts && filteredProducts.length > 0 ? (
                                    filteredProducts.map((prod, index) => (
                                        <Link 
                                            href={`/products/${prod.id}`}
                                            key={index} 
                                            className="w-[350px] shadow-md p-5 border border-zinc-200 hover:border-zinc-300 bg-white rounded-md hover:scale-105 transition-all duration-200 cursor-pointer"
                                        >
                                            <div className="flex justify-between items-center">
                                                <h3 className="text-xl font-semibold">{prod.title}</h3>
                                                <p className={`text-md text-zinc-800 w-fit px-3 py-1 rounded-full 
                                                    ${prod.stock > 10 
                                                        ? 'bg-green-500' 
                                                        : prod.stock > 0 
                                                            ? 'bg-yellow-400' 
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
                                    <p className="text-gray-700 text-xl font-semibold">No hay productos en esta categoría.</p>
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
    },
    {
        id: 2,
        keyValue: 'AcusticasElectroacusticas',
        title: 'Acusticas Electroacusticas',
    },
    {
        id: 3,
        keyValue: 'test',
        title: 'Baterias',
    },
]