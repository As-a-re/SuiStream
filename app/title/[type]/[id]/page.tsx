import { Suspense } from "react"
import { notFound } from "next/navigation"
import Navbar from "@/components/navbar"
import Footer from "@/components/footer"
import ContentDetails from "@/components/content-details"
import { ContentDetailsSkeleton } from "@/components/ui/content-skeleton"
import { fetchContentDetails, fetchSimilarContent, fetchContentCredits } from "@/lib/tmdb"
import ContentSection from "@/components/content-section"
import type { Metadata } from "next"

interface TitlePageProps {
  params: {
    type: string
    id: string
  }
  searchParams: {
    auth_required?: string
  }
}

export async function generateMetadata({ params }: TitlePageProps): Promise<Metadata> {
  const { type, id } = params

  if (type !== "movie" && type !== "tv") {
    return {
      title: "Content Not Found - SuiStream",
    }
  }

  try {
    const content = await fetchContentDetails(type, Number.parseInt(id))

    return {
      title: `${content.title || content.name} - SuiStream`,
      description: content.overview,
      openGraph: {
        images: content.backdrop_path ? [`https://image.tmdb.org/t/p/w1280${content.backdrop_path}`] : undefined,
      },
    }
  } catch (error) {
    return {
      title: "Content Not Found - SuiStream",
    }
  }
}

export default async function TitlePage({ params, searchParams }: TitlePageProps) {
  const { type, id } = params
  const authRequired = searchParams.auth_required === "true"

  // Validate content type
  if (type !== "movie" && type !== "tv") {
    notFound()
  }

  try {
    // Fetch content details, similar content, and credits in parallel
    const [content, similarContent, credits] = await Promise.all([
      fetchContentDetails(type, Number.parseInt(id)),
      fetchSimilarContent(type, Number.parseInt(id)),
      fetchContentCredits(type, Number.parseInt(id)),
    ])

    return (
      <main className="min-h-screen bg-background">
        <Navbar />

        {authRequired && (
          <div className="container px-4 mx-auto pt-20">
            <div className="bg-yellow-500/10 border border-yellow-500/50 text-yellow-700 dark:text-yellow-300 p-4 rounded-lg mb-6">
              <p className="font-medium">Wallet connection required</p>
              <p className="text-sm">You need to connect your Sui wallet to watch this content.</p>
            </div>
          </div>
        )}

        <Suspense fallback={<ContentDetailsSkeleton />}>
          <ContentDetails content={content} credits={credits} />
        </Suspense>

        <div className="container px-4 mx-auto pb-12">
          <Suspense fallback={<ContentDetailsSkeleton />}>
            <ContentSection title="More Like This" endpoint={`${type}/${id}/similar`} initialData={similarContent} />
          </Suspense>
        </div>

        <Footer />
      </main>
    )
  } catch (error) {
    notFound()
  }
}
