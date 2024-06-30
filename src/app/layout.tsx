import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import NavBar from "../components/navbar";
// import { usePathname } from "next/navigation";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "E-Commerce Website",
  description: "E-Commerce Website with Next.js and Sanity Studio",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  // const pathname = usePathname();
  // const isSanityStudio = pathname.startsWith("/studio");
  return (
    <html lang="en">
      <body
        className={
          inter.className + "flex flex-col  overflow-x-hidden scroll-smooth "
        }
      >
        {/* {isSanityStudio}?: */}
        <NavBar />
        {children}
      </body>
    </html>
  );
}
