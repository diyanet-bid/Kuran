"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Play, Bookmark, BookmarkCheck } from "lucide-react"
import { useQuranStore } from "@/stores/quran-store"
import { useLanguage } from "@/components/language-provider"
import type { Verse } from "@/types/quran"

interface VerseComponentProps {
  verse: Verse
  showTranslation: boolean
  translationLanguage: string
}

export function VerseComponent({ verse, showTranslation, translationLanguage }: VerseComponentProps) {
  const { bookmarks, toggleBookmark } = useQuranStore()
  const { t } = useLanguage()
  const isBookmarked = bookmarks.includes(verse.id)

  const translation = translationLanguage === "tr" ? verse.translations.tr : verse.translations.en

  return (
    <Card className="border-l-4 border-l-primary/20 bg-card hover:bg-card/80 transition-colors duration-200">
      <CardContent className="p-6">
        <div className="flex items-start justify-between mb-4">
          <div className="text-[1.25rem] font-bold" style={{ color: '#5a4a36' }}>
            <span className="dark:text-[#E2C9A3]">
              {verse.surah_id}{t("common.ordinalSuffix")} {t("quran.surah")}, {verse.verse_number}{t("common.ordinalSuffix")} {t("quran.verse")}
            </span>
          </div>
          <div className="flex items-center space-x-2">
            <Button variant="ghost" size="sm" className="hover:bg-primary/10 hover:text-primary">
              <Play className="h-4 w-4" />
            </Button>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => toggleBookmark(verse.id)}
              className="hover:bg-primary/10 hover:text-primary dark:hover:text-accent"
            >
              {isBookmarked ? <BookmarkCheck className="h-4 w-4 text-primary" /> : <Bookmark className="h-4 w-4" />}
            </Button>
          </div>
        </div>

        <div className="space-y-4">
          <div className="font-arabic verse-text text-right text-foreground">{verse.text_arabic}</div>

          {showTranslation && (
            <div className="text-muted-foreground border-t border-border pt-4">
              <span className="italic block mb-1">{verse.translation_source}</span>
              {translation}
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  )
}
