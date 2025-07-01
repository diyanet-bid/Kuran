import { SurahList } from "@/components/quran/surah-list"
import { Header } from "@/components/layout/header"

export default function SurahsPage() {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <div className="container mx-auto px-4 py-8">
        <SurahList />
      </div>
    </div>
  )
}
