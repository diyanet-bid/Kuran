import { QuranReader } from "@/components/quran/quran-reader";
import { QuranNavigation } from "@/components/quran/quran-navigation";
import { Header } from "@/components/layout/header";
import { Metadata } from "next";
import { Footer } from "@/components/layout/footer";

interface PageProps {
  params: {
    number: string;
  };
}

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const resolvedParams = await params;
  const pageNumber = parseInt(resolvedParams.number);

  return {
    title: `Sayfa ${pageNumber} - Kuran-ı Kerim`,
    description: `Kuran-ı Kerim'in ${pageNumber}. sayfasını okuyun.`,
  };
}

export default async function QuranPageView({ params }: PageProps) {
  const resolvedParams = await params;
  const pageNumber = parseInt(resolvedParams.number);

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <div className="container mx-auto px-2 sm:px-4 py-4 sm:py-8">
        <QuranNavigation currentPage={pageNumber} />
        <QuranReader pageNumber={pageNumber} />
      </div>
      <Footer />
    </div>
  );
}
