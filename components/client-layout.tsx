"use client"

import type { ReactNode } from "react"
import { CartProvider } from "@/lib/cart-context"
import { Navbar } from "./navbar"
import { CartDrawer } from "./cart-drawer"

export function ClientLayout({ children }: { children: ReactNode }) {
  return (
    <CartProvider>
      <Navbar />
      <CartDrawer />
      {children}
    </CartProvider>
  )
}
