import { create } from "zustand"
import { persist } from "zustand/middleware"

interface QuranState {
  currentTranslation: string
  bookmarks: string[]
  readingProgress: Record<string, number>
  lastReadPage: number
  setTranslation: (translation: string) => void
  toggleBookmark: (id: string) => void
  updateProgress: (pageId: string, progress: number) => void
  setLastReadPage: (page: number) => void
}

export const useQuranStore = create<QuranState>()(
  persist(
    (set, get) => ({
      currentTranslation: "tr",
      bookmarks: [],
      readingProgress: {},
      lastReadPage: 1,

      setTranslation: (translation) => set({ currentTranslation: translation }),

      toggleBookmark: (id) =>
        set((state) => ({
          bookmarks: state.bookmarks.includes(id)
            ? state.bookmarks.filter((bookmark) => bookmark !== id)
            : [...state.bookmarks, id],
        })),

      updateProgress: (pageId, progress) =>
        set((state) => ({
          readingProgress: {
            ...state.readingProgress,
            [pageId]: progress,
          },
        })),

      setLastReadPage: (page) => set({ lastReadPage: page }),
    }),
    {
      name: "quran-storage",
    },
  ),
)
