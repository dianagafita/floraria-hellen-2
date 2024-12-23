import { CartProvider } from "@/context/cart-context";
import "./globals.css";
import { AuthProvider } from "@/context/auth-context";
import { Analytics } from "@vercel/analytics/react";

export default function RootLayout({ children }) {
  return (
    <AuthProvider>
      <CartProvider>
        {children}
        <Analytics />
      </CartProvider>
    </AuthProvider>
  );
}
