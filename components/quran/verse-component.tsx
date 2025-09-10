"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Play, Bookmark, BookmarkCheck } from "lucide-react";
import { useQuranStore } from "@/stores/quran-store";
import { useLanguage } from "@/components/language-provider";
import type { Verse } from "@/types/quran";

interface VerseComponentProps {
  verse: Verse;
  showTranslation: boolean;
  translationLanguage: string;
}

export function VerseComponent({
  verse,
  showTranslation,
  translationLanguage,
}: VerseComponentProps) {
  const { bookmarks, toggleBookmark } = useQuranStore();
  const { t } = useLanguage();
  const isBookmarked = bookmarks.includes(verse.id);

  const translation =
    translationLanguage === "tr"
      ? verse.translations.tr
      : verse.translations.en;

  return (
    <Card className="border-l-4 border-l-primary/20 bg-card hover:bg-card/80 transition-colors duration-200">
      <CardContent className="p-4 sm:p-6">
        <div className="flex flex-col sm:flex-row items-start justify-between mb-3 sm:mb-4 gap-2">
          <div
            className="text-base sm:text-[1.25rem] font-bold"
            style={{ color: "#5a4a36" }}
          >
            <span className="dark:text-[#E2C9A3]">
              {t("quran.surah")} {verse.surah_id}, {t("quran.verse")}{" "}
              {verse.verse_number}
            </span>
          </div>
          <div className="flex items-center space-x-2 ml-auto">
            <Button
              variant="ghost"
              size="sm"
              className="hover:bg-primary/10 hover:text-primary p-2"
            >
              <Play className="h-4 w-4" />
            </Button>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => toggleBookmark(verse.id)}
              className="hover:bg-primary/10 hover:text-primary dark:hover:text-accent p-2"
            >
              {isBookmarked ? (
                <BookmarkCheck className="h-4 w-4 text-primary" />
              ) : (
                <Bookmark className="h-4 w-4" />
              )}
            </Button>
          </div>
        </div>

        <div className="space-y-3 sm:space-y-4">
          <div className="font-arabic verse-text text-right text-foreground leading-loose">
            {verse.text_arabic}
          </div>

          {showTranslation && (
            <div className="text-muted-foreground border-t border-border pt-3 sm:pt-4">
              <span className="italic block mb-2 text-sm">
                {translationLanguage === "tr"
                  ? "Diyanet İşleri Başkanlığı Meali"
                  : "Turkish Religious Affairs Translation"}
              </span>
              <div className="text-sm sm:text-base leading-relaxed">
                {translation}
              </div>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
