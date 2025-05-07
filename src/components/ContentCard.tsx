"use client"

import type React from "react"
import { Badge } from "../components/ui/badge"
import { Button } from "../components/ui/button"
import { useWallet } from "../contexts/WalletContext"
import { toast } from "../hooks/use-toast"

interface ContentCardProps {
  id: number
  title: string
  image: string
  year: string
  isOwned?: boolean
  isExclusive?: boolean
  price?: string
  onClick?: () => void
}

const ContentCard: React.FC<ContentCardProps> = ({
  id,
  title,
  image,
  year,
  isOwned = false,
  isExclusive = false,
  price,
  onClick,
}) => {
  const { walletState, purchaseContent, isContentOwned } = useWallet()

  // Check if the content is owned by the user
  const owned = isOwned || isContentOwned(id)

  const handlePurchase = async (e: React.MouseEvent) => {
    e.stopPropagation()

    if (!walletState.connected) {
      toast({
        title: "Wallet Not Connected",
        description: "Connect your wallet to purchase content",
        variant: "destructive",
      })
      return
    }

    if (price) {
      await purchaseContent(id, price)
    }
  }

  return (
    <div
      className="movie-card group relative overflow-hidden rounded-lg transition-transform duration-300 hover:scale-105 hover:shadow-xl cursor-pointer"
      onClick={onClick}
    >
      <img src={image || "/placeholder.svg"} alt={title} className="w-full object-cover aspect-[2/3]" />

      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 p-4 flex flex-col justify-end">
        {isExclusive && <Badge className="absolute top-2 right-2 bg-sui-blue text-white">NFT Exclusive</Badge>}

        <div className="space-y-1">
          <h3 className="font-semibold text-white line-clamp-1">{title}</h3>
          <div className="flex items-center justify-between">
            <span className="text-sm text-gray-300">{year}</span>
            {owned ? (
              <Badge variant="outline" className="border-green-500 text-green-400 text-xs">
                Owned
              </Badge>
            ) : price && walletState.connected ? (
              <Button
                size="sm"
                className="bg-sui-blue hover:bg-sui-blue-dark text-white text-xs h-8 px-2"
                onClick={handlePurchase}
              >
                {price} SUI
              </Button>
            ) : price ? (
              <Badge className="bg-sui-blue-dark text-white text-xs">{price} SUI</Badge>
            ) : null}
          </div>
        </div>
      </div>
    </div>
  )
}

export default ContentCard
