import type React from "react";
import type { Metadata } from "next";
import { Inter, Amiri } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";
import { QueryProvider } from "@/components/query-provider";
import { LanguageProvider } from "@/components/language-provider";
import { Toaster } from "@/components/ui/toaster";

const inter = Inter({
    subsets: ["latin"],
    variable: "--font-inter",
});

const amiri = Amiri({
    subsets: ["arabic"],
    weight: ["400", "700"],
    variable: "--font-amiri",
});

export const metadata: Metadata = {
    title: "Kuran-ı Kerim Uygulaması - Open Source Digital Quran",
    description:
        "Modern, açık kaynaklı dijital Kuran-ı Kerim uygulaması. Sesli okuma, meal, güzel tipografi ile topluluk tarafından geliştirilmektedir.",
    keywords: [
        "Kuran",
        "Quran",
        "İslam",
        "Islam",
        "Arapça",
        "Arabic",
        "Meal",
        "Translation",
        "Açık Kaynak",
        "Open Source",
    ],
    generator: "v0.dev",
};

export default function RootLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <html lang="tr" suppressHydrationWarning>
            <body
                className={`${inter.variable} ${amiri.variable} font-sans antialiased !overflow-x-hidden`}
            >
                <ThemeProvider
                    attribute="class"
                    defaultTheme="system"
                    enableSystem
                    disableTransitionOnChange={false}
                    storageKey="quran-app-theme"
                >
                    <LanguageProvider>
                        <QueryProvider>
                            {children}
                            <Toaster />
                        </QueryProvider>
                    </LanguageProvider>
                </ThemeProvider>
            </body>
        </html>
    );
}
