import type { Metadata } from "next";
import { Sora } from "next/font/google";


import { AuthProvider } from "@/providers/auth";
import CartContextProvider from "@/providers/cart";

import Header from "./_components/Header/Header";
import Footer from "./(home)/components/footer";

import "./globals.css";

const sora = Sora({
  weight: "400",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Tech Store",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={sora.className}>
        <div className="flex h-full flex-col">
          <AuthProvider>
            <CartContextProvider>
              <Header />
              <div className="flex-1">{children}</div>
              <Footer />
            </CartContextProvider>
          </AuthProvider>
        </div>
      </body>
    </html>
  );
}
