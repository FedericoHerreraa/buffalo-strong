'use client'

import { ProductDB } from "@/app/types/types";
import { AddToCart } from "@/app/components/AddToCart";
import Image from "next/image";
import { useState } from "react";
import { useRouter } from "next/navigation"; 

import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/app/components/ui/select";


export const ProductImage = ({ product, relatedProducts }: { product: ProductDB, relatedProducts: ProductDB[] }) => {
    const router = useRouter();
    const [img, setImg] = useState<string>(product.img[0]);

    const colorOptions = relatedProducts.map(prod => ({
        color: prod.color,
        id: prod.id
    }));

    const handleColorChange = (selectedId: string) => {
        router.push(`/products/detail/${selectedId}`); 
    };

    return (
        <>
            <div className="flex">
                <div className="md:w-1/2 md:border-r border-r-zinc-200 flex flex-col justify-center p-5">
                <div className="flex justify-around md:gap-6 gap-3 md:mr-3 mr-1">
                    <h1 className="md:text-3xl text-2xl text-zinc-600 font-bold border-l-4 border-l-zinc-800 pl-5">
                        {product.title}
                    </h1>
                    <Select onValueChange={handleColorChange}>
                    <SelectTrigger className="w-fit p-2 gap-3 border-zinc-300 text-zinc-500">
                        <SelectValue placeholder="Selecciona un color" />
                    </SelectTrigger>
                    <SelectContent className="p-2 border-zinc-300 bg-white text-zinc-600">
                        {colorOptions.map(({ color, id }) => (
                        <SelectItem key={id} value={id.toString()} className="border-none cursor-pointer">
                            {color}
                        </SelectItem>
                        ))}
                    </SelectContent>
                    </Select>
                </div> 

                <div className="flex justify-center items-center flex-1">
                    <Image
                    src={img}
                    alt="product img"
                    width={300}
                    height={300}
                    className="w-[300px] h-[300px] object-contain my-2"
                    />
                </div>

                <div className="flex justify-center">
                    {product.img.map((imgToShow, index) => (
                    <div key={index}>
                        {imgToShow !== img && (
                        <div 
                            onClick={() => setImg(imgToShow)}
                            className="border mx-1 border-zinc-300 rounded-md cursor-pointer hover:border-zinc-700 hover:scale-105 transition-all duration-150 p-1"
                        >
                            <Image
                            src={imgToShow}
                            alt="product img"
                            width={60}
                            height={60}
                            className="w-[60px] h-[60px] object-contain"
                            />
                        </div>
                        )}
                    </div>
                    ))}
                </div>
                </div>

                <div className="md:w-1/2 flex flex-col justify-center items-center p-5">
                <AddToCart prod={product} color={product.color} />
                </div>
            </div>
            </>

    );
};