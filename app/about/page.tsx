import { ClientLayout } from "@/components/client-layout"
import AboutUs from "@/components/about-us"
import { Footer } from "@/components/footer"

export const metadata = {
  title: "About Glossit | Modern Lipgloss Brand",
  description: "Discover Glossit - a modern lipgloss brand built around clean shine, bold personality, and everyday confidence.",
}

export default function AboutPage() {
  return (
    <ClientLayout>
      <main className="min-h-screen pt-24">
        <AboutUs />
      </main>
      <Footer />
    </ClientLayout>
  )
}
