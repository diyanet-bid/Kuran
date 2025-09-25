"use client"

import { useEffect, useMemo, useState } from "react"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { ChevronLeft, ChevronRight, List } from "lucide-react"
import Link from "next/link"
import { useRouter, useSearchParams } from "next/navigation"
import { useLanguage } from "@/components/language-provider"

interface QuranNavigationProps {
  currentPage: number
}

const cuzRanges = [
  { cuz: 1, start: 1, end: 21 },
  { cuz: 2, start: 22, end: 41 },
  { cuz: 3, start: 42, end: 61 },
  { cuz: 4, start: 62, end: 81 },
  { cuz: 5, start: 82, end: 101 },
  { cuz: 6, start: 102, end: 121 },
  { cuz: 7, start: 122, end: 141 },
  { cuz: 8, start: 142, end: 161 },
  { cuz: 9, start: 162, end: 181 },
  { cuz: 10, start: 182, end: 201 },
  { cuz: 11, start: 202, end: 221 },
  { cuz: 12, start: 222, end: 241 },
  { cuz: 13, start: 242, end: 261 },
  { cuz: 14, start: 262, end: 281 },
  { cuz: 15, start: 282, end: 301 },
  { cuz: 16, start: 302, end: 321 },
  { cuz: 17, start: 322, end: 341 },
  { cuz: 18, start: 342, end: 361 },
  { cuz: 19, start: 362, end: 381 },
  { cuz: 20, start: 382, end: 401 },
  { cuz: 21, start: 402, end: 421 },
  { cuz: 22, start: 422, end: 441 },
  { cuz: 23, start: 442, end: 461 },
  { cuz: 24, start: 462, end: 481 },
  { cuz: 25, start: 482, end: 501 },
  { cuz: 26, start: 502, end: 521 },
  { cuz: 27, start: 522, end: 541 },
  { cuz: 28, start: 542, end: 561 },
  { cuz: 29, start: 562, end: 581 },
  { cuz: 30, start: 582, end: 604 },
]

const allPages = Array.from({ length: 604 }, (_, index) => index + 1)

export function QuranNavigation({ currentPage }: QuranNavigationProps) {
  const router = useRouter()
  const searchParams = useSearchParams()
  const { t } = useLanguage()

  const [selectedCuz, setSelectedCuz] = useState<number | null>(null)
  const [pagesToShow, setPagesToShow] = useState<number[]>(allPages)

  useEffect(() => {
    const cuzParam = searchParams.get("cuz")
    const parsed = cuzParam ? Number.parseInt(cuzParam, 10) : NaN
    if (!Number.isNaN(parsed) && parsed >= 1 && parsed <= 30) {
      setSelectedCuz(parsed)
    } else {
      setSelectedCuz(null)
    }
  }, [searchParams])

  useEffect(() => {
    if (selectedCuz === null) {
      setPagesToShow(allPages)
      return
    }

    const range = cuzRanges.find((item) => item.cuz === selectedCuz)
    if (!range) {
      setPagesToShow(allPages)
      return
    }

    const list = Array.from({ length: range.end - range.start + 1 }, (_, index) => range.start + index)
    setPagesToShow(list)

    if (currentPage < range.start || currentPage > range.end) {
      router.replace(`/quran/page/${range.start}?cuz=${selectedCuz}`)
    }
  }, [selectedCuz, currentPage, router])

  const pageHref = (page: number) => (selectedCuz ? `/quran/page/${page}?cuz=${selectedCuz}` : `/quran/page/${page}`)

  const cuzOfCurrent = useMemo(() => {
    const range = cuzRanges.find((item) => currentPage >= item.start && currentPage <= item.end)
    return range?.cuz ?? null
  }, [currentPage])

  const handleCuzChange = (value: string) => {
    if (value === "all") {
      setSelectedCuz(null)
      router.replace(`/quran/page/${currentPage}`)
      return
    }

    const cuz = Number.parseInt(value, 10)
    if (Number.isNaN(cuz)) {
      return
    }

    setSelectedCuz(cuz)
    const range = cuzRanges.find((item) => item.cuz === cuz)
    const targetPage = range ? range.start : currentPage
    router.replace(`/quran/page/${targetPage}?cuz=${cuz}`)
  }

  const handlePageChange = (value: string) => {
    const page = Number.parseInt(value, 10)
    if (Number.isNaN(page)) {
      return
    }

    router.push(pageHref(page))
  }

  return (
    <div className="mx-auto mb-6 max-w-4xl px-2 sm:mb-8 sm:px-4">
      <div className="flex flex-wrap items-center gap-3 lg:flex-nowrap lg:items-stretch">
        <Button
          asChild
          variant="outline"
          size="sm"
          className="flex-none border-2 border-border"
        >
          <Link href="/quran/surahs">
            <List className="mr-2 h-4 w-4" />
            {t("quran.browseSurahs")}
          </Link>
        </Button>

        <Select value={selectedCuz !== null ? String(selectedCuz) : "all"} onValueChange={handleCuzChange}>
          <SelectTrigger className="flex-none min-w-[8.5rem] lg:w-40">
            <SelectValue>{selectedCuz !== null ? `Cüz ${selectedCuz}` : "Cüz Seç"}</SelectValue>
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">Cüz Seç</SelectItem>
            {cuzRanges.map((item) => (
              <SelectItem key={item.cuz} value={String(item.cuz)}>
                Cüz {item.cuz}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        <Select value={String(currentPage)} onValueChange={handlePageChange}>
          <SelectTrigger className="flex-none min-w-[8.5rem] lg:w-40">
            <SelectValue placeholder="Sayfa Seç" />
          </SelectTrigger>
          <SelectContent>
            {pagesToShow.map((page) => (
              <SelectItem key={page} value={String(page)}>
                {t("quran.page")} {page}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        <Button
          asChild
          variant="outline"
          size="sm"
          disabled={currentPage <= 1}
          className="flex-none border-2 border-border"
        >
          <Link href={pageHref(currentPage - 1)}>
            <ChevronLeft className="h-4 w-4" />
            <span className="ml-1 hidden xs:inline">{t("quran.previous")}</span>
          </Link>
        </Button>

        <div className="flex min-w-[12rem] flex-1 items-center justify-center whitespace-nowrap rounded-md border px-3 py-2 text-sm text-muted-foreground">
          {t("quran.page")} {currentPage} {t("quran.of")} 604
          {cuzOfCurrent ? ` | Cüz ${cuzOfCurrent}` : ""}
          {selectedCuz ? ` | (${pagesToShow.length} sayfa)` : ""}
        </div>

        <Button
          asChild
          variant="outline"
          size="sm"
          disabled={currentPage >= 604}
          className="flex-none border-2 border-border"
        >
          <Link href={pageHref(currentPage + 1)}>
            <span className="mr-1 hidden xs:inline">{t("quran.next")}</span>
            <ChevronRight className="h-4 w-4" />
          </Link>
        </Button>
      </div>
    </div>
  )
}
