"use client"

import React from "react"

import Image from "next/image"
import { useState } from "react"
import Link from "next/link"
import { ArrowLeft, Droplets, Sparkles, Feather, Heart, Clock, Sun, Check } from "lucide-react"
import type { Product } from "@/lib/products"
import { useCart } from "@/lib/cart-context"

const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
  droplets: Droplets,
  sparkles: Sparkles,
  feather: Feather,
  heart: Heart,
  clock: Clock,
  sun: Sun,
}

export function ProductDetail({ product }: { product: Product }) {
  const [selectedShadeIndex, setSelectedShadeIndex] = useState(0)
  const [added, setAdded] = useState(false)
  const { addItem } = useCart()

  const selectedShade = product.shades[selectedShadeIndex]

  const handleAddToCart = () => {
    addItem({
      productId: product.id,
      productName: product.name,
      shadeName: selectedShade.name,
      shadeColor: selectedShade.color,
      price: product.price,
      image: selectedShade.image,
    })
    setAdded(true)
    setTimeout(() => setAdded(false), 2000)
  }

  return (
    <div className="min-h-screen pt-24 pb-16 px-6">
      <div className="mx-auto max-w-7xl">
        {/* Back link */}
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-sm uppercase tracking-widest text-muted-foreground hover:text-primary transition-colors mb-10"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to Collection
        </Link>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20">
          {/* Product Image */}
          <div className="relative aspect-square overflow-hidden rounded-3xl bg-secondary">
            <Image
              src={selectedShade.image || "/placeholder.svg"}
              alt={`${product.name} - ${selectedShade.name}`}
              fill
              className="object-cover transition-all duration-500"
              priority
            />
            {/* Shimmer overlay */}
            <div className="shimmer-btn absolute inset-0 pointer-events-none opacity-50" />
            {/* Glow behind */}
            <div className="absolute -inset-4 -z-10 rounded-full bg-pink-200/30 blur-3xl" aria-hidden="true" />
          </div>

          {/* Product Info */}
          <div className="flex flex-col gap-6">
            <div>
              <p className="font-script text-2xl text-primary mb-2">
                Gloss It
              </p>
              <h1 className="font-serif text-4xl md:text-5xl font-bold text-foreground">
                {product.name}
              </h1>
              <p className="text-muted-foreground mt-2">{product.tagline}</p>
            </div>

            <p className="font-serif text-3xl font-bold text-foreground">
              {product.price} EGP
            </p>

            {/* Shade Selector */}
            <div>
              <p className="text-sm font-medium text-foreground mb-3">
                Shade: <span className="text-primary">{selectedShade.name}</span>
              </p>
              <div className="flex items-center gap-3">
                {product.shades.map((shade, index) => (
                  <button
                    key={shade.name}
                    type="button"
                    onClick={() => setSelectedShadeIndex(index)}
                    className={`h-10 w-10 rounded-full transition-all duration-300 ${
                      index === selectedShadeIndex
                        ? "ring-2 ring-primary ring-offset-2 ring-offset-background scale-110"
                        : "hover:scale-105"
                    }`}
                    style={{ backgroundColor: shade.color }}
                    aria-label={`Select shade ${shade.name}`}
                  />
                ))}
              </div>
            </div>

            {/* Shade Description */}
            <p className="text-muted-foreground leading-relaxed">
              {selectedShade.description}
            </p>

            {/* Add to Cart */}
            <button
              type="button"
              onClick={handleAddToCart}
              className={`shimmer-btn flex items-center justify-center gap-2 rounded-full py-4 px-10 text-sm font-semibold uppercase tracking-widest transition-all hover:scale-[1.02] hover:shadow-[0_8px_30px_-4px_rgba(180,60,100,0.4)] ${
                added
                  ? "bg-pink-500 text-white"
                  : "bg-primary text-primary-foreground"
              }`}
            >
              {added ? (
                <>
                  <Check className="h-4 w-4" />
                  Added to Bag
                </>
              ) : (
                "Add to Bag"
              )}
            </button>

            {/* Benefits */}
            <div className="mt-4">
              <p className="text-sm font-medium text-foreground mb-4 uppercase tracking-widest">
                Benefits
              </p>
              <div className="grid grid-cols-2 gap-4">
                {product.benefits.map((benefit) => {
                  const IconComponent = iconMap[benefit.icon] || Sparkles
                  return (
                    <div
                      key={benefit.label}
                      className="flex items-center gap-3 p-3 rounded-xl bg-pink-50"
                    >
                      <IconComponent className="h-5 w-5 text-primary flex-shrink-0" />
                      <span className="text-sm text-foreground">{benefit.label}</span>
                    </div>
                  )
                })}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
