import "./globals.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";

import CartProvider from "./components/CartContext";
import Header from "./components/Header";

import GraphQlProvider from "./components/GraphQlProvider";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Opensea NFTs",
  description: "Explore NFTs from Opensea.io and add favorites to your cart.",
};

export const dynamic = "force-dynamic";

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <GraphQlProvider>
          <CartProvider>
            <Header />
            <main className="mx-auto max-w-3xl">{children}</main>
          </CartProvider>
        </GraphQlProvider>
      </body>
    </html>
  );
}
