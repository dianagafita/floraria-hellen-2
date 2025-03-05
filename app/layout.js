import { CartProvider } from "@/context/cart-context";
import "./globals.css";
import { AuthProvider } from "@/context/auth-context";
import { Analytics } from "@vercel/analytics/react";
import { GoogleTagManager } from "@next/third-parties/google";

export default function RootLayout({ children }) {
  return (
    <AuthProvider>
      <CartProvider>
        {children}
        <GoogleTagManager gtmId="GTM-KGVW7QXH" />
        <Analytics />
      </CartProvider>
    </AuthProvider>
  );
}
