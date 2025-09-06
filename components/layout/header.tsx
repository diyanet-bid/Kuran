"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ThemeToggle } from "@/components/theme-toggle";
import { LanguageToggle } from "@/components/language-toggle";
import { BookOpen, Code, Home } from "lucide-react";
import { useLanguage } from "@/components/language-provider";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { useIsMobile } from "@/hooks/use-mobile";

function MobileMenu({ t }: { t: (key: string) => string }) {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <div>
            {/* Hamburger Button */}
            <button
                onClick={() => setIsOpen(!isOpen)}
                className="relative z-50 flex flex-col justify-center items-center w-10 h-10 space-y-1.5"
                aria-label="Toggle menu"
            >
                <span
                    className={`block h-0.5 w-6 bg-foreground transform transition duration-300 ease-in-out ${
                        isOpen ? "rotate-45 translate-y-2" : ""
                    }`}
                />
                <span
                    className={`block h-0.5 w-6 bg-foreground transition-opacity duration-300 ${
                        isOpen ? "opacity-0" : "opacity-100"
                    }`}
                />
                <span
                    className={`block h-0.5 w-6 bg-foreground transform transition duration-300 ease-in-out ${
                        isOpen ? "-rotate-45 -translate-y-2" : ""
                    }`}
                />
            </button>

            {/* Mobile Menu */}
            <div
                className={`fixed inset-0 h-dvh pb-8 pt-12 z-40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/90 transform transition-transform duration-300 ease-in-out overflow-hidden ${
                    isOpen ? "translate-x-0" : "translate-x-full"
                }`}
            >
                <nav className="flex flex-col items-center justify-between h-full pt-8 px-6 max-w-md mx-auto w-full">
                    <div className="w-full space-y-6">
                        <Link
                            href="/"
                            className="flex items-center space-x-4 p-4 rounded-xl bg-accent/5 border border-border/50 shadow-sm hover:bg-accent/10 transition-all duration-300 group"
                            onClick={() => setIsOpen(false)}
                        >
                            <div className="p-2 rounded-lg bg-primary/10 group-hover:bg-primary/20 transition-colors">
                                <Home className="h-6 w-6" />
                            </div>
                            <span className="text-lg font-medium">
                                {t("nav.home")}
                            </span>
                        </Link>
                        <Link
                            href="/quran"
                            className="flex items-center space-x-4 p-4 rounded-xl bg-accent/5 border border-border/50 shadow-sm hover:bg-accent/10 transition-all duration-300 group"
                            onClick={() => setIsOpen(false)}
                        >
                            <div className="p-2 rounded-lg bg-primary/10 group-hover:bg-primary/20 transition-colors">
                                <BookOpen className="h-6 w-6" />
                            </div>
                            <span className="text-lg font-medium">
                                {t("nav.quran")}
                            </span>
                        </Link>
                        <Link
                            href="/developers"
                            className="flex items-center space-x-4 p-4 rounded-xl bg-accent/5 border border-border/50 shadow-sm hover:bg-accent/10 transition-all duration-300 group"
                            onClick={() => setIsOpen(false)}
                        >
                            <div className="p-2 rounded-lg bg-primary/10 group-hover:bg-primary/20 transition-colors">
                                <Code className="h-6 w-6" />
                            </div>
                            <span className="text-lg font-medium">
                                {t("nav.developers")}
                            </span>
                        </Link>
                    </div>

                    <div className="w-full mt-6">
                        <Button
                            asChild
                            size="lg"
                            className="w-full py-6 text-lg bg-primary hover:bg-primary/90 text-primary-foreground shadow-lg hover:shadow-xl transition-all duration-300"
                            onClick={() => setIsOpen(false)}
                        >
                            <Link
                                href="/quran"
                                className="flex items-center justify-center space-x-2"
                            >
                                <BookOpen className="h-5 w-5" />
                                <span>{t("nav.startReading")}</span>
                            </Link>
                        </Button>
                    </div>
                </nav>
            </div>
        </div>
    );
}

export function Header() {
    const { t } = useLanguage();
    const isMobile = useIsMobile();

    const pathname = usePathname();

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
            <div className="container mx-auto flex h-16 items-center justify-between px-4 ">
                <Link href="/" className="flex items-center space-x-2">
                    <BookOpen className="h-6 w-6 text-primary dark:text-accent" />
                    <span className="font-bold text-xl text-foreground">
                        {t("hero.title")}
                    </span>
                </Link>

                {!isMobile ? (
                    <>
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
                            <Button
                                asChild
                                size="sm"
                                className="bg-primary hover:bg-primary/90 text-primary-foreground"
                            >
                                <Link href="/quran">
                                    {t("nav.startReading")}
                                </Link>
                            </Button>
                        </div>
                    </>
                ) : (
                    <div className="flex items-center space-x-2">
                        <LanguageToggle />
                        <ThemeToggle />
                        <MobileMenu t={t} />
                    </div>
                )}
            </div>
        </header>
    );
}
