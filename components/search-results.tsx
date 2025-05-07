"use client"

import { useState, useEffect } from "react"
import { searchContent } from "@/lib/tmdb"
import ContentGrid from "@/components/content-grid"
import { Button } from "@/components/ui/button"
import { Loader2 } from "lucide-react"
import type { TMDBResponse } from "@/types/tmdb"

interface SearchResultsProps {
  query: string
  initialResults: TMDBResponse | null
}

export default function SearchResults({ query, initialResults }: SearchResultsProps) {
  const [results, setResults] = useState(initialResults?.results || [])
  const [page, setPage] = useState(1)
  const [hasMore, setHasMore] = useState(initialResults ? initialResults.total_pages > 1 : false)
  const [isLoading, setIsLoading] = useState(false)

  // Reset results when query changes
  useEffect(() => {
    if (initialResults) {
      setResults(initialResults.results)
      setPage(1)
      setHasMore(initialResults.total_pages > 1)
    } else {
      setResults([])
      setHasMore(false)
    }
  }, [initialResults, query])

  // Load more results
  const loadMore = async () => {
    if (!query || isLoading || !hasMore) return

    setIsLoading(true)
    try {
      const nextPage = page + 1
      const moreResults = await searchContent(query, nextPage)

      setResults((prev) => [...prev, ...moreResults.results])
      setPage(nextPage)
      setHasMore(nextPage < moreResults.total_pages)
    } catch (error) {
      console.error("Error loading more search results:", error)
    } finally {
      setIsLoading(false)
    }
  }

  if (!query) {
    return (
      <div className="py-12 text-center">
        <p className="text-muted-foreground">Enter a search term to find movies and TV shows</p>
      </div>
    )
  }

  if (results.length === 0 && !isLoading) {
    return (
      <div className="py-12 text-center">
        <p className="text-muted-foreground">No results found for "{query}"</p>
        <p className="text-sm mt-2">Try a different search term or browse our categories</p>
      </div>
    )
  }

  return (
    <div className="space-y-8">
      <ContentGrid contents={results} />

      {hasMore && (
        <div className="flex justify-center pt-4">
          <Button onClick={loadMore} disabled={isLoading} className="min-w-[200px]">
            {isLoading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Loading...
              </>
            ) : (
              "Load More Results"
            )}
          </Button>
        </div>
      )}
    </div>
  )
}
