import { create } from "zustand";
import { persist } from "zustand/middleware";

export interface BookmarkWithNote {
  id: string;
  note?: string;
  createdAt: string;
  updatedAt: string;
}

interface QuranState {
  currentTranslation: string;
  bookmarks: BookmarkWithNote[];
  readingProgress: Record<string, number>;
  lastReadPage: number;
  setTranslation: (translation: string) => void;
  toggleBookmark: (id: string) => void;
  addOrUpdateBookmarkNote: (id: string, note: string) => void;
  removeBookmarkNote: (id: string) => void;
  updateProgress: (pageId: string, progress: number) => void;
  setLastReadPage: (page: number) => void;
  isBookmarked: (id: string) => boolean;
  getBookmarkNote: (id: string) => string | undefined;
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
        set((state) => {
          const existingBookmark = state.bookmarks.find(
            (bookmark) => bookmark.id === id
          );
          const now = new Date().toISOString();

          if (existingBookmark) {
            // Remove bookmark
            return {
              bookmarks: state.bookmarks.filter(
                (bookmark) => bookmark.id !== id
              ),
            };
          } else {
            // Add bookmark
            return {
              bookmarks: [
                ...state.bookmarks,
                {
                  id,
                  createdAt: now,
                  updatedAt: now,
                },
              ],
            };
          }
        }),

      addOrUpdateBookmarkNote: (id, note) =>
        set((state) => {
          const existingBookmarkIndex = state.bookmarks.findIndex(
            (bookmark) => bookmark.id === id
          );
          const now = new Date().toISOString();

          if (existingBookmarkIndex >= 0) {
            // Update existing bookmark note
            const updatedBookmarks = [...state.bookmarks];
            updatedBookmarks[existingBookmarkIndex] = {
              ...updatedBookmarks[existingBookmarkIndex],
              note: note.trim() || undefined,
              updatedAt: now,
            };
            return { bookmarks: updatedBookmarks };
          } else {
            // Create new bookmark with note
            return {
              bookmarks: [
                ...state.bookmarks,
                {
                  id,
                  note: note.trim() || undefined,
                  createdAt: now,
                  updatedAt: now,
                },
              ],
            };
          }
        }),

      removeBookmarkNote: (id) =>
        set((state) => {
          const existingBookmarkIndex = state.bookmarks.findIndex(
            (bookmark) => bookmark.id === id
          );

          if (existingBookmarkIndex >= 0) {
            const updatedBookmarks = [...state.bookmarks];
            updatedBookmarks[existingBookmarkIndex] = {
              ...updatedBookmarks[existingBookmarkIndex],
              note: undefined,
              updatedAt: new Date().toISOString(),
            };
            return { bookmarks: updatedBookmarks };
          }
          return state;
        }),

      updateProgress: (pageId, progress) =>
        set((state) => ({
          readingProgress: {
            ...state.readingProgress,
            [pageId]: progress,
          },
        })),

      setLastReadPage: (page) => set({ lastReadPage: page }),

      isBookmarked: (id) => {
        const state = get();
        return state.bookmarks.some((bookmark) => bookmark.id === id);
      },

      getBookmarkNote: (id) => {
        const state = get();
        const bookmark = state.bookmarks.find((bookmark) => bookmark.id === id);
        return bookmark?.note;
      },
    }),
    {
      name: "quran-storage",
    }
  )
);
