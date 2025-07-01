"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Book, Code, Database, Palette } from "lucide-react"
import { useLanguage } from "@/components/language-provider"

export function Resources() {
  const { t } = useLanguage()

  return (
    <section className="space-y-8">
      <div className="text-center">
        <h2 className="text-3xl font-bold tracking-tight mb-4">{t("dev.resources.title")}</h2>
        <p className="text-lg text-muted-foreground">{t("dev.resources.subtitle")}</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <Code className="h-5 w-5 mr-2" />
              {t("dev.resources.techStack")}
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="space-y-2">
              <p className="text-sm">
                <strong>{t("dev.resources.framework")}:</strong> Next.js 15+ with App Router
              </p>
              <p className="text-sm">
                <strong>{t("dev.resources.language")}:</strong> TypeScript (strict mode)
              </p>
              <p className="text-sm">
                <strong>{t("dev.resources.styling")}:</strong> Tailwind CSS v4+
              </p>
              <p className="text-sm">
                <strong>{t("dev.resources.state")}:</strong> Zustand + TanStack Query
              </p>
              <p className="text-sm">
                <strong>{t("dev.resources.ui")}:</strong> Radix UI + Custom Components
              </p>
              <p className="text-sm">
                <strong>{t("dev.resources.audio")}:</strong> Howler.js
              </p>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <Database className="h-5 w-5 mr-2" />
              {t("dev.resources.apiDocs")}
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <p className="text-sm text-muted-foreground">{t("dev.resources.apiDocsDesc")}</p>
            <div className="space-y-2">
              <Button variant="outline" size="sm" className="w-full border border-border">
                {t("dev.resources.apiReference")}
              </Button>
              <Button variant="outline" size="sm" className="w-full">
                {t("dev.resources.dataSchema")}
              </Button>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <Palette className="h-5 w-5 mr-2" />
              {t("dev.resources.designSystem")}
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <p className="text-sm text-muted-foreground">{t("dev.resources.designSystemDesc")}</p>
            <div className="space-y-2">
              <Button variant="outline" size="sm" className="w-full">
                {t("dev.resources.componentLibrary")}
              </Button>
              <Button variant="outline" size="sm" className="w-full">
                {t("dev.resources.designGuidelines")}
              </Button>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <Book className="h-5 w-5 mr-2" />
              {t("dev.resources.documentation")}
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <p className="text-sm text-muted-foreground">{t("dev.resources.documentationDesc")}</p>
            <div className="space-y-2">
              <Button variant="outline" size="sm" className="w-full">
                {t("dev.resources.gettingStarted")}
              </Button>
              <Button variant="outline" size="sm" className="w-full">
                {t("dev.resources.architecture")}
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>{t("dev.resources.contact")}</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <h4 className="font-medium mb-2">{t("dev.resources.technicalQuestions")}</h4>
              <p className="text-sm text-muted-foreground">{t("dev.resources.technicalQuestionsDesc")}</p>
            </div>
            <div>
              <h4 className="font-medium mb-2">{t("dev.resources.bugReports")}</h4>
              <p className="text-sm text-muted-foreground">{t("dev.resources.bugReportsDesc")}</p>
            </div>
            <div>
              <h4 className="font-medium mb-2">{t("dev.resources.generalInquiries")}</h4>
              <p className="text-sm text-muted-foreground">
                {t("dev.resources.generalInquiriesDesc")}{" "}
                <a href="mailto:community@diyanet.gov.tr" className="text-primary hover:underline">
                  community@diyanet.gov.tr
                </a>
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </section>
  )
}
