
import Image from "next/image"
import Link from "next/link"
import { supabase } from "@/lib/supabaseClient"
import { merriweather_sans } from "@/app/fonts/fonts";
import { ProdPrice } from "./ProdPrice";
import { StockReference } from "./StockReference";
import { categories } from "@/app/info/info";

export const Products = async () => {
    const { data: prods } = await supabase.from('products').select('*')
        
    return (
        <div className={`min-h-[100vh] ${merriweather_sans.className}`}>
            <section className="flex gap-20 mt-20 mb-20 w-[90%] mx-auto flex-wrap">
                <StockReference />
                {categories.map(cat => {
                    const filteredProducts = prods?.filter(prod => prod.category === cat.keyValue).slice(0, 6);
                    return (
                        <div key={cat.keyValue} id={cat.keyValue} className="mb-6 w-full">
                            <div className="flex gap-5 items-center mb-10">
                                <h1
                                    className={`text-4xl font-bold whitespace-nowrap bg-gradient-to-r from-[#8B5E3B] via-[#6F4E37] to-[#472913] bg-clip-text text-transparent`}
                                    >
                                    {cat.title}
                                </h1>
                                <Link 
                                    href={`/products/${cat.keyValue}`}
                                    className="w-fit whitespace-nowrap flex-shrink-0 min-w-max text-zinc-400 cursor-pointer hover:text-zinc-600 transition-all duration-150"
                                >
                                        Ver mas sobre esta categoria
                                </Link>
                                <div className="w-full h-[1px] bg-zinc-300"></div>
                            </div>
                            <div className="flex gap-4 overflow-x-auto whitespace-nowrap pb-5">
                                {filteredProducts && filteredProducts.length > 0 ? (
                                    filteredProducts.map((prod, index) => (
                                        <Link 
                                            href={`/products/detail/${prod.id}`}
                                            key={index} 
                                            className="min-w-[250px] h-full border border-zinc-200 hover:border-zinc-300 bg-white rounded-md hover:scale-105 transition-all duration-200 cursor-pointer"
                                        >
                                            <div className="flex justify-between gap-3 items-center p-5">
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
                                            <div className="h-fit px-2 py-7 bg-black text-zinc-300 flex justify-between items-center">
                                                <ProdPrice prod={prod}/>
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


