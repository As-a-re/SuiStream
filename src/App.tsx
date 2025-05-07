"use client"

import { Toaster } from "./components/ui/toaster"
import { Toaster as Sonner } from "./components/ui/sonner"
import { TooltipProvider } from "./components/ui/tooltip"
import { QueryClient, QueryClientProvider } from "@tanstack/react-query"
import { useState, createContext, useContext, useEffect } from "react"
import { WalletProvider } from "./contexts/WalletContext"
import Index from "./pages/Index"
import Movies from "./pages/Movies"
import TVShows from "./pages/TVShows"
import MyCollection from "./pages/MyCollection"
import NotFound from "./pages/NotFound"

// Create a navigation context to manage routing
type RouteContextType = {
  currentRoute: string
  navigate: (path: string) => void
}

export const RouteContext = createContext<RouteContextType>({
  currentRoute: "/",
  navigate: () => {},
})

// Custom hook to use navigation
export const useNavigation = () => useContext(RouteContext)

const queryClient = new QueryClient()

const App = () => {
  const [currentRoute, setCurrentRoute] = useState("/")

  // Initialize route from URL on first load
  useEffect(() => {
    const path = window.location.pathname
    if (path) {
      setCurrentRoute(path)
    }
  }, [])

  // Listen for custom navigation events
  useEffect(() => {
    const handleNavigate = (event: CustomEvent) => {
      navigate(event.detail)
    }

    document.addEventListener("navigate-to" as any, handleNavigate as any)

    return () => {
      document.removeEventListener("navigate-to" as any, handleNavigate as any)
    }
  }, [])

  // Navigation function to replace useNavigate from react-router
  const navigate = (path: string) => {
    setCurrentRoute(path)
    // Update the URL for a better user experience (without page reload)
    window.history.pushState(null, "", path)
  }

  // Render the appropriate component based on the current route
  const renderRoute = () => {
    switch (currentRoute) {
      case "/":
        return <Index />
      case "/movies":
        return <Movies />
      case "/tvshows":
        return <TVShows />
      case "/collection":
        return <MyCollection />
      default:
        return <NotFound />
    }
  }

  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <WalletProvider>
          <RouteContext.Provider value={{ currentRoute, navigate }}>
            <Toaster />
            <Sonner />
            {renderRoute()}
          </RouteContext.Provider>
        </WalletProvider>
      </TooltipProvider>
    </QueryClientProvider>
  )
}

export default App
