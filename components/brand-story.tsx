"use client"

import Image from "next/image"
import { GlossitVideo } from "./glossit-video"

export function BrandStory() {
  return (
    <section id="about" className="py-24 md:py-32 px-6">
      <div className="mx-auto max-w-7xl">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          {/* Video */}
          <div className="relative">
            <GlossitVideo />
            {/* Glow behind */}
            <div className="absolute -inset-6 -z-10 rounded-full bg-pink-200/20 blur-3xl" aria-hidden="true" />
          </div>

          {/* Content */}
          <div className="flex flex-col gap-6 lg:gap-8">
            <p className="font-script text-2xl text-primary">
              Our Story
            </p>
            <h2 className="font-serif text-3xl md:text-5xl font-bold text-foreground text-balance leading-tight">
              Made to Shimmer, Built to Glow
            </h2>
            <div className="flex flex-col gap-4 text-muted-foreground leading-relaxed">
              <p>
                Gloss It was created for girls who love soft glam, effortless beauty, and feeling confident without trying too hard. We believe in that dewy, lit-from-within glow that makes you feel unstoppable.
              </p>
              <p>
                Our lip glosses are designed to melt into your lips, deliver mirror-like shine with micro-shimmer and glitter, and keep your lips hydrated all day. No stickiness, no heavy feel. Just pure, glossy, glittery perfection.
              </p>
              <p>
                Whether you're going out, staying in, or doing absolutely nothing -- Gloss It is that final touch that pulls everything together. This is beauty that glows. This is Gloss It.
              </p>
            </div>

            {/* Stats */}
            <div className="flex gap-12 pt-4">
              <div>
                <p className="font-serif text-3xl md:text-4xl font-bold text-primary">100%</p>
                <p className="text-sm text-muted-foreground mt-1">Cruelty Free</p>
              </div>
              <div>
                <p className="font-serif text-3xl md:text-4xl font-bold text-primary">12hr</p>
                <p className="text-sm text-muted-foreground mt-1">Glossy Wear</p>
              </div>
              <div>
                <p className="font-serif text-3xl md:text-4xl font-bold text-primary">6</p>
                <p className="text-sm text-muted-foreground mt-1">Shades (till now)</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
