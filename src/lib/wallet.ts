import { toast } from "@/hooks/use-toast"

// Simple wallet service for Sui blockchain
// In a production app, this would integrate with an actual Sui wallet SDK
export interface WalletState {
  connected: boolean
  address: string | null
  ownedContentIds: number[]
}

// Initial wallet state
const initialWalletState: WalletState = {
  connected: false,
  address: null,
  ownedContentIds: [],
}

// For demo purposes - in production this would use localStorage or similar
let walletState = { ...initialWalletState }

// Listeners for wallet state changes
const listeners: (() => void)[] = []

export const subscribeToWallet = (callback: () => void) => {
  listeners.push(callback)
  return () => {
    const index = listeners.indexOf(callback)
    if (index > -1) {
      listeners.splice(index, 1)
    }
  }
}

const notifyListeners = () => {
  listeners.forEach((listener) => listener())
}

// Connect wallet (simulated)
export const connectWallet = async (walletType = "Sui Wallet"): Promise<boolean> => {
  try {
    // Simulate connection delay
    await new Promise((resolve) => setTimeout(resolve, 1000))

    // Generate random wallet address for demo
    const address = "0x" + Array.from({ length: 40 }, () => Math.floor(Math.random() * 16).toString(16)).join("")

    // Update wallet state
    walletState = {
      connected: true,
      address,
      // For demo, let's say the user already owns some random content
      ownedContentIds: Array.from({ length: 3 }, () => Math.floor(Math.random() * 20) + 1),
    }

    notifyListeners()

    toast({
      title: "Wallet Connected",
      description: `${walletType} connected successfully`,
    })

    return true
  } catch (error) {
    console.error("Error connecting wallet:", error)
    toast({
      title: "Connection Failed",
      description: "Could not connect to wallet",
      variant: "destructive",
    })
    return false
  }
}

// Disconnect wallet
export const disconnectWallet = () => {
  walletState = { ...initialWalletState }
  notifyListeners()

  toast({
    title: "Wallet Disconnected",
    description: "Your wallet has been disconnected",
  })
}

// Purchase content (simulated)
export const purchaseContent = async (contentId: number, price: string): Promise<boolean> => {
  if (!walletState.connected) {
    toast({
      title: "Wallet Not Connected",
      description: "Please connect your wallet first",
      variant: "destructive",
    })
    return false
  }

  try {
    // Simulate transaction delay
    await new Promise((resolve) => setTimeout(resolve, 1500))

    // Add to owned content
    if (!walletState.ownedContentIds.includes(contentId)) {
      walletState.ownedContentIds.push(contentId)
      notifyListeners()
    }

    toast({
      title: "Purchase Successful",
      description: `You've purchased this content for ${price} SUI`,
    })

    return true
  } catch (error) {
    console.error("Error purchasing content:", error)
    toast({
      title: "Purchase Failed",
      description: "Transaction could not be completed",
      variant: "destructive",
    })
    return false
  }
}

// Get current wallet state
export const getWalletState = (): WalletState => {
  return { ...walletState }
}

// Check if content is owned
export const isContentOwned = (contentId: number): boolean => {
  return walletState.ownedContentIds.includes(contentId)
}
