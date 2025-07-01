"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Terminal, Download, Play, ExternalLink, FileText, Package } from "lucide-react"
import { useLanguage } from "@/components/language-provider"

export function QuickStart() {
  const { t } = useLanguage()

  return (
    <section className="space-y-8">
      <div className="text-center">
        <h2 className="text-3xl font-bold tracking-tight mb-4">{t("dev.quickStart.title")}</h2>
        <p className="text-lg text-muted-foreground">{t("dev.quickStart.subtitle")}</p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <Terminal className="h-5 w-5 mr-2" />
            {t("dev.quickStart.setupInstructions")}
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-3">
            <div className="flex items-start space-x-3">
              <div className="w-6 h-6 rounded-full bg-primary text-primary-foreground text-sm flex items-center justify-center font-bold">
                1
              </div>
              <div>
                <p className="font-medium">{t("dev.quickStart.step1")}</p>
                <code className="text-sm bg-border text-foreground px-2 py-1 rounded border border-border">
                  git clone https://github.com/diyanet-bid/Kuran.git
                </code>
              </div>
            </div>

            <div className="flex items-start space-x-3">
              <div className="w-6 h-6 rounded-full bg-primary text-primary-foreground text-sm flex items-center justify-center font-bold">
                2
              </div>
              <div>
                <p className="font-medium">{t("dev.quickStart.step2")}</p>
                <code className="text-sm bg-border text-foreground px-2 py-1 rounded border border-border">npm install</code>
              </div>
            </div>

            <div className="flex items-start space-x-3">
              <div className="w-6 h-6 rounded-full bg-primary text-primary-foreground text-sm flex items-center justify-center font-bold">
                3
              </div>
              <div>
                <p className="font-medium">{t("dev.quickStart.step3")}</p>
                <code className="text-sm bg-border text-foreground px-2 py-1 rounded border border-border">npm run dev</code>
              </div>
            </div>

            <div className="flex items-start space-x-3">
              <div className="w-6 h-6 rounded-full bg-primary text-primary-foreground text-sm flex items-center justify-center font-bold">
                4
              </div>
              <div>
                <p className="font-medium">{t("dev.quickStart.step4")}</p>
                <code className="text-sm bg-border text-foreground px-2 py-1 rounded border border-border">http://localhost:3000</code>
              </div>
            </div>

            <div className="flex items-start space-x-3">
              <div className="w-6 h-6 rounded-full bg-primary text-primary-foreground text-sm flex items-center justify-center font-bold">
                5
              </div>
              <div className="flex-1">
                <p className="font-medium">{t("dev.quickStart.step5")}</p>
                <div className="mt-2 space-y-2">
                  <p className="text-sm text-muted-foreground">{t("dev.quickStart.createEnvFile")}</p>
                  <p className="text-sm text-muted-foreground">{t("dev.quickStart.envContent")}</p>
                  <div className="bg-muted p-3 rounded-lg border">
                    <code className="text-sm text-foreground block">
                      DIB_KURAN_API_BASE_URL=&lt;dib_kuran_api_base_url&gt;
                      <br />
                      DIB_KURAN_API_TOKEN=&lt;dib_kuran_api_token&gt;
                    </code>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Button 
                      variant="outline" 
                      size="sm"
                      onClick={() => window.open('https://api.diyanet.gov.tr', '_blank')}
                      className="border-border"
                    >
                      <ExternalLink className="h-4 w-4 mr-2" />
                      {t("dev.quickStart.getApiCredentials")}
                    </Button>
                    <span className="text-xs text-muted-foreground">
                      {t("dev.quickStart.getApiCredentialsDesc")}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="flex space-x-4 pt-4">
            <Button onClick={() => {
              const link = document.createElement('a');
              link.href = 'https://github.com/diyanet-bid/Kuran/archive/refs/heads/main.zip';
              link.download = 'Kuran-main.zip';
              document.body.appendChild(link);
              link.click();
              document.body.removeChild(link);
            }}>
              <Download className="h-4 w-4 mr-2" />
              {t("dev.quickStart.downloadProject")}
            </Button>
            {/*
            <Button variant="outline" className="border border-border">
              <Play className="h-4 w-4 mr-2" />
              {t("dev.quickStart.watchVideo")}
            </Button>
            */}
          </div>
        </CardContent>
      </Card>

      {/* Docker Option */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <Package className="h-5 w-5 mr-2" />
            {t("dev.quickStart.dockerOption")}
          </CardTitle>
          <p className="text-sm text-muted-foreground">{t("dev.quickStart.dockerOptionDesc")}</p>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-3">
            <div className="flex items-start space-x-3">
              <div className="w-6 h-6 rounded-full bg-secondary text-secondary-foreground text-sm flex items-center justify-center font-bold">
                1
              </div>
              <div>
                <p className="font-medium">{t("dev.quickStart.dockerStart")}</p>
                <code className="text-sm bg-border text-foreground px-2 py-1 rounded border border-border">
                  docker-compose up -d
                </code>
              </div>
            </div>

            <div className="flex items-start space-x-3">
              <div className="w-6 h-6 rounded-full bg-secondary text-secondary-foreground text-sm flex items-center justify-center font-bold">
                2
              </div>
              <div>
                <p className="font-medium">{t("dev.quickStart.dockerOpenBrowser")}</p>
                <code className="text-sm bg-border text-foreground px-2 py-1 rounded border border-border">
                  http://localhost:3000
                </code>
              </div>
            </div>
          </div>

          <div className="pt-4">
            <Button 
              variant="outline" 
              onClick={() => window.open('https://docs.docker.com/get-docker/', '_blank')}
              className="border-border"
            >
              <ExternalLink className="h-4 w-4 mr-2" />
              {t("dev.quickStart.dockerInstallGuide")}
            </Button>
          </div>
        </CardContent>
      </Card>
    </section>
  )
}
