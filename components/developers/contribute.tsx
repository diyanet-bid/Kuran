"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { GitBranch, Github, FileText, Users } from "lucide-react"
import { useLanguage } from "@/components/language-provider"
import Link from "next/link"

export function Contribute() {
  const { t } = useLanguage()

  return (
    <section className="space-y-8">
      <div className="text-center">
        <h2 className="text-3xl font-bold tracking-tight mb-4">{t("dev.contribute.title")}</h2>
        <p className="text-lg text-muted-foreground">{t("dev.contribute.subtitle")}</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <GitBranch className="h-5 w-5 mr-2" />
              {t("dev.contribute.process")}
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="space-y-2 text-sm whitespace-pre-line">{t("dev.contribute.processDesc")}</div>
            <Link 
              href="https://github.com/diyanet-bid/Kuran" 
              target="_blank" 
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center w-full px-3 py-2 text-sm font-medium bg-primary text-primary-foreground rounded-md hover:bg-primary/90 transition-colors"
            >
              <Github className="h-4 w-4 mr-2" />
              {t("dev.contribute.viewOnGithub")}
            </Link>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <FileText className="h-5 w-5 mr-2" />
              {t("dev.contribute.guidelines")}
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="space-y-2 text-sm whitespace-pre-line">{t("dev.contribute.guidelinesDesc")}</div>
            <Button variant="outline" className="w-full">
              <FileText className="h-4 w-4 mr-2" />
              {t("dev.contribute.codeOfConduct")}
            </Button>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <Users className="h-5 w-5 mr-2" />
            {t("dev.contribute.helpAreas")}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="space-y-2">
              <h4 className="font-medium">{t("dev.contribute.frontend")}</h4>
              <p className="text-sm text-muted-foreground">{t("dev.contribute.frontendDesc")}</p>
            </div>
            <div className="space-y-2">
              <h4 className="font-medium">{t("dev.contribute.backend")}</h4>
              <p className="text-sm text-muted-foreground">{t("dev.contribute.backendDesc")}</p>
            </div>
            <div className="space-y-2">
              <h4 className="font-medium">{t("dev.contribute.translations")}</h4>
              <p className="text-sm text-muted-foreground">{t("dev.contribute.translationsDesc")}</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </section>
  )
}
