"use client";

import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { ChevronLeft, ChevronRight, List } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useLanguage } from "@/components/language-provider";

interface QuranNavigationProps {
  currentPage: number;
}

export function QuranNavigation({ currentPage }: QuranNavigationProps) {
  const router = useRouter();
  const { t } = useLanguage();

  const handlePageChange = (page: string) => {
    router.push(`/quran/page/${page}`);
  };

  return (
    <div className="max-w-4xl mx-auto px-2 sm:px-4 mb-6 sm:mb-8">
      <div className="flex flex-col gap-4">
        {/* Top row - Browse button and page selector */}
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 sm:gap-4">
          <Button
            asChild
            variant="outline"
            size="sm"
            className="border-2 border-border flex-shrink-0"
          >
            <Link href="/quran/surahs">
              <List className="h-4 w-4 mr-2" />
              {t("quran.browseSurahs")}
            </Link>
          </Button>

          <Select
            value={currentPage.toString()}
            onValueChange={handlePageChange}
          >
            <SelectTrigger className="w-full sm:w-40">
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

        {/* Bottom row - Navigation buttons */}
        <div className="flex items-center justify-center gap-2">
          <Button
            asChild
            variant="outline"
            size="sm"
            disabled={currentPage <= 1}
            className="border-2 border-border flex-1 sm:flex-none"
          >
            <Link href={`/quran/page/${currentPage - 1}`}>
              <ChevronLeft className="h-4 w-4" />
              <span className="ml-1 hidden xs:inline">
                {t("quran.previous")}
              </span>
            </Link>
          </Button>

          <div className="flex items-center px-3 py-2 bg-card rounded-md border">
            <span className="text-sm text-muted-foreground whitespace-nowrap">
              {currentPage} {t("quran.of")} 604
            </span>
          </div>

          <Button
            asChild
            variant="outline"
            size="sm"
            disabled={currentPage >= 604}
            className="border-2 border-border flex-1 sm:flex-none"
          >
            <Link href={`/quran/page/${currentPage + 1}`}>
              <span className="mr-1 hidden xs:inline">{t("quran.next")}</span>
              <ChevronRight className="h-4 w-4" />
            </Link>
          </Button>
        </div>
      </div>
    </div>
  );
}
