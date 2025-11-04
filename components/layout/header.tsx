"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ThemeToggle } from "@/components/theme-toggle";
import { LanguageToggle } from "@/components/language-toggle";
import { MobileNavigation } from "@/components/layout/mobile-navigation";
import { BookOpen, Code, Home, BookmarkCheck } from "lucide-react";
import { useLanguage } from "@/components/language-provider";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { useIsMobile } from "@/hooks/use-mobile";
import clsx from "clsx";

function navLinkClass(pathname: string, target: string | RegExp) {
  const isActive =
    typeof target === "string"
      ? pathname === target
      : target instanceof RegExp
      ? target.test(pathname)
      : false;
  return clsx(
    "flex items-center space-x-1 text-sm font-medium transition-colors hover:text-primary dark:hover:text-accent",
    isActive
      ? "text-primary dark:text-accent font-bold"
      : "text-muted-foreground"
  );
}

export function Header() {
  const { t } = useLanguage();
  const pathname = usePathname();
  const isMobile = useIsMobile();

  const [loading, setLoading] = useState(false);
  const [prevPath, setPrevPath] = useState(pathname);

  useEffect(() => {
    if (pathname !== prevPath) {
      setLoading(true);
      setPrevPath(pathname);
      const timeout = setTimeout(() => setLoading(false), 500);
      return () => clearTimeout(timeout);
    }
  }, [pathname, prevPath]);

  return (
    <header className="sticky top-0 z-50 w-full border-b-2 border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      {loading && (
        <div
          className="fixed top-0 left-0 w-full h-1 z-[100] bg-accent animate-pulse transition-all duration-300"
          style={{ boxShadow: "0 2px 8px 0 hsl(var(--accent)/0.2)" }}
        />
      )}
      <div className="container mx-auto flex h-16 items-center justify-between px-4">
        <Link href="/" className="flex items-center space-x-2">
          <BookOpen className="h-6 w-6 text-primary dark:text-accent" />
          <span className="text-xl font-bold text-foreground">
            {t("hero.title")}
          </span>
        </Link>

        <div className="hidden md:flex flex-1 justify-between items-center ml-8">
          <>
            <nav className="flex flex-1 items-center justify-center space-x-4 lg:space-x-6 xl:space-x-8">
              <Link
                href="/"
                className={navLinkClass(pathname, "/")}
              >
                <Home className="h-4 w-4" />
                <span className="hidden lg:inline">{t("nav.home")}</span>
              </Link>
              <Link
                href="/quran"
                className={navLinkClass(pathname, /^\/quran/)}
              >
                <BookOpen className="h-4 w-4" />
                <span className="hidden lg:inline">{t("nav.quran")}</span>
              </Link>
              <Link
                href="/developers"
                className={navLinkClass(pathname, /^\/developers/)}
              >
                <Code className="h-4 w-4" />
                <span className="hidden lg:inline">{t("nav.developers")}</span>
              </Link>
            </nav>

            <div className="flex items-center space-x-2">
              <LanguageToggle />
              <ThemeToggle />
              <Button
                asChild
                size="sm"
                className="bg-primary text-primary-foreground hover:bg-primary/90 hidden md:flex"
              >
                <Link href="/quran">{t("nav.startReading")}</Link>
              </Button>
            </div>
          </>
        </div>

        <div className="flex md:hidden items-center space-x-2">
          <LanguageToggle />
          <ThemeToggle />
          <MobileNavigation />
        </div>
      </div>
    </header>
  );
}
