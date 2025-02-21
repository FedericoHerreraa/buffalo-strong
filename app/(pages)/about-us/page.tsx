import { CustomSeparator } from "@/app/components/CustomSeparator";
import { AboutUsComponent } from "./AboutUs";
import { WaysOfPayment } from "@/app/components/WaysOfPayment";
import { ContactPreview } from "@/app/components/ContactPreview";


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