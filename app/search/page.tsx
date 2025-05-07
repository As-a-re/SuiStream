import { Suspense } from "react"
import Navbar from "@/components/navbar"
import Footer from "@/components/footer"
import SearchResults from "@/components/search-results"
import { ContentSkeleton } from "@/components/ui/content-skeleton"
import { searchContent } from "@/lib/tmdb"
import type { Metadata } from "next"

interface SearchPageProps {
  searchParams: {
    q?: string
  }
}

export function generateMetadata({ searchParams }: SearchPageProps): Metadata {
  const query = searchParams.q || ""

  return {
    title: query ? `Search results for "${query}" - SuiStream` : "Search - SuiStream",
    description:
      "Search for movies and TV shows on SuiStream, the decentralized streaming platform built on Sui blockchain.",
  }
}

export default async function SearchPage({ searchParams }: SearchPageProps) {
  const query = searchParams.q || ""

  // Only fetch results if there's a query
  const searchResults = query ? await searchContent(query) : null

  return (
    <main className="min-h-screen bg-background">
      <Navbar />

      <div className="container px-4 mx-auto pt-24 pb-12">
        <h1 className="text-3xl font-bold mb-6">{query ? `Search results for "${query}"` : "Search"}</h1>

        <Suspense fallback={<ContentSkeleton />}>
          <SearchResults query={query} initialResults={searchResults} />
        </Suspense>
      </div>

      <Footer />
    </main>
  )
}
