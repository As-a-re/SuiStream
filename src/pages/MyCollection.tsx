"use client"

import { useState, useEffect } from "react"
import Navbar from "../components/Navbar"
import ContentRow from "../components/ContentRow"
import Footer from "../components/Footer"
import { fetchTrending, fetchMovies, fetchTVShows, type ContentItem } from "../lib/api"
import { useToast } from "../hooks/use-toast"
import { Skeleton } from "../components/ui/skeleton"
import { useWallet } from "../contexts/WalletContext"

const MyCollection = () => {
  const [allContent, setAllContent] = useState<ContentItem[]>([])
  const [loading, setLoading] = useState(true)
  const { toast } = useToast()
  const { walletState, isContentOwned } = useWallet()

  useEffect(() => {
    const loadData = async () => {
      try {
        setLoading(true)

        // Fetch all content
        const [trending, movies, tvShows] = await Promise.all([fetchTrending(), fetchMovies(), fetchTVShows()])

        // Combine all content
        setAllContent([...trending, ...movies, ...tvShows])
      } catch (error) {
        console.error("Error loading content:", error)
        toast({
          title: "Error",
          description: "Failed to load your collection. Please try again later.",
          variant: "destructive",
        })
      } finally {
        setLoading(false)
      }
    }

    loadData()
  }, [toast])

  // Filter content to only show owned items
  const ownedContent = allContent.filter((item) => isContentOwned(item.id))
  const ownedMovies = ownedContent.filter((item) => item.media_type === "movie")
  const ownedTVShows = ownedContent.filter((item) => item.media_type === "tv")

  return (
    <div className="min-h-screen bg-sui-dark text-white">
      <Navbar />

      <div className="container px-4 pt-24">
        <h1 className="text-3xl font-bold mb-6">My Collection</h1>

        {!walletState.connected ? (
          <div className="flex flex-col items-center justify-center py-20">
            <p className="text-xl text-gray-400 mb-6">Connect your wallet to view your collection</p>
            <button
              onClick={() => document.dispatchEvent(new CustomEvent("open-wallet-modal"))}
              className="bg-sui-blue hover:bg-sui-blue-dark text-white px-6 py-3 rounded-lg font-medium"
            >
              Connect Wallet
            </button>
          </div>
        ) : loading ? (
          <div className="space-y-8 py-8">
            {[1, 2].map((i) => (
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
        ) : ownedContent.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-20">
            <p className="text-xl text-gray-400 mb-6">You don't own any content yet</p>
            <button
              onClick={() => document.dispatchEvent(new CustomEvent("navigate-to", { detail: "/" }))}
              className="bg-sui-blue hover:bg-sui-blue-dark text-white px-6 py-3 rounded-lg font-medium"
            >
              Browse Content
            </button>
          </div>
        ) : (
          <>
            <ContentRow title="All Owned Content" contents={ownedContent} />
            {ownedMovies.length > 0 && <ContentRow title="Movies" contents={ownedMovies} />}
            {ownedTVShows.length > 0 && <ContentRow title="TV Shows" contents={ownedTVShows} />}
          </>
        )}
      </div>

      <Footer />
    </div>
  )
}

export default MyCollection
