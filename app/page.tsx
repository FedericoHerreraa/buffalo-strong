import { CarouselHomePage } from "@/app/components/CarouselHomePage";
import { Products } from "@/app/components/Products";
import { FIltersComponent } from "@/app/components/FiltersComponent";
import { CustomSeparator } from "./components/CustomSeparator";
import { WaysOfPayment } from "./components/WaysOfPayment";
import { ContactPreview } from "./components/ContactPreview";
import { ImagesSection } from "./components/ImagesSection";
import { Suspense }  from 'react'

export default function Home() {
  return (
    <>
      <CarouselHomePage />
      <CustomSeparator />
      <FIltersComponent /> 
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



