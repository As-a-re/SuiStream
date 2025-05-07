"use client"

import { createContext, useContext, useState, useEffect, type ReactNode } from "react"
import {
  getWalletState,
  subscribeToWallet,
  connectWallet as connectSuiWallet,
  disconnectWallet as disconnectSuiWallet,
} from "@/lib/sui-wallet"
import type { WalletState } from "@/types/wallet"
import { setCookie, getCookie, deleteCookie } from "cookies-next"

interface WalletContextType {
  walletState: WalletState
  connectWallet: (walletType?: string) => Promise<boolean>
  disconnectWallet: () => void
  isContentOwned: (contentId: string) => boolean
  refreshWallet: () => void
}

const WalletContext = createContext<WalletContextType | undefined>(undefined)

export function WalletProvider({ children }: { children: ReactNode }) {
  const [walletState, setWalletState] = useState<WalletState>(getWalletState())

  // Subscribe to wallet state changes
  useEffect(() => {
    // Check if wallet was previously connected
    const isConnected = getCookie("wallet_connected") === "true"
    if (isConnected && !walletState.connected) {
      connectWallet()
    }

    const unsubscribe = subscribeToWallet(() => {
      setWalletState(getWalletState())
    })

    return unsubscribe
  }, [])

  // Connect wallet
  const connectWallet = async (walletType?: string): Promise<boolean> => {
    try {
      const success = await connectSuiWallet(walletType)
      if (success) {
        // Store connection state in cookie
        setCookie("wallet_connected", "true", { maxAge: 60 * 60 * 24 * 7 }) // 1 week
      }
      return success
    } catch (error) {
      console.error("Error connecting wallet:", error)
      return false
    }
  }

  // Disconnect wallet
  const disconnectWallet = () => {
    disconnectSuiWallet()
    // Remove connection cookie
    deleteCookie("wallet_connected")
  }

  // Check if content is owned
  const isContentOwned = (contentId: string): boolean => {
    return walletState.ownedContentIds.includes(contentId)
  }

  // Refresh wallet state
  const refreshWallet = () => {
    setWalletState(getWalletState())
  }

  const value = {
    walletState,
    connectWallet,
    disconnectWallet,
    isContentOwned,
    refreshWallet,
  }

  return <WalletContext.Provider value={value}>{children}</WalletContext.Provider>
}

export function useWallet(): WalletContextType {
  const context = useContext(WalletContext)
  if (context === undefined) {
    throw new Error("useWallet must be used within a WalletProvider")
  }
  return context
}
