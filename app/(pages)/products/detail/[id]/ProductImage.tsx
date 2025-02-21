'use client'

import { ProductDB } from "@/app/types/types";
import Image from "next/image";
import { useState, useEffect } from "react";

import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/app/components/ui/select";

export const ProductImage = ({ product }: { product: ProductDB }) => {
    const [colorSelected, setColorSelected] = useState<string>();
    const [index, setIndex] = useState<number>(0);
    const [img, setImg] = useState<string>(product.imgByColor[0]?.images[0]);

    useEffect(() => {
        if (colorSelected) {
            const index = product.colors.indexOf(colorSelected);
            setIndex(index);
            setImg(product.imgByColor[index]?.images[0]);
        }
    }, [colorSelected, product.colors, product.imgByColor]);

    return (
        <>
            <div className="flex justify-around gap-10 ">
                <h1 className="md:text-4xl text-3xl text-zinc-600 font-bold border-l-4 border-l-zinc-800 pl-5">{product.title}</h1>
                <Select onValueChange={setColorSelected}>
                    <SelectTrigger className="w-fit p-4 gap-3 border-zinc-500">
                        <SelectValue placeholder="Selecciona un color" />
                    </SelectTrigger>
                    <SelectContent className="p-2 border-zinc-300 bg-white">
                        {product.colors.map((color: string, index: number) => (
                            <SelectItem className="border-none cursor-pointer" key={index} value={color}>
                                {color}
                            </SelectItem>
                        ))}
                    </SelectContent>
                </Select>
            </div>
            <Image
                src={img}
                alt={"product img"}
                width={400}
                height={400}
                className="w-[400px] h-[400px] object-cover my-10"
            />
            <div className="flex items-center gap-20">
                <div className="flex items-center gap-3">
                    {product.imgByColor[index].images.map((imgToShow, index) => {
                        return (
                            <div key={index}>
                                {imgToShow !== img && (
                                    <div 
                                        onClick={() => setImg(imgToShow)}
                                        className="flex gap-2 border border-zinc-300 rounded-lg cursor-pointer hover:border-zinc-700 hover:scale-105 transition-all duration-150 p-2"
                                    >
                                        <Image
                                            src={imgToShow}
                                            alt={"product img"}
                                            width={50}
                                            height={50}
                                            className="w-[50px] h-[50px] object-cover"
                                        />
                                    </div>
                                )}
                            </div>
                        )
                    })}
                </div>
            </div>
        </>
    );
};