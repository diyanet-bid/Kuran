"use client"

import { useState } from "react" // ✅ Yeni eklendi: her ayet için play/copy state
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Play, Pause, Bookmark, BookmarkCheck, Copy } from "lucide-react"
import { useQuranStore } from "@/stores/quran-store"
import { useLanguage } from "@/components/language-provider"
import type { Verse } from "@/types/quran"
import { getOrdinal } from "@/lib/utils"
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip"
import { toast } from "@/hooks/use-toast";

interface VerseComponentProps {
  verse: Verse
  showTranslation: boolean
  translationLanguage: string
}

export function VerseComponent({ verse, showTranslation, translationLanguage }: VerseComponentProps) {
  const { bookmarks, toggleBookmark } = useQuranStore()
  const { t, language } = useLanguage()
  const isBookmarked = bookmarks.includes(verse.id)

  const translation = translationLanguage === "tr" ? verse.translations.tr : verse.translations.en

  const [isPlaying, setIsPlaying] = useState(false) // ✅ Her ayet için kendi play durumu

  const handleCopy = () => {
    const textToCopy = `${verse.text_arabic}\n${translation ?? ""}`
    navigator.clipboard.writeText(textToCopy).then(() => {
      toast({
      title: t("quran.copied"),
      variant: "default",
    });
    })
  } // ✅ o ayeti kopyalıyor

  return (
    <Card className="border-l-4 border-l-primary/20 bg-card hover:bg-card/80 transition-colors duration-200">
      <CardContent className="p-6">
        <div className="flex items-start justify-between mb-4">
          <div className="text-[1.25rem] font-bold" style={{ color: '#5a4a36' }}>
            <span className="dark:text-[#E2C9A3]">
              {verse.surah_id}{getOrdinal(verse.surah_id, language)} {t("quran.surah")}, {verse.verse_number}{getOrdinal(verse.verse_number, language)} {t("quran.verse")}
            </span>
          </div>

          <div className="flex items-center space-x-2">
            {/* Play/Pause */}
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => setIsPlaying(!isPlaying)}
                    className="hover:bg-primary/10 hover:text-primary"
                  >
                    {isPlaying ? <Pause className="h-4 w-4" /> : <Play className="h-4 w-4" />}
                  </Button>
                </TooltipTrigger>
                <TooltipContent>
                  <p className="font-medium">{isPlaying ? t("quran.pause") : t("quran.play")}</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
            
            {/* Bookmark */}
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => toggleBookmark(verse.id)}
                    className="hover:bg-primary/10 hover:text-primary"
                  >
                    {isBookmarked ? <BookmarkCheck className="h-4 w-4 text-primary" /> : <Bookmark className="h-4 w-4" />}
                  </Button>
                </TooltipTrigger>
                <TooltipContent>
                  <p className="font-medium">{isBookmarked ? t("quran.bookmarked") : t("quran.bookmark")}</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>

            {/* Copy */}
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={handleCopy}
                    className="hover:bg-primary/10 hover:text-primary"
                  >
                    <Copy className="h-4 w-4 mr-1" />
                  </Button>
                </TooltipTrigger>
                <TooltipContent>
                  <p className="font-medium">{t("quran.copy")}</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
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
