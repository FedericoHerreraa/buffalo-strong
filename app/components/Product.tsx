

import { ProductDB } from "../types/types";
import Image from "next/image";
import Link from "next/link";
import { ProdPrice } from "./ProdPrice";

export const Product = ({ prod, index }: { prod: ProductDB, index: number }) => {
  return (
    <Link
      href={`/products/detail/${prod.id}`}
      key={index}
      className="min-w-[250px] max-w-[250px] min-h-[450px] border border-zinc-200 bg-white rounded-md md:hover:shadow-lg transition-all duration-200 cursor-pointer"
    >
      <Image
        src={prod.img[0]}
        alt="Alt de la imagen"
        width={250}
        height={250}
        className="p-4 border-b border-b-zinc-200 w-full"
      />
      <ProdPrice prod={prod} />
      <div className="flex justify-between gap-3 items-center p-3">
        <h3 className=" whitespace-normal">{prod.title.slice(0, 15)}...</h3>
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
      <p className="text-zinc-600 text-sm p-3 pb-10 whitespace-normal">
        {prod.description.slice(0, 80)}...
      </p>
    </Link>
  );
};
