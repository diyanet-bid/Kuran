import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function getOrdinal(n: number, lang: string) {
  if (lang === "tr") return ".";
  if (lang === "en") return getEnglishOrdinal(n);  
  return n.toString();
}

export function getEnglishOrdinal(n: number): string {
  const v = n % 100;

  if (v >= 11 && v <= 13) {
    return "th";
  }

  switch (n % 10) {
    case 1:
      return "st";
    case 2:
      return "nd";
    case 3:
      return "rd";
    default:
      return "th";
  }
}
