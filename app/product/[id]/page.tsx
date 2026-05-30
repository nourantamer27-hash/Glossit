import { products } from "@/lib/products"
import { notFound } from "next/navigation"
import { ClientLayout } from "@/components/client-layout"
import { ProductDetail } from "@/components/product-detail"
import { Footer } from "@/components/footer"

export function generateStaticParams() {
  return products.map((product) => ({
    id: product.id,
  }))
}

export async function generateMetadata({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  const product = products.find((p) => p.id === id)
  if (!product) return { title: "Product Not Found" }
  return {
    title: `${product.name} | Gloss It`,
    description: product.tagline,
  }
}

export default async function ProductPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  const product = products.find((p) => p.id === id)

  if (!product) {
    notFound()
  }

  return (
    <ClientLayout>
      <main>
        <ProductDetail product={product} />
      </main>
      <Footer />
    </ClientLayout>
  )
}
