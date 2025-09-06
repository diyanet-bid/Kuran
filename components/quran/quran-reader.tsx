"use client";

import { useQuery } from "@tanstack/react-query";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Play, Pause, Bookmark, BookmarkCheck } from "lucide-react";
import { useState } from "react";
import { useQuranStore } from "@/stores/quran-store";
import { getPageData } from "@/services/quran-api";
import { VerseComponent } from "./verse-component";
import { LoadingSpinner } from "@/components/ui/loading-spinner";
import { useLanguage } from "@/components/language-provider";

interface QuranReaderProps {
  pageNumber: number;
}

export function QuranReader({ pageNumber }: QuranReaderProps) {
  const [isPlaying, setIsPlaying] = useState(false);
  const { bookmarks, toggleBookmark, currentTranslation } = useQuranStore();
  const { t } = useLanguage();

  const {
    data: pageData,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["page", pageNumber],
    queryFn: () => getPageData(pageNumber),
  });

  if (isLoading) {
    return (
      <div className="flex justify-center items-center py-20">
        <LoadingSpinner />
        <span className="ml-2 text-muted-foreground">{t("quran.loading")}</span>
      </div>
    );
  }

  if (error) {
    return (
      <Card className="max-w-2xl mx-auto bg-card">
        <CardContent className="text-center py-8">
          <p className="text-destructive">{t("quran.error")}</p>
        </CardContent>
      </Card>
    );
  }

  if (!pageData) {
    return (
      <Card className="max-w-2xl mx-auto bg-card">
        <CardContent className="text-center py-8">
          <p className="text-muted-foreground">{t("quran.pageNotFound")}</p>
        </CardContent>
      </Card>
    );
  }

  const isBookmarked = bookmarks.includes(`page-${pageNumber}`);

  return (
    <div className="max-w-4xl mx-auto space-y-4 px-2 sm:px-4">
      <Card className="bg-card/80 backdrop-blur-sm border-accent/20 shadow-lg">
        <CardHeader className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-4">
          <CardTitle className="text-xl sm:text-2xl text-card-foreground font-semibold">
            {t("quran.page")} {pageNumber}
          </CardTitle>
          <div className="flex items-center space-x-2 w-full sm:w-auto">
            <Button
              variant="outline"
              size="sm"
              onClick={() => setIsPlaying(!isPlaying)}
              className="border-accent/30 hover:bg-accent/10 hover:text-accent bg-card/50 flex-1 sm:flex-none"
            >
              {isPlaying ? (
                <Pause className="h-4 w-4" />
              ) : (
                <Play className="h-4 w-4" />
              )}
              <span className="ml-2 hidden xs:inline">
                {isPlaying ? t("quran.pause") : t("quran.play")}
              </span>
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={() => toggleBookmark(`page-${pageNumber}`)}
              className="border-accent/30 hover:bg-accent/10 hover:text-accent bg-card/50"
            >
              {isBookmarked ? (
                <BookmarkCheck className="h-4 w-4" />
              ) : (
                <Bookmark className="h-4 w-4" />
              )}
            </Button>
          </div>
        </CardHeader>
        <CardContent className="space-y-4 sm:space-y-6 pt-0">
          {pageData.verses.map((verse) => (
            <VerseComponent
              key={verse.id}
              verse={verse}
              showTranslation={currentTranslation !== "none"}
              translationLanguage={currentTranslation}
            />
          ))}
        </CardContent>
      </Card>
    </div>
  );
}
