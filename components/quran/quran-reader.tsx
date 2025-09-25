"use client"

import { useQuery } from "@tanstack/react-query"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Play, Pause, Bookmark, BookmarkCheck, Copy } from "lucide-react"
import { useState } from "react"
import { useQuranStore } from "@/stores/quran-store"
import { getPageData } from "@/services/quran-api"
import { VerseComponent } from "./verse-component"
import { LoadingSpinner } from "@/components/ui/loading-spinner"
import { useLanguage } from "@/components/language-provider"

interface QuranReaderProps {
  pageNumber: number
}

export function QuranReader({ pageNumber }: QuranReaderProps) {
  const [isPlaying, setIsPlaying] = useState(false)
  const { bookmarks, toggleBookmark, currentTranslation } = useQuranStore()
  const { t } = useLanguage()

  const { data: pageData, isLoading, error } = useQuery({
    queryKey: ["page", pageNumber],
    queryFn: () => getPageData(pageNumber),
  })

  if (isLoading) {
    return (
      <div className="flex items-center justify-center py-20">
        <LoadingSpinner />
        <span className="ml-2 text-muted-foreground">{t("quran.loading")}</span>
      </div>
    )
  }

  if (error) {
    return (
      <Card className="mx-auto max-w-2xl bg-card">
        <CardContent className="py-8 text-center">
          <p className="text-destructive">{t("quran.error")}</p>
        </CardContent>
      </Card>
    )
  }

  if (!pageData) {
    return (
      <Card className="mx-auto max-w-2xl bg-card">
        <CardContent className="py-8 text-center">
          <p className="text-muted-foreground">{t("quran.pageNotFound")}</p>
        </CardContent>
      </Card>
    )
  }

  const isBookmarked = bookmarks.includes(`page-${pageNumber}`)
  const shouldIncludeTranslation = currentTranslation !== "none"

  const handleCopyAll = () => {
    if (!pageData) return

    const textToCopy = pageData.verses
      .map((verse) => {
        const parts = [verse.text_arabic]

        if (shouldIncludeTranslation) {
          const translation =
            currentTranslation === "tr"
              ? verse.translations.tr
              : verse.translations.en

          if (translation) {
            parts.push(translation)
          }
        }

        return parts.join("\n")
      })
      .join("\n\n")

    navigator.clipboard.writeText(textToCopy).then(() => {
      alert("Tüm sayfa kopyalandı!")
    })
  }

  return (
    <div className="mx-auto max-w-4xl space-y-4 px-2 sm:px-4">
      <Card className="border-accent/20 bg-card/80 shadow-lg backdrop-blur-sm">
        <CardHeader className="flex flex-col items-start justify-between gap-4 pb-4 sm:flex-row sm:items-center">
          <CardTitle className="text-xl font-semibold text-card-foreground sm:text-2xl">
            {t("quran.page")} {pageNumber}
          </CardTitle>
          <div className="flex w-full flex-col gap-2 sm:w-auto sm:flex-row sm:items-center">
            <Button
              variant="outline"
              size="sm"
              onClick={() => setIsPlaying((prev) => !prev)}
              className="flex-1 border-accent/30 bg-card/50 hover:bg-accent/10 hover:text-accent sm:flex-none"
            >
              {isPlaying ? <Pause className="h-4 w-4" /> : <Play className="h-4 w-4" />}
              <span className="ml-2 hidden xs:inline">
                {isPlaying ? t("quran.pause") : t("quran.play")}
              </span>
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={() => toggleBookmark(`page-${pageNumber}`)}
              className="flex-1 border-accent/30 bg-card/50 hover:bg-accent/10 hover:text-accent sm:flex-none"
            >
              {isBookmarked ? <BookmarkCheck className="h-4 w-4" /> : <Bookmark className="h-4 w-4" />}
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={handleCopyAll}
              className="flex-1 border-accent/30 bg-card/50 hover:bg-accent/10 hover:text-accent sm:flex-none"
            >
              <Copy className="h-4 w-4" />
              <span className="ml-2 hidden xs:inline">Tümünü Kopyala</span>
            </Button>
          </div>
        </CardHeader>
        <CardContent className="space-y-4 pt-0 sm:space-y-6">
          {pageData.verses.map((verse) => (
            <VerseComponent
              key={verse.id}
              verse={verse}
              showTranslation={shouldIncludeTranslation}
              translationLanguage={currentTranslation}
            />
          ))}
        </CardContent>
      </Card>
    </div>
  )
}
