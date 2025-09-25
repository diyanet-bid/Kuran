"use client"

import { Button } from "@/components/ui/button"
import { ChevronLeft, ChevronRight } from "lucide-react"
import Link from "next/link"
import { useLanguage } from "@/components/language-provider"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import { useQuery } from "@tanstack/react-query"
import { getSurahList } from "@/services/quran-api"
import { getOrdinal } from "@/lib/utils"

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
    const surah = surahs?.find((item) => item.id === id)
    if (!surah) return ""
    return language === "tr" ? surah.names.tr : surah.names.en
  }

  return (
    <div className="mx-auto mb-6 max-w-4xl px-2 sm:px-4">
      <div className="flex flex-col gap-4">
        <div className="text-center">
          <h1 className="text-xl font-bold sm:text-2xl">{getSurahName(currentSurah)}</h1>
          <p className="mt-1 text-sm text-muted-foreground sm:text-base">
            {currentSurah}
            {getOrdinal(currentSurah, language)} {t("navigation.surah")}
          </p>
        </div>

        <div className="flex items-center justify-between gap-2">
          <div className="flex flex-1 justify-start">
            {prevSurah ? (
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button
                      asChild
                      variant="outline"
                      size="sm"
                      className="w-full sm:w-auto"
                    >
                      <Link href={`/quran/surah/${prevSurah}`}>
                        <ChevronLeft className="mr-1 h-4 w-4" />
                        <span className="mr-1 hidden xs:inline">
                          {t("navigation.prevSurah")}
                        </span>
                      </Link>
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p className="font-medium">{getSurahName(prevSurah)}</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            ) : (
              <div />
            )}
          </div>

          <div className="flex items-center rounded-md border px-3 py-2 text-xs text-muted-foreground sm:text-sm">
            {currentSurah} / {totalSurahs}
          </div>

          <div className="flex flex-1 justify-end">
            {nextSurah ? (
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button
                      asChild
                      variant="outline"
                      size="sm"
                      className="w-full sm:w-auto"
                    >
                      <Link href={`/quran/surah/${nextSurah}`}>
                        <span className="ml-1 hidden xs:inline">
                          {t("navigation.nextSurah")}
                        </span>
                        <ChevronRight className="ml-1 h-4 w-4" />
                      </Link>
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p className="font-medium">{getSurahName(nextSurah)}</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            ) : (
              <div />
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
