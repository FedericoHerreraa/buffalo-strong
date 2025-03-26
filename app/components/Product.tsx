'use client'

import { ProductDB } from "@/app/types/types";
import Image from "next/image";
import Link from "next/link";
import { ProdPrice } from "./ProdPrice";
import { useAuth } from "@/app/context/AuthContext";
import { useState } from "react";
import { useCart } from "../context/CartContext";
import { redirect } from "next/navigation";
import { MdAddShoppingCart } from "react-icons/md";


import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/app/components/ui/select";

export const Product = ({ prod, index }: { prod: ProductDB, index: number }) => {
  // const { isMobile } = useMobileView();  
  const [count, setCount] = useState<number>(1);
  const { addToCart } = useCart()
  const { user } = useAuth()

  return (
    <Link
      href={`/products/detail/${prod.id}`}
      key={index}
      className="flex flex-col border border-zinc-200 bg-white rounded-md md:hover:shadow-lg transition-all duration-200 cursor-pointer
                 w-[170px] md:w-[250px] min-h-[300px] md:h-[450px]"
    >
      <div className="relative w-full min-h-[150px] md:h-[250px] overflow-hidden border-b border-b-zinc-200">
        <Image
          src={prod.img[0]}
          alt="Alt de la imagen"
          fill
          className="object-cover p-2"
        />
      </div>

      <div className="flex flex-col flex-grow p-2 md:p-3">
        <ProdPrice prod={prod} />

        <div className="flex justify-between items-center py-2">
          <h3 className="whitespace-normal text-sm md:text-lg">
            {prod.title.slice(0, 15)}...
          </h3>
          <p
            className={`text-md bg-gradient-to-br text-zinc-800 w-fit px-2 py-2 rounded-full shadow-md 
              ${
                prod.stock > 30
                  ? "from-green-300 to-green-600"
                  : prod.stock > 0
                  ? "from-yellow-300 to-yellow-600"
                  : "from-red-300 to-red-600"
              }`}
          ></p>
        </div>
{/* 
        <p className="text-zinc-600 text-xs md:text-sm whitespace-normal">
          {prod.description.slice(0, isMobile ? 20 : 80)}...
        </p> */}
        <div className="flex gap-1 w-[200px] mt-10">
                <Select value={count.toString()} onValueChange={(value) => setCount(Number(value))}>
                    <SelectTrigger className="p-2 gap-3 border-zinc-300 text-zinc-500 w-[100px] md:w-[200px]">
                        <SelectValue placeholder="Seleccionar cantidad" />
                    </SelectTrigger>
                    <SelectContent className="p-2 border-zinc-300 bg-white text-zinc-600">
                        {Array.from({ length: prod.stock }, (_, i) => i + 1).map((qty) => (
                            <SelectItem key={qty} value={qty.toString()} className="border-none cursor-pointer hover:bg-zinc-500">
                                {qty}
                            </SelectItem>
                        ))}
                    </SelectContent>
                </Select>
                <button
                    disabled={count === 0}
                    onClick={() => {
                        if (!user) redirect('/register')

                        addToCart({ ...prod, quantity: count })
                        setCount(1)
                    }}
                    className="bg-zinc-800 px-4 py-2 rounded-lg text-zinc-300 hover:bg-zinc-600 hover:text-white transition-all duration-150"
                >
                    <MdAddShoppingCart />
                </button>
            </div>
      </div>
    </Link>
  );
};