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
  title: "The Wookporium - Festival Fashion & Handmade Accessories",
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
        <link 
          rel="preconnect" 
          href="https://app.snipcart.com" 
        />
        <link 
          rel="preconnect" 
          href="https://cdn.snipcart.com" 
        />
        <link 
          rel="stylesheet" 
          href="https://cdn.snipcart.com/themes/v3.4.1/default/snipcart.css" 
        />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
        
        {/* Snipcart Integration */}
       <div
          hidden
          id="snipcart"
          data-api-key={process.env.NEXT_PUBLIC_SNIPCART_API_KEY || ""}
          data-config-modal-style="side"
          data-config-add-product-behavior="none"
        ></div>
        
        {/* Snipcart JavaScript */}
        <script 
          async 
          src="https://cdn.snipcart.com/themes/v3.4.1/default/snipcart.js"
        ></script>
        
        {/* Service Worker Registration */}
        <script
          dangerouslySetInnerHTML={{
            __html: `
              if ('serviceWorker' in navigator) {
                window.addEventListener('load', function() {
                  navigator.serviceWorker.register('/sw.js')
                    .then(function(registration) {
                      console.log('SW registered: ', registration);
                    })
                    .catch(function(registrationError) {
                      console.log('SW registration failed: ', registrationError);
                    });
                });
              }
            `,
          }}
            />
          </body>
        </html>
      );
    }