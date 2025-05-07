import type { ContentItem, TMDBResponse, ContentCredits } from "@/types/tmdb"

// TMDB API key and base URL
const API_KEY = "e8600999e10a7ace8d8f0c0fcdeadaae"
const BASE_URL = "https://api.themoviedb.org/3"

// Define the Video type
interface Video {
  id: string
  key: string
  name: string
  site: string
  type: string
}

// Fetch trending content (movies and TV shows)
export async function fetchTrending(): Promise<TMDBResponse> {
  try {
    const response = await fetch(`${BASE_URL}/trending/all/week?api_key=${API_KEY}`)
    if (!response.ok) throw new Error("Failed to fetch trending content")

    const data = await response.json()

    // Ensure each item has a media_type
    const results = data.results.map((item: any) => ({
      ...item,
      media_type: item.media_type || (item.first_air_date ? "tv" : "movie"),
    }))

    return {
      ...data,
      results,
    }
  } catch (error) {
    console.error("Error fetching trending content:", error)
    throw error
  }
}

// Fetch popular movies
export async function fetchPopularMovies(): Promise<TMDBResponse> {
  try {
    const response = await fetch(`${BASE_URL}/movie/popular?api_key=${API_KEY}`)
    if (!response.ok) throw new Error("Failed to fetch popular movies")

    const data = await response.json()

    // Add media_type to each item
    const results = data.results.map((item: any) => ({
      ...item,
      media_type: "movie",
    }))

    return {
      ...data,
      results,
    }
  } catch (error) {
    console.error("Error fetching popular movies:", error)
    throw error
  }
}

// Fetch top rated movies
export async function fetchTopRatedMovies(): Promise<TMDBResponse> {
  try {
    const response = await fetch(`${BASE_URL}/movie/top_rated?api_key=${API_KEY}`)
    if (!response.ok) throw new Error("Failed to fetch top rated movies")

    const data = await response.json()

    // Add media_type to each item
    const results = data.results.map((item: any) => ({
      ...item,
      media_type: "movie",
    }))

    return {
      ...data,
      results,
    }
  } catch (error) {
    console.error("Error fetching top rated movies:", error)
    throw error
  }
}

// Fetch upcoming movies
export async function fetchUpcomingMovies(): Promise<TMDBResponse> {
  try {
    const response = await fetch(`${BASE_URL}/movie/upcoming?api_key=${API_KEY}`)
    if (!response.ok) throw new Error("Failed to fetch upcoming movies")

    const data = await response.json()

    // Add media_type to each item
    const results = data.results.map((item: any) => ({
      ...item,
      media_type: "movie",
    }))

    return {
      ...data,
      results,
    }
  } catch (error) {
    console.error("Error fetching upcoming movies:", error)
    throw error
  }
}

// Fetch now playing movies
export async function fetchNowPlayingMovies(): Promise<TMDBResponse> {
  try {
    const response = await fetch(`${BASE_URL}/movie/now_playing?api_key=${API_KEY}`)
    if (!response.ok) throw new Error("Failed to fetch now playing movies")

    const data = await response.json()

    // Add media_type to each item
    const results = data.results.map((item: any) => ({
      ...item,
      media_type: "movie",
    }))

    return {
      ...data,
      results,
    }
  } catch (error) {
    console.error("Error fetching now playing movies:", error)
    throw error
  }
}

// Fetch popular TV shows
export async function fetchPopularTVShows(): Promise<TMDBResponse> {
  try {
    const response = await fetch(`${BASE_URL}/tv/popular?api_key=${API_KEY}`)
    if (!response.ok) throw new Error("Failed to fetch popular TV shows")

    const data = await response.json()

    // Add media_type to each item
    const results = data.results.map((item: any) => ({
      ...item,
      media_type: "tv",
      title: item.name, // Ensure title is set for consistency
    }))

    return {
      ...data,
      results,
    }
  } catch (error) {
    console.error("Error fetching popular TV shows:", error)
    throw error
  }
}

// Fetch top rated TV shows
export async function fetchTopRatedTVShows(): Promise<TMDBResponse> {
  try {
    const response = await fetch(`${BASE_URL}/tv/top_rated?api_key=${API_KEY}`)
    if (!response.ok) throw new Error("Failed to fetch top rated TV shows")

    const data = await response.json()

    // Add media_type to each item
    const results = data.results.map((item: any) => ({
      ...item,
      media_type: "tv",
      title: item.name, // Ensure title is set for consistency
    }))

    return {
      ...data,
      results,
    }
  } catch (error) {
    console.error("Error fetching top rated TV shows:", error)
    throw error
  }
}

