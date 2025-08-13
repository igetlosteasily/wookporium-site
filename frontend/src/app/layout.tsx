import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Wookporium - Festival Fashion & Handmade Accessories",
  description: "Unique festival apparel, hand-crocheted items, and artisan jewelry for the electronic music community.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        {/* Snipcart CSS */}
        <link rel="preconnect" href="https://app.snipcart.com" />
        <link rel="preconnect" href="https://cdn.snipcart.com" />
        <link rel="stylesheet" href="https://cdn.snipcart.com/themes/v3.4.1/default/snipcart.css" />
        
        {/* Snipcart Script - Load in head to prevent hydration issues */}
        <script 
          async 
          src="https://cdn.snipcart.com/themes/v3.4.1/default/snipcart.js"
          data-api-key={process.env.NEXT_PUBLIC_SNIPCART_API_KEY}
        />
      </head>
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        {children}
        
        {/* Snipcart Configuration - Minimal approach to prevent DOM conflicts */}
        <div suppressHydrationWarning>
          <div 
            hidden 
            id="snipcart" 
            data-api-key={process.env.NEXT_PUBLIC_SNIPCART_API_KEY}
            data-config-modal-style="side"
            data-config-add-product-behavior="none"
          />
        </div>
      </body>
    </html>
  );
}