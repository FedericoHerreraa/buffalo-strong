import { CarouselHomePage } from "@/app/components/CarouselHomePage";
import { Products } from "@/app/components/Products";
import { CustomSeparator } from "./components/CustomSeparator";
import { WaysOfPayment } from "./components/WaysOfPayment";
import { ContactPreview } from "./components/ContactPreview";
import { ImagesSection } from "./components/ImagesSection";
import { Suspense }  from 'react'
import { Metadata } from "next";
import MainLayout from "./components/MainLayout";

export const metadata: Metadata = {
  title: `Strong Buffalo Music | Instrumentos Musicales al Mejor Precio`,
  description: `Descubre una amplia selección de instrumentos musicales en Strong Buffalo Music. Guitarras, bajos, baterías, teclados y más. Compra con confianza y las mejores opciones de pago. 🎸🥁🎹`,
}

export default function Home() {
  return (
    <MainLayout>
      <CarouselHomePage />
      <Suspense>
        <Products />
      </Suspense>
      <ImagesSection />
      <CustomSeparator />
      <WaysOfPayment />
      <ContactPreview />
    </MainLayout>
  );
}



