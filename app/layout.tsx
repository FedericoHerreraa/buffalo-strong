
import "./globals.css";
import { CartProvider } from "./context/CartContext";
import { AuthProvider } from "./context/AuthContext";
import { MobileViewProvider } from "./context/MobileContext";

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode; }>) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" href="https://zbixbwkzoftoplldzjya.supabase.co/storage/v1/object/sign/Images/logos/logoBlanco.png?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1cmwiOiJJbWFnZXMvbG9nb3MvbG9nb0JsYW5jby5wbmciLCJpYXQiOjE3NDE3MjQ5MDQsImV4cCI6MTg5OTQwNDkwNH0.WBZ2EFqX6Tl_2RWuRgOounzN7xkLCvXTSKI-HrE-SKo"/>
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
