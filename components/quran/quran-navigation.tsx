"use client"

import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { ChevronLeft, ChevronRight, List } from "lucide-react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { useLanguage } from "@/components/language-provider"

interface QuranNavigationProps {
  currentPage: number
}

export function QuranNavigation({ currentPage }: QuranNavigationProps) {
  const router = useRouter()
  const { t } = useLanguage()

  const handlePageChange = (page: string) => {
    router.push(`/quran/page/${page}`)
  }

  return (
    <div className="max-w-4xl mx-auto px-4 flex flex-col sm:flex-row items-center justify-between gap-4 mb-8">
      <div className="flex items-center space-x-4">
        <Button asChild variant="outline" size="sm" className="border-2 border-border">
          <Link href="/quran/surahs">
            <List className="h-4 w-4 mr-2" />
            {t("quran.browseSurahs")}
          </Link>
        </Button>

        <Select value={currentPage.toString()} onValueChange={handlePageChange}>
          <SelectTrigger className="w-32">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            {Array.from({ length: 604 }, (_, i) => i + 1).map((page) => (
              <SelectItem key={page} value={page.toString()}>
                {t("quran.page")} {page}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <div className="flex items-center space-x-2">
        <Button asChild variant="outline" size="sm" disabled={currentPage <= 1} className="border-2 border-border">
          <Link href={`/quran/page/${currentPage - 1}`}>
            <ChevronLeft className="h-4 w-4" />
            {t("quran.previous")}
          </Link>
        </Button>

        <span className="text-sm text-muted-foreground px-4">
          {currentPage} {t("quran.of")} 604
        </span>

        <Button asChild variant="outline" size="sm" disabled={currentPage >= 604} className="border-2 border-border">
          <Link href={`/quran/page/${currentPage + 1}`}>
            {t("quran.next")}
            <ChevronRight className="h-4 w-4" />
          </Link>
        </Button>
      </div>
    </div>
  )
}
