export interface Shade {
  name: string
  color: string
  image: string
  description: string
}

export interface Benefit {
  icon: string
  label: string
}

export interface Product {
  id: string
  name: string
  tagline: string
  price: number
  shades: Shade[]
  benefits: Benefit[]
}

export const products: Product[] = [
  {
    id: "frostbite",
    name: "Frostbite",
    tagline: "Clear + icy white shimmer",
    price: 220,
    shades: [
      {
        name: "Frostbite",
        color: "#F0E8F5",
        image: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-Db47bxdgGFBaWaviNFDdOQtvhuR2us.png",
        description: "A crystal-clear gloss with icy white shimmer and cool frosty tones. Luminous, glassy finish with subtle sparkle.",
      },
    ],
    benefits: [
      { icon: "droplets", label: "Ultra-Hydrating" },
      { icon: "sparkles", label: "Glossy Finish" },
      { icon: "feather", label: "Weightless" },
      { icon: "heart", label: "Non-Sticky" },
    ],
  },
  {
    id: "dark-espresso",
    name: "Dark Espresso",
    tagline: "Deep moody brown",
    price: 220,
    shades: [
      {
        name: "Dark Espresso",
        color: "#4A3728",
        image: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-R8QZS2GVMq6Lo3HnbvlhSR8fV37hyG.png",
        description: "A rich espresso brown that's moody and luxe. Perfect for an editorial, sophisticated moment.",
      },
    ],
    benefits: [
      { icon: "droplets", label: "Ultra-Hydrating" },
      { icon: "sparkles", label: "Glossy Finish" },
      { icon: "clock", label: "Long-Lasting" },
      { icon: "heart", label: "Non-Sticky" },
    ],
  },
  {
    id: "honeyed-nude",
    name: "Honeyed Nude",
    tagline: "Warm honey nude",
    price: 220,
    shades: [
      {
        name: "Honeyed Nude",
        color: "#C9A88F",
        image: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-HTs4Kwrce3qftILuoPz3OLSwWpNbg4.png",
        description: "A warm honey nude with golden undertones. Effortlessly chic and universally flattering.",
      },
    ],
    benefits: [
      { icon: "droplets", label: "Ultra-Hydrating" },
      { icon: "sparkles", label: "Glossy Finish" },
      { icon: "feather", label: "Weightless" },
      { icon: "heart", label: "Non-Sticky" },
    ],
  },
  {
    id: "red-flag",
    name: "Red Flag",
    tagline: "Deep true red",
    price: 220,
    shades: [
      {
        name: "Red Flag",
        color: "#C41E3A",
        image: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-tvIk5wFoYX5l2sWhuh4PQSlFXB378Y.png",
        description: "A true red that demands attention. Classic, bold, and impossibly glossy.",
      },
    ],
    benefits: [
      { icon: "droplets", label: "Ultra-Hydrating" },
      { icon: "sparkles", label: "Glossy Finish" },
      { icon: "clock", label: "Long-Lasting" },
      { icon: "heart", label: "Non-Sticky" },
    ],
  },
  {
    id: "love-blush",
    name: "Love Blush",
    tagline: "Soft blush pink",
    price: 220,
    shades: [
      {
        name: "Love Blush",
        color: "#F4A8C1",
        image: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-3Z5gBqd0KQ0auyNhZuqaCCheGT23VT.png",
        description: "A soft blush pink that's playful and feminine. Sweet, dewy, and totally crushable.",
      },
    ],
    benefits: [
      { icon: "droplets", label: "Ultra-Hydrating" },
      { icon: "sparkles", label: "Glossy Finish" },
      { icon: "feather", label: "Weightless" },
      { icon: "heart", label: "Non-Sticky" },
    ],
  },
  {
    id: "delulu",
    name: "Delulu",
    tagline: "Clear gloss with subtle sparkle",
    price: 220,
    shades: [
      {
        name: "Delulu",
        color: "#FFE8E8",
        image: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-0iE7c9TO5ujyO2eQotDPqRT8ftQbtJ.png",
        description: "A clear gloss with subtle sparkle. Transparent shine that works over any lipstick color.",
      },
    ],
    benefits: [
      { icon: "sparkles", label: "Shimmer Finish" },
      { icon: "droplets", label: "Ultra-Hydrating" },
      { icon: "feather", label: "Weightless" },
      { icon: "heart", label: "Non-Sticky" },
    ],
  },
]
