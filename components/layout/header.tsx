"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ThemeToggle } from "@/components/theme-toggle"
import { LanguageToggle } from "@/components/language-toggle"
import { BookOpen, Code, Home } from "lucide-react"
import { useLanguage } from "@/components/language-provider"
import { usePathname } from "next/navigation"
import { useEffect, useState } from "react"

export function Header() {
  const { t } = useLanguage()
  const pathname = usePathname()
  const [loading, setLoading] = useState(false)
  const [prevPath, setPrevPath] = useState(pathname)

  useEffect(() => {
    if (pathname !== prevPath) {
      setLoading(true)
      setPrevPath(pathname)
      const timeout = setTimeout(() => setLoading(false), 500)
      return () => clearTimeout(timeout)
    }
  }, [pathname, prevPath])

  return (
    <header className="sticky top-0 z-50 w-full border-b-2 border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      {loading && (
        <div className="fixed top-0 left-0 w-full h-1 z-[100] bg-accent animate-pulse transition-all duration-300" style={{ boxShadow: '0 2px 8px 0 hsl(var(--accent)/0.2)' }} />
      )}
      <div className="container mx-auto flex h-16 items-center justify-between px-4">
        <Link href="/" className="flex items-center space-x-2">
          <BookOpen className="h-6 w-6 text-primary dark:text-accent" />
          <span className="font-bold text-xl text-foreground">{t("hero.title")}</span>
        </Link>

        <nav className="flex-1 flex justify-center items-center space-x-8">
          <Link
            href="/"
            className="flex items-center space-x-1 text-sm font-medium text-muted-foreground hover:text-primary dark:hover:text-accent transition-colors"
          >
            <Home className="h-4 w-4" />
            <span>{t("nav.home")}</span>
          </Link>
          <Link
            href="/quran"
            className="flex items-center space-x-1 text-sm font-medium text-muted-foreground hover:text-primary dark:hover:text-accent transition-colors"
          >
            <BookOpen className="h-4 w-4" />
            <span>{t("nav.quran")}</span>
          </Link>
          <Link
            href="/developers"
            className="flex items-center space-x-1 text-sm font-medium text-muted-foreground hover:text-primary dark:hover:text-accent transition-colors"
          >
            <Code className="h-4 w-4" />
            <span>{t("nav.developers")}</span>
          </Link>
        </nav>

        <div className="flex items-center space-x-2">
          <LanguageToggle />
          <ThemeToggle />
          <Button asChild size="sm" className="bg-primary hover:bg-primary/90 text-primary-foreground">
            <Link href="/quran">{t("nav.startReading")}</Link>
          </Button>
        </div>
      </div>
    </header>
  )
}
