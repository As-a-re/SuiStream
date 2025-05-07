"use client"

import { useEffect, useState } from "react"
import Navbar from "@/components/navbar"
import Footer from "@/components/footer"
import ContentGrid from "@/components/content-grid"
import { Button } from "@/components/ui/button"
import { useWallet } from "@/contexts/wallet-context"
import { fetchContentDetails } from "@/lib/tmdb"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import type { ContentItem } from "@/types/tmdb"
import { Loader2 } from "lucide-react"

export default function CollectionPage() {
  const { walletState, isContentOwned } = useWallet()
  const [ownedContent, setOwnedContent] = useState<ContentItem[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function loadOwnedContent() {
      if (!walletState.connected || walletState.ownedContentIds.length === 0) {
        setLoading(false)
        return
      }

      setLoading(true)
      try {
        // Fetch details for each owned content
        const contentPromises = walletState.ownedContentIds.map(async (contentId) => {
          const { type, id } = parseContentId(contentId)
          return await fetchContentDetails(type, id)
        })

        const contentDetails = await Promise.all(contentPromises)
        setOwnedContent(contentDetails.filter(Boolean))
      } catch (error) {
        console.error("Error loading owned content:", error)
      } finally {
        setLoading(false)
      }
    }

    loadOwnedContent()
  }, [walletState.connected, walletState.ownedContentIds])

  // Helper to parse content ID format "type:id"
  function parseContentId(contentId: string) {
    const [type, id] = contentId.split(":")
    return { type: type as "movie" | "tv", id: Number(id) }
  }

  // Filter content by type
  const ownedMovies = ownedContent.filter((item) => item.media_type === "movie")
  const ownedTVShows = ownedContent.filter((item) => item.media_type === "tv")

  return (
    <main className="min-h-screen bg-background">
      <Navbar />

      <div className="container px-4 mx-auto pt-24 pb-12">
        <h1 className="text-3xl font-bold mb-6">My Collection</h1>

        {!walletState.connected ? (
          <div className="flex flex-col items-center justify-center py-20 bg-card rounded-lg border">
            <p className="text-xl text-muted-foreground mb-6">Connect your wallet to view your collection</p>
            <Button size="lg" onClick={() => document.dispatchEvent(new CustomEvent("open-wallet-modal"))}>
              Connect Wallet
            </Button>
          </div>
        ) : loading ? (
          <div className="flex flex-col items-center justify-center py-20">
            <Loader2 className="h-10 w-10 animate-spin text-primary mb-4" />
            <p className="text-muted-foreground">Loading your collection...</p>
          </div>
        ) : ownedContent.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-20 bg-card rounded-lg border">
            <p className="text-xl text-muted-foreground mb-6">You don't own any content yet</p>
            <Button size="lg" onClick={() => (window.location.href = "/")}>
              Browse Content
            </Button>
          </div>
        ) : (
          <Tabs defaultValue="all">
            <TabsList className="mb-6">
              <TabsTrigger value="all">All Content ({ownedContent.length})</TabsTrigger>
              <TabsTrigger value="movies">Movies ({ownedMovies.length})</TabsTrigger>
              <TabsTrigger value="tvshows">TV Shows ({ownedTVShows.length})</TabsTrigger>
            </TabsList>

            <TabsContent value="all">
              <ContentGrid contents={ownedContent} />
            </TabsContent>

            <TabsContent value="movies">
              <ContentGrid contents={ownedMovies} />
            </TabsContent>

            <TabsContent value="tvshows">
              <ContentGrid contents={ownedTVShows} />
            </TabsContent>
          </Tabs>
        )}
      </div>

      <Footer />
    </main>
  )
}
