import { CarouselHomePage } from "@/app/components/CarouselHomePage";
import { Products } from "@/app/components/Products";
import { FIltersComponent } from "@/app/components/FiltersComponent";
import { CustomSeparator } from "./components/CustomSeparator";
import { WaysOfPayment } from "./components/WaysOfPayment";
import { ContactPreview } from "./components/ContactPreview";

export default function Home() {
  return (
    <>
      <CarouselHomePage />
      <CustomSeparator />
      <FIltersComponent /> 
      <Products />
      <CustomSeparator />
      <WaysOfPayment />
      <ContactPreview />
    </>
  );
}



