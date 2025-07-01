"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Code, Heart, Users } from "lucide-react"
import { useLanguage } from "@/components/language-provider"

export function DeveloperWelcome() {
  const { t } = useLanguage()

  return (
    <section className="text-center space-y-8">
      <div>
        <h1 className="text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl mb-4">{t("dev.welcome.title")}</h1>
        <p className="text-xl text-muted-foreground max-w-3xl mx-auto">{t("dev.welcome.subtitle")}</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card>
          <CardHeader className="text-center">
            <Code className="h-8 w-8 mx-auto text-primary mb-2" />
            <CardTitle>{t("dev.welcome.modernTech")}</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground">{t("dev.welcome.modernTechDesc")}</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="text-center">
            <Heart className="h-8 w-8 mx-auto text-primary mb-2" />
            <CardTitle>{t("dev.welcome.purposeDriven")}</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground">{t("dev.welcome.purposeDrivenDesc")}</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="text-center">
            <Users className="h-8 w-8 mx-auto text-primary mb-2" />
            <CardTitle>{t("dev.welcome.globalImpact")}</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground">{t("dev.welcome.globalImpactDesc")}</p>
          </CardContent>
        </Card>
      </div>
    </section>
  )
}
