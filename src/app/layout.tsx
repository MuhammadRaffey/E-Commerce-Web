import type { Metadata } from "next";
import { Inter as FontSans } from "next/font/google";
import { cn } from "@/lib/utils";
import type { ReactNode } from "react";
import "./globals.css";
import NavBar from "@/components/navbar";
import Footer from "@/components/Footer";
import { CartProvider } from "../context/CartContext";

const fontSans = FontSans({
  subsets: ["latin"],
  variable: "--font-sans",
});

export const metadata: Metadata = {
  title: "Streetwear",
  description: "An Industrial Twist on Streetwear",
};

interface RootLayoutProps {
  children: ReactNode;
}

export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head />
      <body
        className={cn(
          "min-h-screen  bg-background font-sans antialiased ",
          fontSans.variable
        )}
      ><CartProvider>
          <NavBar />
          {children}
          <Footer />
        </CartProvider>
      </body>
    </html>
  );
}
