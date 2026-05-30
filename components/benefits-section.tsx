"use client"

import { Droplets, Sparkles, Feather, Heart, Clock, Sun } from "lucide-react"

const benefits = [
  {
    icon: Droplets,
    title: "Dewy Hydration",
    description: "Luxurious formula melts into your lips for that dewy, just-applied glow all day.",
  },
  {
    icon: Sparkles,
    title: "Glitter & Shimmer",
    description: "Micro-glitter and shimmer particles catch the light for a glass-like, multidimensional shine.",
  },
  {
    icon: Heart,
    title: "Never Sticky",
    description: "Silky smooth formula that glides on like butter. All gloss, zero tackiness.",
  },
  {
    icon: Feather,
    title: "Weightless Glow",
    description: "So light it feels like nothing. Just pure, effortless radiance on your lips.",
  },
  {
    icon: Clock,
    title: "Glow That Lasts",
    description: "Shimmer and shine from morning to night. No fading, no reapplying. Just glow.",
  },
  {
    icon: Sun,
    title: "Lit-From-Within",
    description: "Nourishing formula gives your lips that healthy, luminous, dewy-skin look.",
  },
]

export function BenefitsSection() {
  return (
    <section className="relative py-24 md:py-32 px-6 bg-secondary overflow-hidden">
      {/* Decorative glow orbs */}
      <div className="absolute top-0 left-1/4 w-64 h-64 rounded-full bg-pink-300/15 blur-3xl pointer-events-none" aria-hidden="true" />
      <div className="absolute bottom-0 right-1/4 w-80 h-80 rounded-full bg-pink-200/10 blur-3xl pointer-events-none" aria-hidden="true" />

      <div className="relative mx-auto max-w-7xl">
        {/* Section header */}
        <div className="text-center mb-16">
          <p className="font-script text-2xl text-primary mb-3">
            Why Gloss It?
          </p>
          <h2 className="font-serif text-3xl md:text-5xl font-bold text-foreground text-balance">
            The Glow Is Real
          </h2>
        </div>

        {/* Benefits grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {benefits.map((benefit) => (
            <div
              key={benefit.title}
              className="group flex flex-col items-center text-center p-8 rounded-2xl bg-card hover:shadow-[0_8px_30px_-4px_rgba(180,60,100,0.12)] transition-all duration-300"
            >
              <div className="flex h-14 w-14 items-center justify-center rounded-full bg-pink-100 group-hover:bg-pink-200/80 transition-colors mb-5">
                <benefit.icon className="h-6 w-6 text-primary" />
              </div>
              <h3 className="font-serif text-xl font-semibold text-foreground mb-2">
                {benefit.title}
              </h3>
              <p className="text-sm text-muted-foreground leading-relaxed">
                {benefit.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
