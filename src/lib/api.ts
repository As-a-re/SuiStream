// API implementation for fetching media content
import { toast } from "@/hooks/use-toast"

// TMDB API key (you would typically store this in environment variables)
const API_KEY = "e8600999e10a7ace8d8f0c0fcdeadaae" // Updated with provided API key
const BASE_URL = "https://api.themoviedb.org/3"
const IMAGE_BASE_URL = "https://image.tmdb.org/t/p/w500"

// Interface for content items
export interface ContentItem {
  id: number
  title: string
  name?: string // For TV shows
  poster_path: string
  backdrop_path: string
  release_date?: string
  first_air_date?: string // For TV shows
  overview: string
  vote_average: number
  media_type: "movie" | "tv"
  // Added for our app functionality
  isOwned?: boolean
  isExclusive?: boolean
  price?: string
  // Add missing properties that are used in components
  image?: string
  year?: string
}

// Fallback data to use when API fails
const fallbackMovies: ContentItem[] = [
  {
    id: 1,
    title: "The Adventure Begins",
    poster_path: "/placeholder.jpg",
    backdrop_path: "/placeholder_backdrop.jpg",
    overview: "An epic journey of discovery and adventure in the digital frontier.",
    vote_average: 8.5,
    media_type: "movie",
    release_date: "2023-05-15",
    isExclusive: true,
    price: "35",
    image: "https://via.placeholder.com/500x750?text=Movie+1",
    year: "2023",
  },
  {
    id: 2,
    title: "Crypto Future",
    poster_path: "/placeholder2.jpg",
    backdrop_path: "/placeholder_backdrop2.jpg",
    overview: "A thrilling look at the future of cryptocurrency and digital assets.",
    vote_average: 7.8,
    media_type: "movie",
    release_date: "2023-01-20",
    isExclusive: false,
    price: "25",
    image: "https://via.placeholder.com/500x750?text=Movie+2",
    year: "2023",
  },
  {
    id: 3,
    title: "Web3 Revolution",
    poster_path: "/placeholder3.jpg",
    backdrop_path: "/placeholder_backdrop3.jpg",
    overview: "A documentary exploring the revolutionary potential of Web3 technologies.",
    vote_average: 9.0,
    media_type: "movie",
    release_date: "2022-11-10",
    isExclusive: true,
    price: "40",
    image: "https://via.placeholder.com/500x750?text=Movie+3",
    year: "2022",
  },
  {
    id: 4,
    title: "Digital Nomads",
    poster_path: "/placeholder4.jpg",
    backdrop_path: "/placeholder_backdrop4.jpg",
    overview: "Follow the lives of those who work remotely while traveling the world.",
    vote_average: 8.2,
    media_type: "movie",
    release_date: "2023-03-05",
    isExclusive: false,
    price: "30",
    image: "https://via.placeholder.com/500x750?text=Movie+4",
    year: "2023",
  },
  {
    id: 5,
    title: "Blockchain Heroes",
    poster_path: "/placeholder5.jpg",
    backdrop_path: "/placeholder_backdrop5.jpg",
    overview: "The untold stories of the pioneers who built the blockchain ecosystem.",
    vote_average: 8.7,
    media_type: "movie",
    release_date: "2022-08-15",
    isExclusive: true,
    price: "35",
    image: "https://via.placeholder.com/500x750?text=Movie+5",
    year: "2022",
  },
  {
    id: 6,
    title: "NFT Generation",
    poster_path: "/placeholder6.jpg",
    backdrop_path: "/placeholder_backdrop6.jpg",
    overview: "Explore the artistic and technological revolution of NFTs in the digital age.",
    vote_average: 7.5,
    media_type: "movie",
    release_date: "2023-02-22",
    isExclusive: false,
    price: "20",
    image: "https://via.placeholder.com/500x750?text=Movie+6",
    year: "2023",
  },
]

const fallbackTVShows: ContentItem[] = [
  {
    id: 101,
    title: "Crypto Chronicles",
    name: "Crypto Chronicles",
    poster_path: "/placeholder_tv1.jpg",
    backdrop_path: "/placeholder_tv_backdrop1.jpg",
    overview: "A dramatic series following the rise and fall of various cryptocurrency projects.",
    vote_average: 8.8,
    media_type: "tv",
    first_air_date: "2022-09-15",
    isExclusive: true,
    price: "40",
    image: "https://via.placeholder.com/500x750?text=TV+1",
    year: "2022",
  },
  {
    id: 102,
    title: "Blockchain Diaries",
    name: "Blockchain Diaries",
    poster_path: "/placeholder_tv2.jpg",
    backdrop_path: "/placeholder_tv_backdrop2.jpg",
    overview: "Documentary series exploring different blockchain networks and their impact.",
    vote_average: 7.9,
    media_type: "tv",
    first_air_date: "2023-01-05",
    isExclusive: false,
    price: "30",
    image: "https://via.placeholder.com/500x750?text=TV+2",
    year: "2023",
  },
  {
    id: 103,
    title: "DeFi Dreams",
    name: "DeFi Dreams",
    poster_path: "/placeholder_tv3.jpg",
    backdrop_path: "/placeholder_tv_backdrop3.jpg",
    overview: "A futuristic drama about the world transformed by decentralized finance.",
    vote_average: 9.1,
    media_type: "tv",
    first_air_date: "2022-11-20",
    isExclusive: true,
    price: "45",
    image: "https://via.placeholder.com/500x750?text=TV+3",
    year: "2022",
  },
  {
    id: 104,
    title: "Web3 Wonders",
    name: "Web3 Wonders",
    poster_path: "/placeholder_tv4.jpg",
    backdrop_path: "/placeholder_tv_backdrop4.jpg",
    overview: "Weekly show highlighting amazing projects being built on Web3 technology.",
    vote_average: 8.4,
    media_type: "tv",
    first_air_date: "2023-02-15",
    isExclusive: false,
    price: "25",
    image: "https://via.placeholder.com/500x750?text=TV+4",
    year: "2023",
  },
  {
    id: 105,
    title: "Token Titans",
    name: "Token Titans",
    poster_path: "/placeholder_tv5.jpg",
    backdrop_path: "/placeholder_tv_backdrop5.jpg",
    overview: "Competition series where entrepreneurs pitch their token projects to investors.",
    vote_average: 8.0,
    media_type: "tv",
    first_air_date: "2022-10-10",
    isExclusive: true,
    price: "35",
    image: "https://via.placeholder.com/500x750?text=TV+5",
    year: "2022",
  },
  {
    id: 106,
    title: "Metaverse Explorers",
    name: "Metaverse Explorers",
    poster_path: "/placeholder_tv6.jpg",
    backdrop_path: "/placeholder_tv_backdrop6.jpg",
    overview: "Follow adventurers as they explore and build within virtual metaverse worlds.",
    vote_average: 7.6,
    media_type: "tv",
    first_air_date: "2023-03-01",
    isExclusive: false,
    price: "20",
    image: "https://via.placeholder.com/500x750?text=TV+6",
    year: "2023",
  },
]

