import {
  apiClient,
  transformChapterToSurah,
  ChaptersResponse,
} from "./api-client";
import type {
  Surah,
  Verse,
  DIBPageResponse,
  DIBVerse,
  DIBSurahResponse,
  DIBSurahVerse,
} from "@/types/quran";

type TranslationLanguage = "tr" | "en" | "es";

const LANGUAGE_ID_BY_CODE: Partial<Record<TranslationLanguage, number>> = {
  en: 8,
  es: 12,
};

function toTranslationLanguage(code: string): TranslationLanguage {
  return code === "en" || code === "es" ? code : "tr";
}

function buildTranslations(text: string, lang: TranslationLanguage): Verse["translations"] {
  return {
    tr: lang === "tr" ? text : "",
    en: lang === "en" ? text : "",
    es: lang === "es" ? text : "",
  };
}

// DIB API returns a single translation per request.
function transformDIBVerseToVerse(dibVerse: DIBVerse, requestedLanguage: TranslationLanguage): Verse {
  return {
    id: `${dibVerse.surah_id}:${dibVerse.verse_id_in_surah}`,
    surah_id: dibVerse.surah_id,
    verse_number: dibVerse.verse_id_in_surah,
    text_arabic: dibVerse.arabic_script.text,
    translations: buildTranslations(dibVerse.translation.text, requestedLanguage),
    audio_url: `/audio/${dibVerse.surah_id
      .toString()
      .padStart(3, "0")}_${dibVerse.verse_id_in_surah
        .toString()
        .padStart(3, "0")}.mp3`,
  };
}

// Helper function to transform DIB surah verse to our internal format
function transformDIBSurahVerseToVerse(
  dibVerse: DIBSurahVerse,
  requestedLanguage: TranslationLanguage
): Verse {
  return {
    id: `${dibVerse.surah_id}:${dibVerse.verse_id_in_surah}`,
    surah_id: dibVerse.surah_id,
    verse_number: dibVerse.verse_id_in_surah,
    text_arabic: dibVerse.arabic_script.text,
    translations: buildTranslations(dibVerse.translation.text, requestedLanguage),
    audio_url: `/audio/${dibVerse.surah_id
      .toString()
      .padStart(3, "0")}_${dibVerse.verse_id_in_surah
        .toString()
        .padStart(3, "0")}.mp3`,
  };
}

export async function getPageData(pageNumber: number, language: string = "tr") {
  const lang = toTranslationLanguage(language);
  const languageId = LANGUAGE_ID_BY_CODE[lang];
  const endpoint = languageId
    ? `/quran/pages/${pageNumber}?language_id=${languageId}`
    : `/quran/pages/${pageNumber}`;

  const response = await apiClient.get<DIBPageResponse>(endpoint);

  // Remove duplicates based on unique verse identifier to ensure unique keys
  const uniqueVerses = response.data.filter(
    (verse, index, self) =>
      index ===
      self.findIndex(
        (v) =>
          v.surah_id === verse.surah_id &&
          v.verse_id_in_surah === verse.verse_id_in_surah
      )
  );

  return {
    page_number: response.meta.requested_page,
    verses: uniqueVerses.map((verse) => transformDIBVerseToVerse(verse, lang)),
  };
}

export async function getSurahData(surahId: number, language: string = "tr") {
  const lang = toTranslationLanguage(language);
  const languageId = LANGUAGE_ID_BY_CODE[lang];
  const endpoint = languageId
    ? `/quran/surah/${surahId}?language_id=${languageId}`
    : `/quran/surah/${surahId}`;

  const response = await apiClient.get<DIBSurahResponse>(endpoint);

  // Get surah info from the list
  const surahs = await getSurahList();
  const surah = surahs.find((s) => s.id === surahId);

  if (!surah) {
    throw new Error("Surah not found");
  }

  // Remove duplicates based on verse_id_in_surah to ensure unique keys
  const uniqueVerses = response.data.filter(
    (verse, index, self) =>
      index ===
      self.findIndex((v) => v.verse_id_in_surah === verse.verse_id_in_surah)
  );

  return {
    surah,
    verses: uniqueVerses.map((verse) => transformDIBSurahVerseToVerse(verse, lang)),
  };
}

export async function getSurahList(): Promise<Surah[]> {
  const response = await apiClient.get<ChaptersResponse>("/quran/chapters");
  // Transform the API response to our internal format
  return response.data.map(transformChapterToSurah);
}

export async function searchVerses(query: string) {
  // TODO: Implement real API call for verse search when endpoint is available
  throw new Error("searchVerses: Real API endpoint not implemented yet");
}
