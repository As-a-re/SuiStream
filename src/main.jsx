import { createRoot } from "react-dom/client"
import "./index.css"

// Super simplified app in plain JavaScript
const App = () => {
  return (
    <div className="min-h-screen bg-sui-dark text-white">
      {/* Navbar */}
      <nav className="fixed top-0 w-full z-50 bg-sui-dark/80 backdrop-blur-md border-b border-white/10">
        <div className="container mx-auto flex justify-between items-center h-16 px-4">
          <div className="flex items-center">
            <a href="#" className="text-xl font-bold text-white flex items-center">
              <span className="text-sui-blue mr-1">Sui</span>Stream
            </a>
            <div className="hidden md:flex items-center ml-10 space-x-6">
              <a href="#" className="text-gray-300 hover:text-white transition-colors">
                Home
              </a>
              <a href="#" className="text-gray-300 hover:text-white transition-colors">
                Movies
              </a>
              <a href="#" className="text-gray-300 hover:text-white transition-colors">
                TV Shows
              </a>
              <a href="#" className="text-gray-300 hover:text-white transition-colors">
                My Collection
              </a>
            </div>
          </div>
          <button className="bg-sui-blue hover:bg-sui-blue-dark text-white px-4 py-2 rounded-md">Connect Wallet</button>
        </div>
      </nav>

      {/* Hero Section */}
      <div className="pt-16 pb-8">
        <div className="bg-gradient-to-b from-sui-dark-accent to-sui-dark py-20">
          <div className="container mx-auto px-4 text-center">
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
        </div>
      </div>

      {/* Content Section */}
      <div className="container mx-auto px-4 py-8">
        <h2 className="text-2xl font-bold mb-6">Trending Now</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {[1, 2, 3, 4].map((i) => (
            <div key={i} className="bg-sui-dark-accent rounded-lg overflow-hidden shadow-lg">
              <div className="h-64 bg-gray-800 flex items-center justify-center">
                <span className="text-gray-500">Movie {i}</span>
              </div>
              <div className="p-4">
                <h3 className="font-semibold text-white">Sample Movie {i}</h3>
                <p className="text-sm text-gray-400">2023 • Action</p>
                <div className="mt-2">
                  <span className="text-sui-blue font-medium">40 SUI</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Features Section */}
      <div className="bg-sui-dark-accent py-16 mt-12">
        <div className="container mx-auto px-4">
          <h2 className="text-2xl font-bold mb-8 text-center">Why SuiStream is Different</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="bg-black/30 p-6 rounded-lg">
              <div className="text-4xl mb-4">🔗</div>
              <h3 className="text-xl font-semibold mb-2">Own Your Content</h3>
              <p className="text-gray-400">
                Purchase movies and shows as NFTs on the Sui blockchain, giving you true ownership of your digital media
                collection.
              </p>
            </div>
            <div className="bg-black/30 p-6 rounded-lg">
              <div className="text-4xl mb-4">💰</div>
              <h3 className="text-xl font-semibold mb-2">Creator Payments</h3>
              <p className="text-gray-400">
                Payments go directly to content creators through smart contracts, eliminating middlemen and reducing
                costs.
              </p>
            </div>
            <div className="bg-black/30 p-6 rounded-lg">
              <div className="text-4xl mb-4">🌐</div>
              <h3 className="text-xl font-semibold mb-2">Decentralized Storage</h3>
              <p className="text-gray-400">
                Content is stored across the network, making censorship impossible and ensuring always-available
                streaming.
              </p>
            </div>
            <div className="bg-black/30 p-6 rounded-lg">
              <div className="text-4xl mb-4">🏛️</div>
              <h3 className="text-xl font-semibold mb-2">Community Governance</h3>
              <p className="text-gray-400">
                Platform decisions are made via community votes, giving users a voice in the future of SuiStream.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-sui-dark py-12 border-t border-white/10">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <div className="text-xl font-bold text-white mb-4">
                <span className="text-sui-blue">Sui</span>Stream
              </div>
              <p className="text-gray-400 text-sm">
                The first decentralized streaming platform built on the Sui blockchain.
              </p>
            </div>
            <div>
              <h3 className="font-medium text-white mb-4">Platform</h3>
              <ul className="space-y-2 text-sm">
                <li>
                  <a href="#" className="text-gray-400 hover:text-sui-blue">
                    Movies
                  </a>
                </li>
                <li>
                  <a href="#" className="text-gray-400 hover:text-sui-blue">
                    TV Shows
                  </a>
                </li>
                <li>
                  <a href="#" className="text-gray-400 hover:text-sui-blue">
                    My Collection
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="font-medium text-white mb-4">Resources</h3>
              <ul className="space-y-2 text-sm">
                <li>
                  <a href="#" className="text-gray-400 hover:text-sui-blue">
                    Help Center
                  </a>
                </li>
                <li>
                  <a href="#" className="text-gray-400 hover:text-sui-blue">
                    Community
                  </a>
                </li>
                <li>
                  <a href="#" className="text-gray-400 hover:text-sui-blue">
                    Creator Portal
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="font-medium text-white mb-4">Legal</h3>
              <ul className="space-y-2 text-sm">
                <li>
                  <a href="#" className="text-gray-400 hover:text-sui-blue">
                    Terms of Service
                  </a>
                </li>
                <li>
                  <a href="#" className="text-gray-400 hover:text-sui-blue">
                    Privacy Policy
                  </a>
                </li>
                <li>
                  <a href="#" className="text-gray-400 hover:text-sui-blue">
                    Content Policy
                  </a>
                </li>
              </ul>
            </div>
          </div>
          <div className="h-px bg-white/10 my-8"></div>
          <div className="flex flex-col md:flex-row items-center justify-between text-sm text-gray-500">
            <div>© 2023 SuiStream. All rights reserved.</div>
            <div className="mt-4 md:mt-0">
              <span>Powered by </span>
              <a
                href="https://sui.io"
                target="_blank"
                rel="noopener noreferrer"
                className="text-sui-blue hover:underline"
              >
                Sui Blockchain
              </a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}

// Render the app
createRoot(document.getElementById("root")).render(<App />)
