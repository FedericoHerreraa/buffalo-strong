import type { Metadata } from "next";
import { Header } from "./components/Header";
import { Footer } from "./components/Footer";
import "./globals.css";
import { CartProvider } from "./context/CartContext";
import { AuthProvider } from "./context/AuthContext";
import { BackToTop } from "./components/BackToTop";

export const metadata: Metadata = {
  title: "Buffalo Strong",
  description: "This is the description for buffalo strong",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode; }>) {
  return (
    <html lang="en">
      <body>
        <CartProvider>
          <AuthProvider>
            <Header />
            {children}
            <Footer />
            <BackToTop />
          </AuthProvider>
        </CartProvider>
      </body>
    </html>
  );
}
