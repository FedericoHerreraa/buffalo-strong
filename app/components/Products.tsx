
import Link from "next/link"
import { supabase } from "@/lib/supabaseClient"
import { merriweather_sans } from "@/app/fonts/fonts";
import { StockReference } from "./StockReference";
import { categories } from "@/app/info/info";
import { IoIosArrowRoundForward } from "react-icons/io";
import { Product } from "./Product";


export const Products = async () => {
    const { data: prods } = await supabase.from('products').select('*')
        
    return (
        <div className={`min-h-[100vh] ${merriweather_sans.className}`}>
            <section className="flex gap-20 mt-20 mb-20 md:w-[90%] w-[97%] mx-auto flex-wrap md:shadow-lg p-10 md:border-x md:border-x-zinc-200 md:rounded-b-lg ">
                <StockReference />
                {categories.map(cat => {
                    const filteredProducts = prods?.filter(prod => prod.category === cat.keyValue).slice(0, 6);
                    return (
                        <div key={cat.keyValue} id={cat.keyValue} className="mb-6 w-full bg-gradient-to-b from-white via-zinc-100 to-white">
                            <div className="flex md:flex-row flex-col md:gap-5 gap-3 md:items-center mb-10">
                                <h1
                                    className={`md:text-4xl text-3xl font-bold md:whitespace-nowrap bg-gradient-to-r from-[#8B5E3B] via-[#6F4E37] to-[#472913] bg-clip-text text-transparent`}
                                    >
                                    {cat.title}
                                </h1>
                                <div className="flex items-center gap-2">
                                    <Link 
                                        href={`/products/${cat.keyValue}`}
                                        className="w-fit whitespace-nowrap flex-shrink-0 min-w-max text-zinc-400 cursor-pointer hover:text-zinc-600 transition-all duration-150"
                                    >
                                            Ver mas sobre esta categoria
                                    </Link>
                                    <IoIosArrowRoundForward size={25}/>
                                </div>
                                <div className="md:w-full w-0 md:h-[1px] h-0 bg-zinc-300"></div>
                            </div>
                            <div className="flex gap-4 overflow-x-auto whitespace-nowrap pb-5">
                                {filteredProducts && filteredProducts.length > 0 ? ( 
                                    filteredProducts.map((prod, index) => (
                                        <Product key={index} prod={prod} index={index}/>
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


