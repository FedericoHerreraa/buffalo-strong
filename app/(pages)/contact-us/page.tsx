import { CustomSeparator } from "@/app/components/CustomSeparator";
import { Contact } from "./Contact";
import { WaysOfPayment } from "@/app/components/WaysOfPayment";
import { ContactPreview } from "@/app/components/ContactPreview";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: `Contacto | Buffalo's Strong`,
  description: `¿Tienes preguntas? Contáctanos en Buffalo's Strong. Estamos aquí para ayudarte con cualquier consulta sobre nuestros instrumentos musicales y servicios.`,
};

export default function ContactUs() {
    return (
      <>
        <Contact />
        <CustomSeparator />
        <WaysOfPayment />
        <ContactPreview />
      </>
    );
}