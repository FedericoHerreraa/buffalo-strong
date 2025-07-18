import { Header } from "./Header";
import { Footer } from "./Footer";
import { BackToTop } from "./BackToTop";
import { Toaster } from "@/app/components/ui/sonner";

export default function MainLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Header />
      {children}
      <Footer />
      <BackToTop />
      <Toaster />
    </>
  );
}