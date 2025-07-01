"use client"

import { Button } from "@/components/ui/button"
import { BookOpen, Github, Star, Users, Code, Heart, PlayCircle } from "lucide-react"
import Link from "next/link"
import { useLanguage } from "@/components/language-provider"

export function Hero() {
  const { t } = useLanguage()

  return (
    <section className="relative overflow-hidden min-h-screen flex items-center justify-center bg-gradient-to-br from-background via-background to-card/50">
      {/* Mushaf-inspired Background Pattern */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-gradient-to-br from-card/30 via-background to-card/20" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_25%_25%,hsl(var(--accent)/0.15),transparent_50%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_75%_75%,hsl(var(--primary)/0.1),transparent_50%)]" />
      </div>

      {/* Floating Islamic Geometric Elements */}
      <div className="absolute top-20 left-[10%] w-24 h-24 bg-accent/20 rounded-2xl rotate-45 animate-pulse" />
      <div className="absolute bottom-32 right-[15%] w-32 h-32 bg-primary/10 rounded-full animate-pulse" />
      <div className="absolute top-1/3 right-[8%] w-16 h-16 bg-accent/30 rounded-lg rotate-12 animate-pulse" />

      {/* Subtle Islamic Geometric Pattern */}
      <div className="absolute inset-0 opacity-[0.03] dark:opacity-[0.08]">
        <svg className="w-full h-full" viewBox="0 0 60 60" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern id="islamic-geo" x="0" y="0" width="60" height="60" patternUnits="userSpaceOnUse">
              <path
                d="M30 10 L50 30 L30 50 L10 30 Z M30 15 L45 30 L30 45 L15 30 Z"
                fill="none"
                stroke="currentColor"
                strokeWidth="0.5"
                opacity="0.4"
                className="text-accent"
              />
              <circle cx="30" cy="30" r="3" fill="currentColor" opacity="0.3" className="text-primary" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#islamic-geo)" />
        </svg>
      </div>

      <div className="relative container mx-auto px-6 py-10 z-10 flex flex-col justify-center min-h-[60vh]">
        <div className="mx-auto max-w-6xl text-center">
          {/* Animated Badge */}
          <div className="mb-8 flex justify-center">
            <div className="group relative overflow-hidden rounded-full bg-gradient-to-r from-card/80 to-card/60 p-[1px] shadow-lg">
              <div className="flex items-center space-x-3 rounded-full bg-card/90 backdrop-blur-sm px-6 py-3 text-sm font-medium text-card-foreground transition-all duration-300 group-hover:bg-card border border-accent/20">
                <Star className="h-4 w-4 text-accent" />
                <span className="font-semibold">{t("hero.badge")}</span>
                <div className="h-4 w-[1px] bg-accent/30" />
                <span className="text-xs text-muted-foreground">{t("hero.diyanet")}</span>
              </div>
            </div>
          </div>

          {/* Enhanced Typography Hierarchy */}
          <div>
            {/* Main Title */}
            <h2 className="mb-4 text-3xl sm:text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight text-foreground leading-tight break-words">
              {t("hero.title")}
            </h2>

            {/* Subtitle with Gradient */}
            <h3 className="mb-8 text-xl sm:text-2xl md:text-3xl font-semibold text-transparent bg-clip-text bg-gradient-to-r from-muted-foreground via-foreground to-muted-foreground break-words">
              {t("hero.subtitle")}
            </h3>
          </div>

          {/* Enhanced Description */}
          <p className="mb-12 text-lg sm:text-xl md:text-2xl text-muted-foreground max-w-4xl mx-auto leading-relaxed font-medium">
            {t("hero.description")}
          </p>

          {/* Enhanced CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-16">
            <Button
              asChild
              size="lg"
              className="relative overflow-hidden text-lg px-12 py-6 h-auto bg-primary hover:bg-primary/90 text-primary-foreground shadow-xl hover:shadow-2xl transform hover:scale-[1.02] transition-all duration-300 group border-0 rounded-2xl"
            >
              <Link href="/quran">
                <div className="absolute inset-0 bg-gradient-to-r from-accent/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                <BookOpen className="mr-3 h-6 w-6 group-hover:scale-110 transition-transform duration-300" />
                <span className="relative font-semibold">{t("hero.startReading")}</span>
              </Link>
            </Button>

            <Button
              asChild
              variant="outline"
              size="lg"
              className="text-lg px-12 py-6 h-auto border-2 border-accent/40 text-accent hover:bg-accent/10 hover:border-accent/60 shadow-lg hover:shadow-xl transform hover:scale-[1.02] transition-all duration-300 rounded-2xl backdrop-blur-sm group dark:bg-primary dark:text-primary-foreground dark:hover:bg-primary/90"
            >
              <Link href="https://github.com/diyanet-bid/Kuran" className="flex items-center group-hover:text-accent">
                <Github className="mr-3 h-6 w-6" />
                <span className="font-semibold">{t("hero.viewGithub")}</span>
              </Link>
            </Button>

            <Button
              asChild
              variant="ghost"
              size="lg"
              className="text-lg px-8 py-6 h-auto text-muted-foreground hover:bg-card/50 hover:text-foreground transition-all duration-300 rounded-2xl"
            >
              <Link href="/quran" className="flex items-center">
                <PlayCircle className="mr-2 h-5 w-5 fill-current" />
                <span className="font-medium">{t("hero.liveDemo")}</span>
              </Link>
            </Button>
          </div>          

          {/* Trust Indicators */}
          <div className="flex flex-wrap items-center justify-center gap-8 mb-8">
            {[
              { icon: Users, text: t("hero.trust.contributors"), color: "text-accent dark:text-white" },
              { icon: Code, text: t("hero.trust.openSource"), color: "text-primary dark:text-white" },
              { icon: Heart, text: t("hero.trust.community"), color: "text-destructive dark:text-white" },
              { icon: Star, text: t("hero.trust.rating"), color: "text-accent dark:text-white" },
            ].map((item, index) => (
              <div
                key={index}
                className="flex items-center space-x-2 text-sm font-medium text-muted-foreground bg-card/50 px-4 py-2 rounded-full backdrop-blur-sm border border-accent/20 hover:border-accent/40 transition-colors"
              >
                <item.icon className={`h-4 w-4 ${item.color}`} />
                <span>{item.text}</span>
              </div>
            ))}
          </div>

          {/* Official Badge */}
          <div className="text-sm text-muted-foreground dark:text-slate-400 font-medium">
  {/* Gradient kaldırıldı ve direkt renk atandı */}
  <span className="font-semibold text-primary dark:text-slate-200">
    {t("hero.supportedBy")}
  </span>
</div>
        </div>
      </div>
    </section>
  )
}
