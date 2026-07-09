import type { Metadata } from "next";
import "../styles/globals.css";
import SnipcartProvider from "@/components/SnipcartProvider";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import Providers from "@/components/Providers";

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || "https://wookporium.com"),
  title: {
    default: "Wookporium | Handmade Festival Fashion & Natural Jewelry",
    template: "%s | Wookporium",
  },
  description:
    "Unique handmade festival clothing, crochet apparel, and natural jewelry. Sustainable, comfortable, and designed for the festival community. One-of-a-kind pieces crafted with love.",
  keywords: [
    "festival fashion",
    "handmade clothing",
    "festival jewelry",
    "crochet apparel",
    "natural jewelry",
    "sustainable fashion",
    "bohemian clothing",
    "rave wear",
    "festival accessories",
    "handcrafted jewelry",
  ],
  authors: [{ name: "Wookporium" }],
  creator: "Wookporium",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://wookporium.com",
    siteName: "Wookporium",
    title: "Wookporium | Handmade Festival Fashion & Natural Jewelry",
    description:
      "Unique handmade festival clothing and natural jewelry. Sustainable, comfortable, and designed for the festival community.",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Wookporium - Handmade Festival Fashion",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Wookporium | Handmade Festival Fashion",
    description:
      "Unique handmade festival clothing and natural jewelry crafted with love.",
    images: ["/og-image.jpg"],
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
    // Add your Google Search Console verification code here
    google: "your-google-verification-code",
  },
  // PWA Configuration
  manifest: "/manifest.json",
  appleWebApp: {
    capable: true,
    statusBarStyle: "default",
    title: "Wookporium",
  },
  formatDetection: {
    telephone: false,
  },
  icons: {
    icon: [
      { url: "/icons/icon-192x192.png", sizes: "192x192", type: "image/png" },
      { url: "/icons/icon-512x512.png", sizes: "512x512", type: "image/png" },
    ],
    apple: [
      { url: "/icons/icon-152x152.png", sizes: "152x152", type: "image/png" },
      { url: "/icons/icon-192x192.png", sizes: "192x192", type: "image/png" },
    ],
  },
};

interface RootLayoutProps {
  children: React.ReactNode;
}

export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <html lang="en" className="scroll-smooth">
      <head>
        {/* Snipcart CSS */}
        <link
          rel="preconnect"
          href="https://cdn.snipcart.com"
          crossOrigin="anonymous"
        />
        <link
          rel="stylesheet"
          href="https://cdn.snipcart.com/themes/v3.4.1/default/snipcart.css"
        />
      </head>
      <body className="min-h-screen bg-deep-bg text-warm-white antialiased selection:bg-secondary selection:text-white">
        <Providers>
          <Navigation />
          <main className="flex-grow">
            {children}
          </main>
          <Footer />
        </Providers>
        <SnipcartProvider />
      </body>
    </html>
  );
}
