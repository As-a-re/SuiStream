"use client"

import ContentCard from "@/components/content-card"
import type { ContentItem } from "@/types/tmdb"

interface ContentGridProps {
  contents: ContentItem[]
}

export default function ContentGrid({ contents }: ContentGridProps) {
  if (contents.length === 0) {
    return (
      <div className="py-12 text-center">
        <p className="text-muted-foreground">No content found</p>
      </div>
    )
  }

  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 md:gap-6">
      {contents.map((content) => (
        <ContentCard key={`${content.media_type}-${content.id}`} content={content} />
      ))}
    </div>
  )
}
