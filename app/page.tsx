import { CarouselHomePage } from "@/app/components/CarouselHomePage";
import { Products } from "@/app/components/Products";
import { CustomSeparator } from "./components/CustomSeparator";
import { WaysOfPayment } from "./components/WaysOfPayment";
import { ContactPreview } from "./components/ContactPreview";
import { ImagesSection } from "./components/ImagesSection";
import { Suspense }  from 'react'
import { Metadata } from "next";

export const metadata: Metadata = {
  title: `Buffalo's Strong | Instrumentos Musicales al Mejor Precio`,
  description: `Descubre una amplia selección de instrumentos musicales en Buffalo's Strong. Guitarras, bajos, baterías, teclados y más. Compra con confianza y las mejores opciones de pago. 🎸🥁🎹`,
}

export default function Home() {
  return (
    <>
      <CarouselHomePage />
      <Suspense>
        <Products />
      </Suspense>
      <ImagesSection />
      <CustomSeparator />
      <WaysOfPayment />
      <ContactPreview />
    </>
  );
}



