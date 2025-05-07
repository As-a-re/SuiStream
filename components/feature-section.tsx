import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Wallet, DollarSign, Database, Users, Shield, Share2 } from "lucide-react"

export default function FeatureSection() {
  const features = [
    {
      title: "Own Your Content",
      description:
        "Purchase movies and shows as NFTs on the Sui blockchain, giving you true ownership of your digital media collection.",
      icon: Wallet,
    },
    {
      title: "Creator Payments",
      description:
        "Payments go directly to content creators through smart contracts, eliminating middlemen and reducing costs.",
      icon: DollarSign,
    },
    {
      title: "Decentralized Storage",
      description:
        "Content is stored across the network, making censorship impossible and ensuring always-available streaming.",
      icon: Database,
    },
    {
      title: "Community Governance",
      description: "Platform decisions are made via community votes, giving users a voice in the future of SuiStream.",
      icon: Users,
    },
    {
      title: "Enhanced Security",
      description: "Blockchain technology ensures your purchases and viewing history are secure and private.",
      icon: Shield,
    },
    {
      title: "Content Sharing",
      description: "Lend your purchased content to friends for a limited time while maintaining ownership.",
      icon: Share2,
    },
  ]

  return (
    <section className="py-16 bg-gradient-to-b from-background to-background/80">
      <div className="container px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-4">Why SuiStream is Different</h2>
          <p className="text-muted-foreground max-w-3xl mx-auto">
            Experience the next generation of streaming powered by the Sui blockchain. True ownership, transparent
            payments, and community governance.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature) => (
            <Card
              key={feature.title}
              className="bg-card/50 backdrop-blur-sm border-primary/10 hover:border-primary/30 transition-all"
            >
              <CardHeader>
                <feature.icon className="h-8 w-8 text-primary mb-4" />
                <CardTitle>{feature.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-muted-foreground">{feature.description}</CardDescription>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}
