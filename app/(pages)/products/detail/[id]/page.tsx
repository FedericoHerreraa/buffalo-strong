import { AddToCart } from "@/app/components/AddToCart";
import { CustomSeparator } from "@/app/components/CustomSeparator";
import { ProductDetails } from "@/app/components/ProductDetails";
import { RelatedProducts } from "@/app/components/RelatedProducts";
import { merriweather_sans } from "@/app/fonts/fonts";
import { supabase } from "@/lib/supabaseClient";
import Image from "next/image";


export default async function Page({ params } : { params: Promise<{ id: string }> }) {
    const parameters = await params;
    const { data: product } = await supabase.from("products").select("*").eq("id", parameters.id).single();

    if (!product) {
        return <p className="h-[50vh] text-center text-red-500">Producto no encontrado</p>;
    }

    return (
        <div className={merriweather_sans.className}>
            <div className="flex items-center gap-4 mt-10">
                <div className="md:w-full w-0 md:h-[1px] h-0 bg-zinc-300"></div>
                <h1 className="text-4xl font-bold whitespace-nowrap bg-gradient-to-r from-[#8B5E3B] via-[#6F4E37] to-[#472913] bg-clip-text text-transparent text-center">Detalle de producto</h1>
                <div className="md:w-full w-0 md:h-[1px] h-0 bg-zinc-300"></div>
            </div>
            <section className="min-h-[80vh] md:w-[80%] w-[97%] mx-auto p-10 mt-20 flex md:flex-row flex-col gap-10">
                <div className="md:w-1/2 md:border-r h-fit border-r-zinc-200">
                    <h1 className="text-4xl text-zinc-600 font-bold border-l-4 border-l-zinc-800 pl-5">{product.title}</h1>
                    {product.img.length > 0 && (
                        <Image 
                            src={product.img[0]} 
                            alt={product.title} 
                            width={400}
                            height={400}
                            className="w-[400px] h-[400px] object-cover my-10"
                        />
                    )}
                    <div className="flex items-center gap-5">
                        <div className="rounded-full w-8 h-8 bg-gradient-to-br from-violet-500 to-violet-800" />
                        <div className="rounded-full w-8 h-8 bg-gradient-to-br from-blue-400 to-blue-700" />
                        <div className="rounded-full w-8 h-8 bg-gradient-to-br from-green-600 to-green-900" />
                    </div>
                </div>
                <div className="md:w-1/2">
                    <ProductDetails product={product}/>
                    <AddToCart prod={product}/>
                </div>
            </section>

            <CustomSeparator />

            <section className="mt-10">
                <RelatedProducts categoryKey={product.category}/>
            </section>
        </div>
    )
}