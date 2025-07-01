import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { MessageCircle, Send, Github, Mail } from "lucide-react"
import { useLanguage } from "@/components/language-provider"
import Link from "next/link"

export function Community() {
  const { t } = useLanguage()

  return (
    <section className="space-y-8">
      <div className="text-center">
        <h2 className="text-3xl font-bold tracking-tight mb-4">{t("dev.community.title")}</h2>
        <p className="text-lg text-muted-foreground">
          {t("dev.community.subtitle")}
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16 items-stretch">
        <Card className="bg-card/10 backdrop-blur-sm border-primary/20 hover:bg-card/20 transition-all duration-300 transform hover:-translate-y-2 hover:scale-105 h-full flex flex-col">
          <CardHeader className="text-center">
            <MessageCircle className="h-8 w-8 mx-auto text-foreground mb-2" />
            <CardTitle className="text-lg text-foreground">{t("dev.community.soon")}</CardTitle>
          </CardHeader>
          <CardContent className="text-center flex-grow">
            <p className="text-sm text-muted-foreground mb-4">
              {t("dev.community.soon")}
            </p>
            <Button size="sm" className="w-full bg-primary text-primary-foreground cursor-not-allowed" disabled>
              {t("dev.community.soon")}
            </Button>
          </CardContent>
        </Card>

        <Card className="bg-card/10 backdrop-blur-sm border-primary/20 hover:bg-card/20 transition-all duration-300 transform hover:-translate-y-2 hover:scale-105 h-full flex flex-col">
          <CardHeader className="text-center">
            <Send className="h-8 w-8 mx-auto text-foreground mb-2" />
            <CardTitle className="text-lg text-foreground">{t("dev.community.soon")}</CardTitle>
          </CardHeader>
          <CardContent className="text-center flex-grow">
            <p className="text-sm text-muted-foreground mb-4">{t("dev.community.telegramDesc")}</p>
            <Button size="sm" className="w-full bg-primary text-primary-foreground cursor-not-allowed" disabled>
              {t("dev.community.soon")}
            </Button>
          </CardContent>
        </Card>

        <Card className="bg-card/10 backdrop-blur-sm border-primary/20 hover:bg-card/20 transition-all duration-300 transform hover:-translate-y-2 hover:scale-105 h-full flex flex-col">
          <CardHeader className="text-center">
            <Github className="h-8 w-8 mx-auto text-foreground mb-2" />
            <CardTitle className="text-lg text-foreground">{t("dev.community.github")}</CardTitle>
          </CardHeader>
          <CardContent className="text-center flex-grow">
            <p className="text-sm text-muted-foreground mb-4">{t("dev.community.githubDesc")}</p>
            <Link 
              href="https://github.com/diyanet-bid/Kuran" 
              target="_blank" 
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center w-full px-3 py-2 text-sm font-medium bg-primary text-primary-foreground rounded-md hover:bg-primary/90 transition-colors"
            >
              {t("dev.community.viewRepository")}
            </Link>
          </CardContent>
        </Card>

        <Card className="bg-card/10 backdrop-blur-sm border-primary/20 hover:bg-card/20 transition-all duration-300 transform hover:-translate-y-2 hover:scale-105 h-full flex flex-col">
          <CardHeader className="text-center">
            <Mail className="h-8 w-8 mx-auto text-foreground mb-2" />
            <CardTitle className="text-lg text-foreground">{t("dev.community.email")}</CardTitle>
          </CardHeader>
          <CardContent className="text-center flex-grow">
            <p className="text-sm text-muted-foreground mb-4">{t("dev.community.emailDesc")}</p>
            <Link 
              href="mailto:community@diyanet.gov.tr" 
              target="_blank" 
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center w-full px-3 py-2 text-sm font-medium bg-primary text-primary-foreground rounded-md hover:bg-primary/90 transition-colors"
            >
              {t("dev.community.sendEmail")}
            </Link>
          </CardContent>
        </Card>
      </div>
    </section>
  )
}
