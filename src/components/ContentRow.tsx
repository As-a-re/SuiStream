"use client"

import React, { useState, useEffect } from "react"
import { ChevronLeft, ChevronRight } from "lucide-react"
import ContentCard from "./ContentCard"
import { Button } from "@/components/ui/button"
import type { ContentItem } from "@/lib/api"
import { useWallet } from "@/contexts/WalletContext"

interface ContentRowProps {
  title: string
  contents: ContentItem[]
  onItemClick?: (item: ContentItem) => void
}

const ContentRow: React.FC<ContentRowProps> = ({ title, contents, onItemClick }) => {
  const [scrollPosition, setScrollPosition] = useState(0)
  const { isContentOwned } = useWallet()

  const scrollRef = React.useRef<HTMLDivElement>(null)

  const scroll = (direction: "left" | "right") => {
    const container = scrollRef.current
    if (!container) return

    const scrollAmount = direction === "left" ? -container.clientWidth / 2 : container.clientWidth / 2

    container.scrollBy({ left: scrollAmount, behavior: "smooth" })
  }

  // Update scroll position to show scroll buttons when needed
  const handleScroll = () => {
    if (scrollRef.current) {
      setScrollPosition(scrollRef.current.scrollLeft)
    }
  }

  useEffect(() => {
    const container = scrollRef.current
    if (container) {
      container.addEventListener("scroll", handleScroll)
      return () => container.removeEventListener("scroll", handleScroll)
    }
  }, [])

  const handleItemClick = (item: ContentItem) => {
    if (onItemClick) {
      onItemClick(item)
    }
  }

  const maxScroll = scrollRef.current ? scrollRef.current.scrollWidth - scrollRef.current.clientWidth : 0

  const showLeftButton = scrollPosition > 10
  const showRightButton = scrollRef.current && scrollPosition < maxScroll - 10

  return (
    <section className="py-8 relative">
      <h2 className="text-xl font-semibold text-white mb-4">{title}</h2>

      <div className="relative group">
        {showLeftButton && (
          <Button
            variant="ghost"
            size="icon"
            className="absolute left-0 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white z-10 rounded-full h-10 w-10"
            onClick={() => scroll("left")}
          >
            <ChevronLeft className="h-6 w-6" />
          </Button>
        )}

        <div
          ref={scrollRef}
          className="flex space-x-4 overflow-x-auto pb-4 scrollbar-hide"
          style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
        >
          {contents.map((content) => (
            <div key={content.id} className="flex-none w-[180px] md:w-[220px]">
              <ContentCard
                id={content.id}
                title={content.title}
                image={content.image}
                year={content.year}
                isOwned={isContentOwned(content.id)}
                isExclusive={content.isExclusive}
                price={content.price}
                onClick={() => handleItemClick(content)}
              />
            </div>
          ))}
        </div>

        {showRightButton && (
          <Button
            variant="ghost"
            size="icon"
            className="absolute right-0 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white z-10 rounded-full h-10 w-10"
            onClick={() => scroll("right")}
          >
            <ChevronRight className="h-6 w-6" />
          </Button>
        )}
      </div>
    </section>
  )
}

export default ContentRow
