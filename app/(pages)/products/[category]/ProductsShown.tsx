'use client'

import { useEffect, useState } from 'react'
import { Product } from "@/app/components/Product";
import { ProductDB } from "@/app/types/types";
import { useSearchParams, useRouter } from 'next/navigation';
import { subcategories } from "@/app/info/info";


export const ProductsShown = ({ products }: { products: ProductDB[] }) => {
    const [prods, setProds] = useState<ProductDB[]>(products);
    const searchParams = useSearchParams()
    const searchQuery = searchParams.get("search") || "";
    const subcategoryParam = searchParams.get("subcategory") || "";
    const router = useRouter();
    const [subcategory, setSubcategory] = useState<string>(subcategoryParam);

    useEffect(() => {
        if (searchQuery) {
            const filteredData = products.filter(prod =>
                prod.title.toLowerCase().includes(searchQuery.toLowerCase())
            );
            setProds(filteredData);
        } else {
            setProds(products);
        }
    }, [searchQuery, products]);

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

    if (prods.length === 0) {
        return (
            <div className="flex flex-col items-center  h-screen">
                <h1 className="text-2xl font-bold text-gray-700">No se encontraron productos.</h1>
            </div>
        )
    }

    return (
        <>
            {prods[0].category === "Electricas" ? (
                <div className='flex flex-col items-center gap-10'>
                    <div className="w-fit mb-5 gap-2 border border-zinc-300 p-1 rounded-md">
                        {subcategories.map((subcat) => (
                            <button
                                key={subcat.id}
                                className={`px-2 py-1 text-sm rounded-sm transition-all duration-150 ${subcategory === subcat.keyValue ? "bg-zinc-500 text-white" : ""
                                    }`}
                                onClick={() => handleTabChange(subcat.keyValue)}
                            >
                                {subcat.title.charAt(0).toUpperCase() + subcat.title.slice(1)}
                            </button>
                        ))}
                    </div>
                    <div className="flex flex-wrap justify-center gap-10 bg-gradient-to-b from-white via-zinc-100 to-white">
                        {filterBySubcategory(subcategory) && filterBySubcategory(subcategory).length > 0 ? (
                            filterBySubcategory(subcategory).map((prod, index) => (
                                <Product key={index} prod={prod} index={index} />
                            ))
                        ) : (
                            <p className="text-gray-700 text-xl font-semibold">No se encontraron productos en esta categoría.</p>
                        )}
                    </div>
                </div>
            ) : (
                <div className="flex flex-wrap justify-center gap-10 bg-gradient-to-b from-white via-zinc-100 to-white">
                    {prods?.map((prod, index) => (
                        <Product key={index} prod={prod} index={index} />
                    ))}
                </div>
            )}
        </>
    )
}