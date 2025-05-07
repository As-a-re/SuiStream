import { Suspense } from "react"
import { notFound, redirect } from "next/navigation"
import Navbar from "@/components/navbar"
import Footer from "@/components/footer"
import { fetchContentDetails, fetchContentVideos } from "@/lib/tmdb"
import VideoPlayer from "@/components/video-player"
import { Button } from "@/components/ui/button"
import { ArrowLeft } from "lucide-react"
import Link from "next/link"
import { cookies } from "next/headers"
import type { Metadata } from "next"

interface WatchPageProps {
  params: {
    type: string
    id: string
  }
}

export async function generateMetadata({ params }: WatchPageProps): Promise<Metadata> {
  const { type, id } = params

  if (type !== "movie" && type !== "tv") {
    return {
      title: "Content Not Found - SuiStream",
    }
  }

  try {
    const content = await fetchContentDetails(type, Number.parseInt(id))

    return {
      title: `Watch ${content.title || content.name} - SuiStream`,
      description: content.overview,
    }
  } catch (error) {
    return {
      title: "Content Not Found - SuiStream",
    }
  }
}

export default async function WatchPage({ params }: WatchPageProps) {
  const { type, id } = params
  const cookieStore = cookies()
  const walletConnected = cookieStore.get("wallet_connected")?.value === "true"

  // Check if wallet is connected
  if (!walletConnected) {
    // Redirect to content page with auth required message
    redirect(`/title/${type}/${id}?auth_required=true`)
  }

  // Validate content type
  if (type !== "movie" && type !== "tv") {
    notFound()
  }

  try {
    // Fetch content details and videos
    const [content, videos] = await Promise.all([
      fetchContentDetails(type, Number.parseInt(id)),
      fetchContentVideos(type, Number.parseInt(id)),
    ])

    // Find a trailer or teaser video
    const trailer = videos.results.find(
      (video) => video.type === "Trailer" || video.type === "Teaser" || video.type === "Clip",
    )

    // If no trailer is found, use a placeholder
    const videoSrc = trailer
      ? `https://www.youtube.com/embed/${trailer.key}?autoplay=1&controls=0&modestbranding=1&rel=0`
      : "/videos/placeholder-video.mp4"

    // For YouTube videos, we'll use an iframe instead of our custom player
    const isYouTube = videoSrc.includes("youtube.com")

    // Get backdrop for poster
    const posterUrl = content.backdrop_path ? `https://image.tmdb.org/t/p/original${content.backdrop_path}` : undefined

    return (
      <main className="min-h-screen bg-background">
        <Navbar />

        <div className="container px-4 mx-auto pt-24 pb-12">
          <div className="mb-6 flex items-center">
            <Link href={`/title/${type}/${id}`}>
              <Button variant="ghost" className="gap-2">
                <ArrowLeft className="h-4 w-4" /> Back to details
              </Button>
            </Link>
            <h1 className="text-2xl font-bold ml-4">{content.title || content.name}</h1>
          </div>

          <Suspense fallback={<div className="w-full aspect-video bg-muted animate-pulse rounded-lg" />}>
            {isYouTube ? (
              <div className="w-full aspect-video rounded-lg overflow-hidden">
                <iframe
                  src={videoSrc}
                  className="w-full h-full"
                  allowFullScreen
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                />
              </div>
            ) : (
              <VideoPlayer src={videoSrc} poster={posterUrl} title={content.title || content.name || ""} />
            )}
          </Suspense>

          <div className="mt-8">
            <h2 className="text-xl font-semibold mb-2">About {content.title || content.name}</h2>
            <p className="text-muted-foreground">{content.overview}</p>
          </div>
        </div>

        <Footer />
      </main>
    )
  } catch (error) {
    notFound()
  }
}
