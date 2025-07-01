import { redirect } from "next/navigation"

export default function QuranPage() {
  // Redirect to first page by default
  redirect("/quran/page/1")
}
