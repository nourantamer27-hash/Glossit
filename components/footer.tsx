"use client"

import Image from "next/image"
import Link from "next/link"
import { Instagram } from "lucide-react"

export function Footer() {
  return (
    <footer className="relative bg-secondary py-16 px-6 overflow-hidden">
      {/* Decorative glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-96 h-32 rounded-full bg-pink-300/15 blur-3xl pointer-events-none" aria-hidden="true" />
      <div className="mx-auto max-w-7xl">
        <div className="flex flex-col items-center text-center gap-8">
          {/* Logo */}
          <Image
            src="/images/logo.png"
            alt="Gloss It"
            width={100}
            height={100}
            className="h-20 w-20 object-contain"
          />

          {/* Nav */}
          <div className="flex items-center gap-8">
            <Link
              href="/"
              className="text-sm uppercase tracking-widest text-muted-foreground hover:text-primary transition-colors"
            >
              Home
            </Link>
            <Link
              href="#shop"
              className="text-sm uppercase tracking-widest text-muted-foreground hover:text-primary transition-colors"
            >
              Shop
            </Link>
            <Link
              href="#about"
              className="text-sm uppercase tracking-widest text-muted-foreground hover:text-primary transition-colors"
            >
              About
            </Link>
          </div>

          {/* Social */}
          <div className="flex items-center gap-4">
            <a
              href="https://www.instagram.com/glossitbeauty.eg/?utm_source=ig_web_button_share_sheet&igsh=ZDNlZDc0MzIxNw=="
              target="_blank"
              rel="noopener noreferrer"
              className="flex h-10 w-10 items-center justify-center rounded-full bg-card text-muted-foreground hover:text-primary hover:shadow-md transition-all"
              aria-label="Follow us on Instagram"
            >
              <Instagram className="h-5 w-5" />
            </a>
          </div>

          {/* Divider */}
          <div className="w-full max-w-sm h-px bg-border" />

          {/* Copyright */}
          <p className="text-xs text-muted-foreground">
            &copy; {new Date().getFullYear()} Gloss It. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  )
}
