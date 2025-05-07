"use client"

import type React from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { useWallet } from "@/contexts/WalletContext"

interface WalletConnectProps {
  onClose: () => void
}

const WalletConnect: React.FC<WalletConnectProps> = ({ onClose }) => {
  const { connectWallet } = useWallet()

  const handleConnect = async (walletType: string) => {
    const success = await connectWallet(walletType)
    if (success) {
      onClose()
    }
  }

  return (
    <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50 p-4">
      <Card className="w-full max-w-md bg-sui-dark border border-white/10">
        <CardHeader>
          <CardTitle className="text-xl text-white">Connect Your Wallet</CardTitle>
          <CardDescription>
            Connect your Sui wallet to access exclusive content, own media NFTs, and participate in the decentralized
            streaming ecosystem.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <Button
            className="w-full bg-sui-blue hover:bg-sui-blue-dark flex items-center justify-between"
            onClick={() => handleConnect("Sui Wallet")}
          >
            <span>Sui Wallet</span>
            <span className="text-xs bg-white/20 px-2 py-1 rounded-full">Recommended</span>
          </Button>

          <Button
            variant="outline"
            className="w-full text-white border-white/20 hover:bg-white/10"
            onClick={() => handleConnect("Ethos Wallet")}
          >
            Ethos Wallet
          </Button>

          <Button
            variant="outline"
            className="w-full text-white border-white/20 hover:bg-white/10"
            onClick={() => handleConnect("Suiet Wallet")}
          >
            Suiet Wallet
          </Button>
        </CardContent>
        <CardFooter className="flex justify-between">
          <Button variant="ghost" onClick={onClose}>
            Cancel
          </Button>
          <Button variant="link" className="text-sui-blue">
            What is a wallet?
          </Button>
        </CardFooter>
      </Card>
    </div>
  )
}

export default WalletConnect
