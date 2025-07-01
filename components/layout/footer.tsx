"use client"

import Link from "next/link"
import { BookOpen, Github, Heart } from "lucide-react"
import { useLanguage } from "@/components/language-provider"

export function Footer() {
  const { t } = useLanguage()

  return (
    <footer className="border-t border-border bg-card/50">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <BookOpen className="h-6 w-6 text-primary dark:text-white" />
              <span className="font-bold text-xl text-foreground">{t("hero.title")}</span>
            </div>
            <p className="text-sm text-muted-foreground">{t("footer.description")}</p>
          </div>

          <div className="space-y-4">
            <h3 className="font-semibold text-foreground">{t("footer.application")}</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/quran" className="text-muted-foreground hover:text-primary dark:hover:text-accent transition-colors">
                  {t("footer.readQuran")}
                </Link>
              </li>
              <li>
                <Link href="/quran/page/1" className="text-muted-foreground hover:text-primary dark:hover:text-accent transition-colors">
                  {t("footer.browsePages")}
                </Link>
              </li>
              <li>
                <Link href="/quran/surah/1" className="text-muted-foreground hover:text-primary dark:hover:text-accent transition-colors">
                  {t("footer.browseSurahs")}
                </Link>
              </li>
            </ul>
          </div>

          <div className="space-y-4">
            <h3 className="font-semibold text-foreground">{t("footer.developers")}</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/developers" className="text-muted-foreground hover:text-primary dark:hover:text-accent transition-colors">
                  {t("footer.getStarted")}
                </Link>
              </li>
              <li>
                <Link href="https://github.com/diyanet-bid/Kuran" className="text-muted-foreground hover:text-primary dark:hover:text-accent transition-colors">
                  {t("footer.github")}
                </Link>
              </li>
              <li>
                <Link
                  href="/developers#contribute"
                  className="text-muted-foreground hover:text-primary dark:hover:text-accent transition-colors"
                >
                  {t("footer.contribute")}
                </Link>
              </li>
            </ul>
          </div>

          <div className="space-y-4">
            <h3 className="font-semibold text-foreground">{t("footer.community")}</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link
                  href="mailto:community@diyanet.gov.tr"
                  className="text-muted-foreground hover:text-primary dark:hover:text-accent transition-colors"
                >
                  {t("footer.contact")}
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-8 pt-8 border-t border-border flex flex-col md:flex-row justify-between items-center">
          <p className="text-sm text-muted-foreground">{t("footer.copyright")}</p>
          <div className="flex items-center space-x-4 mt-4 md:mt-0">
            <Link href="https://github.com/diyanet-bid/Kuran" className="text-muted-foreground hover:text-primary dark:hover:text-accent transition-colors">
              <Github className="h-5 w-5 dark:text-white" />
            </Link>
            <p>
              +
            </p>
            <p className="text-sm text-muted-foreground flex items-center">
               <Heart className="h-4 w-4 mx-1 text-destructive dark:text-white" /> {t("footer.madeWith")}
            </p>
          </div>
        </div>
      </div>
    </footer>
  )
}
