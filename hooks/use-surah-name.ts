"use client";

import { useQuery } from "@tanstack/react-query";
import { getSurahList } from "@/services/quran-api";
import { useLanguage } from "@/components/language-provider";

export function useSurahName() {
  const { language, t } = useLanguage();

  const { data: surahs } = useQuery({
    queryKey: ["surahs"],
    queryFn: getSurahList,
  });

  const getSurahName = (id: number) => {
    const surah = surahs?.find((item) => item.id === id);
    if (!surah) return `${id}. ${t("quran.surah")}`;
    const name = language === "tr" ? surah.names.tr : surah.names.en;
    return `${id}. ${name} ${t("quran.surahSuffix")}`;
  };

  return { getSurahName, surahs };
}
