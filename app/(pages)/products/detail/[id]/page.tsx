import { CustomSeparator } from "@/app/components/CustomSeparator";
import { RelatedProducts } from "@/app/components/RelatedProducts";
import { open_sans } from "@/app/fonts/fonts";
import { supabase } from "@/lib/supabaseClient";
import { ProductImage } from "./ProductImage";
import { WaysOfPayment } from "@/app/components/WaysOfPayment";
import { ContactPreview } from "@/app/components/ContactPreview";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: `Detalle de Producto | Strong Buffalo Music`,
  description: `Explora las características y detalles de este increíble instrumento en Strong Buffalo Music. Encuentra el equipo perfecto para tu música.`,
};

export default async function Page({ params }: { params: Promise<{ id: string }> }) {
  const parameters = await params;
  const id = parameters.id;

  const { data: product, error } = await supabase
    .from("products")
    .select("*")
    .eq("id", id)
    .single();

  if (error || !product) {
    return <p className="h-[50vh] text-center text-red-500">Producto no encontrado</p>;
  }

  const { data: relatedProducts } = await supabase
    .from("products")
    .select("*")
    .eq("group", product.group);

  return (
    <>
      <div className={`${open_sans.className} bg-gradient-to-b from-white via-zinc-200 to-white`}>
        <div className="flex md:justify-start justify-center items-center gap-6 mt-2">
          <div className="md:w-full w-0 md:h-[1px] h-0 bg-zinc-300"></div>
          <h1 className="md:text-4xl text-3xl my-5 font-bold whitespace-nowrap bg-gradient-to-r from-amber-700 to-zinc-700 bg-clip-text text-transparent text-center">
            Detalle de producto
          </h1>
          <div className="md:w-full w-0 md:h-[1px] h-0 bg-zinc-300"></div>
        </div>

        <section className="min-h-[80vh] md:w-[80%] w-[92%] mx-auto md:p-8 mt-2 flex md:flex-row flex-col gap-12">
          <ProductImage product={product} relatedProducts={relatedProducts || []} />
        </section>

        <CustomSeparator />

        <section className="mt-2 px-4">
          <RelatedProducts categoryKey={product.category} />
        </section>

      </div>
      <CustomSeparator />

      <section className="mt-8 px-4">
        <WaysOfPayment />
      </section>

      <section className="mt-8 px-4">
        <ContactPreview />
      </section>
    </>

  )
}