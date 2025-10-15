"use client";

import { useQuranStore } from "@/stores/quran-store";
import { useLanguage } from "@/components/language-provider";
import { useSurahName } from "@/hooks/use-surah-name";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import {
  BookmarkCheck,
  StickyNote,
  Edit3,
  Trash2,
  BookOpen,
} from "lucide-react";
import { useState } from "react";
import Link from "next/link";
import { toast } from "@/hooks/use-toast";
import { Separator } from "@/components/ui/separator";
import { VerseNoteDialog } from "@/components/quran/verse-note-dialog";

export default function BookmarksPage() {
  const { bookmarks, removeBookmarkNote, toggleBookmark } = useQuranStore();
  const { t, language } = useLanguage();
  const { getSurahName } = useSurahName();

  const [expandedNotes, setExpandedNotes] = useState<Set<string>>(new Set());
  const [editingNote, setEditingNote] = useState<{
    id: string;
    surahId: number;
    verseNumber: number;
    textArabic: string;
    translationTr: string;
  } | null>(null);

  const toggleNoteExpansion = (verseId: string) => {
    const newExpanded = new Set(expandedNotes);
    if (newExpanded.has(verseId)) {
      newExpanded.delete(verseId);
    } else {
      newExpanded.add(verseId);
    }
    setExpandedNotes(newExpanded);
  };

  const handleRemoveBookmark = (verseId: string) => {
    toggleBookmark(verseId);
    toast({
      title: t("bookmarks.removed"),
      description: t("bookmarks.removedDescription"),
    });
  };

  const handleRemoveNote = (verseId: string) => {
    removeBookmarkNote(verseId);
    toast({
      title: t("notes.removed"),
      description: t("notes.removedDescription"),
    });
  };

  const handleEditNote = async (verseId: string) => {
    const { surahId, verseNumber } = getVerseInfo(verseId);

    try {
      // API'den ayet metnini al
      const response = await fetch(`/api/quran/surah/${surahId}`);
      if (response.ok) {
        const data = await response.json();
        const verse = data.data.find(
          (v: any) => v.verse_id_in_surah === verseNumber
        );

        setEditingNote({
          id: verseId,
          surahId,
          verseNumber,
          textArabic:
            verse?.arabic_script?.text ||
            "اَلْحَمْدُ لِلّٰهِ رَبِّ الْعَالَمٖينَ", // Fallback text
          translationTr:
            verse?.translation?.text ||
            "Hamd, âlemlerin Rabbi olan Allah'a mahsustur.", // Fallback translation
        });
      } else {
        // API hatası durumunda fallback
        setEditingNote({
          id: verseId,
          surahId,
          verseNumber,
          textArabic: "اَلْحَمْدُ لِلّٰهِ رَبِّ الْعَالَمٖينَ", // Fallback Arabic text
          translationTr: "Hamd, âlemlerin Rabbi olan Allah'a mahsustur.", // Fallback translation
        });
      }
    } catch (error) {
      // Hata durumunda fallback
      setEditingNote({
        id: verseId,
        surahId,
        verseNumber,
        textArabic: "اَلْحَمْدُ لِلّٰهِ رَبِّ الْعَالَمٖينَ", // Fallback Arabic text
        translationTr: "Hamd, âlemlerin Rabbi olan Allah'a mahsustur.", // Fallback translation
      });
    }
  };

  const getVerseInfo = (verseId: string) => {
    const [surahId, verseNumber] = verseId.split(":").map(Number);
    return { surahId, verseNumber };
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("tr-TR", {
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  const sortedBookmarks = [...bookmarks].sort(
    (a, b) => new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime()
  );

  const bookmarksWithNotes = sortedBookmarks.filter(
    (bookmark) => bookmark.note
  );
  const bookmarksWithoutNotes = sortedBookmarks.filter(
    (bookmark) => !bookmark.note
  );

  return (
    <div className="min-h-screen bg-background">
      <Header />

      <main className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-foreground mb-2">
            {t("bookmarks.title")}
          </h1>
          <p className="text-muted-foreground">{t("bookmarks.description")}</p>
        </div>

        {bookmarks.length === 0 ? (
          <Card className="text-center py-12">
            <CardContent>
              <BookOpen className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
              <h3 className="text-xl font-semibold mb-2">
                {t("bookmarks.empty.title")}
              </h3>
              <p className="text-muted-foreground mb-6">
                {t("bookmarks.empty.description")}
              </p>
              <Button asChild>
                <Link href="/quran">{t("bookmarks.empty.startReading")}</Link>
              </Button>
            </CardContent>
          </Card>
        ) : (
          <div className="space-y-8">
            {/* Notlu Ayetler */}
            {bookmarksWithNotes.length > 0 && (
              <div>
                <div className="flex items-center space-x-2 mb-4">
                  <StickyNote className="h-5 w-5 text-accent" />
                  <h2 className="text-xl font-semibold">
                    {t("bookmarks.withNotes")} ({bookmarksWithNotes.length})
                  </h2>
                </div>

                <div className="grid gap-4">
                  {bookmarksWithNotes.map((bookmark) => {
                    const { surahId, verseNumber } = getVerseInfo(bookmark.id);
                    const isExpanded = expandedNotes.has(bookmark.id);
                    const notePreview =
                      bookmark.note?.substring(0, 150) +
                      (bookmark.note && bookmark.note.length > 150
                        ? "..."
                        : "");

                    return (
                      <Card
                        key={bookmark.id}
                        className="border-l-4 border-l-accent"
                      >
                        <CardHeader className="pb-3">
                          <div className="flex items-center justify-between">
                            <CardTitle className="text-lg flex items-center space-x-2">
                              <BookmarkCheck className="h-5 w-5 text-primary" />
                              <span>
                                {getSurahName(surahId)}, {verseNumber}.{" "}
                                {t("quran.verse")}
                              </span>
                            </CardTitle>

                            <div className="flex items-center space-x-1">
                              <Button
                                variant="ghost"
                                size="sm"
                                onClick={() => handleEditNote(bookmark.id)}
                                className="text-muted-foreground hover:text-white hover:bg-primary/20"
                              >
                                <Edit3 className="h-4 w-4" />
                              </Button>
                              <Button
                                variant="ghost"
                                size="sm"
                                onClick={() =>
                                  handleRemoveBookmark(bookmark.id)
                                }
                                className="text-muted-foreground hover:text-white hover:bg-destructive/20"
                              >
                                <Trash2 className="h-4 w-4" />
                              </Button>
                            </div>
                          </div>
                        </CardHeader>

                        <CardContent className="pt-0">
                          <div className="space-y-3">
                            <div className="bg-accent/10 border border-accent/20 rounded-lg p-3">
                              <div className="flex items-start space-x-2">
                                <StickyNote className="h-4 w-4 text-accent mt-0.5 flex-shrink-0" />
                                <div className="flex-1">
                                  <div className="text-sm font-medium text-accent mb-1">
                                    {t("notes.personalNote")}
                                  </div>
                                  <div className="text-sm text-muted-foreground whitespace-pre-wrap">
                                    {isExpanded ? bookmark.note : notePreview}
                                  </div>
                                  {bookmark.note &&
                                    bookmark.note.length > 150 && (
                                      <Button
                                        variant="link"
                                        size="sm"
                                        onClick={() =>
                                          toggleNoteExpansion(bookmark.id)
                                        }
                                        className="p-0 h-auto text-accent hover:text-accent/80"
                                      >
                                        {isExpanded
                                          ? t("notes.showLess")
                                          : t("notes.showMore")}
                                      </Button>
                                    )}
                                </div>
                              </div>
                            </div>

                            <div className="flex items-center justify-between text-xs text-muted-foreground">
                              <span>
                                {t("bookmarks.addedOn")}:{" "}
                                {formatDate(bookmark.createdAt)}
                              </span>
                              {bookmark.updatedAt !== bookmark.createdAt && (
                                <span>
                                  {t("bookmarks.lastUpdated")}:{" "}
                                  {formatDate(bookmark.updatedAt)}
                                </span>
                              )}
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    );
                  })}
                </div>
              </div>
            )}

            {/* Ayırıcı */}
            {bookmarksWithNotes.length > 0 &&
              bookmarksWithoutNotes.length > 0 && <Separator />}

            {/* Notsuz Ayetler */}
            {bookmarksWithoutNotes.length > 0 && (
              <div>
                <div className="flex items-center space-x-2 mb-4">
                  <BookmarkCheck className="h-5 w-5 text-primary" />
                  <h2 className="text-xl font-semibold">
                    {t("bookmarks.withoutNotes")} (
                    {bookmarksWithoutNotes.length})
                  </h2>
                </div>

                <div className="grid gap-3">
                  {bookmarksWithoutNotes.map((bookmark) => {
                    const { surahId, verseNumber } = getVerseInfo(bookmark.id);

                    return (
                      <Card
                        key={bookmark.id}
                        className="border-l-4 border-l-primary/20"
                      >
                        <CardContent className="py-4">
                          <div className="flex items-center justify-between">
                            <div className="flex items-center space-x-2">
                              <BookmarkCheck className="h-4 w-4 text-primary" />
                              <span className="font-medium">
                                {getSurahName(surahId)}, {verseNumber}.{" "}
                                {t("quran.verse")}
                              </span>
                            </div>

                            <div className="flex items-center space-x-1">
                              <Button
                                variant="ghost"
                                size="sm"
                                onClick={() =>
                                  handleRemoveBookmark(bookmark.id)
                                }
                                className="text-muted-foreground hover:text-white hover:bg-destructive/20"
                              >
                                <Trash2 className="h-4 w-4" />
                              </Button>
                            </div>
                          </div>

                          <div className="mt-2 text-xs text-muted-foreground">
                            {t("bookmarks.addedOn")}:{" "}
                            {formatDate(bookmark.createdAt)}
                          </div>
                        </CardContent>
                      </Card>
                    );
                  })}
                </div>
              </div>
            )}
          </div>
        )}
      </main>

      <Footer />

      {/* Note Edit Dialog */}
      {editingNote && (
        <VerseNoteDialog
          verse={{
            id: editingNote.id,
            surah_id: editingNote.surahId,
            verse_number: editingNote.verseNumber,
            text_arabic: editingNote.textArabic,
            translations: { tr: editingNote.translationTr, en: "" },
            audio_url: "",
          }}
          isOpen={true}
          onClose={() => setEditingNote(null)}
        />
      )}
    </div>
  );
}
