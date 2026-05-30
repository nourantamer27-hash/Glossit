"use client"

import Image from "next/image"
import Link from "next/link"
import { X, Minus, Plus, ShoppingBag } from "lucide-react"
import { useCart } from "@/lib/cart-context"

export function CartDrawer() {
  const { items, removeItem, updateQuantity, totalPrice, isCartOpen, setIsCartOpen } = useCart()

  if (!isCartOpen) return null

  return (
    <>
      {/* Backdrop */}
      <div
        className="fixed inset-0 z-50 bg-foreground/20 backdrop-blur-sm"
        onClick={() => setIsCartOpen(false)}
        aria-hidden="true"
      />

      {/* Drawer */}
      <div className="fixed right-0 top-0 bottom-0 z-50 w-full max-w-md bg-card shadow-2xl flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-5 border-b border-border">
          <h2 className="font-serif text-xl font-semibold text-foreground">Your Bag</h2>
          <button
            type="button"
            onClick={() => setIsCartOpen(false)}
            className="text-muted-foreground hover:text-foreground transition-colors"
            aria-label="Close cart"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Items */}
        <div className="flex-1 overflow-y-auto px-6 py-6">
          {items.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full gap-4 text-center">
              <ShoppingBag className="h-12 w-12 text-muted-foreground/30" />
              <p className="text-muted-foreground">Your bag is empty</p>
              <button
                type="button"
                onClick={() => setIsCartOpen(false)}
                className="text-sm font-medium uppercase tracking-widest text-primary hover:underline"
              >
                Continue Shopping
              </button>
            </div>
          ) : (
            <div className="flex flex-col gap-6">
              {items.map((item) => (
                <div
                  key={`${item.productId}-${item.shadeName}`}
                  className="flex gap-4"
                >
                  {/* Product image */}
                  <div className="relative h-24 w-24 flex-shrink-0 overflow-hidden rounded-xl bg-secondary">
                    <Image
                      src={item.image || "/placeholder.svg"}
                      alt={`${item.productName} - ${item.shadeName}`}
                      fill
                      className="object-cover"
                    />
                  </div>

                  {/* Details */}
                  <div className="flex flex-1 flex-col justify-between">
                    <div>
                      <h3 className="font-serif text-base font-semibold text-foreground">
                        {item.productName}
                      </h3>
                      <div className="flex items-center gap-2 mt-1">
                        <span
                          className="h-3 w-3 rounded-full border border-border"
                          style={{ backgroundColor: item.shadeColor }}
                        />
                        <p className="text-xs text-muted-foreground">{item.shadeName}</p>
                      </div>
                    </div>

                    <div className="flex items-center justify-between mt-2">
                      {/* Quantity controls */}
                      <div className="flex items-center gap-3 rounded-full border border-border px-2 py-1">
                        <button
                          type="button"
                          onClick={() =>
                            updateQuantity(item.productId, item.shadeName, item.quantity - 1)
                          }
                          className="text-muted-foreground hover:text-foreground transition-colors"
                          aria-label="Decrease quantity"
                        >
                          <Minus className="h-3 w-3" />
                        </button>
                        <span className="text-sm font-medium text-foreground w-4 text-center">
                          {item.quantity}
                        </span>
                        <button
                          type="button"
                          onClick={() =>
                            updateQuantity(item.productId, item.shadeName, item.quantity + 1)
                          }
                          className="text-muted-foreground hover:text-foreground transition-colors"
                          aria-label="Increase quantity"
                        >
                          <Plus className="h-3 w-3" />
                        </button>
                      </div>

                      {/* Price */}
                      <p className="text-sm font-semibold text-foreground">
                        {item.price * item.quantity} EGP
                      </p>
                    </div>
                  </div>

                  {/* Remove */}
                  <button
                    type="button"
                    onClick={() => removeItem(item.productId, item.shadeName)}
                    className="self-start text-muted-foreground/50 hover:text-foreground transition-colors"
                    aria-label={`Remove ${item.productName}`}
                  >
                    <X className="h-4 w-4" />
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Footer */}
        {items.length > 0 && (
          <div className="border-t border-border px-6 py-6 flex flex-col gap-4">
            <div className="flex items-center justify-between">
              <p className="text-sm text-muted-foreground">Subtotal</p>
              <p className="text-lg font-serif font-bold text-foreground">{totalPrice} EGP</p>
            </div>
            <Link
              href="/checkout"
              onClick={() => setIsCartOpen(false)}
              className="shimmer-btn flex items-center justify-center rounded-full bg-primary py-4 text-sm font-semibold uppercase tracking-widest text-primary-foreground transition-all hover:scale-[1.02] hover:shadow-[0_8px_30px_-4px_rgba(180,60,100,0.4)]"
            >
              Checkout
            </Link>
            <button
              type="button"
              onClick={() => setIsCartOpen(false)}
              className="text-sm font-medium text-center text-muted-foreground hover:text-primary transition-colors uppercase tracking-widest"
            >
              Continue Shopping
            </button>
          </div>
        )}
      </div>
    </>
  )
}
