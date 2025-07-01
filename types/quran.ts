export interface Verse {
  id: string
  surah_id: number
  verse_number: number
  text_arabic: string
  translations: {
    tr: string
    en: string
  }
  audio_url: string
}

export interface Surah {
  id: number
  names: {
    arabic: string
    tr: string
    en: string
  }
  verses_count: number
  revelation_place: "mecca" | "medina"
  description: {
    tr: string
    en: string
  }
}

export interface Page {
  page_number: number
  verses: Verse[]
}

export interface SurahData {
  surah: Surah
  verses: Verse[]
}

export interface PageData {
  page_number: number
  verses: Verse[]
}

// DIB API Response Types
export interface DIBChapter {
  SureId: number
  SureNameTurkish: string
  SureNameArabic: string
  BesmeleVisible: boolean
  InisOrder: number
  AyetCount: number
  Cuz: number
  FirstPage: number
  MealInfo: string
  HeaderOnBackPage: boolean
}

export interface DIBApiResponse<T> {
  data: T
  meta: {
    requested_language: string
  }
}

export interface DIBChaptersResponse extends DIBApiResponse<DIBChapter[]> {}

// DIB Page API Response Types
export interface DIBVerse {
  page_number: number
  surah_id: number
  verse_id_in_surah: number
  translation: {
    language_id: number
    text: string
  }
  arabic_script: {
    text_group_id: number
    text_group_name: string
    text: string
  }
}

export interface DIBPageResponse {
  data: DIBVerse[]
  meta: {
    requested_page: number
    requested_translation_language_id: number
    requested_arabic_text_group_id: number | null
  }
}

// DIB Surah API Response Types
export interface DIBSurahVerse {
  page_number: number
  surah_id: number
  verse_id_in_surah: number
  translation: {
    text: string
  }
  arabic_script: {
    text_font_id: number
    text: string
  }
}

export interface DIBSurahResponse {
  data: DIBSurahVerse[]
}
