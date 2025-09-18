
import { supabase } from "@/lib/supabaseClient";
import { categories } from "@/app/info/info";
import { WaysOfPayment } from "@/app/components/WaysOfPayment";
import { ContactPreview } from "@/app/components/ContactPreview";
import { CustomSeparator } from "@/app/components/CustomSeparator";
import { Metadata } from "next";
import { ProductsShown } from "./ProductsShown";
import { ProductDB } from "@/app/types/types";

export const metadata: Metadata = {
    title: `Explora las categorias | Strong Buffalo Music`,
    description: `Descubre nuestra selección de categorias en Strong Buffalo Music. Encuentra instrumentos de calidad al mejor precio y mejora tu música.`,
};

export default async function CategoryDetail({ params } : { params: Promise<{ category: string }> }) {
    const parameters = await params;
    const { data: products } = await supabase.from("products").select("*").eq("category", parameters.category) as { data: ProductDB[] };

    products.sort((a, b) => a.sugestedPrice - b.sugestedPrice);

    const categoryTitle = categories.find(cat => cat.keyValue === parameters.category)?.title;

    return (
        <div className="my-10">
            <div className="flex items-center gap-4 mb-20">
                <div className="w-full h-[1px] bg-zinc-300"></div>
                <h1 className="text-4xl md:whitespace-nowrap font-bold bg-gradient-to-r from-[#8B5E3B] via-[#6F4E37] to-[#472913] bg-clip-text text-transparent text-center">{categoryTitle}</h1>
                <div className="w-full h-[1px] bg-zinc-300"></div>
            </div>
            <ProductsShown products={products}/>

            <CustomSeparator />
            <WaysOfPayment />
            <ContactPreview />
        </div>
    )
}