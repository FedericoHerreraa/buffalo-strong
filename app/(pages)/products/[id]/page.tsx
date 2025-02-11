import { supabase } from "@/lib/supabaseClient";
import Image from "next/image";


export default async function Page({ params } : { params: Promise<{ id: string }> }) {
    const parameters = await params;
    const { data: product } = await supabase.from("products").select("*").eq("id", parameters.id).single();

    if (!product) {
        return <p className="text-center text-red-500">Producto no encontrado</p>;
    }

    return (
        <div className="min-h-[100vh] w-[80%] mx-auto p-10 mt-20 flex gap-10">
            <div className="w-1/2 border-r border-r-zinc-200">
                <h1 className="text-4xl font-bold">{product.title}</h1>
                {product.img.length > 0 && (
                    <Image 
                        src={product.img[0]} 
                        alt={product.title} 
                        width={400}
                        height={400}
                        className="w-[400px] h-[400px] object-cover mt-5"
                    />
                )}
                <div className="flex items-center gap-5 ">
                    <div className="rounded-full w-8 h-8 bg-gradient-to-br from-violet-500 to-violet-800" />
                    <div className="rounded-full w-8 h-8 bg-gradient-to-br from-blue-400 to-blue-700" />
                    <div className="rounded-full w-8 h-8 bg-gradient-to-br from-green-600 to-green-900" />
                </div>
            </div>
            <div className="w-1/2">
                <p className="text-zinc-600">{product.description}</p>
                <p className="mt-4 font-semibold">Marca: {product.brand}</p>
                <p className="mt-2 text-lg font-bold text-green-700">Precio: ${product.sugestedPrice}</p>
                <p className={`mt-2 text-white py-1 px-4 w-fit rounded-full ${product.stock > 10 ? 'bg-green-600' : product.stock > 0 ? 'bg-yellow-600' : 'bg-red-700'}`}>
                    Stock: {product.stock}
                </p>
            </div>
        </div>
    )
}