import { AddToCart } from "@/app/components/AddToCart";
import { ProductDetails } from "@/app/components/ProductDetails";
import { supabase } from "@/lib/supabaseClient";
import Image from "next/image";


export default async function Page({ params } : { params: Promise<{ id: string }> }) {
    const parameters = await params;
    const { data: product } = await supabase.from("products").select("*").eq("id", parameters.id).single();

    if (!product) {
        return <p className="h-[50vh] text-center text-red-500">Producto no encontrado</p>;
    }

    return (
        <div className="min-h-[100vh] w-[80%] mx-auto p-10 mt-20 flex gap-10">
            <div className="w-1/2 border-r h-fit border-r-zinc-200">
                <h1 className="text-4xl font-bold border-l-4 border-l-zinc-800 pl-5">{product.title}</h1>
                {product.img.length > 0 && (
                    <Image 
                        src={product.img[0]} 
                        alt={product.title} 
                        width={400}
                        height={400}
                        className="w-[400px] h-[400px] object-cover my-10"
                    />
                )}
                <div className="flex items-center gap-5 ">
                    <div className="rounded-full w-8 h-8 bg-gradient-to-br from-violet-500 to-violet-800" />
                    <div className="rounded-full w-8 h-8 bg-gradient-to-br from-blue-400 to-blue-700" />
                    <div className="rounded-full w-8 h-8 bg-gradient-to-br from-green-600 to-green-900" />
                </div>
            </div>
            <div className="w-1/2">
                <ProductDetails product={product}/>
                <AddToCart prod={product}/>
            </div>
        </div>
    )
}