import { Header } from "./components/Header";
import { Footer } from "./components/Footer";
import "./globals.css";
import { CartProvider } from "./context/CartContext";
import { AuthProvider } from "./context/AuthContext";
import { BackToTop } from "./components/BackToTop";
import { MobileViewProvider } from "./context/MobileContext";

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode; }>) {
  return (
    <html lang="en">
      <body>
        <CartProvider>
          <AuthProvider>
            <MobileViewProvider>
              <Header />
              {children}
              <Footer />
              <BackToTop />
            </MobileViewProvider>
          </AuthProvider>
        </CartProvider>
      </body>
    </html>
  );
}
