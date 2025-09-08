"use client"

import type React from "react"
import { createContext, useContext, useState, useEffect } from "react"

interface LanguageContextType {
  language: string
  setLanguage: (lang: string) => void
  t: (key: string) => string
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined)

const translations = {
  tr: {
    // Header
    "nav.home": "Ana Sayfa",
    "nav.quran": "Kur'an-ı Kerim",
    "nav.developers": "Geliştiriciler",
    "nav.startReading": "Okumaya Başla",

    // Surah List
    "surahs.title": "Sureler",
    "surahs.subtitle": "Kur'an-ı Kerim'in 114 suresine göz atın ve okumak istediğinizi seçin",
    "surahs.searchPlaceholder": "Sure adı veya numarası ile ara...",
    "surahs.totalSurahs": "Toplam Sure",
    "surahs.showing": "Gösterilen",
    "surahs.totalVerses": "Toplam Ayet",
    "surahs.mecca": "Mekke",
    "surahs.medina": "Medine",
    "surahs.readSurah": "Sureyi Oku",
    "surahs.readSurahDetails": "Sure Detayları",
    "surahs.noResults": "Sonuç bulunamadı",
    "surahs.noResultsDesc": "Arama kriterlerinize uygun sure bulunamadı. Farklı kelimeler deneyin.",
    "surahs.clearSearch": "Aramayı Temizle",

    // Quran Reader
    "quran.page": "Sayfa",
    "quran.surah": "Sure",
    "quran.verse": "Ayet",
    "quran.play": "Oynat",
    "quran.pause": "Duraklat",
    "quran.bookmark": "İşaretle",
    "quran.bookmarked": "İşaretlendi",
    "quran.browseSurahs": "Surelere Göz At",
    "quran.previous": "Önceki",
    "quran.next": "Sonraki",
    "quran.of": "/",
    "quran.verses": "ayet",
    "quran.loading": "Yükleniyor...",
    "quran.error": "Sayfa verisi yüklenirken hata oluştu. Lütfen tekrar deneyin.",
    "quran.pageNotFound": "Sayfa bulunamadı.",
    "quran.surahNotFound": "Sure bulunamadı.",

    // Developer Pages
    "dev.welcome.title": "Hoş Geldiniz, Geliştiriciler!",
    "dev.welcome.subtitle":
      "En güzel ve erişilebilir dijital Kur'an deneyimini inşa etmemize katılın. Bu açık kaynak proje topluluk tarafından, topluluk için geliştirilmektedir.",
    "dev.welcome.modernTech": "Modern Teknoloji Yığını",
    "dev.welcome.modernTechDesc":
      "Next.js 15, TypeScript, Tailwind CSS ve diğer son teknolojiler ile geliştirilmiştir.",
    "dev.welcome.purposeDriven": "Amaç Odaklı",
    "dev.welcome.purposeDrivenDesc": "Her kod satırı Kur'an-ı Kerim'i daha erişilebilir kılma amacına hizmet eder.",
    "dev.welcome.globalImpact": "Küresel Etki",
    "dev.welcome.globalImpactDesc": "Katkılarınız dünya çapında milyonlarca Müslümana fayda sağlayacaktır.",

    "dev.quickStart.title": "Hızlı Başlangıç",
    "dev.quickStart.subtitle": "Projeyi yerel ortamınızda birkaç dakikada çalıştırın.",
    "dev.quickStart.setupInstructions": "Kurulum Talimatları",
    "dev.quickStart.step1": "Depoyu klonlayın",
    "dev.quickStart.step2": "Bağımlılıkları yükleyin",
    "dev.quickStart.step3": "Geliştirme sunucusunu başlatın",
    "dev.quickStart.step4": "Tarayıcınızı açın",
    "dev.quickStart.step5": "Ortam değişkenlerini ayarlayın",
    "dev.quickStart.downloadProject": "Projeyi İndir",
    "dev.quickStart.watchVideo": "Kurulum Videosunu İzle",
    "dev.quickStart.envSetup": "Ortam Değişkenleri Kurulumu",
    "dev.quickStart.envSetupDesc": "API erişimi için gerekli ortam değişkenlerini ayarlayın",
    "dev.quickStart.createEnvFile": ".env.local dosyası oluşturun",
    "dev.quickStart.envContent": "Aşağıdaki içeriği .env.local dosyasına ekleyin:",
    "dev.quickStart.getApiCredentials": "API Bilgilerini Al",
    "dev.quickStart.getApiCredentialsDesc": "API erişim bilgilerini almak için aşağıdaki siteyi ziyaret edin",
    "dev.quickStart.dockerOption": "Docker ile Çalıştırma",
    "dev.quickStart.dockerOptionDesc": "Alternatif olarak Docker kullanarak projeyi çalıştırabilirsiniz",
    "dev.quickStart.dockerCommand": "Docker ile başlatın",
    "dev.quickStart.dockerStart": "Docker Compose ile başlatın",
    "dev.quickStart.dockerOpenBrowser": "Tarayıcınızı açın",
    "dev.quickStart.dockerInstallGuide": "Docker Kurulum Rehberi",

    "dev.contribute.title": "Nasıl Katkıda Bulunulur",
    "dev.contribute.subtitle": "Her seviyeden geliştiricinin katkılarını memnuniyetle karşılıyoruz.",
    "dev.contribute.process": "Geliştirme Süreci",
    "dev.contribute.processDesc":
      "1. GitHub'da depoyu fork edin\n2. Özellik dalı oluşturun\n3. Testlerle birlikte değişikliklerinizi yapın\n4. Pull request gönderin\n5. Kod incelemesi ve birleştirme",
    "dev.contribute.guidelines": "Kılavuzlar",
    "dev.contribute.guidelinesDesc":
      "• TypeScript en iyi uygulamalarını takip edin\n• Anlamlı commit mesajları yazın\n• Yeni özellikler için testler ekleyin\n• İslami değerlere ve içeriğe saygı gösterin\n• Diğerlerine karşı nazik ve saygılı olun",
    "dev.contribute.codeOfConduct": "Davranış Kuralları",
    "dev.contribute.helpAreas": "Katkı sağlayabileceğiniz alanlar",
    "dev.contribute.frontend": "Frontend Geliştirme",
    "dev.contribute.frontendDesc": "React bileşenleri, UI/UX iyileştirmeleri, responsive tasarım, kullanıcı deneyimi geliştirmeleri, performans optimizasyonu, erişilebilirlik iyileştirmeleri",
    "dev.contribute.backend": "Backend Önerileri",
    "dev.contribute.backendDesc": "Yeni API rotaları önerileri, mevcut rotalar için iyileştirme talepleri, veri yapısı önerileri, performans iyileştirme önerileri",
    "dev.contribute.translations": "Çeviri ve Erişilebilirlik",
    "dev.contribute.translationsDesc": "Yeni diller ekleme, mevcut çevirileri iyileştirme, arayüz erişilebilirlik güncelleştirmeleri, İslam alemi için kapsayıcı dil desteği",
    "dev.contribute.viewOnGithub": "GitHub'da Görüntüle",

    "dev.community.title": "Topluluğumuza Katılın",
    "dev.community.subtitle": "Dünyanın dört bir yanından geliştirici ve katkıda bulunanlarla bağlantı kurun.",
    "dev.community.github": "GitHub",
    "dev.community.githubDesc": "Sorunlar, tartışmalar ve kod katkıları.",
    "dev.community.email": "E-posta",
    "dev.community.emailDesc": "Önemli konular için doğrudan iletişim.",
    "dev.community.viewRepository": "Depoyu Görüntüle",
    "dev.community.sendEmail": "E-posta Gönder",
    "dev.community.discordDesc": "Topluluk kanalları yakında.",
    "dev.community.telegramDesc": "Topluluk kanalları yakında.",
    "dev.community.soon": "Topluluk kanalları yakında",

    "dev.resources.title": "Geliştirici Kaynakları",
    "dev.resources.subtitle": "Projeyi anlamak ve katkıda bulunmak için ihtiyacınız olan her şey.",
    "dev.resources.techStack": "Teknoloji Yığını",
    "dev.resources.framework": "Framework",
    "dev.resources.language": "Dil",
    "dev.resources.styling": "Stil",
    "dev.resources.state": "Durum",
    "dev.resources.ui": "UI",
    "dev.resources.audio": "Ses",
    "dev.resources.apiDocs": "API Dokümantasyonu",
    "dev.resources.apiDocsDesc": "Kur'an veri kaynaklarıyla entegrasyon için kapsamlı API dokümantasyonu.",
    "dev.resources.designSystem": "Tasarım Sistemi",
    "dev.resources.designSystemDesc": "Uygulama boyunca kullanılan tasarım kılavuzları, bileşenler ve desenler.",
    "dev.resources.documentation": "Dokümantasyon",
    "dev.resources.documentationDesc": "Geliştiriciler ve katkıda bulunanlar için detaylı dokümantasyon.",
    "dev.resources.apiReference": "API Referansı (Yakında)",
    "dev.resources.dataSchema": "Veri Şeması (Yakında)",
    "dev.resources.componentLibrary": "Bileşen Kütüphanesi (Yakında)",
    "dev.resources.designGuidelines": "Tasarım Kılavuzları (Yakında)",
    "dev.resources.gettingStarted": "Başlangıç Kılavuzu (Yakında)",
    "dev.resources.architecture": "Mimari Genel Bakış (Yakında)",
    "dev.resources.contact": "İletişim ve Destek",
    "dev.resources.technicalQuestions": "Teknik Sorular",
    "dev.resources.technicalQuestionsDesc": "Teknik sorular ve özellik istekleri için GitHub Discussions kullanın.",
    "dev.resources.bugReports": "Hata Raporları",
    "dev.resources.bugReportsDesc": "Hataları detaylı yeniden üretim adımlarıyla GitHub Issues üzerinden bildirin.",
    "dev.resources.generalInquiries": "Genel Sorular",
    "dev.resources.generalInquiriesDesc": "Bize şu adresten e-posta gönderin:",

    // Hero Section
    "hero.badge": "Açık Kaynak Topluluk Projesi",
    "hero.arabicTitle": "القرآن الكريم",
    "hero.title": "Kur'an-ı Kerim",
    "hero.subtitle": "Modern Dijital Okuma Deneyimi",
    "hero.description":
      "Yazılımcı topluluğumuzun gücüyle, tüm Müslümanların ve Kur'an-ı Kerim öğrenmek isteyen herkesin rahatça kullanabileceği modern bir okuma deneyimi sunuyoruz.",
    "hero.startReading": "Okumaya Başla",
    "hero.viewGithub": "GitHub'da İncele",
    "hero.liveDemo": "Canlı Demo",
    "hero.diyanet": "Diyanet İşleri Başkanlığı",
    "hero.trust.contributors": "10K+ Katkıda Bulunan",
    "hero.trust.openSource": "%100 Açık Kaynak",
    "hero.trust.community": "Topluluk Odaklı",
    "hero.trust.rating": "5.0 Puan",
    "hero.stats.surahs": "Sure",
    "hero.stats.pages": "Sayfa",
    "hero.stats.verses": "Ayet",
    "hero.supportedBy": "Diyanet İşleri Başkanlığı desteğinde geliştirilmektedir",

    // Features
    "features.title": "Kullanışlı Özellikler",
    "features.subtitle": "Kur'an-ı Kerim okuma deneyiminizi iyileştirmek için tasarlanmış özellikler",
    "features.typography.title": "Rahat Okuma",
    "features.typography.desc": "Arapça metinler için optimize edilmiş fontlar ile göz yormayan okuma deneyimi",
    "features.audio.title": "Sesli Okuma",
    "features.audio.desc": "Hafızlardan sesli okuma ile ayetleri dinleyebilme imkanı",
    "features.translation.title": "Meal Desteği",
    "features.translation.desc": "Türkçe ve İngilizce meal seçenekleri ile anlam desteği",
    "features.bookmark.title": "İşaretleme",
    "features.bookmark.desc": "Ayetleri işaretleyip kaldığınız yerden devam edebilme",
    "features.darkMode.title": "Karanlık Mod",
    "features.darkMode.desc": "Gece okuma için göz dostu karanlık tema seçeneği",
    "features.openSource.title": "Açık Kaynak",
    "features.openSource.desc": "Topluluk tarafından geliştirilen, herkesin katkıda bulunabileceği proje",

    // Community
    "community.badge": "Topluluk Odaklı Geliştirme",
    "community.title": "Geliştirici Topluluğumuza",
    "community.subtitle": "Katılın",
    "community.description":
      "Dijital Kur'an uygulamalarının geleceğini inşa etmemize yardım edin. Açık kaynak, işbirlikçi ve etkili.",
    "community.contribute": "Katkıda Bulunmaya Başla",
    "community.cards.openSource.title": "Açık Kaynak",
    "community.cards.openSource.description": "GitHub'da tamamen açık kaynak. Fork edin, katkıda bulunun ve kendinize uyarlayın.",
    "community.cards.modernTech.title": "Modern Teknoloji",
    "community.cards.modernTech.description": "Next.js 15, TypeScript ve modern web teknolojileri ile geliştirilmiştir.",
    "community.cards.globalImpact.title": "Küresel Etki",
    "community.cards.globalImpact.description": "Katkılarınızla dünya çapında milyonlarca Müslümana hizmet edin.",
    "community.cards.activeCommunity.title": "Aktif Topluluk",
    "community.cards.activeCommunity.description": "Tartışmalar ve destek için Discord ve Telegram topluluklarımıza katılın.",
    "community.stats.stars": "GitHub Yıldızları",
    "community.stats.forks": "Forklar",
    "community.stats.contributors": "Katkıda Bulunanlar",
    "community.stats.watchers": "İzleyiciler",

    // CTA
    "cta.title": "Kur'an Yolculuğunuza",
    "cta.subtitle": "Başlamaya Hazır mısınız?",
    "cta.description": "Günlük Kur'an okuma rutininiz için uygulamamızı kullanan binlerce Müslümana katılın.",
    "cta.startNow": "Şimdi Okumaya Başla",
    "cta.mobileApp": "Mobil Uygulama (Yakında)",
    "cta.free": "Ücretsiz kullanım",
    "cta.openSource": "Açık kaynak",
    "cta.noAds": "Reklam yok",
    "cta.privacy": "Gizlilik odaklı",
    "cta.supportedBy": "Diyanet İşleri Başkanlığı",
    "cta.supportedByDesc": "desteğinde geliştirilmektedir",

    // Footer
    "footer.description": "Modern web teknolojileri ile geliştirilmiş açık kaynaklı dijital Kur'an-ı Kerim uygulaması",
    "footer.application": "Uygulama",
    "footer.readQuran": "Kur'an-ı Kerim Oku",
    "footer.browsePages": "Sayfalara Göz At",
    "footer.browseSurahs": "Surelere Göz At",
    "footer.developers": "Geliştiriciler",
    "footer.getStarted": "Başlangıç Rehberi",
    "footer.github": "GitHub",
    "footer.contribute": "Katkıda Bulun",
    "footer.community": "Topluluk",
    "footer.discord": "Discord",
    "footer.telegram": "Telegram",
    "footer.contact": "İletişim",
    "footer.copyright": "© 2024 Kur'an-ı Kerim Uygulaması. Açık kaynak proje.",
    "footer.madeWith": "ile Ümmet için yapıldı",

    // Navigation
    "navigation.prevSurah": "Önceki Sure",
    "navigation.nextSurah": "Sonraki Sure",
    "navigation.surah": "Sure",
  },
  en: {
    // Header
    "nav.home": "Home",
    "nav.quran": "Quran",
    "nav.developers": "Developers",
    "nav.startReading": "Start Reading",

    // Surah List
    "surahs.title": "Surahs",
    "surahs.subtitle": "Browse all 114 chapters of the Holy Quran and choose the one you want to read",
    "surahs.searchPlaceholder": "Search by surah name or number...",
    "surahs.totalSurahs": "Total Surahs",
    "surahs.showing": "Showing",
    "surahs.totalVerses": "Total Verses",
    "surahs.mecca": "Mecca",
    "surahs.medina": "Medina",
    "surahs.readSurah": "Read Surah",
    "surahs.readSurahDetails": "Surah Details",
    "surahs.noResults": "No results found",
    "surahs.noResultsDesc": "No surahs match your search criteria. Try different keywords.",
    "surahs.clearSearch": "Clear Search",

    // Quran Reader
    "quran.page": "Page",
    "quran.surah": "Surah",
    "quran.verse": "Verse",
    "quran.play": "Play",
    "quran.pause": "Pause",
    "quran.bookmark": "Bookmark",
    "quran.bookmarked": "Bookmarked",
    "quran.browseSurahs": "Browse Surahs",
    "quran.previous": "Previous",
    "quran.next": "Next",
    "quran.of": "of",
    "quran.verses": "verses",
    "quran.loading": "Loading...",
    "quran.error": "Error loading page data. Please try again.",
    "quran.pageNotFound": "Page not found.",
    "quran.surahNotFound": "Surah not found.",

    // Developer Pages
    "dev.welcome.title": "Welcome, Developers!",
    "dev.welcome.subtitle":
      "Join us in building the most beautiful and accessible digital Quran experience. This open source project is developed by the community, for the community.",
    "dev.welcome.modernTech": "Modern Tech Stack",
    "dev.welcome.modernTechDesc":
      "Built with Next.js 15, TypeScript, Tailwind CSS and other cutting-edge technologies.",
    "dev.welcome.purposeDriven": "Purpose Driven",
    "dev.welcome.purposeDrivenDesc": "Every line of code serves the purpose of making the Quran more accessible.",
    "dev.welcome.globalImpact": "Global Impact",
    "dev.welcome.globalImpactDesc": "Your contributions will benefit millions of Muslims worldwide.",

    "dev.quickStart.title": "Quick Start",
    "dev.quickStart.subtitle": "Get the project running locally in just a few minutes.",
    "dev.quickStart.setupInstructions": "Setup Instructions",
    "dev.quickStart.step1": "Clone the repository",
    "dev.quickStart.step2": "Install dependencies",
    "dev.quickStart.step3": "Start development server",
    "dev.quickStart.step4": "Open your browser",
    "dev.quickStart.step5": "Set up environment variables",
    "dev.quickStart.downloadProject": "Download Project",
    "dev.quickStart.watchVideo": "Watch Setup Video",
    "dev.quickStart.envSetup": "Environment Variables Setup",
    "dev.quickStart.envSetupDesc": "Set up required environment variables for API access",
    "dev.quickStart.createEnvFile": "Create .env.local file",
    "dev.quickStart.envContent": "Add the following content to your .env.local file:",
    "dev.quickStart.getApiCredentials": "Get API Credentials",
    "dev.quickStart.getApiCredentialsDesc": "Visit the following site to get API access credentials",
    "dev.quickStart.dockerOption": "Run with Docker",
    "dev.quickStart.dockerOptionDesc": "Alternatively, you can run the project using Docker",
    "dev.quickStart.dockerCommand": "Start with Docker",
    "dev.quickStart.dockerStart": "Start with Docker Compose",
    "dev.quickStart.dockerOpenBrowser": "Open your browser",
    "dev.quickStart.dockerInstallGuide": "Docker Installation Guide",

    "dev.contribute.title": "How to Contribute",
    "dev.contribute.subtitle": "We welcome contributions from developers of all skill levels.",
    "dev.contribute.process": "Development Process",
    "dev.contribute.processDesc":
      "1. Fork the repository on GitHub\n2. Create a feature branch\n3. Make your changes with tests\n4. Submit a pull request\n5. Code review and merge",
    "dev.contribute.guidelines": "Guidelines",
    "dev.contribute.guidelinesDesc":
      "• Follow TypeScript best practices\n• Write meaningful commit messages\n• Add tests for new features\n• Respect Islamic values and content\n• Be kind and respectful to others",
    "dev.contribute.codeOfConduct": "Code of Conduct",
    "dev.contribute.helpAreas": "Areas Where You Can Contribute",
    "dev.contribute.frontend": "Frontend Development",
    "dev.contribute.frontendDesc": "React components, UI/UX improvements, responsive design, user experience enhancements, performance optimization, accessibility improvements",
    "dev.contribute.backend": "Backend Suggestions",
    "dev.contribute.backendDesc": "New API route suggestions, improvement requests for existing routes, data structure suggestions, performance improvement recommendations",
    "dev.contribute.translations": "Translation & Accessibility",
    "dev.contribute.translationsDesc": "Adding new languages, improving existing translations, interface accessibility updates, inclusive language support for the Islamic world",
    "dev.contribute.viewOnGithub": "View on GitHub",

    "dev.community.title": "Join Our Community",
    "dev.community.subtitle": "Connect with fellow developers and contributors from around the world.",
    "dev.community.github": "GitHub",
    "dev.community.githubDesc": "Issues, discussions, and code contributions.",
    "dev.community.email": "Email",
    "dev.community.emailDesc": "Direct contact for important matters.",
    "dev.community.viewRepository": "View Repository",
    "dev.community.sendEmail": "Send Email",
    "dev.community.discordDesc": "Community channels coming soon.",
    "dev.community.telegramDesc": "Community channels coming soon.",
    "dev.community.soon": "Community channels coming soon.",

    "dev.resources.title": "Developer Resources",
    "dev.resources.subtitle": "Everything you need to understand and contribute to the project.",
    "dev.resources.techStack": "Tech Stack",
    "dev.resources.framework": "Framework",
    "dev.resources.language": "Language",
    "dev.resources.styling": "Styling",
    "dev.resources.state": "State",
    "dev.resources.ui": "UI",
    "dev.resources.audio": "Audio",
    "dev.resources.apiDocs": "API Documentation",
    "dev.resources.apiDocsDesc": "Comprehensive API documentation for integrating with Quran data sources.",
    "dev.resources.designSystem": "Design System",
    "dev.resources.designSystemDesc": "Design guidelines, components, and patterns used throughout the application.",
    "dev.resources.documentation": "Documentation",
    "dev.resources.documentationDesc": "Detailed documentation for developers and contributors.",
    "dev.resources.apiReference": "API Reference (Coming Soon)",
    "dev.resources.dataSchema": "Data Schema (Coming Soon)",
    "dev.resources.componentLibrary": "Component Library (Coming Soon)",
    "dev.resources.designGuidelines": "Design Guidelines (Coming Soon)",
    "dev.resources.gettingStarted": "Getting Started Guide (Coming Soon)",
    "dev.resources.architecture": "Architecture Overview (Coming Soon)",
    "dev.resources.contact": "Contact & Support",
    "dev.resources.technicalQuestions": "Technical Questions",
    "dev.resources.technicalQuestionsDesc": "Use GitHub Discussions for technical questions and feature requests.",
    "dev.resources.bugReports": "Bug Reports",
    "dev.resources.bugReportsDesc": "Report bugs through GitHub Issues with detailed reproduction steps.",
    "dev.resources.generalInquiries": "General Inquiries",
    "dev.resources.generalInquiriesDesc": "Email us at",

    // Hero Section
    "hero.badge": "Open Source Community Project",
    "hero.arabicTitle": "القرآن الكريم",
    "hero.title": "Holy Quran",
    "hero.subtitle": "Modern Digital Reading Experience",
    "hero.description":
      "With the power of our developer community, we provide a modern reading experience that all Muslims and anyone who wants to learn the Quran can use comfortably.",
    "hero.startReading": "Start Reading",
    "hero.viewGithub": "View on GitHub",
    "hero.liveDemo": "Live Demo",
    "hero.diyanet": "Presidency of Religious Affairs",
    "hero.trust.contributors": "10K+ Contributors",
    "hero.trust.openSource": "100% Open Source",
    "hero.trust.community": "Community Driven",
    "hero.trust.rating": "5.0 Rating",
    "hero.stats.surahs": "Surahs",
    "hero.stats.pages": "Pages",
    "hero.stats.verses": "Verses",
    "hero.supportedBy": "Developed with the support of Diyanet İşleri Başkanlığı",

    // Features
    "features.title": "Useful Features",
    "features.subtitle": "Features designed to enhance your Quran reading experience",
    "features.typography.title": "Comfortable Reading",
    "features.typography.desc": "Eye-friendly reading experience with fonts optimized for Arabic texts",
    "features.audio.title": "Audio Recitation",
    "features.audio.desc": "Listen to verses with audio recitation from renowned reciters",
    "features.translation.title": "Translation Support",
    "features.translation.desc": "Meaning support with Turkish and English translation options",
    "features.bookmark.title": "Bookmarking",
    "features.bookmark.desc": "Bookmark verses and continue from where you left off",
    "features.darkMode.title": "Dark Mode",
    "features.darkMode.desc": "Eye-friendly dark theme option for night reading",
    "features.openSource.title": "Open Source",
    "features.openSource.desc": "Community-developed project where everyone can contribute",

    // Community
    "community.badge": "Community-Driven Development",
    "community.title": "Join Our Developer",
    "community.subtitle": "Community",
    "community.description":
      "Help us build the future of digital Quran applications. Open source, collaborative, and impactful.",
    "community.contribute": "Start Contributing",
    "community.cards.openSource.title": "Open Source",
    "community.cards.openSource.description": "Completely open source on GitHub. Fork, contribute, and adapt it to your needs.",
    "community.cards.modernTech.title": "Modern Tech",
    "community.cards.modernTech.description": "Built with Next.js 15, TypeScript, and modern web technologies.",
    "community.cards.globalImpact.title": "Global Impact",
    "community.cards.globalImpact.description": "Serve millions of Muslims worldwide with your contributions.",
    "community.cards.activeCommunity.title": "Active Community",
    "community.cards.activeCommunity.description": "Join our Discord and Telegram communities for discussions and support.",
    "community.stats.stars": "GitHub Stars",
    "community.stats.forks": "Forks",
    "community.stats.contributors": "Contributors",
    "community.stats.watchers": "Watchers",

    // CTA
    "cta.title": "Ready to Start Your",
    "cta.subtitle": "Quran Journey?",
    "cta.description": "Join thousands of Muslims who use our app for their daily Quran reading routine.",
    "cta.startNow": "Start Reading Now",
    "cta.mobileApp": "Mobile App (Coming Soon)",
    "cta.free": "Free forever",
    "cta.openSource": "Open source",
    "cta.noAds": "No ads",
    "cta.privacy": "Privacy focused",
    "cta.supportedBy": "Presidency of Religious Affairs",
    "cta.supportedByDesc": "developed with support",

    // Footer
    "footer.description": "Open-source digital Quran application built with modern web technologies",
    "footer.application": "Application",
    "footer.readQuran": "Read Quran",
    "footer.browsePages": "Browse Pages",
    "footer.browseSurahs": "Browse Surahs",
    "footer.developers": "Developers",
    "footer.getStarted": "Get Started",
    "footer.github": "GitHub",
    "footer.contribute": "Contribute",
    "footer.community": "Community",
    "footer.discord": "Discord",
    "footer.telegram": "Telegram",
    "footer.contact": "Contact",
    "footer.copyright": "© 2024 Quran Application. Open source project.",
    "footer.madeWith": "Made with",

    // Navigation
    "navigation.prevSurah": "Previous Surah",
    "navigation.nextSurah": "Next Surah",
    "navigation.surah": "Surah",
  },
}

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [language, setLanguage] = useState("tr")

  useEffect(() => {
    const savedLanguage = localStorage.getItem("language")
    if (savedLanguage && (savedLanguage === "tr" || savedLanguage === "en")) {
      setLanguage(savedLanguage)
    }
  }, [])

  const handleSetLanguage = (lang: string) => {
    setLanguage(lang)
    localStorage.setItem("language", lang)
  }

  const t = (key: string): string => {
    return translations[language as keyof typeof translations]?.[key as keyof typeof translations.tr] || key
  }

  return (
    <LanguageContext.Provider value={{ language, setLanguage: handleSetLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  )
}

export function useLanguage() {
  const context = useContext(LanguageContext)
  if (context === undefined) {
    throw new Error("useLanguage must be used within a LanguageProvider")
  }
  return context
}
