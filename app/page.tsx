import { ClientLayout } from "@/components/client-layout"
import { Hero } from "@/components/hero"
import { FeaturedProducts } from "@/components/featured-products"
import { BenefitsSection } from "@/components/benefits-section"
import { BrandStory } from "@/components/brand-story"
import { Footer } from "@/components/footer"

export default function Page() {
  return (
    <ClientLayout>
      <main>
        <Hero />
        <FeaturedProducts />
        <BenefitsSection />
        <BrandStory />
      </main>
      <Footer />
    </ClientLayout>
  )
}
