import { ClientLayout } from "@/components/client-layout"
import { CheckoutForm } from "@/components/checkout-form"

export const metadata = {
  title: "Checkout | Gloss It",
  description: "Complete your Gloss It order",
}

export default function CheckoutPage() {
  return (
    <ClientLayout>
      <main>
        <CheckoutForm />
      </main>
    </ClientLayout>
  )
}
