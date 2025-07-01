"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Github, MessageCircle, Users, Code, Heart, Star, GitFork, Eye } from "lucide-react"
import Link from "next/link"
import { useLanguage } from "@/components/language-provider"

export function Community() {
  const { t } = useLanguage()

  return (
    <section className="py-20 md:py-32 relative overflow-hidden">
      {/* Mushaf-inspired Dark Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary/90 via-primary/80 to-primary/70" />
      <div className="absolute inset-0">
        <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_20%_30%,hsl(var(--accent)/0.3),transparent_40%)] animate-pulse" />
        <div className="absolute top-0 right-0 w-full h-full bg-[radial-gradient(circle_at_80%_20%,hsl(var(--primary)/0.4),transparent_40%)] animate-pulse delay-1000" />
      </div>

      <div className="relative container mx-auto px-4">
        <div className="mx-auto max-w-3xl text-center mb-20">
          <div className="flex justify-center mb-6">
            <div className="flex items-center space-x-2 rounded-full bg-white/10 backdrop-blur-sm px-6 py-3 text-sm font-medium text-white border border-white/30 animate-pulse">
              <Heart className="h-4 w-4 text-destructive" />
              <span>{t("community.badge")}</span>
            </div>
          </div>

          <h2 className="text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl mb-6 text-accent-foreground dark:text-white">
            {t("community.title")}
            <span className="block text-accent-foreground dark:text-white">{t("community.subtitle")}</span>
          </h2>
          <p className="text-xl text-white/90 leading-relaxed">{t("community.description")}</p>
        </div>

        {/* Community Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16 items-stretch">
          <Card className="bg-white/10 backdrop-blur-sm border-white/30 text-white hover:bg-white/20 transition-all duration-300 transform hover:-translate-y-2 hover:scale-105 h-full flex flex-col">
            <CardHeader className="text-center">
              <Github className="h-12 w-12 mx-auto text-white mb-3 animate-bounce" />
              <CardTitle className="text-lg text-white">{t("community.cards.openSource.title")}</CardTitle>
            </CardHeader>
            <CardContent className="text-center flex-grow">
              <CardDescription className="text-white/90">
                {t("community.cards.openSource.description")}
              </CardDescription>
            </CardContent>
          </Card>

          <Card className="bg-white/10 backdrop-blur-sm border-white/30 text-white hover:bg-white/20 transition-all duration-300 transform hover:-translate-y-2 hover:scale-105 h-full flex flex-col">
            <CardHeader className="text-center">
              <Code className="h-12 w-12 mx-auto text-white mb-3 animate-bounce delay-100" />
              <CardTitle className="text-lg text-white">{t("community.cards.modernTech.title")}</CardTitle>
            </CardHeader>
            <CardContent className="text-center flex-grow">
              <CardDescription className="text-white/90">
                {t("community.cards.modernTech.description")}
              </CardDescription>
            </CardContent>
          </Card>

          <Card className="bg-white/10 backdrop-blur-sm border-white/30 text-white hover:bg-white/20 transition-all duration-300 transform hover:-translate-y-2 hover:scale-105 h-full flex flex-col">
            <CardHeader className="text-center">
              <Users className="h-12 w-12 mx-auto text-white mb-3 animate-bounce delay-200" />
              <CardTitle className="text-lg text-white">{t("community.cards.globalImpact.title")}</CardTitle>
            </CardHeader>
            <CardContent className="text-center flex-grow">
              <CardDescription className="text-white/90">
                {t("community.cards.globalImpact.description")}
              </CardDescription>
            </CardContent>
          </Card>

          <Card className="bg-white/10 backdrop-blur-sm border-white/30 text-white hover:bg-white/20 transition-all duration-300 transform hover:-translate-y-2 hover:scale-105 h-full flex flex-col">
            <CardHeader className="text-center">
              <MessageCircle className="h-12 w-12 mx-auto text-white mb-3 animate-bounce delay-300" />
              <CardTitle className="text-lg text-white">{t("community.cards.activeCommunity.title")}</CardTitle>
            </CardHeader>
            <CardContent className="text-center flex-grow">
              <CardDescription className="text-white/90">
                {t("community.cards.activeCommunity.description")}
              </CardDescription>
            </CardContent>
          </Card>
        </div>

        {/* GitHub Stats */}
        {/*  <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-16">
          <div className="text-center group">
            <div className="flex items-center justify-center mb-2">
              <Star className="h-6 w-6 text-accent-foreground mr-2 group-hover:animate-spin" />
              <div className="text-3xl md:text-4xl font-bold text-white">2.5k</div>
            </div>
            <div className="text-white/90">{t("community.stats.stars")}</div>
          </div>
          <div className="text-center group">
            <div className="flex items-center justify-center mb-2">
              <GitFork className="h-6 w-6 text-accent-foreground mr-2 group-hover:animate-pulse" />
              <div className="text-3xl md:text-4xl font-bold text-white">450</div>
            </div>
            <div className="text-white/90">{t("community.stats.forks")}</div>
          </div>
          <div className="text-center group">
            <div className="flex items-center justify-center mb-2">
              <Users className="h-6 w-6 text-accent-foreground mr-2 group-hover:animate-bounce" />
              <div className="text-3xl md:text-4xl font-bold text-white">120</div>
            </div>
            <div className="text-white/90">{t("community.stats.contributors")}</div>
          </div>
          <div className="text-center group">
            <div className="flex items-center justify-center mb-2">
              <Eye className="h-6 w-6 text-accent-foreground mr-2 group-hover:animate-pulse" />
              <div className="text-3xl md:text-4xl font-bold text-white">15k</div>
            </div>
            <div className="text-white/90">{t("community.stats.watchers")}</div>
          </div>
        </div>*/}

        <div className="text-center">
          <Button
            asChild
            size="lg"
            className="text-lg px-10 py-6 h-auto bg-white text-primary hover:bg-white/90 shadow-xl hover:shadow-2xl transform hover:scale-105 transition-all duration-300 group"
          >
            <Link href="/developers">
              <Code className="mr-3 h-6 w-6 group-hover:animate-pulse" />
              {t("community.contribute")}
            </Link>
          </Button>
        </div>
      </div>
    </section>
  )
}
