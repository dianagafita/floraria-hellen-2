import { CartProvider } from "@/context/cart-context";
import "./globals.css";
import { AuthProvider } from "@/context/auth-context";
import { Analytics } from "@vercel/analytics/react";
import { GoogleTagManager } from "@next/third-parties/google";
import { Cormorant_Garamond, Roboto, Alegreya_Sans } from "next/font/google";
import localFont from "next/font/local";

// Google Fonts with preload
const cormorantGaramond = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  style: ["normal", "italic"],
  display: "swap",
  variable: "--font-cormorant",
  preload: true,
});

const roboto = Roboto({
  subsets: ["latin"],
  weight: ["100", "300", "400", "500", "700", "900"],
  style: ["normal", "italic"],
  display: "swap",
  variable: "--font-roboto",
  preload: true,
});

const alegreyaSans = Alegreya_Sans({
  subsets: ["latin"],
  weight: ["100", "300", "400", "500", "700", "800", "900"],
  style: ["normal", "italic"],
  display: "swap",
  variable: "--font-alegreya",
  preload: true,
});

// Local fonts with preload
const caravan = localFont({
  src: "../assets/Caravan.otf",
  display: "swap",
  variable: "--font-caravan",
  preload: true,
});

const cormorantLocal = localFont({
  src: "../assets/CormorantGaramond-Light.ttf",
  display: "swap",
  variable: "--font-cormorant-local",
  preload: true,
});

export const metadata = {
  metadataBase: new URL("https://www.hellenproparty.ro"),
  title: {
    default: "Floraria Hellen | Buchete si Aranjamente Florale Gura Humorului",
    template: "%s | Floraria Hellen",
  },
  description:
    "Florarie online cu livrare la domiciliu in Gura Humorului si imprejurimi. Buchete de flori, aranjamente florale, decoratiuni pentru nunti, botezuri si evenimente speciale.",
  keywords: [
    "florarie",
    "florarie online",
    "buchete flori",
    "aranjamente florale",
    "livrare flori",
    "Gura Humorului",
    "flori nunta",
    "flori botez",
    "decoratiuni evenimente",
    "trandafiri",
    "flori Suceava",
    "florarie Bucovina",
  ],
  authors: [{ name: "Floraria Hellen" }],
  creator: "Floraria Hellen",
  publisher: "Floraria Hellen",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  icons: {
    icon: "/icon.png",
    apple: "/icon.png",
  },
  openGraph: {
    type: "website",
    locale: "ro_RO",
    url: "https://www.hellenproparty.ro",
    siteName: "Floraria Hellen",
    title: "Floraria Hellen | Buchete si Aranjamente Florale",
    description:
      "Florarie online cu livrare la domiciliu. Buchete de flori, aranjamente florale si decoratiuni pentru evenimente speciale.",
    images: [
      {
        url: "/icon.png",
        width: 512,
        height: 512,
        alt: "Floraria Hellen Logo",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Floraria Hellen | Buchete si Aranjamente Florale",
    description:
      "Florarie online cu livrare la domiciliu. Buchete de flori, aranjamente florale si decoratiuni pentru evenimente speciale.",
    images: ["/icon.png"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  verification: {
    google: "GTM-KGVW7QXH",
  },
  alternates: {
    canonical: "https://www.hellenproparty.ro",
  },
};

export default function RootLayout({ children }) {
  return (
    <html
      lang="ro"
      className={`${cormorantGaramond.variable} ${roboto.variable} ${alegreyaSans.variable} ${caravan.variable} ${cormorantLocal.variable}`}
    >
      <head>
        <link
          rel="stylesheet"
          href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css"
        />
      </head>
      <body className={roboto.className}>
        <AuthProvider>
          <CartProvider>
            {children}
            <GoogleTagManager gtmId="GTM-KGVW7QXH" />
            <Analytics />
          </CartProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
