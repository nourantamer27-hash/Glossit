"use client"

import Image from "next/image"
import Link from "next/link"
import type { Product } from "@/lib/products"

export function ProductCard({ product }: { product: Product }) {
  const firstShade = product.shades[0]

  return (
    <Link
      href={`/product/${product.id}`}
      className="group flex flex-col items-center text-center"
    >
      {/* Product image */}
      <div className="relative aspect-square w-full overflow-hidden rounded-2xl bg-card mb-5 transition-transform duration-500 group-hover:scale-[1.02]">
        <Image
          src={firstShade.image || "/placeholder.svg"}
          alt={product.name}
          fill
          className="object-cover transition-transform duration-700 group-hover:scale-110"
        />
        {/* Shimmer sweep on hover */}
        <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-pink-100/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
        <div className="shimmer-btn absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none" />
      </div>

      {/* Product info */}
      <h3 className="font-serif text-xl md:text-2xl font-semibold text-foreground mb-1">
        {product.name}
      </h3>
      <p className="text-sm text-muted-foreground mb-3">{product.tagline}</p>

      {/* Shade swatches */}
      <div className="flex items-center gap-2 mb-3">
        {product.shades.map((shade) => (
          <span
            key={shade.name}
            className="h-5 w-5 rounded-full border-2 border-card shadow-sm"
            style={{ backgroundColor: shade.color }}
            title={shade.name}
          />
        ))}
      </div>

      {/* Price */}
      <p className="text-lg font-semibold text-foreground">{product.price} EGP</p>
    </Link>
  )
}
