"use client"

import type React from "react"
import { Button } from "../components/ui/button"
import { Badge } from "../components/ui/badge"
import { Play, Info } from "lucide-react"
import { type ContentItem, getBackdropUrl } from "../lib/api"
import { useWallet } from "../contexts/WalletContext"

interface HeroSectionProps {
  content?: ContentItem
}

const HeroSection: React.FC<HeroSectionProps> = ({ content }) => {
  const { walletState, isContentOwned, purchaseContent } = useWallet()

  // Default content if none is provided
  const defaultContent = {
    id: 0,
    title: "The Digital Frontier",
    overview:
      "In a world where reality and digital space merge, one programmer discovers a code that could revolutionize blockchain technology forever—or destroy it completely.",
    year: "2023",
    backdrop_path: null,
    poster_path: "",
    vote_average: 9.8,
    release_date: "",
    media_type: "movie" as const,
    isExclusive: true,
    price: "40",
  }

  const heroContent = content || defaultContent
  const isOwned = heroContent.id ? isContentOwned(heroContent.id) : false
  const backgroundImage = getBackdropUrl(heroContent.backdrop_path)

  const handlePurchase = async () => {
    if (heroContent.id && heroContent.price) {
      await purchaseContent(heroContent.id, heroContent.price)
    }
  }

  return (
    <div
      className="relative w-full min-h-screen bg-cover bg-center"
      style={{ backgroundImage: `url(${backgroundImage})` }}
    >
      <div className="absolute inset-0 bg-gradient-to-r from-black via-black/70 to-transparent"></div>

      <div className="relative container pt-32 pb-20 flex flex-col justify-end min-h-screen">
        <div className="max-w-3xl">
          <div className="flex gap-2 mb-4">
            {heroContent.isExclusive && <Badge className="bg-sui-blue text-white">NFT Exclusive</Badge>}
            <Badge className="bg-white/10 text-white">
              {heroContent.media_type === "movie" ? "Movie" : "TV Series"}
            </Badge>
            <Badge className="bg-white/10 text-white">
              {heroContent.vote_average > 7 ? "Highly Rated" : "Featured"}
            </Badge>
          </div>

          <h1 className="text-4xl md:text-6xl font-bold mb-3 text-white">{heroContent.title}</h1>

          <div className="flex items-center space-x-4 mb-4">
            <div className="text-sui-blue font-medium">{Math.round(heroContent.vote_average * 10)}% Match</div>
            <div className="text-gray-400">{heroContent.year}</div>
            <div className="text-gray-400 border border-gray-700 px-1 text-xs">4K</div>
            <div className="text-gray-400">{heroContent.media_type === "movie" ? "2h 15m" : "Series"}</div>
          </div>

          <p className="text-lg text-gray-300 mb-8 md:w-3/4">{heroContent.overview}</p>

          <div className="flex space-x-4">
            {isOwned ? (
              <Button className="bg-sui-blue hover:bg-sui-blue-dark text-white px-8">
                <Play className="mr-2 h-4 w-4" /> Play
              </Button>
            ) : walletState.connected && heroContent.price ? (
              <Button className="bg-sui-blue hover:bg-sui-blue-dark text-white px-8" onClick={handlePurchase}>
                Buy {heroContent.price} SUI
              </Button>
            ) : (
              <Button
                className="bg-sui-blue hover:bg-sui-blue-dark text-white px-8"
                onClick={() => document.dispatchEvent(new CustomEvent("open-wallet-modal"))}
              >
                Connect Wallet
              </Button>
            )}
            <Button variant="outline" className="text-white border-white/20 hover:bg-white/10">
              <Info className="mr-2 h-4 w-4" /> More Info
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default HeroSection
