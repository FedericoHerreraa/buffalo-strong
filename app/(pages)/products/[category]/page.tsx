
import { supabase } from "@/lib/supabaseClient";
import { categories } from "@/app/info/info";
import { Product } from "@/app/components/Product";
import { WaysOfPayment } from "@/app/components/WaysOfPayment";
import { ContactPreview } from "@/app/components/ContactPreview";
import { CustomSeparator } from "@/app/components/CustomSeparator";

export default async function CategoryDetail({ params } : { params: Promise<{ category: string }> }) {
    const parameters = await params;
    const { data: products } = await supabase.from("products").select("*").eq("category", parameters.category);

    const categoryTitle = categories.find(cat => cat.keyValue === parameters.category)?.title;

    return (
        <div className="my-10">
            <div className="flex items-center gap-4 mb-20">
                <div className="w-full h-[1px] bg-zinc-300"></div>
                <h1 className="text-4xl font-bold whitespace-nowrap bg-gradient-to-r from-[#8B5E3B] via-[#6F4E37] to-[#472913] bg-clip-text text-transparent text-center">{categoryTitle}</h1>
                <div className="w-full h-[1px] bg-zinc-300"></div>
            </div>
            <div className="flex flex-wrap justify-center gap-10">
                {products?.map((prod, index) => (
                    <Product key={index} prod={prod} index={index}/>
                ))}
            </div>
            <CustomSeparator />
            <WaysOfPayment />
            <ContactPreview />
        </div>
    )
}