'use client'

import { useEffect, useState } from 'react'
import { Product } from "@/app/components/Product";
import { ProductDB } from "@/app/types/types";
import { useSearchParams } from 'next/navigation';


export const ProductsShown = ({ products } : { products: ProductDB[] }) => {
    const [prods, setProds] = useState<ProductDB[]>(products);
    const searchParams = useSearchParams()
    const searchQuery = searchParams.get("search") || "";

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

    return (
        <div className="flex flex-wrap justify-center gap-10 bg-gradient-to-b from-white via-zinc-100 to-white">
            {prods?.map((prod, index) => (
                <Product key={index} prod={prod} index={index} />
            ))}
        </div>
    )
}