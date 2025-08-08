
import "./globals.css";
import { CartProvider } from "./context/CartContext";
import { AuthProvider } from "./context/AuthContext";
import { MobileViewProvider } from "./context/MobileContext";

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode; }>) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" href="https://zbixbwkzoftoplldzjya.supabase.co/storage/v1/object/public/Images/logos/logoBlanco.png"/>
      </head>
      <body>
        <CartProvider>
          <AuthProvider>
            <MobileViewProvider>
              {children}
            </MobileViewProvider>
          </AuthProvider>
        </CartProvider>
      </body>
    </html>
  );
}
