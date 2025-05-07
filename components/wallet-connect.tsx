"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { useWallet } from "@/contexts/wallet-context"
import { Loader2 } from "lucide-react"

interface WalletConnectProps {
  onClose: () => void
}

export default function WalletConnect({ onClose }: WalletConnectProps) {
  const [connecting, setConnecting] = useState<string | null>(null)
  const { connectWallet } = useWallet()

  const handleConnect = async (walletType: string) => {
    setConnecting(walletType)
    try {
      const success = await connectWallet(walletType)
      if (success) {
        onClose()
      }
    } catch (error) {
      console.error("Error connecting wallet:", error)
    } finally {
      setConnecting(null)
    }
  }

  return (
    <div className="fixed inset-0 bg-background/80 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle className="text-xl">Connect Your Wallet</CardTitle>
          <CardDescription>
            Connect your Sui wallet to access exclusive content, own media NFTs, and participate in the decentralized
            streaming ecosystem.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <Button
            className="w-full flex items-center justify-between"
            onClick={() => handleConnect("Sui Wallet")}
            disabled={connecting !== null}
          >
            <span>Sui Wallet</span>
            {connecting === "Sui Wallet" ? (
              <Loader2 className="h-4 w-4 animate-spin" />
            ) : (
              <span className="text-xs bg-primary/20 px-2 py-1 rounded-full">Recommended</span>
            )}
          </Button>

          <Button
            variant="outline"
            className="w-full flex items-center justify-between"
            onClick={() => handleConnect("Ethos Wallet")}
            disabled={connecting !== null}
          >
            <span>Ethos Wallet</span>
            {connecting === "Ethos Wallet" && <Loader2 className="h-4 w-4 animate-spin" />}
          </Button>

          <Button
            variant="outline"
            className="w-full flex items-center justify-between"
            onClick={() => handleConnect("Suiet Wallet")}
            disabled={connecting !== null}
          >
            <span>Suiet Wallet</span>
            {connecting === "Suiet Wallet" && <Loader2 className="h-4 w-4 animate-spin" />}
          </Button>
        </CardContent>
        <CardFooter className="flex justify-between">
          <Button variant="ghost" onClick={onClose} disabled={connecting !== null}>
            Cancel
          </Button>
          <Button variant="link" className="text-primary">
            What is a wallet?
          </Button>
        </CardFooter>
      </Card>
    </div>
  )
}
