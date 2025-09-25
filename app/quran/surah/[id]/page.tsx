import { SurahReader } from "@/components/quran/surah-reader"
import { SurahNavigation } from "@/components/quran/surah-navigation"
import { Header } from "@/components/layout/header"
import { Footer } from "@/components/layout/footer"
import { Metadata } from "next"

interface SurahPageProps {
  params: {
    id: string
  }
}

export async function generateMetadata({ params }: SurahPageProps): Promise<Metadata> {
  const resolvedParams = await params
  const surahId = Number.parseInt(resolvedParams.id)

  return {
    title: `${surahId}. Sure - Kuran-ı Kerim`,
    description: `Kuran-ı Kerim'in ${surahId}. suresini okuyun.`,
  }
}

export default async function SurahPage({ params }: SurahPageProps) {
  const resolvedParams = await params
  const surahId = Number.parseInt(resolvedParams.id)

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <div className="container mx-auto px-2 py-6 sm:px-4 sm:py-8">
        <SurahNavigation currentSurah={surahId} />
        <SurahReader surahId={surahId} />
      </div>
      <Footer />
    </div>
  )
}
