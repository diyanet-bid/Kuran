"use client"

import { useState, useEffect, useMemo } from "react"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { ChevronLeft, ChevronRight, List } from "lucide-react"
import Link from "next/link"
import { useRouter, useSearchParams } from "next/navigation" // ✅ YENİ: URL'den ?cuz= okumak için
import { useLanguage } from "@/components/language-provider"

interface QuranNavigationProps {
  currentPage: number
}

// Cüz aralıkları
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
  { cuz: 30, start: 582, end: 604 }
]

// Tüm sayfalar
const allPages = Array.from({ length: 604 }, (_, i) => i + 1)

export function QuranNavigation({ currentPage }: QuranNavigationProps) {
  const router = useRouter()
  const searchParams = useSearchParams() // ✅ YENİ
  const { t } = useLanguage()

  // ✅ İlk yüklemede "Cüz Seç" (null) olacak; cüz seçilirse URL paramı üzerinden korunacak
  const [selectedCuz, setSelectedCuz] = useState<number | null>(null)

  // ✅ Gösterilecek sayfa listesi (cüz seçilirse aralık; aksi halde tüm sayfalar)
  const [pagesToShow, setPagesToShow] = useState<number[]>(allPages)

  // ✅ YENİ: URL'deki ?cuz paramını oku ve state'e yaz (route değişse bile seçim korunur)
  useEffect(() => {
    const cuzParam = searchParams.get("cuz")
    const num = cuzParam ? parseInt(cuzParam, 10) : NaN
    if (!isNaN(num) && num >= 1 && num <= 30) {
      setSelectedCuz(num)
    } else {
      setSelectedCuz(null) // param yoksa/bozuksa "Cüz Seç" modu
    }
  }, [searchParams])

  // ✅ selectedCuz'a göre sayfa listesini güncelle ve sayfa dışındaysa aralığın başına taşı
  useEffect(() => {
    if (selectedCuz === null) {
      // Cüz seçilmemiş → tüm sayfalar
      setPagesToShow(allPages)
      return
    }

    const range = cuzRanges.find(c => c.cuz === selectedCuz)
    if (!range) {
      setPagesToShow(allPages)
      return
    }

    const list = Array.from({ length: range.end - range.start + 1 }, (_, i) => range.start + i)
    setPagesToShow(list)

    // Eğer mevcut sayfa bu cüz aralığında değilse aralığın ilk sayfasına git
    if (currentPage < range.start || currentPage > range.end) {
      // ✅ YENİ: URL paramını koruyarak yönlendir
      router.replace(`/quran/page/${range.start}?cuz=${selectedCuz}`)
    }
  }, [selectedCuz, currentPage, router])

  // ✅ YARDIMCI: Seçili cüz varsa paramı URL'ye ekleyerek href üret
  const pageHref = (page: number) => {
    return selectedCuz ? `/quran/page/${page}?cuz=${selectedCuz}` : `/quran/page/${page}`
  }

  // ✅ YARDIMCI: O anki sayfanın gerçek cüz'ünü hesapla (bilgi göstermek için)
  const cuzOfCurrent = useMemo(() => {
    const found = cuzRanges.find(c => currentPage >= c.start && currentPage <= c.end)
    return found?.cuz ?? null
  }, [currentPage])

  // ✅ Cüz değişimi: "all" → paramı kaldır; sayı → paramı ekle ve ilgili cüzün başına git
  const handleCuzChange = (cuz: string) => {
    if (cuz === "all") {
      setSelectedCuz(null)
      // Paramı kaldır: aynı sayfada kal ama ?cuz'ü temizle
      router.replace(`/quran/page/${currentPage}`)
    } else {
      const cuzNum = parseInt(cuz, 10)
      if (!isNaN(cuzNum)) {
        setSelectedCuz(cuzNum)
        const range = cuzRanges.find(c => c.cuz === cuzNum)
        const target = range ? range.start : currentPage
        // Paramı ekleyerek git
        router.replace(`/quran/page/${target}?cuz=${cuzNum}`)
      }
    }
  }

  // ✅ Sayfa seçimi: varsa paramı koru
  const handlePageChange = (page: string) => {
    const p = parseInt(page, 10)
    if (isNaN(p)) return
    router.push(pageHref(p))
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

        {/* ✅ Dropdown: İlk açılışta "Cüz Seç", cüz seçilince "Cüz N" kalır */}
        <Select value={selectedCuz !== null ? String(selectedCuz) : "all"} onValueChange={handleCuzChange}>
          <SelectTrigger className="w-32">
            <SelectValue>{selectedCuz !== null ? `Cüz ${selectedCuz}` : "Cüz Seç"}</SelectValue>
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">Cüz Seç</SelectItem>
            {cuzRanges.map(c => (
              <SelectItem key={c.cuz} value={String(c.cuz)}>
                Cüz {c.cuz}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        {/* ✅ Sayfa listesi: cüz seçilmemişse tüm sayfalar, seçilmişse sadece aralık */}
        <Select value={String(currentPage)} onValueChange={handlePageChange}>
          <SelectTrigger className="w-32">
            <SelectValue placeholder="Sayfa Seç" />
          </SelectTrigger>
          <SelectContent>
            {pagesToShow.map(page => (
              <SelectItem key={page} value={String(page)}>
                Sayfa {page}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <div className="flex items-center space-x-2">
        <Button asChild variant="outline" size="sm" disabled={currentPage <= 1} className="border-2 border-border">
          {/* ✅ Önceki/Sonraki linklerinde de paramı koru */}
          <Link href={pageHref(currentPage - 1)}>
            <ChevronLeft className="h-4 w-4" />
            {t("quran.previous")}
          </Link>
        </Button>

        {/* ✅ Bilgi çubuğu: Her zaman sayfanın cüz numarasını göster.
            Ayrıca bir filtre seçiliyse (selectedCuz) onu da belirt. */}
        <span className="text-sm text-muted-foreground px-4">
          Sayfa {currentPage} / 604
          {cuzOfCurrent ? ` | Cüz ${cuzOfCurrent}` : ""}
          {selectedCuz ? ` |  (${pagesToShow.length} sayfa)` : ""}
        </span>

        <Button asChild variant="outline" size="sm" disabled={currentPage >= 604} className="border-2 border-border">
          <Link href={pageHref(currentPage + 1)}>
            {t("quran.next")}
            <ChevronRight className="h-4 w-4" />
          </Link>
        </Button>
      </div>
    </div>
  )
}
