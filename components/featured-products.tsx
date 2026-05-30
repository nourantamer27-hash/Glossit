"use client"

import { products } from "@/lib/products"
import { ProductCard } from "./product-card"

export function FeaturedProducts() {
  return (
    <section id="shop" className="py-24 md:py-32 px-6">
      <div className="mx-auto max-w-7xl">
        {/* Section header */}
        <div className="text-center mb-16">
          <p className="font-script text-2xl text-primary mb-3">
            The Collection
          </p>
          <h2 className="font-serif text-3xl md:text-5xl font-bold text-foreground text-balance">
            Pick Your Glow
          </h2>
        </div>

        {/* Product grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-12 md:gap-14">
          {products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </div>
    </section>
  )
}
