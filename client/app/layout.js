"use client";
import { Outfit } from "next/font/google";
import "./globals.css";
import Header from "./_components/Header";
import Footer from "./_components/Footer";
import { ClerkProvider } from "@clerk/nextjs";
import { useState } from "react";
import { CartContext } from "./_context/CartContext";
const inter = Outfit({ subsets: ["latin"] });

export default function RootLayout({ children }) {
  const [cart, setCart] = useState([]);

  return (
    <ClerkProvider>
      <CartContext.Provider value={{ cart, setCart }}>
        <html lang="en">
          <body className={inter.className}>
            <Header className="relativa z-50" />
            {children}
            <Footer />
          </body>
        </html>
      </CartContext.Provider>
    </ClerkProvider>
  );
}
