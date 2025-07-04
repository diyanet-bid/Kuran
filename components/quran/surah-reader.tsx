"use client"

import { useQuery } from "@tanstack/react-query"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { getSurahData } from "@/services/quran-api"
import { VerseComponent } from "./verse-component"
import { LoadingSpinner } from "@/components/ui/loading-spinner"
import { useQuranStore } from "@/stores/quran-store"
import { useLanguage } from "@/components/language-provider"

interface SurahReaderProps {
  surahId: number
}

export function SurahReader({ surahId }: SurahReaderProps) {
  const { currentTranslation } = useQuranStore()
  const { t, language } = useLanguage()

  const {
    data: surahData,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["surah", surahId],
    queryFn: () => getSurahData(surahId),
  })

  if (isLoading) {
    return (
      <div className="flex justify-center items-center py-20">
        <LoadingSpinner />
        <span className="ml-2">{t("quran.loading")}</span>
      </div>
    )
  }

  if (error || !surahData) {
    return (
      <Card className="max-w-2xl mx-auto">
        <CardContent className="text-center py-8">
          <p className="text-destructive">{t("quran.surahNotFound")}</p>
        </CardContent>
      </Card>
    )
  }

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <Card>
        <CardHeader className="text-center">
          <CardTitle className="text-3xl font-arabic">{surahData.surah.names.arabic}</CardTitle>
          <p className="text-xl text-muted-foreground">
            {language === "tr" ? surahData.surah.names.tr : surahData.surah.names.en}
          </p>
          <p className="text-sm text-muted-foreground">
            {surahData.surah.verses_count} {t("quran.verses")}
          </p>
        </CardHeader>
      </Card>

      <div className="space-y-4">
        {surahData.verses.map((verse) => (
          <VerseComponent
            key={verse.id}
            verse={verse}
            showTranslation={currentTranslation !== "none"}
            translationLanguage={currentTranslation}
          />
        ))}
      </div>
    </div>
  )
}
