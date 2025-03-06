import { Header } from "./components/Header";
import { Footer } from "./components/Footer";
import "./globals.css";
import { CartProvider } from "./context/CartContext";
import { AuthProvider } from "./context/AuthContext";
import { BackToTop } from "./components/BackToTop";
import { MobileViewProvider } from "./context/MobileContext";
import { Toaster } from "@/app/components/ui/sonner"

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode; }>) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" href="https://zbixbwkzoftoplldzjya.supabase.co/storage/v1/object/sign/Images/logos/Logobuffalo.png?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1cmwiOiJJbWFnZXMvbG9nb3MvTG9nb2J1ZmZhbG8ucG5nIiwiaWF0IjoxNzQwNTA3NDg1LCJleHAiOjE4OTgxODc0ODV9.eATxqb4-ATyweVjeCqZ-p4pfoqF0lKbdXRiJR7Xf_Tw"/>
      </head>
      <body>
        <CartProvider>
          <AuthProvider>
            <MobileViewProvider>
              <Header />
              {children}
              <Footer />
              <BackToTop />
              <Toaster />
            </MobileViewProvider>
          </AuthProvider>
        </CartProvider>
      </body>
    </html>
  );
}
