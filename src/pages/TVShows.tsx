"use client"

import { useState, useEffect } from "react"
import Navbar from "../components/Navbar"
import ContentRow from "../components/ContentRow"
import Footer from "../components/Footer"
import { fetchTVShows, type ContentItem } from "../lib/api"
import { useToast } from "../hooks/use-toast"
import { Skeleton } from "../components/ui/skeleton"

const TVShows = () => {
  const [tvShows, setTVShows] = useState<ContentItem[]>([])
  const [loading, setLoading] = useState(true)
  const [featuredContent, setFeaturedContent] = useState<ContentItem | undefined>(undefined)

  const { toast } = useToast()

  useEffect(() => {
    const loadData = async () => {
      try {
        setLoading(true)
        const tvList = await fetchTVShows()
        setTVShows(tvList)

        // Set featured content (first TV show)
        if (tvList.length > 0) {
          setFeaturedContent(tvList[0])
        }
      } catch (error) {
        console.error("Error loading content:", error)
        toast({
          title: "Error",
          description: "Failed to load TV shows. Please try again later.",
          variant: "destructive",
        })
      } finally {
        setLoading(false)
      }
    }

    loadData()
  }, [toast])

  // Group TV shows by category
  const dramaShows = tvShows.filter((_, index) => index % 3 === 0)
  const actionShows = tvShows.filter((_, index) => index % 3 === 1)
  const fantasyShows = tvShows.filter((_, index) => index % 3 === 2)

  return (
    <div className="min-h-screen bg-sui-dark text-white">
      <Navbar />

      <div className="container px-4 pt-24">
        <h1 className="text-3xl font-bold mb-6">TV Shows</h1>

        {loading ? (
          <div className="space-y-8 py-8">
            {[1, 2, 3].map((i) => (
              <div key={i} className="space-y-4">
                <Skeleton className="h-8 w-48 bg-gray-800/50" />
                <div className="flex gap-4 overflow-hidden">
                  {[1, 2, 3, 4].map((j) => (
                    <Skeleton key={j} className="h-64 w-44 bg-gray-800/50" />
                  ))}
                </div>
              </div>
            ))}
          </div>
        ) : (
          <>
            <ContentRow title="Popular TV Shows" contents={tvShows} onItemClick={(item) => setFeaturedContent(item)} />
            <ContentRow title="Drama" contents={dramaShows} onItemClick={(item) => setFeaturedContent(item)} />
            <ContentRow
              title="Action & Adventure"
              contents={actionShows}
              onItemClick={(item) => setFeaturedContent(item)}
            />
            <ContentRow
              title="Sci-Fi & Fantasy"
              contents={fantasyShows}
              onItemClick={(item) => setFeaturedContent(item)}
            />
          </>
        )}
      </div>

      <Footer />
    </div>
  )
}

export default TVShows
