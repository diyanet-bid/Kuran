"use client"

import { Button } from "@/components/ui/button"
import { BookOpen, Download, ArrowRight, Sparkles, Shield, Zap, Globe } from "lucide-react"
import Link from "next/link"
import { useLanguage } from "@/components/language-provider"

export function CTA() {
  const { t } = useLanguage()

  return (
    <section className="py-20 md:py-32 relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-background via-card/40 to-background" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,hsl(var(--accent)/0.15),transparent_70%)]" />

      <div className="relative container mx-auto px-4">
        <div className="mx-auto max-w-4xl text-center">
          {/* Animated Icon */}
          <div className="flex justify-center mb-8">
            <div className="w-24 h-24 bg-gradient-to-br from-accent/20 to-primary/10 rounded-full flex items-center justify-center animate-pulse border border-accent/30">
              <Sparkles className="h-12 w-12 text-accent animate-spin" />
            </div>
          </div>

          <h2 className="text-3xl sm:text-5xl md:text-6xl font-bold tracking-tight text-foreground leading-tight break-words mb-2">
            {t("cta.title")}
          </h2>
          <h3 className="text-xl sm:text-2xl md:text-3xl font-semibold text-transparent bg-clip-text bg-gradient-to-r from-accent to-primary break-words mb-8">
            {t("cta.subtitle")}
          </h3>

          <p className="text-xl text-muted-foreground mb-12 leading-relaxed max-w-3xl mx-auto">
            {t("cta.description")}
          </p>

          <div className="flex flex-col sm:flex-row gap-6 justify-center mb-12">
            <Button
              asChild
              size="lg"
              className="text-lg px-10 py-6 h-auto bg-primary hover:bg-primary/90 text-primary-foreground shadow-xl hover:shadow-2xl transform hover:scale-105 transition-all duration-300 group"
            >
              <Link href="/quran">
                <BookOpen className="mr-3 h-6 w-6 group-hover:animate-pulse" />
                {t("cta.startNow")}
                <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
              </Link>
            </Button>
            <Button
              variant="outline"
              size="lg"
              className="text-lg px-10 py-6 h-auto border-2 border-accent/40 text-accent hover:bg-accent/10 hover:border-accent/60 shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300"
            >
              <Download className="mr-3 h-6 w-6" />
              {t("cta.mobileApp")}
            </Button>
          </div>

          {/* Enhanced Features Grid */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-12">
            <div className="flex flex-col items-center space-y-2 p-4 rounded-lg bg-card/60 backdrop-blur-sm hover:bg-card/80 transition-all duration-300 group border border-accent/20">
              <Shield className="h-6 w-6 text-accent group-hover:animate-pulse" />
              <span className="text-sm text-muted-foreground">{t("cta.free")}</span>
            </div>
            <div className="flex flex-col items-center space-y-2 p-4 rounded-lg bg-card/60 backdrop-blur-sm hover:bg-card/80 transition-all duration-300 group border border-accent/20">
              <Zap className="h-6 w-6 text-accent group-hover:animate-pulse" />
              <span className="text-sm text-muted-foreground">{t("cta.openSource")}</span>
            </div>
            <div className="flex flex-col items-center space-y-2 p-4 rounded-lg bg-card/60 backdrop-blur-sm hover:bg-card/80 transition-all duration-300 group border border-accent/20">
              <Globe className="h-6 w-6 text-accent group-hover:animate-pulse" />
              <span className="text-sm text-muted-foreground">{t("cta.noAds")}</span>
            </div>
            <div className="flex flex-col items-center space-y-2 p-4 rounded-lg bg-card/60 backdrop-blur-sm hover:bg-card/80 transition-all duration-300 group border border-accent/20">
              <Shield className="h-6 w-6 text-accent group-hover:animate-pulse" />
              <span className="text-sm text-muted-foreground">{t("cta.privacy")}</span>
            </div>
          </div>

          {/* Trust badge */}
          <div className="pt-8 border-t border-accent/20">
            <p className="text-sm text-muted-foreground">
              <span className="font-semibold text-muted-foreground bg-clip-text bg-gradient-to-r from-accent to-primary">
                {t("cta.supportedBy")}
              </span>{" "}
              {t("cta.supportedByDesc")}
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}
