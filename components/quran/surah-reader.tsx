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
      <div className="flex items-center justify-center py-20">
        <LoadingSpinner />
        <span className="ml-2">{t("quran.loading")}</span>
      </div>
    )
  }

  if (error || !surahData) {
    return (
      <Card className="mx-auto max-w-2xl">
        <CardContent className="py-8 text-center">
          <p className="text-destructive">{t("quran.surahNotFound")}</p>
        </CardContent>
      </Card>
    )
  }

  return (
    <div className="mx-auto max-w-4xl space-y-4 px-2 sm:space-y-6 sm:px-4">
      <Card>
        <CardHeader className="px-4 py-4 text-center sm:px-6 sm:py-6">
          <CardTitle className="text-2xl font-arabic leading-relaxed sm:text-3xl">
            {surahData.surah.names.arabic}
          </CardTitle>
          <p className="mt-2 text-lg text-muted-foreground sm:text-xl">
            {language === "tr" ? surahData.surah.names.tr : surahData.surah.names.en}
          </p>
          <p className="mt-1 text-sm text-muted-foreground">
            {surahData.surah.verses_count} {t("quran.verses")}
          </p>
        </CardHeader>
      </Card>

      <div className="space-y-3 sm:space-y-4">
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
