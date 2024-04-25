"use client";

/* eslint-disable @next/next/no-sync-scripts */
import { Sora } from "next/font/google";

import { AuthProvider } from "@/providers/auth";
import CartContextProvider from "@/providers/cart";

import { Toaster } from "@/components/ui/sonner";
import Header from "./_components/Header/Header";
import Footer from "./(home)/components/footer";

import "./globals.css";
import { useEffect } from "react";
import Aos from "aos";

const sora = Sora({
  weight: "400",
  subsets: ["latin"],
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  useEffect(() => {
    if (typeof window !== "undefined") {
      setTimeout(() => {
        Aos.init();
      }, 100);
    }
  }, []);
  return (
    <html lang="en">
      <head>
        <link
          href="https://unpkg.com/aos@2.3.1/dist/aos.css"
          rel="stylesheet"
        />
        <script src="https://unpkg.com/aos@2.3.1/dist/aos.js"></script>
        <title>Tech Store</title>
      </head>
      <body className={sora.className}>
        <div className="flex h-full flex-col">
          <AuthProvider>
            <CartContextProvider>
              <Header />
              <div className="flex-1">{children}</div>
              <Toaster />
              <Footer />
            </CartContextProvider>
          </AuthProvider>
        </div>
      </body>
    </html>
  );
}
