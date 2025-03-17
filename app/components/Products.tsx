'use client'

import Link from "next/link"
import Image from "next/image"
import { useEffect, useState } from "react"
import { supabase } from "@/lib/supabaseClient"
import { open_sans } from "@/app/fonts/fonts";
import { StockReference } from "./StockReference";
import { categories } from "@/app/info/info";
import { IoIosArrowRoundForward } from "react-icons/io";
import { Product } from "./Product";
import { ProductDB } from "@/app/types/types";
import { Spinner } from "../images/icons/Spinner";
import { FiltersComponent } from "@/app/components/FiltersComponent";
import logobuffalo from "@/app/images/logos/Logobuffalo.png";
import { useMobileView } from "../context/MobileContext"
import { useSearchParams, useRouter } from "next/navigation";

export const Products = () => {
    const [prods, setProds] = useState<ProductDB[]>([]);
    const [loading, setLoading] = useState(true);
    const searchParams = useSearchParams()
    const { isMobile } = useMobileView()
    const router = useRouter()
    const [subcategory, setSubcategory] = useState<string>("");
    
    useEffect(() => {
        const filter = searchParams.get("search");
        const fetchProducts = async () => {
            const { data, error } = await supabase.from("products").select("*");
            if (!error) {
                if (filter) {
                    const filteredData = data?.filter(prod => prod.title.toLowerCase().includes(filter.toLowerCase()));
                    setProds(filteredData || []);
                } else {
                    setProds(data || []);
                }
            }
            setLoading(false);
        }

        fetchProducts()
    }, [searchParams]);
    

    if (loading) {
        return (
            <div className="flex justify-center items-center">
                <Spinner />
            </div>
        )
    }

    const filterBySubcategory = (subcat: string) => {
        if (!subcat) {
            return prods?.filter(prod => prod.category === "Electricas"); 
        }
        return prods?.filter(prod => prod.subcategory === subcat);
    };

    const handleTabChange = (input: string) => {
        setSubcategory(input);
        const params = new URLSearchParams(searchParams);
        if (input) {
            params.set("category", input);
        } else {
            params.delete("category");
        }
        router.push(`?${params.toString()}`, { scroll: false });
    };

    return (
        <div id="products" className={`min-h-[100vh] ${open_sans.className} md:bg-gradient-to-b from-white via-zinc-200 to-white mt-20`}>
            <section className="flex gap-20 md:p-10 p-1 mb-5 md:w-[85%] w-[93%] mx-auto flex-wrap md:shadow-lg md:border-x bg-white md:border-x-zinc-200 md:rounded-b-lg ">
                <div className="flex w-full md:flex-row flex-col-reverse items-center md:justify-between justify-start md:gap-20 gap-5">
                    <div className="md:w-2/3 w-full items-center flex">
                        <FiltersComponent />
                    </div>
                    <div className="md:w-1/3 md:flex hidden w-full items-center md:justify-end justify-center gap-3 md:border-l-2 md:border-l-zinc-300">
                        <div className="flex flex-col ">
                            <p className="bg-gradient-to-r md:text-3xl text-xl font-semibold  from-amber-700 to-zinc-700 bg-clip-text text-transparent">Buffalo{"'"}s</p>
                            <p className="bg-gradient-to-r md:text-3xl text-xl font-semibold  from-amber-700 to-zinc-700 bg-clip-text text-transparent">Strong</p>
                            <p className="text-zinc-500 md:text-base text-sm">Instrumentos de calidad</p>
                        </div>
                        <Image
                            src={logobuffalo}
                            width={isMobile ? 70 : 100}
                            height={isMobile ? 70 : 100}
                            alt="Buffalo Logo"
                        />
                    </div>
                </div>
                {categories.map(cat => {
                    const filteredProducts = prods?.filter(prod => prod.category === cat.keyValue);
                    return (
                        <div key={cat.keyValue} id={cat.keyValue} className={`mb-6 w-full ${filteredProducts.length === 0 ? 'bg-white' : 'bg-gradient-to-b from-white via-zinc-100 to-white'}`}>
                            <div className="flex md:flex-row flex-col md:gap-5 gap-3 md:items-center mb-5">
                                <h1
                                    className={`md:text-4xl text-3xl font-bold md:whitespace-nowrap bg-gradient-to-r from-amber-700 to-zinc-700 bg-clip-text text-transparent`}
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
                                    <IoIosArrowRoundForward size={25} />
                                </div>
                                <div className="md:w-full w-0 md:h-[1px] h-0 bg-zinc-300"></div>
                            </div>
                            {cat.keyValue === "Electricas" && (
                                <div className="w-fit mb-5 flex gap-2 border border-zinc-300 p-1 rounded-md">
                                    {["telecaster", "lespaul", "stratocaster", "semihuecas"].map((subcat) => (
                                        <button
                                            key={subcat}
                                            className={`md:px-2 py-1 px-1 md:text-sm text-xs rounded-sm transition-all duration-150 ${
                                                subcategory === subcat ? "bg-zinc-500 text-white" : ""
                                            }`}
                                            onClick={() => handleTabChange(subcat)}
                                        >
                                            {subcat.charAt(0).toUpperCase() + subcat.slice(1)}
                                        </button>
                                    ))}
                                </div>
                            )}
                            <div className="flex md:gap-4 gap-1 overflow-x-auto whitespace-nowrap pb-5">
                                {cat.keyValue === "Electricas" ? (
                                    <>
                                        {filterBySubcategory(subcategory) && filterBySubcategory(subcategory).length > 0 ? (
                                            filterBySubcategory(subcategory).map((prod, index) => (
                                                <Product key={index} prod={prod} index={index} />
                                            ))
                                        ) : (
                                            <p className="text-gray-700 text-xl font-semibold">No se encontraron productos en esta categoría.</p>
                                        )}
                                    </>
                                ) : (
                                    <>
                                        {filteredProducts && filteredProducts.length > 0 ? (
                                            filteredProducts.map((prod, index) => (
                                                <Product key={index} prod={prod} index={index} />
                                            ))
                                        ) : (
                                            <p className="text-gray-700 text-xl font-semibold">No se encontraron productos en esta categoría.</p>
                                        )}
                                    </>
                                )}
                            </div>
                        </div>
                    );
                })}
                <StockReference />
            </section>
        </div>
    )
}


