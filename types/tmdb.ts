// TMDB API response types
export interface TMDBResponse {
  page: number
  results: ContentItem[]
  total_pages: number
  total_results: number
}

export interface ContentItem {
  id: number
  title?: string
  name?: string
  poster_path: string | null
  backdrop_path: string | null
  overview: string
  vote_average: number
  popularity: number
  release_date?: string
  first_air_date?: string
  media_type: "movie" | "tv"
  adult?: boolean
  original_language?: string

  // Additional properties for detailed content
  genres?: { id: number; name: string }[]
  runtime?: number
  status?: string
  budget?: number
  revenue?: number
  tagline?: string

  // TV show specific properties
  number_of_seasons?: number
  number_of_episodes?: number
  seasons?: Season[]

  // Additional properties
  videos?: {
    results: Video[]
  }
  production_companies?: ProductionCompany[]
  spoken_languages?: SpokenLanguage[]
}

export interface Season {
  id: number
  name: string
  overview: string
  poster_path: string | null
  season_number: number
  episode_count: number
  air_date: string
}

export interface Video {
  id: string
  key: string
  name: string
  site: string
  type: string
}

export interface ProductionCompany {
  id: number
  name: string
  logo_path: string | null
  origin_country: string
}

export interface SpokenLanguage {
  english_name: string
  iso_639_1: string
  name: string
}

export interface ContentCredits {
  id: number
  cast: CastMember[]
  crew: CrewMember[]
}

export interface CastMember {
  id: number
  name: string
  character: string
  profile_path: string | null
  order: number
}

export interface CrewMember {
  id: number
  name: string
  job: string
  department: string
  profile_path: string | null
}
