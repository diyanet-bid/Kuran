import { apiClient, transformChapterToSurah, ChaptersResponse } from './api-client'
import type { Surah, Verse, DIBPageResponse, DIBVerse, DIBSurahResponse, DIBSurahVerse } from '@/types/quran'

// Helper function to transform DIB verse to our internal format
function transformDIBVerseToVerse(dibVerse: DIBVerse): Verse {
  return {
    id: `${dibVerse.surah_id}:${dibVerse.verse_id_in_surah}`,
    surah_id: dibVerse.surah_id,
    verse_number: dibVerse.verse_id_in_surah,
    text_arabic: dibVerse.arabic_script.text,
    translations: {
      tr: dibVerse.translation.text, // Assuming Turkish translation
      en: dibVerse.translation.text, // For now using same text
    },
    audio_url: `/audio/${dibVerse.surah_id.toString().padStart(3, '0')}_${dibVerse.verse_id_in_surah.toString().padStart(3, '0')}.mp3`,
  }
}

// Helper function to transform DIB surah verse to our internal format
function transformDIBSurahVerseToVerse(dibVerse: DIBSurahVerse): Verse {
  return {
    id: `${dibVerse.surah_id}:${dibVerse.verse_id_in_surah}`,
    surah_id: dibVerse.surah_id,
    verse_number: dibVerse.verse_id_in_surah,
    text_arabic: dibVerse.arabic_script.text,
    translations: {
      tr: dibVerse.translation.text, // Assuming Turkish translation
      en: dibVerse.translation.text, // For now using same text
    },
    audio_url: `/audio/${dibVerse.surah_id.toString().padStart(3, '0')}_${dibVerse.verse_id_in_surah.toString().padStart(3, '0')}.mp3`,
  }
}

export async function getPageData(pageNumber: number) {
  // Fetch from real API
  const response = await apiClient.get<DIBPageResponse>(`/quran/pages/${pageNumber}`)
  
  return {
    page_number: response.meta.requested_page,
    verses: response.data.map(transformDIBVerseToVerse),
  }
}

export async function getSurahData(surahId: number) {
  // Fetch from real API
  const response = await apiClient.get<DIBSurahResponse>(`/quran/surah/${surahId}`)
  
  // Get surah info from the list
  const surahs = await getSurahList()
  const surah = surahs.find(s => s.id === surahId)
  
  if (!surah) {
    throw new Error("Surah not found")
  }

  return {
    surah,
    verses: response.data.map(transformDIBSurahVerseToVerse),
  }
}

export async function getSurahList(): Promise<Surah[]> {
  // Fetch from real API
  const response = await apiClient.get<ChaptersResponse>('/quran/chapters')
  // Transform the API response to our internal format
  return response.data.map(transformChapterToSurah)
}

export async function searchVerses(query: string) {
  // TODO: Implement real API call for verse search when endpoint is available
  throw new Error('searchVerses: Real API endpoint not implemented yet')
}
