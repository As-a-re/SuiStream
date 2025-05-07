"use client"

import { useState, useEffect } from "react"
import Navbar from "../components/Navbar"
import HeroSection from "../components/HeroSection"
import ContentRow from "../components/ContentRow"
import FeatureSection from "../components/FeatureSection"
import Footer from "../components/Footer"
import WalletConnect from "../components/WalletConnect"
import { fetchTrending, fetchMovies, fetchTVShows, type ContentItem } from "../lib/api"
import { useToast } from "../hooks/use-toast"
import { Skeleton } from "../components/ui/skeleton"
import { useWallet } from "../contexts/WalletContext"

const Index = () => {
  const [showWalletModal, setShowWalletModal] = useState(false)
  const [trendingContent, setTrendingContent] = useState<ContentItem[]>([])
  const [movies, setMovies] = useState<ContentItem[]>([])
  const [tvShows, setTVShows] = useState<ContentItem[]>([])
  const [loading, setLoading] = useState(true)
  const [featuredContent, setFeaturedContent] = useState<ContentItem | undefined>(undefined)

  const { toast } = useToast()
  const { walletState } = useWallet()

  useEffect(() => {
    const loadData = async () => {
      try {
        setLoading(true)

        // Fetch data in parallel
        const [trending, moviesList, tvList] = await Promise.all([fetchTrending(), fetchMovies(), fetchTVShows()])

        setTrendingContent(trending)
        setMovies(moviesList)
        setTVShows(tvList)

        // Set featured content (first trending item)
        if (trending.length > 0) {
          setFeaturedContent(trending[0])
        }
      } catch (error) {
        console.error("Error loading content:", error)
        toast({
          title: "Error",
          description: "Failed to load content. Please try again later.",
          variant: "destructive",
        })
      } finally {
        setLoading(false)
      }
    }

    loadData()
  }, [toast])

  // Listen for wallet modal events
  useEffect(() => {
    const handleOpenWalletModal = () => setShowWalletModal(true)
    document.addEventListener("open-wallet-modal", handleOpenWalletModal)

    return () => {
      document.removeEventListener("open-wallet-modal", handleOpenWalletModal)
    }
  }, [])

  // Get exclusive NFT content (items with isExclusive=true)
  const exclusiveContent = [
    ...trendingContent.filter((item) => item.isExclusive),
    ...movies.filter((item) => item.isExclusive),
    ...tvShows.filter((item) => item.isExclusive),
  ].slice(0, 8) // Limit to 8 items

  return (
    <div className="min-h-screen bg-sui-dark text-white">
      <Navbar />

      {loading ? (
        <div className="pt-16">
          <Skeleton className="w-full h-screen bg-gray-800/50" />
        </div>
      ) : (
        <HeroSection content={featuredContent} />
      )}

      <div className="container px-4">
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
            <ContentRow
              title="Trending Now"
              contents={trendingContent}
              onItemClick={(item) => setFeaturedContent(item)}
            />
            <ContentRow title="Popular Movies" contents={movies} onItemClick={(item) => setFeaturedContent(item)} />
            <ContentRow title="Popular TV Shows" contents={tvShows} onItemClick={(item) => setFeaturedContent(item)} />
            {exclusiveContent.length > 0 && (
              <ContentRow
                title="Exclusive NFT Content"
                contents={exclusiveContent}
                onItemClick={(item) => setFeaturedContent(item)}
              />
            )}
          </>
        )}
      </div>

      <FeatureSection />
      <Footer />

      {showWalletModal && <WalletConnect onClose={() => setShowWalletModal(false)} />}

      {/* Floating Connect Button for Mobile */}
      {!walletState.connected && (
        <div className="md:hidden fixed bottom-6 right-6">
          <button
            onClick={() => setShowWalletModal(true)}
            className="bg-sui-blue rounded-full p-4 text-white shadow-lg hover:bg-sui-blue-dark transition-colors"
          >
            Connect Wallet
          </button>
        </div>
      )}
    </div>
  )
}

export default Index
