"use client";

/* eslint-disable @next/next/no-sync-scripts */
import { Sora } from "next/font/google";

import { AuthProvider } from "@/providers/auth";
import Footer from "../(shop)/home/components/footer";

import "../globals.css";
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
        <link rel="shortcut icon" href="/favicon.png" type="image/x-icon" />
        <script src="https://unpkg.com/aos@2.3.1/dist/aos.js"></script>
        <title>Tech Store</title>
      </head>
      <body className={sora.className}>
        <div className="flex h-full flex-col">
          <AuthProvider>
            <div className="flex-1">{children}</div>
            <Footer />
          </AuthProvider>
        </div>
      </body>
    </html>
  );
}
