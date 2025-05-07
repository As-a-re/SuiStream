import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

const FeatureSection = () => {
  const features = [
    {
      title: "Own Your Content",
      description:
        "Purchase movies and shows as NFTs on the Sui blockchain, giving you true ownership of your digital media collection.",
      icon: "🔗",
    },
    {
      title: "Creator Payments",
      description:
        "Payments go directly to content creators through smart contracts, eliminating middlemen and reducing costs.",
      icon: "💰",
    },
    {
      title: "Decentralized Storage",
      description:
        "Content is stored across the network, making censorship impossible and ensuring always-available streaming.",
      icon: "🌐",
    },
    {
      title: "Community Governance",
      description: "Platform decisions are made via community votes, giving users a voice in the future of SuiStream.",
      icon: "🏛️",
    },
  ]

  return (
    <section className="py-16 bg-gradient-to-b from-sui-dark to-sui-dark-accent">
      <div className="container px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-white mb-4">Why SuiStream is Different</h2>
          <p className="text-gray-300 max-w-3xl mx-auto">
            Experience the next generation of streaming powered by the Sui blockchain. True ownership, transparent
            payments, and community governance.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((feature) => (
            <Card key={feature.title} className="bg-black/30 border-white/5 hover:border-sui-blue/30 transition-all">
              <CardHeader>
                <div className="text-4xl mb-4">{feature.icon}</div>
                <CardTitle className="text-white">{feature.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-gray-400">{feature.description}</CardDescription>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}

export default FeatureSection
