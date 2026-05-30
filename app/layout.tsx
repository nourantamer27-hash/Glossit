import React from "react"
import type { Metadata } from 'next'
import { Playfair_Display, Inter, Allura } from 'next/font/google'

import './globals.css'

const playfair = Playfair_Display({ 
  subsets: ['latin'],
  variable: '--font-playfair',
})

const inter = Inter({ 
  subsets: ['latin'],
  variable: '--font-inter',
})

const allura = Allura({ 
  subsets: ['latin'],
  weight: '400',
  variable: '--font-allura',
})

export const metadata: Metadata = {
  title: 'Gloss It | Luxury Lip Gloss',
  description: 'Discover Gloss It - luxury lip glosses crafted for the confident, modern woman. Ultra-hydrating, high-shine, and irresistibly glossy.',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body className={`${playfair.variable} ${inter.variable} ${allura.variable} font-sans antialiased`}>{children}</body>
    </html>
  )
}