// Fetch trending content (movies and TV shows)
export const fetchTrending = async (): Promise<ContentItem[]> => {
  try {
    const response = await fetch(`${BASE_URL}/trending/all/week?api_key=${API_KEY}`)
    if (!response.ok) throw new Error("Failed to fetch trending content")

    const data = await response.json()
    return data.results.map((item: any) => ({
      ...item,
      title: item.title || item.name,
      year: getYearFromDate(item.release_date || item.first_air_date),
      image: item.poster_path ? `${IMAGE_BASE_URL}${item.poster_path}` : "https://via.placeholder.com/500x750",
      media_type: item.media_type || "movie",
      // Add SuiStream specific properties
      isExclusive: item.vote_average > 7.5, // Make high-rated content "exclusive"
      price: calculatePrice(item.vote_average),
      isOwned: false, // Default is not owned
    }))
  } catch (error) {
    console.error("Error fetching trending content:", error)
    // Use a mix of fallback movies and TV shows for trending
    const trending = [...fallbackMovies.slice(0, 3), ...fallbackTVShows.slice(0, 3)]
    // Only show toast if it's not a development environment
    if (process.env.NODE_ENV !== "development") {
      toast({
        title: "Using fallback data",
        description: "Could not connect to the movie database. Using sample content.",
        variant: "default",
      })
    }
    return trending
  }
}

// Fetch movies
export const fetchMovies = async (): Promise<ContentItem[]> => {
  try {
    const response = await fetch(`${BASE_URL}/movie/popular?api_key=${API_KEY}`)
    if (!response.ok) throw new Error("Failed to fetch movies")

    const data = await response.json()
    return data.results.map((item: any) => ({
      ...item,
      title: item.title,
      year: getYearFromDate(item.release_date),
      image: item.poster_path ? `${IMAGE_BASE_URL}${item.poster_path}` : "https://via.placeholder.com/500x750",
      media_type: "movie",
      // Add SuiStream specific properties
      isExclusive: item.vote_average > 7.5,
      price: calculatePrice(item.vote_average),
      isOwned: false,
    }))
  } catch (error) {
    console.error("Error fetching movies:", error)
    // Only show toast if it's not a development environment
    if (process.env.NODE_ENV !== "development") {
      toast({
        title: "Using fallback data",
        description: "Could not connect to the movie database. Using sample movies.",
        variant: "default",
      })
    }
    return fallbackMovies
  }
}

// Fetch TV shows
export const fetchTVShows = async (): Promise<ContentItem[]> => {
  try {
    const response = await fetch(`${BASE_URL}/tv/popular?api_key=${API_KEY}`)
    if (!response.ok) throw new Error("Failed to fetch TV shows")

    const data = await response.json()
    return data.results.map((item: any) => ({
      ...item,
      title: item.name,
      year: getYearFromDate(item.first_air_date),
      image: item.poster_path ? `${IMAGE_BASE_URL}${item.poster_path}` : "https://via.placeholder.com/500x750",
      media_type: "tv",
      // Add SuiStream specific properties
      isExclusive: item.vote_average > 7.8,
      price: calculatePrice(item.vote_average),
      isOwned: false,
    }))
  } catch (error) {
    console.error("Error fetching TV shows:", error)
    // Only show toast if it's not a development environment
    if (process.env.NODE_ENV !== "development") {
      toast({
        title: "Using fallback data",
        description: "Could not connect to the TV database. Using sample TV shows.",
        variant: "default",
      })
    }
    return fallbackTVShows
  }
}

// Helper function to extract year from date
const getYearFromDate = (dateString?: string): string => {
  if (!dateString) return "Unknown"
  return dateString.split("-")[0]
}

// Helper function to calculate price based on rating
const calculatePrice = (rating: number): string => {
  if (rating >= 8) return "40"
  if (rating >= 7) return "25"
  if (rating >= 6) return "15"
  return "10"
}

// Helper function to get backdrop image URL
export const getBackdropUrl = (path: string | null): string => {
  if (!path) return "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?auto=format&fit=crop&q=80&w=2070"
  return `${IMAGE_BASE_URL}${path}`
}
