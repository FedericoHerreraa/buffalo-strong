'use client'

import { ProductDB } from "@/app/types/types";
import Image from "next/image";
import Link from "next/link";
import { ProdPrice } from "./ProdPrice";
import { useMobileView } from "@/app/context/MobileContext";

export const Product = ({ prod, index }: { prod: ProductDB, index: number }) => {
  const { isMobile } = useMobileView()

  return (
    <Link
      href={`/products/detail/${prod.id}`}
      key={index}
      className="md:min-w-[250px] md:max-w-[250px] min-w-[150px] max-w-[150px] md:min-h-[450px] min-h-[250px] border border-zinc-200 bg-white rounded-md md:hover:shadow-lg transition-all duration-200 cursor-pointer"
    >
      <div className="h-1/2 p-1 border-b border-b-zinc-200">
        <Image
          src={prod.img[0]}
          alt="Alt de la imagen"
          width={250}
          height={250}
          className="p-4 w-full"
        />
      </div>
      <div className="md:p-1">
        <ProdPrice prod={prod} />
        <div className="flex justify-between md:gap-3 gap-1 items-center p-3">
          <h3 className="whitespace-normal md:text-lg text-sm">{prod.title.slice(0, 15)}...</h3>
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
        <p className="text-zinc-600 text-sm p-2 md:pb-10 pb-3 whitespace-normal">
          {prod.description.slice(0, isMobile ? 20 : 80)}...
        </p>
      </div>
    </Link>
  );
};
