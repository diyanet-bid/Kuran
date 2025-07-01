"use client"

import { Header } from "@/components/layout/header"
import { Footer } from "@/components/layout/footer"
import { DeveloperWelcome } from "@/components/developers/developer-welcome"
import { QuickStart } from "@/components/developers/quick-start"
import { Contribute } from "@/components/developers/contribute"
import { Community } from "@/components/developers/community"
import { Resources } from "@/components/developers/resources"

export default function DevelopersPage() {
  return (
    <div className="min-h-screen">
      <Header />
      <main className="container mx-auto px-4 py-12 space-y-16">
        <DeveloperWelcome />
        <QuickStart />
        <Contribute />
        <Community />
        <Resources />
      </main>
      <Footer />
    </div>
  )
}
