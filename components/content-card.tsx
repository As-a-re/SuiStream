"use client"

import type React from "react"

import { useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { useWallet } from "@/contexts/wallet-context"
import type { ContentItem } from "@/types/tmdb"
import { calculateContentPrice, formatReleaseYear } from "@/lib/utils"
import { purchaseContent } from "@/lib/sui-wallet"
import { useToast } from "@/hooks/use-toast"
import { Star } from "lucide-react"

interface ContentCardProps {
  content: ContentItem
}

export default function ContentCard({ content }: ContentCardProps) {
  const [isPurchasing, setIsPurchasing] = useState(false)
  const { walletState, isContentOwned, refreshWallet } = useWallet()
  const { toast } = useToast()

  // Calculate content price based on popularity and vote average
  const contentPrice = calculateContentPrice(content)

  // Check if content is owned
  const contentId = `${content.media_type}:${content.id}`
  const isOwned = isContentOwned(contentId)

  // Format poster URL
  const posterUrl = content.poster_path
    ? `https://image.tmdb.org/t/p/w500${content.poster_path}`
    : "/images/default-poster.jpg"

  // Handle purchase
  const handlePurchase = async (e: React.MouseEvent) => {
    e.preventDefault()
    e.stopPropagation()

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
    <Link href={`/title/${content.media_type}/${content.id}`}>
      <div className="group relative overflow-hidden rounded-lg transition-transform duration-300 hover:scale-105 hover:shadow-xl">
        <div className="aspect-[2/3] relative bg-muted">
          <Image
            src={posterUrl || "/placeholder.svg"}
            alt={content.title || content.name || "Content poster"}
            fill
            sizes="(max-width: 768px) 180px, 200px"
            className="object-cover"
          />
        </div>

        <div className="absolute inset-0 bg-gradient-to-t from-background/90 via-background/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 p-4 flex flex-col justify-end">
          {content.vote_average > 7.5 && (
            <Badge className="absolute top-2 right-2 bg-primary/20 text-primary">
              <Star className="h-3 w-3 mr-1 fill-primary" /> {content.vote_average.toFixed(1)}
            </Badge>
          )}

          <div className="space-y-1">
            <h3 className="font-semibold line-clamp-2">{content.title || content.name}</h3>
            <div className="flex items-center justify-between">
              <span className="text-xs text-muted-foreground">
                {formatReleaseYear(content.release_date || content.first_air_date)}
              </span>

              {isOwned ? (
                <Badge variant="outline" className="border-green-500 text-green-400 text-xs">
                  Owned
                </Badge>
              ) : walletState.connected ? (
                <Button
                  size="sm"
                  variant="secondary"
                  className="text-xs h-7 px-2"
                  onClick={handlePurchase}
                  disabled={isPurchasing}
                >
                  {isPurchasing ? "..." : `${contentPrice} SUI`}
                </Button>
              ) : (
                <Badge variant="outline" className="text-xs">
                  {contentPrice} SUI
                </Badge>
              )}
            </div>
          </div>
        </div>
      </div>
    </Link>
  )
}
