"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { BookOpen, Code, Home, Menu, BookmarkCheck } from "lucide-react";
import { useLanguage } from "@/components/language-provider";
import { useState } from "react";
import {
  Sheet,
  SheetContent,
  SheetTrigger,
  SheetTitle,
} from "@/components/ui/sheet";

export function MobileNavigation() {
  const { t } = useLanguage();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <Sheet open={mobileMenuOpen} onOpenChange={setMobileMenuOpen}>
      <SheetTrigger asChild>
        <Button variant="ghost" size="icon" className="h-9 w-9">
          <Menu className="h-5 w-5" />
          <span className="sr-only">Menüyü aç</span>
        </Button>
      </SheetTrigger>
      <SheetContent side="right" className="w-[300px] sm:w-[400px]">
        <SheetTitle className="sr-only">Navigasyon Menüsü</SheetTitle>
        <nav className="flex flex-col space-y-4 mt-6">
          <Link
            href="/"
            className="flex items-center space-x-3 text-lg font-medium text-foreground hover:text-primary dark:hover:text-accent transition-colors py-2"
            onClick={() => setMobileMenuOpen(false)}
          >
            <Home className="h-5 w-5" />
            <span>{t("nav.home")}</span>
          </Link>
          <Link
            href="/quran"
            className="flex items-center space-x-3 text-lg font-medium text-foreground hover:text-primary dark:hover:text-accent transition-colors py-2"
            onClick={() => setMobileMenuOpen(false)}
          >
            <BookOpen className="h-5 w-5" />
            <span>{t("nav.quran")}</span>
          </Link>
          <Link
            href="/developers"
            className="flex items-center space-x-3 text-lg font-medium text-foreground hover:text-primary dark:hover:text-accent transition-colors py-2"
            onClick={() => setMobileMenuOpen(false)}
          >
            <Code className="h-5 w-5" />
            <span>{t("nav.developers")}</span>
          </Link>
          <div className="border-t pt-4">
            <Button
              asChild
              className="w-full bg-primary hover:bg-primary/90 text-primary-foreground"
            >
              <Link href="/quran" onClick={() => setMobileMenuOpen(false)}>
                {t("nav.startReading")}
              </Link>
            </Button>
          </div>
        </nav>
      </SheetContent>
    </Sheet>
  );
}
