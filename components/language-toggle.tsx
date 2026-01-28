"use client"

import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Languages } from "lucide-react"
import { useLanguage } from "@/components/language-provider"
import { useQuranStore } from "@/stores/quran-store"

export function LanguageToggle() {
  const { language, setLanguage } = useLanguage()
  const { setTranslation } = useQuranStore()

  const handleLanguageChange = (lang: string) => {
    setLanguage(lang)
    // Sync translation for supported locales.
    if (lang === "tr" || lang === "en" || lang === "es") {
      setTranslation(lang)
    }
  }

  return (
    <Select value={language} onValueChange={handleLanguageChange}>
      <SelectTrigger className="w-32">
        <Languages className="h-4 w-4 mr-2" />
        <SelectValue />
      </SelectTrigger>
      <SelectContent>
        <SelectItem value="tr">Türkçe</SelectItem>
        <SelectItem value="en">English</SelectItem>
        <SelectItem value="es">Español</SelectItem>
      </SelectContent>
    </Select>
  )
}
