import type { Metadata } from "next";
import { Allura, Geist, Geist_Mono, Manrope } from "next/font/google";
import { Header, Footer } from "@/src/components/Layout";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const scriptFont = Allura({
  weight: "400",
  variable: "--font-script",
  subsets: ["latin"],
});

const modernFont = Manrope({
  variable: "--font-modern",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Essencia Intima - Loja Online",
  description: "Sua loja de produtos online. Discrição, qualidade e conforto.",
};

export default function RootLayout({ children }: any) {
  return (
    <html
      lang="pt-BR"
      className={`${geistSans.variable} ${geistMono.variable} ${scriptFont.variable} ${modernFont.variable} h-full antialiased`}
    >
      <body className="min-h-screen flex flex-col bg-white">
        <Header />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
