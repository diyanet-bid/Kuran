import type { DIBApiResponse, DIBChaptersResponse } from '@/types/quran'

// API Client for DIB Quran API - Using Next.js API routes to avoid CORS
class ApiClient {
  private async request<T>(
    endpoint: string,
    options: RequestInit = {}
  ): Promise<T> {
    const url = `/api${endpoint}`
    
    const defaultHeaders = {
      'Content-Type': 'application/json',
    }

    const config: RequestInit = {
      ...options,
      headers: {
        ...defaultHeaders,
        ...options.headers,
      },
    }

    // Debug: Log request details
    console.log('API Request:', {
      url,
      method: config.method || 'GET',
      headers: config.headers,
    })

    try {
      const response = await fetch(url, config)
      
      // Debug: Log response details
      console.log('API Response:', {
        status: response.status,
        statusText: response.statusText,
        ok: response.ok,
        headers: Object.fromEntries(response.headers.entries())
      })
      
      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}))
        console.error('API Error Response:', errorData)
        throw new Error(
          errorData.error || errorData.message || `HTTP error! status: ${response.status}`
        )
      }

      const data = await response.json()
      console.log('API Success Response:', data)
      return data
    } catch (error) {
      console.error('API Request Failed:', error)
      if (error instanceof Error) {
        throw new Error(`API request failed: ${error.message}`)
      }
      throw new Error('API request failed: Unknown error')
    }
  }

  async get<T>(endpoint: string): Promise<T> {
    return this.request<T>(endpoint, {
      method: 'GET',
    })
  }

  async post<T>(endpoint: string, data?: any): Promise<T> {
    return this.request<T>(endpoint, {
      method: 'POST',
      body: data ? JSON.stringify(data) : undefined,
    })
  }

  async put<T>(endpoint: string, data?: any): Promise<T> {
    return this.request<T>(endpoint, {
      method: 'PUT',
      body: data ? JSON.stringify(data) : undefined,
    })
  }

  async delete<T>(endpoint: string): Promise<T> {
    return this.request<T>(endpoint, {
      method: 'DELETE',
    })
  }
}

// Export singleton instance
export const apiClient = new ApiClient()

// Export types for API responses
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

export interface ChaptersResponse extends DIBApiResponse<DIBChapter[]> {}

// Helper function to transform DIB API response to our internal format
export function transformChapterToSurah(dibChapter: DIBChapter) {
  // Helper function to strip HTML tags
  const stripHtml = (html: string): string => {
    if (!html) return ''
    return html.replace(/<[^>]*>/g, '')
  }

  return {
    id: dibChapter.SureId,
    names: {
      arabic: dibChapter.SureNameArabic,
      tr: dibChapter.SureNameTurkish,
      en: dibChapter.SureNameTurkish, // We'll use Turkish as English for now
    },
    verses_count: dibChapter.AyetCount,
    revelation_place: dibChapter.InisOrder <= 86 ? "mecca" : "medina" as "mecca" | "medina",
    description: {
      tr: stripHtml(dibChapter.MealInfo) || `${dibChapter.SureNameTurkish} suresi hakkında bilgi`,
      en: stripHtml(dibChapter.MealInfo) || `Information about ${dibChapter.SureNameTurkish} surah`,
    },
  }
} 