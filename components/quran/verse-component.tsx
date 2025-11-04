"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  Play,
  Pause,
  Bookmark,
  BookmarkCheck,
  Copy,
  Edit3,
  StickyNote,
} from "lucide-react";
import { useQuranStore } from "@/stores/quran-store";
import { useLanguage } from "@/components/language-provider";
import type { Verse } from "@/types/quran";
import { getOrdinal } from "@/lib/utils";
import { useSurahName } from "@/hooks/use-surah-name";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { toast } from "@/hooks/use-toast";
import { VerseNoteDialog } from "./verse-note-dialog";

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
  const { toggleBookmark, isBookmarked, getBookmarkNote } = useQuranStore();
  const { t, language } = useLanguage();
  const { getSurahName } = useSurahName();
  const bookmarked = isBookmarked(verse.id);
  const hasNote = !!getBookmarkNote(verse.id);

  const translation =
    translationLanguage === "tr"
      ? verse.translations.tr
      : translationLanguage === "en"
      ? verse.translations.en
      : undefined;

  const [isPlaying, setIsPlaying] = useState(false);
  const [copied, setCopied] = useState(false);
  const [isNoteDialogOpen, setIsNoteDialogOpen] = useState(false);

  const translationSource =
    translationLanguage === "tr"
      ? "Diyanet İşleri Başkanlığı Meali"
      : translationLanguage === "en"
      ? "Turkish Religious Affairs Translation"
      : undefined;

  const handleCopy = () => {
    const segments = [verse.text_arabic];
    if (translation) {
      segments.push(translation);
    }

    navigator.clipboard.writeText(segments.join("\n")).then(() => {
      setCopied(true);
      toast({ title: t("quran.copied") });
      setTimeout(() => setCopied(false), 2000);
    });
  };

  return (
    <Card className="border-l-4 border-l-primary/20 bg-card transition-colors duration-200 hover:bg-card/80">
      <CardContent className="p-4 sm:p-6">
        <div className="mb-3 flex flex-col items-start justify-between gap-2 sm:mb-4 sm:flex-row">
          <div
            className="text-base font-bold sm:text-[1.25rem]"
            style={{ color: "#5a4a36" }}
          >
            <span className="dark:text-[#E2C9A3]">
              {language === "tr"
                ? `${getSurahName(verse.surah_id)}, ${
                    verse.verse_number
                  }${getOrdinal(verse.verse_number, language)} ${t(
                    "quran.verse"
                  )}`
                : `${getSurahName(verse.surah_id)}, ${t("quran.verse")} ${
                    verse.verse_number
                  }${getOrdinal(verse.verse_number, language)}`}
            </span>
          </div>

          <TooltipProvider>
            <div className="ml-auto flex items-center space-x-2">
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => setIsPlaying((prev) => !prev)}
                    className="hover:bg-primary/10 hover:text-primary p-2 dark:hover:text-accent"
                  >
                    {isPlaying ? (
                      <Pause className="h-4 w-4" />
                    ) : (
                      <Play className="h-4 w-4" />
                    )}
                  </Button>
                </TooltipTrigger>
                <TooltipContent>
                  <p className="font-medium">
                    {isPlaying ? t("quran.pause") : t("quran.play")}
                  </p>
                </TooltipContent>
              </Tooltip>

              <Tooltip>
                <TooltipTrigger asChild>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => setIsNoteDialogOpen(true)}
                    className={`hover:bg-primary/10 hover:text-primary p-2 dark:hover:text-accent ${
                      bookmarked ? "text-primary" : ""
                    } ${hasNote ? "text-accent" : ""}`}
                  >
                    {bookmarked ? (
                      hasNote ? (
                        <StickyNote className="h-4 w-4" />
                      ) : (
                        <BookmarkCheck className="h-4 w-4" />
                      )
                    ) : (
                      <Bookmark className="h-4 w-4" />
                    )}
                  </Button>
                </TooltipTrigger>
                <TooltipContent>
                  <p className="font-medium">
                    {bookmarked
                      ? hasNote
                        ? t("notes.editNote")
                        : t("notes.addNote")
                      : t("quran.bookmark")}
                  </p>
                </TooltipContent>
              </Tooltip>

              <Tooltip>
                <TooltipTrigger asChild>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={handleCopy}
                    className="hover:bg-primary/10 hover:text-primary dark:hover:text-accent"
                  >
                    <Copy className="mr-1 h-4 w-4" />
                    <span>
                      {copied ? `${t("quran.copied")}!` : t("quran.copy")}
                    </span>
                  </Button>
                </TooltipTrigger>
                <TooltipContent>
                  <p className="font-medium">{t("quran.copy")}</p>
                </TooltipContent>
              </Tooltip>
            </div>
          </TooltipProvider>
        </div>

        <div className="space-y-3 sm:space-y-4">
          <div className="font-arabic verse-text text-right text-foreground leading-loose">
            {verse.text_arabic}
          </div>

          {showTranslation && translation && (
            <div className="border-t border-border pt-3 text-muted-foreground sm:pt-4">
              {translationSource && (
                <span className="mb-2 block text-sm italic">
                  {translationSource}
                </span>
              )}
              <div className="text-sm leading-relaxed sm:text-base">
                {translation}
              </div>
            </div>
          )}
        </div>

        {/* Show note if exists */}
        {hasNote && (
          <div className="mt-4 rounded-lg bg-accent/10 border border-accent/20 p-3">
            <div className="flex items-start space-x-2">
              <StickyNote className="h-4 w-4 text-accent mt-0.5 flex-shrink-0" />
              <div className="flex-1">
                <div className="text-sm font-medium text-accent mb-1">
                  {t("notes.personalNote")}
                </div>
                <div className="text-sm text-muted-foreground whitespace-pre-wrap">
                  {getBookmarkNote(verse.id)}
                </div>
              </div>
            </div>
          </div>
        )}
      </CardContent>

      {/* Note Dialog */}
      <VerseNoteDialog
        verse={verse}
        isOpen={isNoteDialogOpen}
        onClose={() => setIsNoteDialogOpen(false)}
      />
    </Card>
  );
}
