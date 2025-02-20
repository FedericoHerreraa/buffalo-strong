import { AddToCart } from "@/app/components/AddToCart";
import { CustomSeparator } from "@/app/components/CustomSeparator";
import { ProductDetails } from "@/app/components/ProductDetails";
import { RelatedProducts } from "@/app/components/RelatedProducts";
import { merriweather_sans } from "@/app/fonts/fonts";
import { supabase } from "@/lib/supabaseClient";
// import { ProductImage } from "./ProductImage";


export default async function Page({ params } : { params: Promise<{ id: string }> }) {
    const parameters = await params;
    const { data: product } = await supabase.from("products").select("*").eq("id", parameters.id).single();

    if (!product) {
        return <p className="h-[50vh] text-center text-red-500">Producto no encontrado</p>;
    }

    console.log(product)
    
    return (
        <div className={merriweather_sans.className}>
            <div className="flex md:justify-start justify-center items-center gap-4 mt-10">
                <div className="md:w-full w-0 md:h-[1px] h-0 bg-zinc-300"></div>
                <h1 className="md:text-4xl text-3xl font-bold whitespace-nowrap bg-gradient-to-r from-[#8B5E3B] via-[#6F4E37] to-[#472913] bg-clip-text text-transparent text-center">Detalle de producto</h1>
                <div className="md:w-full w-0 md:h-[1px] h-0 bg-zinc-300"></div>
            </div>
            <section className="min-h-[80vh] md:w-[80%] w-[97%] mx-auto p-10 mt-20 flex md:flex-row flex-col gap-10">
                <div className="md:w-1/2 md:border-r h-fit border-r-zinc-200">
                    <h1 className="md:text-4xl text-3xl text-zinc-600 font-bold border-l-4 border-l-zinc-800 pl-5">{product.title}</h1>
                    {/* <ProductImage product={product}/> */}
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