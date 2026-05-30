"use client"

import Link from "next/link"
import Image from "next/image"
import { ShoppingBag, Menu, X } from "lucide-react"
import { useState } from "react"
import { useCart } from "@/lib/cart-context"

export function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const { totalItems, setIsCartOpen } = useCart()

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-md">
      <nav className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
        {/* Mobile menu button */}
        <button
          type="button"
          className="lg:hidden text-foreground"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          aria-label="Toggle menu"
        >
          {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>

        {/* Left nav links */}
        <div className="hidden lg:flex items-center gap-8">
          <Link
            href="/"
            className="text-sm font-medium uppercase tracking-widest text-foreground hover:text-primary transition-colors"
          >
            Home
          </Link>
          <Link
            href="#shop"
            className="text-sm font-medium uppercase tracking-widest text-foreground hover:text-primary transition-colors"
          >
            Shop
          </Link>
          <Link
            href="#about"
            className="text-sm font-medium uppercase tracking-widest text-foreground hover:text-primary transition-colors"
          >
            About
          </Link>
        </div>

        {/* Center logo */}
        <Link href="/" className="flex items-center">
          <Image
            src="/images/logo.png"
            alt="Gloss It"
            width={80}
            height={80}
            className="h-16 w-16 object-contain"
          />
        </Link>

        {/* Right cart */}
        <div className="flex items-center gap-6">
          <button
            type="button"
            onClick={() => setIsCartOpen(true)}
            className="relative text-foreground hover:text-primary transition-colors"
            aria-label="Open cart"
          >
            <ShoppingBag className="h-5 w-5" />
            {totalItems > 0 && (
              <span className="absolute -top-2 -right-2 flex h-5 w-5 items-center justify-center rounded-full bg-primary text-[10px] font-bold text-primary-foreground">
                {totalItems}
              </span>
            )}
          </button>
        </div>
      </nav>

      {/* Mobile menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-background/95 backdrop-blur-md border-t border-border px-6 py-6">
          <div className="flex flex-col gap-4">
            <Link
              href="/"
              className="text-sm font-medium uppercase tracking-widest text-foreground hover:text-primary transition-colors"
              onClick={() => setMobileMenuOpen(false)}
            >
              Home
            </Link>
            <Link
              href="#shop"
              className="text-sm font-medium uppercase tracking-widest text-foreground hover:text-primary transition-colors"
              onClick={() => setMobileMenuOpen(false)}
            >
              Shop
            </Link>
            <Link
              href="#about"
              className="text-sm font-medium uppercase tracking-widest text-foreground hover:text-primary transition-colors"
              onClick={() => setMobileMenuOpen(false)}
            >
              About
            </Link>
          </div>
        </div>
      )}
    </header>
  )
}
