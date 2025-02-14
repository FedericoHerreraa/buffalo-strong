import { CarouselHomePage } from "@/app/components/CarouselHomePage";
import { Products } from "@/app/components/Products";
import { FIltersComponent } from "@/app/components/FiltersComponent";

export default function Home() {
  return (
    <>
      <CarouselHomePage />
      <FIltersComponent /> 
      <Products />
    </>
  );
}



