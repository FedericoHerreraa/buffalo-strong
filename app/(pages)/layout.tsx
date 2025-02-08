import { Footer } from "@/app/components/Footer";
import Header from "@/app/components/Header";



export default function Layout({ children } : { children: React.ReactNode }) {
  return (
    <div className="">
      <Header />
      <main className="">{children}</main>
      <Footer />
    </div>
  );
}