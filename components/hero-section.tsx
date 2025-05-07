"use client"

import { useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { Play, Info, Star } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { useWallet } from "@/contexts/wallet-context"
import type { ContentItem } from "@/types/tmdb"
import { calculateContentPrice, formatReleaseYear } from "@/lib/utils"
import { purchaseContent } from "@/lib/sui-wallet"
import { useToast } from "@/hooks/use-toast"

interface HeroSectionProps {
  content: ContentItem
}

export default function HeroSection({ content }: HeroSectionProps) {
  const [isPurchasing, setIsPurchasing] = useState(false)
  const { walletState, isContentOwned, refreshWallet } = useWallet()
  const { toast } = useToast()

  // Calculate content price based on popularity and vote average
  const contentPrice = calculateContentPrice(content)

  // Check if content is owned
  const contentId = `${content.media_type}:${content.id}`
  const isOwned = isContentOwned(contentId)

  // Format backdrop URL
  const backdropUrl = content.backdrop_path
    ? `https://image.tmdb.org/t/p/original${content.backdrop_path}`
    : "/images/default-backdrop.jpg"

  // Handle purchase
  const handlePurchase = async () => {
    if (!walletState.connected) {
      document.dispatchEvent(new CustomEvent("open-wallet-modal"))
      return
    }

    setIsPurchasing(true)
    try {
      const success = await purchaseContent(contentId, contentPrice)
      if (success) {
        toast({
          title: "Purchase Successful",
          description: `You now own "${content.title || content.name}"`,
        })
        refreshWallet()
      }
    } catch (error) {
      toast({
        title: "Purchase Failed",
        description: "There was an error processing your purchase",
        variant: "destructive",
      })
    } finally {
      setIsPurchasing(false)
    }
  }

  return (
    <div className="relative w-full h-[80vh] min-h-[500px] max-h-[800px]">
      {/* Backdrop Image */}
      <div className="absolute inset-0 w-full h-full">
        <Image
          src={backdropUrl || "/placeholder.svg"}
          alt={content.title || content.name || "Featured content"}
          fill
          priority
          className="object-cover"
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-background via-background/70 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-t from-background via-background/20 to-transparent" />
      </div>

      {/* Content */}
      <div className="relative container h-full pt-32 pb-20 flex flex-col justify-end">
        <div className="max-w-3xl">
          <div className="flex flex-wrap gap-2 mb-4">
            {content.vote_average > 7.5 && (
              <Badge variant="secondary" className="bg-primary/20 text-primary">
                <Star className="h-3 w-3 mr-1 fill-primary" /> Top Rated
              </Badge>
            )}
            <Badge variant="outline">{content.media_type === "movie" ? "Movie" : "TV Series"}</Badge>
            {content.adult && <Badge variant="destructive">18+</Badge>}
          </div>

          <h1 className="text-4xl md:text-6xl font-bold mb-3">{content.title || content.name}</h1>

          <div className="flex items-center flex-wrap gap-x-4 gap-y-2 mb-4">
            {content.vote_average > 0 && (
              <div className="flex items-center text-primary">
                <Star className="h-4 w-4 mr-1 fill-primary" />
                <span className="font-medium">{content.vote_average.toFixed(1)}</span>
              </div>
            )}
            <div className="text-muted-foreground">
              {formatReleaseYear(content.release_date || content.first_air_date)}
            </div>
            {content.original_language && (
              <div className="text-muted-foreground uppercase text-xs border border-border px-2 py-0.5 rounded">
                {content.original_language}
              </div>
            )}
          </div>

          <p className="text-lg text-muted-foreground mb-8 md:w-3/4 line-clamp-3">{content.overview}</p>

          <div className="flex flex-wrap gap-4">
            {isOwned ? (
              <Button size="lg" className="gap-2">
                <Play className="h-4 w-4" /> Play
              </Button>
            ) : walletState.connected ? (
              <Button size="lg" onClick={handlePurchase} disabled={isPurchasing} className="gap-2">
                {isPurchasing ? "Processing..." : `Buy for ${contentPrice} SUI`}
              </Button>
            ) : (
              <Button
                size="lg"
                onClick={() => document.dispatchEvent(new CustomEvent("open-wallet-modal"))}
                className="gap-2"
              >
                Connect Wallet
              </Button>
            )}

            <Link href={`/title/${content.media_type}/${content.id}`}>
              <Button variant="outline" size="lg" className="gap-2">
                <Info className="h-4 w-4" /> More Info
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}
