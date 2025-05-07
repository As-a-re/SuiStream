"use client"

import { useState, useEffect } from "react"
import Navbar from "../components/Navbar"
import ContentRow from "../components/ContentRow"
import Footer from "../components/Footer"
import { fetchMovies, type ContentItem } from "../lib/api"
import { useToast } from "../hooks/use-toast"
import { Skeleton } from "../components/ui/skeleton"

const Movies = () => {
  const [movies, setMovies] = useState<ContentItem[]>([])
  const [loading, setLoading] = useState(true)
  const [featuredContent, setFeaturedContent] = useState<ContentItem | undefined>(undefined)

  const { toast } = useToast()

  useEffect(() => {
    const loadData = async () => {
      try {
        setLoading(true)
        const moviesList = await fetchMovies()
        setMovies(moviesList)

        // Set featured content (first movie)
        if (moviesList.length > 0) {
          setFeaturedContent(moviesList[0])
        }
      } catch (error) {
        console.error("Error loading content:", error)
        toast({
          title: "Error",
          description: "Failed to load movies. Please try again later.",
          variant: "destructive",
        })
      } finally {
        setLoading(false)
      }
    }

    loadData()
  }, [toast])

  // Group movies by genre or category
  const actionMovies = movies.filter((_, index) => index % 3 === 0)
  const comedyMovies = movies.filter((_, index) => index % 3 === 1)
  const dramaMovies = movies.filter((_, index) => index % 3 === 2)

  return (
    <div className="min-h-screen bg-sui-dark text-white">
      <Navbar />

      <div className="container px-4 pt-24">
        <h1 className="text-3xl font-bold mb-6">Movies</h1>

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
            <ContentRow title="Popular Movies" contents={movies} onItemClick={(item) => setFeaturedContent(item)} />
            <ContentRow
              title="Action & Adventure"
              contents={actionMovies}
              onItemClick={(item) => setFeaturedContent(item)}
            />
            <ContentRow title="Comedy" contents={comedyMovies} onItemClick={(item) => setFeaturedContent(item)} />
            <ContentRow title="Drama" contents={dramaMovies} onItemClick={(item) => setFeaturedContent(item)} />
          </>
        )}
      </div>

      <Footer />
    </div>
  )
}

export default Movies
