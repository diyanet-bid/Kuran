"use client";

import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight } from "lucide-react";
import Link from "next/link";
import { useLanguage } from "@/components/language-provider";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { useQuery } from "@tanstack/react-query";
import { getSurahList } from "@/services/quran-api";

interface SurahNavigationProps {
  currentSurah: number;
}

export function SurahNavigation({ currentSurah }: SurahNavigationProps) {
  const { t, language } = useLanguage();
  const totalSurahs = 114;

  const { data: surahs } = useQuery({
    queryKey: ["surahs"],
    queryFn: getSurahList,
  });

  const prevSurah = currentSurah > 1 ? currentSurah - 1 : null;
  const nextSurah = currentSurah < totalSurahs ? currentSurah + 1 : null;

  const getSurahName = (id: number) => {
    const surah = surahs?.find((s) => s.id === id);
    if (!surah) return "";
    return language === "tr" ? surah.names.tr : surah.names.en;
  };

  return (
    <div className="max-w-4xl mx-auto px-2 sm:px-4 mb-6">
      <div className="flex flex-col gap-4">
        {/* Title section */}
        <div className="text-center">
          <h1 className="text-xl sm:text-2xl font-bold">
            {t("navigation.surah")} {currentSurah}
          </h1>
          <p className="text-muted-foreground mt-1 text-sm sm:text-base">
            {getSurahName(currentSurah)}
          </p>
        </div>

        {/* Navigation buttons */}
        <div className="flex items-center justify-between gap-2">
          <div className="flex-1 flex justify-start">
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
                        <span className="hidden xs:inline mr-1">
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

          <div className="flex items-center px-3 py-2 bg-card rounded-md border">
            <span className="text-xs sm:text-sm text-muted-foreground whitespace-nowrap">
              {currentSurah} / 114
            </span>
          </div>

          <div className="flex-1 flex justify-end">
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
                        <span className="hidden xs:inline ml-1">
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
  );
}
