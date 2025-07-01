import { Hero } from "@/components/landing/hero"
import { Features } from "@/components/landing/features"
import { Community } from "@/components/landing/community"
import { CTA } from "@/components/landing/cta"
import { Header } from "@/components/layout/header"
import { Footer } from "@/components/layout/footer"

export default function HomePage() {
  return (
    <div className="min-h-screen">
      <Header />
      <main>
        <Hero />
        <Features />
        <Community />
        <CTA />
      </main>
      <Footer />
    </div>
  )
}
