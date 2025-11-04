"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { useQuranStore } from "@/stores/quran-store";
import { useLanguage } from "@/components/language-provider";
import type { Verse } from "@/types/quran";
import { toast } from "@/hooks/use-toast";
import { useSurahName } from "@/hooks/use-surah-name";
import { Trash2 } from "lucide-react";

interface VerseNoteDialogProps {
  verse: Verse;
  isOpen: boolean;
  onClose: () => void;
}

export function VerseNoteDialog({
  verse,
  isOpen,
  onClose,
}: VerseNoteDialogProps) {
  const {
    getBookmarkNote,
    addOrUpdateBookmarkNote,
    removeBookmarkNote,
    isBookmarked,
    toggleBookmark,
  } = useQuranStore();
  const { t, language } = useLanguage();
  const { getSurahName } = useSurahName();

  const existingNote = getBookmarkNote(verse.id) || "";
  const [note, setNote] = useState(existingNote);
  const [isLoading, setIsLoading] = useState(false);

  const handleSave = async () => {
    setIsLoading(true);
    try {
      if (note.trim()) {
        // Eğer bookmark yoksa önce bookmark ekle
        if (!isBookmarked(verse.id)) {
          toggleBookmark(verse.id);
        }
        addOrUpdateBookmarkNote(verse.id, note.trim());
        toast({
          title: t("notes.saved"),
          description: t("notes.savedDescription"),
        });
      } else {
        // Not boşsa sadece notu sil, bookmark'ı koru
        if (isBookmarked(verse.id)) {
          removeBookmarkNote(verse.id);
          toast({
            title: t("notes.removed"),
            description: t("notes.removedDescription"),
          });
        } else {
          // Hiç bookmark yoksa sadece bookmark ekle
          toggleBookmark(verse.id);
          toast({
            title: t("quran.bookmarked"),
            description: t("bookmarks.addedDescription") || "Ayet işaretlendi.",
          });
        }
      }
      onClose();
    } catch (error) {
      toast({
        title: t("notes.error"),
        description: t("notes.errorDescription"),
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleDelete = () => {
    removeBookmarkNote(verse.id);
    setNote("");
    toast({
      title: t("notes.removed"),
      description: t("notes.removedDescription"),
    });
    onClose();
  };

  const handleOpenChange = (open: boolean) => {
    if (!open) {
      setNote(existingNote); // Reset to original note if dialog is closed without saving
      onClose();
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={handleOpenChange}>
      <DialogContent className="sm:max-w-[525px]">
        <DialogHeader>
          <DialogTitle className="text-lg font-semibold">
            {isBookmarked(verse.id)
              ? existingNote
                ? t("notes.editNote")
                : t("notes.addNote")
              : t("quran.bookmark")}
          </DialogTitle>
          <div className="text-sm text-muted-foreground space-y-2">
            <div>
              <span className="font-medium">
                {getSurahName(verse.surah_id)}, {verse.verse_number}.{" "}
                {t("quran.verse")}
              </span>
            </div>
            <div className="text-right font-arabic text-base leading-relaxed text-foreground">
              {verse.text_arabic}
            </div>
            {verse.translations.tr && (
              <div className="text-sm leading-relaxed text-muted-foreground border-t pt-2">
                <span className="text-xs font-medium text-muted-foreground/80 block mb-1">
                  Diyanet İşleri Başkanlığı Meali
                </span>
                {verse.translations.tr}
              </div>
            )}
          </div>
        </DialogHeader>

        <div className="grid gap-4 py-4">
          <div className="space-y-2">
            <Label htmlFor="note" className="text-sm font-medium">
              {t("notes.personalNote")}
            </Label>
            <Textarea
              id="note"
              placeholder={t("notes.placeholder")}
              value={note}
              onChange={(e) => setNote(e.target.value)}
              className="min-h-[120px] resize-none"
              maxLength={1000}
            />
            <div className="flex justify-between text-xs text-muted-foreground">
              <span>
                {t("notes.maxLength")}: 1000 {t("notes.characters")}
              </span>
              <span>{note.length}/1000</span>
            </div>
          </div>
        </div>

        <DialogFooter className="flex justify-between sm:justify-between">
          <div>
            {existingNote && (
              <Button
                variant="outline"
                size="sm"
                onClick={handleDelete}
                disabled={isLoading}
                className="flex items-center space-x-2 border-red-200 text-red-600 hover:bg-red-50 hover:border-red-300 hover:text-red-700 dark:border-red-800 dark:text-red-400 dark:hover:bg-red-950 dark:hover:border-red-700 dark:hover:text-red-300"
              >
                <Trash2 className="h-4 w-4" />
                <span>{t("notes.delete")}</span>
              </Button>
            )}
          </div>

          <div className="flex space-x-2">
            <Button
              variant="outline"
              onClick={() => handleOpenChange(false)}
              disabled={isLoading}
            >
              {t("common.cancel")}
            </Button>
            <Button onClick={handleSave} disabled={isLoading}>
              {isLoading
                ? t("common.saving")
                : !isBookmarked(verse.id) && !note.trim()
                ? t("quran.bookmark")
                : t("common.save")}
            </Button>
          </div>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
