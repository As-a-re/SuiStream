import { Suspense } from "react"
import Navbar from "@/components/navbar"
import HeroSection from "@/components/hero-section"
import ContentSection from "@/components/content-section"
import FeatureSection from "@/components/feature-section"
import Footer from "@/components/footer"
import { ContentSkeleton } from "@/components/ui/content-skeleton"
import { fetchTrending, fetchPopularMovies, fetchPopularTVShows } from "@/lib/tmdb"

export default async function Home() {
  // Fetch data in parallel
  const [trendingData, moviesData, tvShowsData] = await Promise.all([
    fetchTrending(),
    fetchPopularMovies(),
    fetchPopularTVShows(),
  ])

  // Get featured content (first trending item with backdrop)
  const featuredContent = trendingData.results.find((item) => item.backdrop_path) || trendingData.results[0]

  return (
    <main className="min-h-screen bg-background">
      <Navbar />

      <Suspense fallback={<div className="h-[60vh] bg-gradient-to-b from-background/80 to-background animate-pulse" />}>
        <HeroSection content={featuredContent} />
      </Suspense>

      <div className="container px-4 mx-auto">
        <Suspense fallback={<ContentSkeleton />}>
          <ContentSection title="Trending Now" endpoint="trending" initialData={trendingData} />
        </Suspense>

        <Suspense fallback={<ContentSkeleton />}>
          <ContentSection title="Popular Movies" endpoint="movie" initialData={moviesData} />
        </Suspense>

        <Suspense fallback={<ContentSkeleton />}>
          <ContentSection title="Popular TV Shows" endpoint="tv" initialData={tvShowsData} />
        </Suspense>

        <Suspense fallback={<ContentSkeleton />}>
          <ContentSection
            title="NFT Exclusive Content"
            endpoint="exclusive"
            filter="exclusive"
            initialData={trendingData}
          />
        </Suspense>
      </div>

      <FeatureSection />
      <Footer />
    </main>
  )
}
