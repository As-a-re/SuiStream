"use client"

import { useState } from "react"
import Image from "next/image"
import { Play, Calendar, Clock, Star, Award, Users, Tag } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { useWallet } from "@/contexts/wallet-context"
import type { ContentItem, ContentCredits } from "@/types/tmdb"
import { calculateContentPrice, formatReleaseYear, formatRuntime } from "@/lib/utils"
import { purchaseContent } from "@/lib/sui-wallet"
import { useToast } from "@/hooks/use-toast"
import { ScrollArea } from "@/components/ui/scroll-area"
import Link from "next/link"

interface ContentDetailsProps {
  content: ContentItem
  credits: ContentCredits
}

export default function ContentDetails({ content, credits }: ContentDetailsProps) {
  const [isPurchasing, setIsPurchasing] = useState(false)
  const { walletState, isContentOwned, refreshWallet } = useWallet()
  const { toast } = useToast()

  // Calculate content price based on popularity and vote average
  const contentPrice = calculateContentPrice(content)

  // Check if content is owned
  const contentId = `${content.media_type}:${content.id}`
  const isOwned = isContentOwned(contentId)

  // Format backdrop and poster URLs
  const backdropUrl = content.backdrop_path
    ? `https://image.tmdb.org/t/p/original${content.backdrop_path}`
    : "/images/default-backdrop.jpg"

  const posterUrl = content.poster_path
    ? `https://image.tmdb.org/t/p/w500${content.poster_path}`
    : "/images/default-poster.jpg"

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

  // Get director(s) and writers
  const directors = credits.crew.filter((person) => person.job === "Director")
  const writers = credits.crew.filter(
    (person) => person.job === "Screenplay" || person.job === "Writer" || person.job === "Story",
  )

  // Get top cast (limit to 6)
  const topCast = credits.cast.slice(0, 6)

  return (
    <div className="relative">
      {/* Backdrop */}
      <div className="absolute inset-0 w-full h-[70vh] min-h-[500px]">
        <Image
          src={backdropUrl || "/placeholder.svg"}
          alt={content.title || content.name || "Content backdrop"}
          fill
          priority
          className="object-cover"
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-background via-background/70 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-t from-background via-background/20 to-transparent" />
      </div>

      {/* Content */}
      <div className="relative container pt-32 pb-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Poster */}
          <div className="hidden md:block">
            <div className="relative aspect-[2/3] rounded-lg overflow-hidden shadow-xl">
              <Image
                src={posterUrl || "/placeholder.svg"}
                alt={content.title || content.name || "Content poster"}
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 300px"
              />
            </div>
          </div>

          {/* Details */}
          <div className="md:col-span-2">
            <h1 className="text-3xl md:text-5xl font-bold mb-3">{content.title || content.name}</h1>

            <div className="flex flex-wrap items-center gap-x-4 gap-y-2 mb-4">
              {content.vote_average > 0 && (
                <div className="flex items-center">
                  <Star className="h-5 w-5 mr-1 fill-primary text-primary" />
                  <span className="font-medium">{content.vote_average.toFixed(1)}</span>
                </div>
              )}

              <div className="flex items-center text-muted-foreground">
                <Calendar className="h-4 w-4 mr-1" />
                {formatReleaseYear(content.release_date || content.first_air_date)}
              </div>

              {content.runtime && (
                <div className="flex items-center text-muted-foreground">
                  <Clock className="h-4 w-4 mr-1" />
                  {formatRuntime(content.runtime)}
                </div>
              )}

              {content.number_of_seasons && (
                <Badge variant="outline">
                  {content.number_of_seasons} {content.number_of_seasons === 1 ? "Season" : "Seasons"}
                </Badge>
              )}

              {content.adult && <Badge variant="destructive">18+</Badge>}
            </div>

            {/* Genres */}
            {content.genres && content.genres.length > 0 && (
              <div className="flex flex-wrap gap-2 mb-6">
                {content.genres.map((genre) => (
                  <Badge key={genre.id} variant="secondary">
                    {genre.name}
                  </Badge>
                ))}
              </div>
            )}

            {/* Overview */}
            <p className="text-muted-foreground mb-8">{content.overview}</p>

            {/* Action buttons */}
            <div className="flex flex-wrap gap-4 mb-8">
              {isOwned ? (
                <>
                  <Link href={`/watch/${content.media_type}/${content.id}`}>
                    <Button size="lg" className="gap-2">
                      <Play className="h-4 w-4" /> Watch Now
                    </Button>
                  </Link>
                  <Button variant="outline" size="lg">
                    Add to Favorites
                  </Button>
                </>
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
            </div>

            {/* Tabs for more details */}
            <Tabs defaultValue="cast" className="mt-8">
              <TabsList>
                <TabsTrigger value="cast">Cast & Crew</TabsTrigger>
                <TabsTrigger value="details">Details</TabsTrigger>
                {content.media_type === "tv" && <TabsTrigger value="seasons">Seasons</TabsTrigger>}
              </TabsList>

              <TabsContent value="cast" className="mt-4">
                <div className="space-y-6">
                  {/* Directors */}
                  {directors.length > 0 && (
                    <div>
                      <h3 className="text-sm font-medium text-muted-foreground mb-2 flex items-center">
                        <Award className="h-4 w-4 mr-2" /> Director{directors.length > 1 ? "s" : ""}
                      </h3>
                      <div className="flex flex-wrap gap-2">
                        {directors.map((director) => (
                          <Badge key={director.id} variant="outline">
                            {director.name}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Writers */}
                  {writers.length > 0 && (
                    <div>
                      <h3 className="text-sm font-medium text-muted-foreground mb-2 flex items-center">
                        <Tag className="h-4 w-4 mr-2" /> Writer{writers.length > 1 ? "s" : ""}
                      </h3>
                      <div className="flex flex-wrap gap-2">
                        {writers.map((writer) => (
                          <Badge key={`${writer.id}-${writer.job}`} variant="outline">
                            {writer.name} ({writer.job})
                          </Badge>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Cast */}
                  <div>
                    <h3 className="text-sm font-medium text-muted-foreground mb-2 flex items-center">
                      <Users className="h-4 w-4 mr-2" /> Cast
                    </h3>
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                      {topCast.map((actor) => (
                        <div key={actor.id} className="flex items-center gap-2">
                          <div className="relative h-10 w-10 rounded-full overflow-hidden bg-muted">
                            {actor.profile_path ? (
                              <Image
                                src={`https://image.tmdb.org/t/p/w200${actor.profile_path}`}
                                alt={actor.name}
                                fill
                                className="object-cover"
                              />
                            ) : (
                              <div className="h-full w-full flex items-center justify-center text-muted-foreground">
                                {actor.name.charAt(0)}
                              </div>
                            )}
                          </div>
                          <div>
                            <p className="text-sm font-medium">{actor.name}</p>
                            <p className="text-xs text-muted-foreground">{actor.character}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </TabsContent>

              <TabsContent value="details" className="mt-4">
                <div className="space-y-4">
                  {/* Production Companies */}
                  {content.production_companies && content.production_companies.length > 0 && (
                    <div>
                      <h3 className="text-sm font-medium text-muted-foreground mb-2">Production Companies</h3>
                      <div className="flex flex-wrap gap-2">
                        {content.production_companies.map((company) => (
                          <Badge key={company.id} variant="outline">
                            {company.name}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Languages */}
                  {content.spoken_languages && content.spoken_languages.length > 0 && (
                    <div>
                      <h3 className="text-sm font-medium text-muted-foreground mb-2">Languages</h3>
                      <div className="flex flex-wrap gap-2">
                        {content.spoken_languages.map((language) => (
                          <Badge key={language.iso_639_1} variant="outline">
                            {language.english_name}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Additional Details */}
                  <div className="grid grid-cols-2 gap-4">
                    {content.status && (
                      <div>
                        <h3 className="text-sm font-medium text-muted-foreground">Status</h3>
                        <p>{content.status}</p>
                      </div>
                    )}

                    {content.budget > 0 && (
                      <div>
                        <h3 className="text-sm font-medium text-muted-foreground">Budget</h3>
                        <p>${content.budget.toLocaleString()}</p>
                      </div>
                    )}

                    {content.revenue > 0 && (
                      <div>
                        <h3 className="text-sm font-medium text-muted-foreground">Revenue</h3>
                        <p>${content.revenue.toLocaleString()}</p>
                      </div>
                    )}

                    {content.original_language && (
                      <div>
                        <h3 className="text-sm font-medium text-muted-foreground">Original Language</h3>
                        <p>{content.original_language.toUpperCase()}</p>
                      </div>
                    )}
                  </div>
                </div>
              </TabsContent>

              {content.media_type === "tv" && content.seasons && (
                <TabsContent value="seasons" className="mt-4">
                  <ScrollArea className="h-[300px] pr-4">
                    <div className="space-y-4">
                      {content.seasons.map((season) => (
                        <div key={season.id} className="flex gap-4 border-b border-border pb-4">
                          <div className="relative h-24 w-16 flex-shrink-0 rounded overflow-hidden bg-muted">
                            {season.poster_path ? (
                              <Image
                                src={`https://image.tmdb.org/t/p/w200${season.poster_path}`}
                                alt={season.name}
                                fill
                                className="object-cover"
                              />
                            ) : (
                              <div className="h-full w-full flex items-center justify-center text-muted-foreground">
                                {season.name.charAt(0)}
                              </div>
                            )}
                          </div>
                          <div>
                            <h3 className="font-medium">{season.name}</h3>
                            <p className="text-sm text-muted-foreground">
                              {season.episode_count} episodes •{" "}
                              {season.air_date ? new Date(season.air_date).getFullYear() : "TBA"}
                            </p>
                            {season.overview && <p className="text-sm mt-2 line-clamp-2">{season.overview}</p>}
                          </div>
                        </div>
                      ))}
                    </div>
                  </ScrollArea>
                </TabsContent>
              )}
            </Tabs>
          </div>
        </div>
      </div>
    </div>
  )
}
