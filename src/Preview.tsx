import Navbar from "./components/Navbar"
import Footer from "./components/Footer"

// Simplified preview component that doesn't rely on complex TypeScript features
const Preview = () => {
  return (
    <div className="min-h-screen bg-sui-dark text-white">
      <Navbar />

      <main className="pt-16 pb-8">
        <div className="container px-4 mx-auto">
          <div className="py-20 text-center">
            <h1 className="text-4xl md:text-6xl font-bold mb-6 text-white">SuiStream</h1>
            <p className="text-xl text-gray-300 mb-8 max-w-3xl mx-auto">
              The first decentralized streaming platform built on the Sui blockchain. Own your media, support creators
              directly, and join the future of entertainment.
            </p>
            <div className="flex justify-center gap-4">
              <button className="bg-sui-blue hover:bg-sui-blue-dark text-white px-8 py-3 rounded-md font-medium">
                Browse Content
              </button>
              <button className="border border-white/20 text-white px-8 py-3 rounded-md font-medium hover:bg-white/10">
                Learn More
              </button>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 my-12">
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="bg-sui-dark-accent rounded-lg overflow-hidden shadow-lg">
                <div className="h-64 bg-gray-800 flex items-center justify-center">
                  <span className="text-gray-500">Movie Poster</span>
                </div>
                <div className="p-4">
                  <h3 className="font-semibold text-white">Sample Movie {i}</h3>
                  <p className="text-sm text-gray-400">2023 • Action</p>
                </div>
              </div>
            ))}
          </div>

          <div className="my-16 p-8 bg-sui-dark-accent rounded-lg">
            <h2 className="text-2xl font-bold mb-4">Why SuiStream is Different</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="p-4">
                <h3 className="text-xl font-semibold mb-2">Own Your Content</h3>
                <p className="text-gray-300">
                  Purchase movies and shows as NFTs on the Sui blockchain, giving you true ownership of your digital
                  media collection.
                </p>
              </div>
              <div className="p-4">
                <h3 className="text-xl font-semibold mb-2">Creator Payments</h3>
                <p className="text-gray-300">
                  Payments go directly to content creators through smart contracts, eliminating middlemen and reducing
                  costs.
                </p>
              </div>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  )
}

export default Preview
