import { CartProvider } from "@/context/cart-context";
import "./globals.css";
import { AuthProvider } from "@/context/auth-context";

export default function RootLayout({ children }) {
  return (
    <AuthProvider>
      <CartProvider>{children}</CartProvider>
    </AuthProvider>
  );
}
