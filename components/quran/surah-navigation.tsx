"use client"

import { Button } from "@/components/ui/button"
import { ChevronLeft, ChevronRight } from "lucide-react"
import Link from "next/link"
import { useLanguage } from "@/components/language-provider"
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip"
import { useQuery } from "@tanstack/react-query"
import { getSurahList } from "@/services/quran-api"

interface SurahNavigationProps {
  currentSurah: number
}

export function SurahNavigation({ currentSurah }: SurahNavigationProps) {
  const { t, language } = useLanguage()
  const totalSurahs = 114

  const { data: surahs } = useQuery({
    queryKey: ["surahs"],
    queryFn: getSurahList,
  })

  const prevSurah = currentSurah > 1 ? currentSurah - 1 : null
  const nextSurah = currentSurah < totalSurahs ? currentSurah + 1 : null

  const getSurahName = (id: number) => {
    const surah = surahs?.find((s) => s.id === id)
    if (!surah) return ""
    return language === "tr" ? surah.names.tr : surah.names.en
  }

  return (
    <div className="max-w-4xl mx-auto px-4">
      <div className="flex justify-between items-center mb-2">
        <div className="flex items-center space-x-4">
          {prevSurah ? (
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button asChild variant="outline" size="lg">
                    <Link href={`/quran/surah/${prevSurah}`}>
                      <ChevronLeft className="mr-2 h-4 w-4" />
                      {t("navigation.prevSurah")}
                    </Link>
                  </Button>
                </TooltipTrigger>
                <TooltipContent>
                  <p className="font-medium">{getSurahName(prevSurah)}</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          ) : (
            <div className="w-[120px]" />
          )}
        </div>

        <div className="text-center">
          <h1 className="text-2xl font-bold">{t("navigation.surah")} {currentSurah}</h1>
          <p className="text-muted-foreground mt-1">{getSurahName(currentSurah)}</p>
        </div>

        <div className="flex items-center space-x-4">
          {nextSurah ? (
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button asChild variant="outline" size="lg">
                    <Link href={`/quran/surah/${nextSurah}`}>
                      {t("navigation.nextSurah")}
                      <ChevronRight className="ml-2 h-4 w-4" />
                    </Link>
                  </Button>
                </TooltipTrigger>
                <TooltipContent>
                  <p className="font-medium">{getSurahName(nextSurah)}</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          ) : (
            <div className="w-[120px]" />
          )}
        </div>
      </div>
      {/* Verse navigation buttons can be added here if needed */}
    </div>
  )
} 