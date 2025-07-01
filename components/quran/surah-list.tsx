"use client"

import { useState } from "react"
import { useQuery } from "@tanstack/react-query"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Search, BookOpen, MapPin } from "lucide-react"
import Link from "next/link"
import { getSurahList } from "@/services/quran-api"
import { LoadingSpinner } from "@/components/ui/loading-spinner"
import { useLanguage } from "@/components/language-provider"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog"

export function SurahList() {
  const [searchQuery, setSearchQuery] = useState("")
  const [modalSurah, setModalSurah] = useState(null)
  const { t, language } = useLanguage()

  const {
    data: surahs,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["surahs"],
    queryFn: getSurahList,
  })

  if (isLoading) {
    return (
      <div className="flex justify-center items-center py-20">
        <LoadingSpinner />
        <span className="ml-2 text-muted-foreground">{t("quran.loading")}</span>
      </div>
    )
  }

  if (error || !surahs) {
    return (
      <Card className="max-w-2xl mx-auto bg-card border-accent/20">
        <CardContent className="text-center py-8">
          <p className="text-destructive">{t("quran.error")}</p>
        </CardContent>
      </Card>
    )
  }

  // Filter surahs based on search query
  const filteredSurahs = surahs.filter((surah) => {
    const searchLower = searchQuery.toLowerCase()
    const nameInLanguage = language === "tr" ? surah.names.tr : surah.names.en
    const nameArabic = surah.names.arabic
    const description = language === "tr" ? surah.description.tr : surah.description.en
    
    return (
      nameInLanguage.toLowerCase().includes(searchLower) ||
      nameArabic.toLowerCase().includes(searchLower) ||
      surah.id.toString().includes(searchQuery) ||
      description.toLowerCase().includes(searchLower)
    )
  })

  return (
    <div className="max-w-6xl mx-auto space-y-8">
      {/* Header */}
      <div className="text-center space-y-4">
        <h1 className="text-4xl font-bold tracking-tight text-foreground">{t("surahs.title")}</h1>
        <p className="text-xl text-muted-foreground max-w-2xl mx-auto">{t("surahs.subtitle")}</p>
      </div>

      {/* Search */}
      <div className="relative max-w-md mx-auto">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
        <Input
          placeholder={t("surahs.searchPlaceholder")}
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="pl-10 bg-card border-accent/20 focus:border-accent"
        />
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <Card className="text-center bg-card/80 border-accent/20">
          <CardContent className="pt-6">
            <div className="text-3xl font-bold text-accent mb-2">114</div>
            <div className="text-sm text-muted-foreground">{t("surahs.totalSurahs")}</div>
          </CardContent>
        </Card>
        <Card className="text-center bg-card/80 border-accent/20">
          <CardContent className="pt-6">
            <div className="text-3xl font-bold text-accent mb-2">{filteredSurahs.length}</div>
            <div className="text-sm text-muted-foreground">{t("surahs.showing")}</div>
          </CardContent>
        </Card>
        <Card className="text-center bg-card/80 border-accent/20">
          <CardContent className="pt-6">
            <div className="text-3xl font-bold text-accent mb-2">
              {filteredSurahs.reduce((total, surah) => total + surah.verses_count, 0)}
            </div>
            <div className="text-sm text-muted-foreground">{t("surahs.totalVerses")}</div>
          </CardContent>
        </Card>
      </div>

      {/* Surah Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredSurahs.map((surah) => (
          <Card
            key={surah.id}
            onClick={() => setModalSurah(surah)}
            className="group transition-all duration-300 cursor-pointer border-l-4 border-l-accent/30 bg-card/80 border-accent/20 hover:border-accent/40 hover:shadow-2xl hover:scale-110"
          >
            <CardHeader className="pb-3">
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className="flex items-center space-x-3 mb-2">
                    <div className="w-10 h-10 rounded-full bg-accent/20 flex items-center justify-center border border-accent/30">
                      <span className="text-sm font-bold text-accent">{surah.id}</span>
                    </div>
                    <div className="flex-1">
                      <CardTitle className="text-lg text-card-foreground group-hover:text-accent transition-colors">
                        {language === "tr" ? surah.names.tr : surah.names.en}
                      </CardTitle>
                    </div>
                  </div>
                  <div className="text-right">
                    <h3 className="text-2xl font-arabic text-accent mb-1">{surah.names.arabic}</h3>
                  </div>
                </div>
              </div>
            </CardHeader>
            <CardContent className="pt-0">
              <div className="space-y-3">
                {/* Surah Info */}
                <div className="flex items-center justify-between text-sm text-muted-foreground">
                  <div className="flex items-center space-x-1">
                    <BookOpen className="h-4 w-4" />
                    <span>
                      {surah.verses_count} {t("quran.verses")}
                    </span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <MapPin className="h-4 w-4" />
                    <span>{surah.revelation_place === "mecca" ? t("surahs.mecca") : t("surahs.medina")}</span>
                  </div>
                </div>

                {/* Description - Show more on hover */}
                <div className="relative">
                  <p className="text-sm text-muted-foreground line-clamp-2 group-hover:line-clamp-none transition-all duration-300">
                    {language === "tr" ? surah.description.tr : surah.description.en}
                  </p>
                  <div className="absolute bottom-0 right-0 bg-gradient-to-l from-card to-transparent w-8 h-6 group-hover:hidden transition-all duration-300"></div>
                </div>

                {/* Read Button */}
                <Button
                  variant="outline"
                  size="sm"
                  className="w-full group-hover:bg-accent group-hover:text-accent-foreground border-accent/30 hover:border-accent transition-all duration-300"
                >
                  <BookOpen className="h-4 w-4 mr-2" />
                  {t("surahs.readSurahDetails")}
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
        {/* Modal */}
        <Dialog open={!!modalSurah} onOpenChange={() => setModalSurah(null)}>
          <DialogContent>
            {modalSurah && (
              <>
                <DialogHeader>
                  <DialogTitle>{language === "tr" ? modalSurah.names.tr : modalSurah.names.en}</DialogTitle>
                </DialogHeader>
                <div className="text-center my-4">
                  <h3 className="text-2xl font-arabic text-accent mb-2">{modalSurah.names.arabic}</h3>
                  <p className="text-muted-foreground mb-2">{language === "tr" ? modalSurah.description.tr : modalSurah.description.en}</p>
                  <div className="flex items-center justify-center space-x-4 mb-2">
                    <span>{modalSurah.verses_count} {t("quran.verses")}</span>
                    <span>•</span>
                    <span>{modalSurah.revelation_place === "mecca" ? t("surahs.mecca") : t("surahs.medina")}</span>
                  </div>
                </div>
                <DialogFooter>
                  <Button asChild>
                    <Link href={`/quran/surah/${modalSurah.id}`}>{t("surahs.readSurah")}</Link>
                  </Button>
                </DialogFooter>
              </>
            )}
          </DialogContent>
        </Dialog>
      </div>

      {/* No results */}
      {filteredSurahs.length === 0 && searchQuery && (
        <Card className="max-w-md mx-auto bg-card border-accent/20">
          <CardContent className="text-center py-8">
            <Search className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
            <h3 className="text-lg font-semibold mb-2 text-card-foreground">{t("surahs.noResults")}</h3>
            <p className="text-muted-foreground">{t("surahs.noResultsDesc")}</p>
            <Button variant="outline" className="mt-4 border-accent/30" onClick={() => setSearchQuery("")}>
              {t("surahs.clearSearch")}
            </Button>
          </CardContent>
        </Card>
      )}
    </div>
  )
}
