"use client"

import type React from "react"

import { useState, useEffect } from "react"
import Link from "next/link"
import { usePathname, useRouter } from "next/navigation"
import { Menu, X, Search, User } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { useWallet } from "@/contexts/wallet-context"
import WalletConnect from "@/components/wallet-connect"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { cn } from "@/lib/utils"

export default function Navbar() {
  const [showMobileMenu, setShowMobileMenu] = useState(false)
  const [showWalletModal, setShowWalletModal] = useState(false)
  const [searchQuery, setSearchQuery] = useState("")
  const [isScrolled, setIsScrolled] = useState(false)
  const pathname = usePathname()
  const router = useRouter()
  const { walletState, disconnectWallet } = useWallet()

  // Handle scroll effect
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10)
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  // Listen for wallet modal events
  useEffect(() => {
    const handleOpenWalletModal = () => setShowWalletModal(true)
    document.addEventListener("open-wallet-modal", handleOpenWalletModal)
    return () => document.removeEventListener("open-wallet-modal", handleOpenWalletModal)
  }, [])

  // Handle search submission
  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    if (searchQuery.trim()) {
      router.push(`/search?q=${encodeURIComponent(searchQuery.trim())}`)
      setSearchQuery("")
    }
  }

  return (
    <>
      <nav
        className={cn(
          "fixed top-0 w-full z-50 transition-colors duration-300",
          isScrolled || showMobileMenu
            ? "bg-background/95 backdrop-blur-md border-b"
            : "bg-gradient-to-b from-background/80 to-transparent",
        )}
      >
        <div className="container flex justify-between items-center h-16 px-4 mx-auto">
          <div className="flex items-center space-x-1">
            <Link href="/" className="text-xl font-bold text-foreground flex items-center">
              <span className="text-primary mr-1">Sui</span>Stream
            </Link>

            <div className="hidden md:flex items-center ml-10 space-x-6">
              <Link
                href="/"
                className={cn(
                  "text-sm transition-colors hover:text-primary",
                  pathname === "/" ? "text-primary font-medium" : "text-muted-foreground",
                )}
              >
                Home
              </Link>
              <Link
                href="/movies"
                className={cn(
                  "text-sm transition-colors hover:text-primary",
                  pathname === "/movies" ? "text-primary font-medium" : "text-muted-foreground",
                )}
              >
                Movies
              </Link>
              <Link
                href="/tv"
                className={cn(
                  "text-sm transition-colors hover:text-primary",
                  pathname === "/tv" ? "text-primary font-medium" : "text-muted-foreground",
                )}
              >
                TV Shows
              </Link>
              <Link
                href="/collection"
                className={cn(
                  "text-sm transition-colors hover:text-primary",
                  pathname === "/collection" ? "text-primary font-medium" : "text-muted-foreground",
                )}
              >
                My Collection
              </Link>
            </div>
          </div>

          <div className="flex items-center space-x-4">
            <form onSubmit={handleSearch} className="hidden md:flex relative">
              <Input
                type="search"
                placeholder="Search..."
                className="w-[200px] bg-background/50"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              <Button type="submit" size="icon" variant="ghost" className="absolute right-0 top-0 h-full">
                <Search className="h-4 w-4" />
              </Button>
            </form>

            {walletState.connected ? (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="outline" size="icon" className="rounded-full">
                    <User className="h-4 w-4" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuLabel>
                    <div className="flex flex-col">
                      <span>Wallet Connected</span>
                      <span className="text-xs text-muted-foreground truncate max-w-[200px]">
                        {walletState.address}
                      </span>
                    </div>
                  </DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem asChild>
                    <Link href="/collection">My Collection</Link>
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={disconnectWallet}>Disconnect Wallet</DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
              <Button variant="default" onClick={() => setShowWalletModal(true)} className="hidden md:flex">
                Connect Wallet
              </Button>
            )}

            {/* Mobile menu button */}
            <Button
              variant="ghost"
              size="icon"
              className="md:hidden"
              onClick={() => setShowMobileMenu(!showMobileMenu)}
            >
              {showMobileMenu ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </Button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {showMobileMenu && (
          <div className="md:hidden bg-background border-t">
            <div className="py-4 px-4 space-y-3">
              <form onSubmit={handleSearch} className="flex relative mb-4">
                <Input
                  type="search"
                  placeholder="Search..."
                  className="w-full"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
                <Button type="submit" size="icon" variant="ghost" className="absolute right-0 top-0 h-full">
                  <Search className="h-4 w-4" />
                </Button>
              </form>

              <Link
                href="/"
                className="block py-2 px-2 rounded-md hover:bg-accent"
                onClick={() => setShowMobileMenu(false)}
              >
                Home
              </Link>
              <Link
                href="/movies"
                className="block py-2 px-2 rounded-md hover:bg-accent"
                onClick={() => setShowMobileMenu(false)}
              >
                Movies
              </Link>
              <Link
                href="/tv"
                className="block py-2 px-2 rounded-md hover:bg-accent"
                onClick={() => setShowMobileMenu(false)}
              >
                TV Shows
              </Link>
              <Link
                href="/collection"
                className="block py-2 px-2 rounded-md hover:bg-accent"
                onClick={() => setShowMobileMenu(false)}
              >
                My Collection
              </Link>

              {!walletState.connected && (
                <Button
                  variant="default"
                  onClick={() => {
                    setShowWalletModal(true)
                    setShowMobileMenu(false)
                  }}
                  className="w-full mt-2"
                >
                  Connect Wallet
                </Button>
              )}
            </div>
          </div>
        )}
      </nav>

      {showWalletModal && <WalletConnect onClose={() => setShowWalletModal(false)} />}
    </>
  )
}
