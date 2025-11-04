"use client";

import { useQuery } from "@tanstack/react-query";
import { getSurahList } from "@/services/quran-api";
import { useLanguage } from "@/components/language-provider";

export function useSurahName() {
  const { language } = useLanguage();

  const { data: surahs } = useQuery({
    queryKey: ["surahs"],
    queryFn: getSurahList,
  });

  const getSurahName = (id: number) => {
    const surah = surahs?.find((item) => item.id === id);
    if (!surah) return `${id}. sure`;
    const name = language === "tr" ? surah.names.tr : surah.names.en;
    return `${id}. ${name} suresi`;
  };

  return { getSurahName, surahs };
}
