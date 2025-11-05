"use client";

import { useQuery, keepPreviousData } from "@tanstack/react-query";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { BookmarkCheck } from "lucide-react";
import Link from "next/link";
import { getSurahData } from "@/services/quran-api";
import { VerseComponent } from "./verse-component";
import { LoadingSpinner } from "@/components/ui/loading-spinner";
import { useQuranStore } from "@/stores/quran-store";
import { useLanguage } from "@/components/language-provider";

interface SurahReaderProps {
  surahId: number;
}

export function SurahReader({ surahId }: SurahReaderProps) {
  const { currentTranslation } = useQuranStore();
  const { t, language } = useLanguage();

  const {
    data: surahData,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["surah", surahId],
    queryFn: () => getSurahData(surahId),
     placeholderData: keepPreviousData,
  });

  if (isLoading && !surahData) {
    return (
      <div className="flex items-center justify-center py-20 min-h-[calc(100vh-200px)]">
        <LoadingSpinner />
        <span className="ml-2">{t("quran.loading")}</span>
      </div>
    );
  }

  if (error || !surahData) {
    return (
      <Card className="mx-auto max-w-2xl">
        <CardContent className="py-8 text-center">
          <p className="text-destructive">{t("quran.surahNotFound")}</p>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="mx-auto max-w-4xl space-y-4 px-2 sm:space-y-6 sm:px-4 min-h-[calc(100vh-200px)]">
      <Card>
        <CardHeader className="px-4 py-4 sm:px-6 sm:py-6">
          <div className="flex flex-col items-center justify-between gap-4 sm:flex-row">
            <div className="text-center sm:text-left">
              <CardTitle className="text-2xl font-arabic leading-relaxed sm:text-3xl">
                {surahData.surah.names.arabic}
              </CardTitle>
              <p className="mt-2 text-lg text-muted-foreground sm:text-xl">
                {language === "tr"
                  ? surahData.surah.names.tr
                  : surahData.surah.names.en}
              </p>
              <p className="mt-1 text-sm text-muted-foreground">
                {surahData.surah.verses_count} {t("quran.verses")}
              </p>
            </div>
            <Button
              asChild
              variant="outline"
              size="sm"
              className="border-accent/30 bg-card/50 hover:bg-accent/10 hover:text-accent"
            >
              <Link href="/quran/bookmarks">
                <BookmarkCheck className="h-4 w-4" />
                <span className="ml-2 hidden xs:inline">
                  {t("nav.bookmarks")}
                </span>
              </Link>
            </Button>
          </div>
        </CardHeader>
      </Card>

      <div className="space-y-3 sm:space-y-4">
        {surahData.verses.map((verse, index) => (
          <div
            key={verse.id}
            className="animate-in fade-in slide-in-from-top-4 duration-500"
            style={{ animationDelay: `${index * 80}ms` }}
          >
            <VerseComponent
              verse={verse}
              showTranslation={currentTranslation !== "none"}
              translationLanguage={currentTranslation}
            />
          </div>
        ))}
      </div>
    </div>
  );
}