// Fetch on the air TV shows
export async function fetchOnTheAirTVShows(): Promise<TMDBResponse> {
  try {
    const response = await fetch(`${BASE_URL}/tv/on_the_air?api_key=${API_KEY}`)
    if (!response.ok) throw new Error("Failed to fetch on the air TV shows")

    const data = await response.json()

    // Add media_type to each item
    const results = data.results.map((item: any) => ({
      ...item,
      media_type: "tv",
      title: item.name, // Ensure title is set for consistency
    }))

    return {
      ...data,
      results,
    }
  } catch (error) {
    console.error("Error fetching on the air TV shows:", error)
    throw error
  }
}

// Fetch airing today TV shows
export async function fetchAiringTodayTVShows(): Promise<TMDBResponse> {
  try {
    const response = await fetch(`${BASE_URL}/tv/airing_today?api_key=${API_KEY}`)
    if (!response.ok) throw new Error("Failed to fetch airing today TV shows")

    const data = await response.json()

    // Add media_type to each item
    const results = data.results.map((item: any) => ({
      ...item,
      media_type: "tv",
      title: item.name, // Ensure title is set for consistency
    }))

    return {
      ...data,
      results,
    }
  } catch (error) {
    console.error("Error fetching airing today TV shows:", error)
    throw error
  }
}

// Fetch content details (movie or TV show)
export async function fetchContentDetails(type: string, id: number): Promise<ContentItem> {
  try {
    const response = await fetch(`${BASE_URL}/${type}/${id}?api_key=${API_KEY}&append_to_response=videos,images`)
    if (!response.ok) throw new Error(`Failed to fetch ${type} details`)

    const data = await response.json()

    // Ensure consistent properties
    return {
      ...data,
      media_type: type,
      title: data.title || data.name,
    }
  } catch (error) {
    console.error(`Error fetching ${type} details:`, error)
    throw error
  }
}

// Fetch content videos
export async function fetchContentVideos(type: string, id: number): Promise<{ results: Video[] }> {
  try {
    const response = await fetch(`${BASE_URL}/${type}/${id}/videos?api_key=${API_KEY}`)
    if (!response.ok) throw new Error(`Failed to fetch ${type} videos`)

    return await response.json()
  } catch (error) {
    console.error(`Error fetching ${type} videos:`, error)
    throw error
  }
}

// Fetch similar content
export async function fetchSimilarContent(type: string, id: number): Promise<TMDBResponse> {
  try {
    const response = await fetch(`${BASE_URL}/${type}/${id}/similar?api_key=${API_KEY}`)
    if (!response.ok) throw new Error(`Failed to fetch similar ${type} content`)

    const data = await response.json()

    // Add media_type to each item
    const results = data.results.map((item: any) => ({
      ...item,
      media_type: type,
      title: item.title || item.name, // Ensure title is set for consistency
    }))

    return {
      ...data,
      results,
    }
  } catch (error) {
    console.error(`Error fetching similar ${type} content:`, error)
    throw error
  }
}

// Fetch content credits (cast and crew)
export async function fetchContentCredits(type: string, id: number): Promise<ContentCredits> {
  try {
    const response = await fetch(`${BASE_URL}/${type}/${id}/credits?api_key=${API_KEY}`)
    if (!response.ok) throw new Error(`Failed to fetch ${type} credits`)

    return await response.json()
  } catch (error) {
    console.error(`Error fetching ${type} credits:`, error)
    throw error
  }
}

// Search for content
export async function searchContent(query: string, page = 1): Promise<TMDBResponse> {
  try {
    const response = await fetch(
      `${BASE_URL}/search/multi?api_key=${API_KEY}&query=${encodeURIComponent(query)}&page=${page}`,
    )
    if (!response.ok) throw new Error("Failed to search content")

    const data = await response.json()

    // Filter out person results and ensure consistent properties
    const results = data.results
      .filter((item: any) => item.media_type === "movie" || item.media_type === "tv")
      .map((item: any) => ({
        ...item,
        title: item.title || item.name, // Ensure title is set for consistency
      }))

    return {
      ...data,
      results,
    }
  } catch (error) {
    console.error("Error searching content:", error)
    throw error
  }
}

// Fetch more content for a specific endpoint
export async function fetchMoreContent(endpoint: string, page: number): Promise<TMDBResponse> {
  try {
    const url = `${BASE_URL}/${endpoint}?api_key=${API_KEY}&page=${page}`
    const response = await fetch(url)
    if (!response.ok) throw new Error(`Failed to fetch more content for ${endpoint}`)

    const data = await response.json()

    // Determine media type from endpoint
    let mediaType = "movie"
    if (endpoint.startsWith("tv/") || endpoint === "tv") {
      mediaType = "tv"
    } else if (endpoint === "trending" || endpoint === "search/multi") {
      mediaType = "" // Will use the media_type from the response
    }

    // Add media_type to each item if not already present
    const results = data.results.map((item: any) => ({
      ...item,
      media_type: item.media_type || mediaType,
      title: item.title || item.name, // Ensure title is set for consistency
    }))

    return {
      ...data,
      results,
    }
  } catch (error) {
    console.error(`Error fetching more content for ${endpoint}:`, error)
    throw error
  }
}
