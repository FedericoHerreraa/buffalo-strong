import { CustomSeparator } from "@/app/components/CustomSeparator";
import { Contact } from "./Contact";
import { WaysOfPayment } from "@/app/components/WaysOfPayment";
import { ContactPreview } from "@/app/components/ContactPreview";

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