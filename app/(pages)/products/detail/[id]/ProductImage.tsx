
'use client'

import { ProductDB } from "@/app/types/types";
// import Image from "next/image";
import { useState, useEffect } from "react";

export const ProductImage = ({ product }: { product: ProductDB }) => {
    const [colorSelected, setColorSelected] = useState<string>();
    // const [imageIndex, setImageIndex] = useState<number>(0);

    const handleColorChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        setColorSelected(event.target.value);
    };

    useEffect(() => {
        if (colorSelected) {
            // const index = product.colors.indexOf(colorSelected);
            // setImageIndex(index);
        }
    }, [colorSelected, product.colors]);

    return (
        <>
            {/* {product.imgByColor[imageIndex].map((img: string, index: number) => (
                <Image
                    key={index}
                    src={img}
                    alt={product.title}
                    width={400}
                    height={400}
                    className="w-[400px] h-[400px] object-cover my-10"
                />
            ))} */}
            <div className="flex items-center gap-5">
                <select
                    value={colorSelected}
                    onChange={handleColorChange}
                    className="border rounded-md p-2"
                >
                    <option value="" disabled>
                        Selecciona un color
                    </option>
                    {product.colors.map((color: string, index: number) => (
                        <option key={index} value={color} className="text-gray-700">
                            {color}
                        </option>
                    ))}
                </select>
            </div>
        </>
    )
}