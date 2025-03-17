'use client'

import { ProductDB } from "@/app/types/types";
import Image from "next/image";
import Link from "next/link";
import { ProdPrice } from "./ProdPrice";
import { useMobileView } from "@/app/context/MobileContext";

export const Product = ({ prod, index }: { prod: ProductDB, index: number }) => {
  const { isMobile } = useMobileView();

  return (
    <Link
      href={`/products/detail/${prod.id}`}
      key={index}
      className="flex flex-col border border-zinc-200 bg-white rounded-md md:hover:shadow-lg transition-all duration-200 cursor-pointer
                 w-[150px] md:w-[250px] h-[300px] md:h-[450px]"
    >
      {/* Imagen del producto */}
      <div className="relative w-full h-[150px] md:h-[250px] overflow-hidden border-b border-b-zinc-200">
        <Image
          src={prod.img[0]}
          alt="Alt de la imagen"
          fill
          className="object-cover p-2"
        />
      </div>

      {/* Información del producto */}
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

        <p className="text-zinc-600 text-xs md:text-sm whitespace-normal">
          {prod.description.slice(0, isMobile ? 20 : 80)}...
        </p>
      </div>
    </Link>
  );
};