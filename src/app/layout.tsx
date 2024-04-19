import type { Metadata } from "next";
import { Sora } from "next/font/google";
import "./globals.css";
import Header from "./_components/Header/Header";
import { AuthProvider } from "@/providers/auth";

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
        <AuthProvider>
          <Header />
          {children}
        </AuthProvider>
      </body>
    </html>
  );
}
