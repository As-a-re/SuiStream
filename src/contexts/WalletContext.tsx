"use client"

import type React from "react"
import { createContext, useContext, useEffect, useState } from "react"
import {
  type WalletState,
  getWalletState,
  subscribeToWallet,
  connectWallet,
  disconnectWallet,
  purchaseContent,
  isContentOwned,
} from "@/lib/wallet"

interface WalletContextType {
  walletState: WalletState
  connectWallet: (walletType?: string) => Promise<boolean>
  disconnectWallet: () => void
  purchaseContent: (contentId: number, price: string) => Promise<boolean>
  isContentOwned: (contentId: number) => boolean
}

const WalletContext = createContext<WalletContextType | undefined>(undefined)

export const WalletProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [walletState, setWalletState] = useState<WalletState>(getWalletState())

  useEffect(() => {
    // Subscribe to wallet state changes
    const unsubscribe = subscribeToWallet(() => {
      setWalletState(getWalletState())
    })

    return unsubscribe
  }, [])

  const value = {
    walletState,
    connectWallet,
    disconnectWallet,
    purchaseContent,
    isContentOwned,
  }

  return <WalletContext.Provider value={value}>{children}</WalletContext.Provider>
}

export const useWallet = (): WalletContextType => {
  const context = useContext(WalletContext)
  if (context === undefined) {
    throw new Error("useWallet must be used within a WalletProvider")
  }
  return context
}
