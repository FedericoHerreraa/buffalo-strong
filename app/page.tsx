import { CarouselHomePage } from "@/app/components/CarouselHomePage";
import { Products } from "@/app/components/Products";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Buffalo Strong",
  description: "Buffalo Strong is a community-driven platform that connects local businesses with customers in the Buffalo area.",
};

export default function Home() {
  return (
    <>
      <CarouselHomePage />
      <Products />
    </>
  );
}
