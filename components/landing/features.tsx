"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { BookOpen, Volume2, Languages, Bookmark, Moon, Code } from "lucide-react"
import { useLanguage } from "@/components/language-provider"

export function Features() {
  const { t } = useLanguage()

  const features = [
    {
      icon: BookOpen,
      title: t("features.typography.title"),
      description: t("features.typography.desc"),
    },
    {
      icon: Volume2,
      title: t("features.audio.title"),
      description: t("features.audio.desc"),
    },
    {
      icon: Languages,
      title: t("features.translation.title"),
      description: t("features.translation.desc"),
    },
    {
      icon: Bookmark,
      title: t("features.bookmark.title"),
      description: t("features.bookmark.desc"),
    },
    {
      icon: Moon,
      title: t("features.darkMode.title"),
      description: t("features.darkMode.desc"),
    },
    {
      icon: Code,
      title: t("features.openSource.title"),
      description: t("features.openSource.desc"),
    },
  ]

  return (
    <section className="py-20 md:py-32 bg-gradient-to-br from-background via-card/30 to-background relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-40 dark:opacity-20">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,hsl(var(--accent)/0.2),transparent_50%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_80%,hsl(var(--primary)/0.15),transparent_50%)]" />
      </div>

      <div className="relative container mx-auto px-4">
        <div className="mx-auto max-w-3xl text-center mb-20">
          <h2 className="text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl mb-6 text-foreground">
            {t("features.title")}
          </h2>
          <p className="text-xl text-muted-foreground leading-relaxed">{t("features.subtitle")}</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <Card
              key={index}
              className="group border border-accent/20 shadow-lg hover:shadow-2xl transition-all duration-500 bg-card/80 backdrop-blur-sm hover:bg-card hover:border-accent/40 transform hover:-translate-y-4 hover:rotate-1"
            >
              <CardHeader className="pb-4">
                <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-accent/20 to-primary/10 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300 border border-accent/20">
                  <feature.icon className="h-8 w-8 text-accent group-hover:animate-pulse" />
                </div>
                <CardTitle className="text-xl text-card-foreground group-hover:text-accent transition-colors">
                  {feature.title}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-base text-muted-foreground leading-relaxed">
                  {feature.description}
                </CardDescription>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}
