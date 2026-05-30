"use client"

import Image from "next/image"
import Link from "next/link"

function SparkleIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden="true">
      <path d="M12 0L14.59 8.41L23 11L14.59 13.59L12 22L9.41 13.59L1 11L9.41 8.41L12 0Z" />
    </svg>
  )
}

export function Hero() {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-secondary">
      {/* Glowing orbs background */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden" aria-hidden="true">
        <div className="glow-orb absolute top-1/4 left-1/4 w-64 h-64 rounded-full bg-pink-300/30" />
        <div className="glow-orb absolute bottom-1/4 right-1/4 w-80 h-80 rounded-full bg-pink-200/20" style={{ animationDelay: '2s' }} />
        <div className="glow-orb absolute top-1/2 right-1/3 w-48 h-48 rounded-full bg-rose-200/25" style={{ animationDelay: '4s' }} />
      </div>

      {/* Floating sparkle particles */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden" aria-hidden="true">
        {[
          { top: '15%', left: '10%', delay: '0s', size: 'h-3 w-3' },
          { top: '25%', left: '80%', delay: '1s', size: 'h-2 w-2' },
          { top: '60%', left: '15%', delay: '2s', size: 'h-2.5 w-2.5' },
          { top: '70%', left: '85%', delay: '3s', size: 'h-3 w-3' },
          { top: '40%', left: '5%', delay: '0.5s', size: 'h-2 w-2' },
          { top: '30%', left: '90%', delay: '1.5s', size: 'h-2.5 w-2.5' },
          { top: '80%', left: '50%', delay: '2.5s', size: 'h-2 w-2' },
          { top: '10%', left: '60%', delay: '3.5s', size: 'h-3 w-3' },
          { top: '50%', left: '70%', delay: '4s', size: 'h-2 w-2' },
          { top: '85%', left: '25%', delay: '1.2s', size: 'h-2.5 w-2.5' },
        ].map((sparkle, i) => (
          <SparkleIcon
            key={i}
            className={`sparkle-particle absolute ${sparkle.size} text-pink-400/40`}
            {...{ style: { top: sparkle.top, left: sparkle.left, animationDelay: sparkle.delay } }}
          />
        ))}
      </div>

      <div className="relative z-10 mx-auto max-w-7xl px-6 py-32 flex flex-col items-center text-center gap-8">
        {/* Logo */}
        <div className="relative">
          <Image
            src="/images/logo.png"
            alt="Gloss It"
            width={280}
            height={280}
            className="h-48 w-48 md:h-64 md:w-64 object-contain drop-shadow-lg"
            priority
          />
          {/* Glow behind logo */}
          <div className="absolute inset-0 -z-10 rounded-full bg-pink-200/40 blur-3xl scale-110" aria-hidden="true" />
        </div>

        {/* Tagline */}
        <div className="flex flex-col gap-4">
          <p className="font-script text-2xl md:text-3xl text-primary">your lips, but</p>
          <h1 className="shimmer-text font-serif text-4xl md:text-6xl lg:text-7xl font-bold tracking-tight text-balance -mt-2">
            Glossier
          </h1>
          <p className="text-lg md:text-xl text-muted-foreground max-w-lg mx-auto leading-relaxed">
            Glass-like shine. Dewy, hydrated lips. That lit-from-within glow you can&#39;t fake.
          </p>
        </div>

        {/* CTA */}
        <Link
          href="#shop"
          className="shimmer-btn inline-flex items-center justify-center rounded-full bg-primary px-10 py-4 text-sm font-semibold uppercase tracking-widest text-primary-foreground transition-all hover:scale-105 hover:shadow-[0_8px_30px_-4px_rgba(180,60,100,0.4)]"
        >
          Shop the Glow
        </Link>
      </div>

      {/* Bottom fade */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-background to-transparent" />
    </section>
  )
}
