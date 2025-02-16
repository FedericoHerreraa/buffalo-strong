
import { supabase } from "@/lib/supabaseClient";
import Link from "next/link";
import Image from "next/image";
import { ProdPrice } from "@/app/components/ProdPrice";

export default async function CategoryDetail({ params } : { params: Promise<{ category: string }> }) {
    const parameters = await params;
    const { data: products } = await supabase.from("products").select("*").eq("category", parameters.category);

    const categoryTitle = categories.find(cat => cat.keyValue === parameters.category)?.title;

    return (
        <div className="w-[80%] mx-auto my-10">
            <h1 className="text-3xl font-semibold mb-10">{categoryTitle}</h1>
            <div className="flex flex-wrap gap-10">
                {products?.map((prod, index) => (
                    <Link 
                        href={`/products/detail/${prod.id}`}
                        key={index} 
                        className="w-[300px] border border-zinc-200 hover:border-zinc-300 bg-white rounded-md hover:scale-105 transition-all duration-200 cursor-pointer"
                    >
                        <div className="flex justify-between items-center p-5">
                            <h3 className="text-xl font-semibold">{prod.title}</h3>
                            <p className={`text-md bg-gradient-to-br text-zinc-800 w-fit px-3 py-3 rounded-full shadow-md 
                                ${prod.stock > 30 
                                    ? 'from-green-300 to-green-600' 
                                    : prod.stock > 0 
                                        ? 'from-yellow-300 to-yellow-600' 
                                        : 'from-red-300 to-red-600'}`
                            }>
                            </p>
                        </div>
                        {prod.img.length > 0 && (
                            <Image 
                                src={prod.img[0]} 
                                alt="Alt de la imagen"
                                width={300}
                                height={300}
                                className="p-4"
                            />
                        )}
                        <p className="text-zinc-600 text-sm p-3 pb-10">{prod.description.slice(0, 100)}...</p>
                        <div className="h-[20px] px-2 py-7 bg-black text-zinc-300 flex justify-between items-center">
                            <ProdPrice prod={prod}/>
                        </div>
                    </Link>
                ))}
            </div>
        </div>
    )
}

const categories = [
    {
        id: 1,
        keyValue: 'GuitarraCriolla',
        title: 'Guitarra Criolla',
    },
    {
        id: 2,
        keyValue: 'AcusticasElectroacusticas',
        title: 'Acústicas y Electroacústicas',
    },
    {
        id: 3,
        keyValue: 'Electricas',
        title: 'Eléctricas'
    },
    {
        id: 5,
        keyValue: 'ElectroacusticasAltaGama',
        title: 'Electroacústicas alta gama'
    }
]