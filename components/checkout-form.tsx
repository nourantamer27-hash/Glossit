"use client"

import Image from "next/image"
import Link from "next/link"
import { useState } from "react"
import { ArrowLeft, Minus, Plus, X, Lock } from "lucide-react"
import { useCart } from "@/lib/cart-context"

export function CheckoutForm() {
  const { items, removeItem, updateQuantity, totalPrice } = useCart()
  const [submitted, setSubmitted] = useState(false)
  const { clearCart } = useCart()
  const [couponCode, setCouponCode] = useState("")
  const [couponApplied, setCouponApplied] = useState(false)
  const [couponError, setCouponError] = useState("")
  
  // Form state
  const [email, setEmail] = useState("")
  const [firstName, setFirstName] = useState("")
  const [lastName, setLastName] = useState("")
  const [address, setAddress] = useState("")
  const [area, setArea] = useState("")
  const [city, setCity] = useState("")
  const [state, setState] = useState("")
  const [zip, setZip] = useState("")
  const [formError, setFormError] = useState("")

  const VALID_COUPON = "GLOSS5"
  const DELIVERY_FEE = 40
  const DISCOUNT_PERCENT = 5

  const applyCoupon = () => {
    setCouponError("")
    if (couponCode.toUpperCase() === VALID_COUPON) {
      setCouponApplied(true)
    } else {
      setCouponError("Invalid coupon code")
    }
  }

  const validateForm = () => {
    setFormError("")
    
    if (items.length === 0) {
      setFormError("Your bag is empty. Add items before checking out.")
      return false
    }
    
    if (!email.trim()) {
      setFormError("Email is required")
      return false
    }
    
    if (!firstName.trim()) {
      setFormError("First name is required")
      return false
    }
    
    if (!lastName.trim()) {
      setFormError("Last name is required")
      return false
    }
    
    if (!address.trim()) {
      setFormError("Address is required")
      return false
    }
    
    if (!area.trim()) {
      setFormError("Area is required")
      return false
    }
    
    return true
  }

  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleSubmitOrder = async () => {
    if (!validateForm()) {
      return
    }

    setIsSubmitting(true)

    try {
      // Send order via API
      const response = await fetch("/api/send-email", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email,
          firstName,
          lastName,
          address,
          area,
          city,
          state,
          zip,
          items,
          subtotal,
          discount,
          deliveryFee,
          finalTotal,
          couponApplied,
        }),
      })

      const result = await response.json()

      if (response.ok) {
        setSubmitted(true)
        clearCart()
      } else {
        setFormError("Failed to place order. Please try again.")
        console.error("[v0] Email send error:", result)
      }
    } catch (error) {
      setFormError("An error occurred. Please try again.")
      console.error("[v0] Order submission error:", error)
    } finally {
      setIsSubmitting(false)
    }
  }

  const subtotal = totalPrice
  const discount = couponApplied ? (subtotal * DISCOUNT_PERCENT) / 100 : 0
  const deliveryFee = couponApplied ? 0 : DELIVERY_FEE
  const finalTotal = subtotal - discount + deliveryFee

  if (submitted) {
    return (
      <div className="min-h-screen pt-24 pb-16 px-6 flex items-center justify-center">
        <div className="text-center flex flex-col items-center gap-6 max-w-md">
          <div className="h-20 w-20 rounded-full bg-secondary flex items-center justify-center">
            <Image src="/images/logo.png" alt="Gloss It" width={60} height={60} className="object-contain" />
          </div>
          <h1 className="font-serif text-3xl md:text-4xl font-bold text-foreground">
            Thank You!
          </h1>
          <p className="text-muted-foreground leading-relaxed">
            Your order has been placed successfully. A confirmation email has been sent to <span className="font-medium text-foreground">{email}</span> (or order details logged in console if email not configured). Get ready to glow!
          </p>
          <Link
            href="/"
            className="inline-flex items-center justify-center rounded-full bg-primary px-10 py-4 text-sm font-semibold uppercase tracking-widest text-primary-foreground transition-all hover:scale-105"
          >
            Back to Home
          </Link>
        </div>
      </div>
    )
  }

  if (items.length === 0) {
    return (
      <div className="min-h-screen pt-24 pb-16 px-6 flex items-center justify-center">
        <div className="text-center flex flex-col items-center gap-6 max-w-md">
          <h1 className="font-serif text-3xl md:text-4xl font-bold text-foreground">
            Your Bag is Empty
          </h1>
          <p className="text-muted-foreground">
            Looks like you haven't added anything yet.
          </p>
          <Link
            href="/"
            className="inline-flex items-center justify-center rounded-full bg-primary px-10 py-4 text-sm font-semibold uppercase tracking-widest text-primary-foreground transition-all hover:scale-105"
          >
            Shop Now
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen pt-24 pb-16 px-6">
      <div className="mx-auto max-w-5xl">
        {/* Back link */}
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-sm uppercase tracking-widest text-muted-foreground hover:text-primary transition-colors mb-10"
        >
          <ArrowLeft className="h-4 w-4" />
          Continue Shopping
        </Link>

        <h1 className="font-serif text-3xl md:text-4xl font-bold text-foreground mb-10">
          Checkout
        </h1>

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-12">
          {/* Form */}
          <div className="lg:col-span-3 flex flex-col gap-8">
            {/* Contact */}
            <div className="flex flex-col gap-4">
              <h2 className="font-serif text-xl font-semibold text-foreground">Contact</h2>
              <input
                type="email"
                placeholder="Email address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full rounded-xl border border-border bg-card px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/30"
              />
            </div>

            {/* Shipping */}
            <div className="flex flex-col gap-4">
              <h2 className="font-serif text-xl font-semibold text-foreground">Shipping Address</h2>
              <div className="grid grid-cols-2 gap-4">
                <input
                  type="text"
                  placeholder="First name"
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                  className="w-full rounded-xl border border-border bg-card px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/30"
                />
                <input
                  type="text"
                  placeholder="Last name"
                  value={lastName}
                  onChange={(e) => setLastName(e.target.value)}
                  className="w-full rounded-xl border border-border bg-card px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/30"
                />
              </div>
              <input
                type="text"
                placeholder="Address"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                className="w-full rounded-xl border border-border bg-card px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/30"
              />
              <input
                type="text"
                placeholder="Area"
                value={area}
                onChange={(e) => setArea(e.target.value)}
                className="w-full rounded-xl border border-border bg-card px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/30"
              />
              <div className="grid grid-cols-3 gap-4">
                <input
                  type="text"
                  placeholder="City"
                  value={city}
                  onChange={(e) => setCity(e.target.value)}
                  className="w-full rounded-xl border border-border bg-card px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/30"
                />
                <input
                  type="text"
                  placeholder="State"
                  value={state}
                  onChange={(e) => setState(e.target.value)}
                  className="w-full rounded-xl border border-border bg-card px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/30"
                />
                <input
                  type="text"
                  placeholder="ZIP"
                  value={zip}
                  onChange={(e) => setZip(e.target.value)}
                  className="w-full rounded-xl border border-border bg-card px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/30"
                />
              </div>
            </div>

            {/* Coupon */}
            <div className="flex flex-col gap-4">
              <h2 className="font-serif text-xl font-semibold text-foreground">Coupon Code</h2>
              <div className="flex gap-2">
                <input
                  type="text"
                  placeholder="Enter coupon code"
                  value={couponCode}
                  onChange={(e) => {
                    setCouponCode(e.target.value)
                    setCouponError("")
                  }}
                  disabled={couponApplied}
                  className="flex-1 rounded-xl border border-border bg-card px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/30 disabled:opacity-50"
                />
                <button
                  type="button"
                  onClick={applyCoupon}
                  disabled={!couponCode.trim() || couponApplied}
                  className="rounded-xl bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground transition-all hover:scale-[1.02] disabled:opacity-50"
                >
                  {couponApplied ? "Applied" : "Apply"}
                </button>
              </div>
              {couponError && <p className="text-xs text-red-500">{couponError}</p>}
              {couponApplied && (
                <p className="text-xs text-green-600 font-medium">✓ Coupon applied! 5% discount + free delivery</p>
              )}
            </div>

            {/* Payment */}
            <div className="flex flex-col gap-4">
              <h2 className="font-serif text-xl font-semibold text-foreground">Payment Method</h2>
              <div className="rounded-xl bg-secondary p-4 border border-border">
                <p className="text-sm font-medium text-foreground">Cash on Delivery</p>
                <p className="text-xs text-muted-foreground mt-2">Pay when your order arrives at your doorstep</p>
              </div>
            </div>

            {/* Form error */}
            {formError && (
              <div className="rounded-xl bg-red-50 border border-red-200 p-4">
                <p className="text-sm text-red-700 font-medium">{formError}</p>
              </div>
            )}

            {/* Submit */}
            <button
              type="button"
              onClick={handleSubmitOrder}
              disabled={isSubmitting}
              className="shimmer-btn flex items-center justify-center gap-2 rounded-full bg-primary py-4 text-sm font-semibold uppercase tracking-widest text-primary-foreground transition-all hover:scale-[1.02] hover:shadow-[0_8px_30px_-4px_rgba(180,60,100,0.4)] disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <Lock className="h-4 w-4" />
              {isSubmitting ? "Processing..." : `Confirm Order - ${finalTotal.toFixed(0)} EGP`}
            </button>
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-2">
            <div className="rounded-2xl bg-secondary p-6 flex flex-col gap-6 sticky top-28">
              <h2 className="font-serif text-xl font-semibold text-foreground">Order Summary</h2>

              <div className="flex flex-col gap-4">
                {items.map((item) => (
                  <div key={`${item.productId}-${item.shadeName}`} className="flex gap-3">
                    <div className="relative h-16 w-16 flex-shrink-0 overflow-hidden rounded-xl bg-card">
                      <Image
                        src={item.image || "/placeholder.svg"}
                        alt={`${item.productName} - ${item.shadeName}`}
                        fill
                        className="object-cover"
                      />
                    </div>
                    <div className="flex-1">
                      <p className="text-sm font-semibold text-foreground">{item.productName}</p>
                      <div className="flex items-center gap-1.5 mt-0.5">
                        <span
                          className="h-2.5 w-2.5 rounded-full"
                          style={{ backgroundColor: item.shadeColor }}
                        />
                        <p className="text-xs text-muted-foreground">{item.shadeName}</p>
                      </div>
                      <div className="flex items-center justify-between mt-2">
                        <div className="flex items-center gap-2">
                          <button
                            type="button"
                            onClick={() => updateQuantity(item.productId, item.shadeName, item.quantity - 1)}
                            className="text-muted-foreground hover:text-foreground"
                            aria-label="Decrease quantity"
                          >
                            <Minus className="h-3 w-3" />
                          </button>
                          <span className="text-xs font-medium text-foreground">{item.quantity}</span>
                          <button
                            type="button"
                            onClick={() => updateQuantity(item.productId, item.shadeName, item.quantity + 1)}
                            className="text-muted-foreground hover:text-foreground"
                            aria-label="Increase quantity"
                          >
                            <Plus className="h-3 w-3" />
                          </button>
                        </div>
                        <p className="text-sm font-medium text-foreground">{item.price * item.quantity} EGP</p>
                      </div>
                    </div>
                    <button
                      type="button"
                      onClick={() => removeItem(item.productId, item.shadeName)}
                      className="self-start text-muted-foreground/50 hover:text-foreground"
                      aria-label={`Remove ${item.productName}`}
                    >
                      <X className="h-3.5 w-3.5" />
                    </button>
                  </div>
                ))}
              </div>

              <div className="h-px bg-border" />

              <div className="flex flex-col gap-2">
                <div className="flex items-center justify-between">
                  <p className="text-sm text-muted-foreground">Subtotal</p>
                  <p className="text-sm font-medium text-foreground">{subtotal} EGP</p>
                </div>
                {discount > 0 && (
                  <div className="flex items-center justify-between text-green-600">
                    <p className="text-sm font-medium">Discount (5%)</p>
                    <p className="text-sm font-medium">-{discount.toFixed(0)} EGP</p>
                  </div>
                )}
                <div className="flex items-center justify-between">
                  <p className="text-sm text-muted-foreground">Delivery</p>
                  {couponApplied ? (
                    <div className="flex items-center gap-2">
                      <p className="text-sm font-medium line-through text-muted-foreground">{DELIVERY_FEE} EGP</p>
                      <p className="text-sm font-medium text-green-600">Free</p>
                    </div>
                  ) : (
                    <p className="text-sm font-medium text-foreground">{deliveryFee} EGP</p>
                  )}
                </div>
                <div className="h-px bg-border my-2" />
                <div className="flex items-center justify-between">
                  <p className="text-base font-semibold text-foreground">Total</p>
                  <p className="font-serif text-xl font-bold text-foreground">{finalTotal.toFixed(0)} EGP</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
