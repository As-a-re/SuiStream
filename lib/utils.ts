import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"
import type { ContentItem } from "@/types/tmdb"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

// Format release year from date string
export function formatReleaseYear(dateString?: string): string {
  if (!dateString) return "Unknown"
  return dateString.split("-")[0]
}

// Format runtime from minutes
export function formatRuntime(minutes?: number): string {
  if (!minutes) return "Unknown"

  const hours = Math.floor(minutes / 60)
  const mins = minutes % 60

  if (hours === 0) return `${mins}m`
  if (mins === 0) return `${hours}h`

  return `${hours}h ${mins}m`
}

// Calculate content price based on popularity and vote average
export function calculateContentPrice(content: ContentItem): string {
  if (!content) return "25"

  // Base price on vote average
  if (content.vote_average >= 8) return "40"
  if (content.vote_average >= 7) return "30"
  if (content.vote_average >= 6) return "20"

  return "15"
}
