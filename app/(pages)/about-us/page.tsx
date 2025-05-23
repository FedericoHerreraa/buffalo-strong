import { CustomSeparator } from "@/app/components/CustomSeparator";
import { AboutUsComponent } from "./AboutUs";
import { WaysOfPayment } from "@/app/components/WaysOfPayment";
import { ContactPreview } from "@/app/components/ContactPreview";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: `Sobre Nosotros | Strong Buffalo Music`,
  description: `Conoce la historia de Strong Buffalo Music. Descubre nuestro compromiso con la venta de instrumentos musicales de calidad y cómo ayudamos a músicos de todo el mundo.`,
};

export default function AboutUs() {
  return (
    <>
      <AboutUsComponent />
      <CustomSeparator />
      <WaysOfPayment />
      <ContactPreview />
    </>
  );
}