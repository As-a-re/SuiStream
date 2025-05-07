// Simplified Footer component without complex TypeScript features
const Footer = () => {
  return (
    <footer className="bg-sui-dark py-12 border-t border-white/10">
      <div className="container px-4 mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <div className="text-xl font-bold text-white mb-4">
              <span className="text-sui-blue">Sui</span>Stream
            </div>
            <p className="text-gray-400 text-sm">
              The first decentralized streaming platform built on the Sui blockchain. Own your media, support creators
              directly, and join the future of entertainment.
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
              <li>
                <a href="#" className="text-gray-400 hover:text-sui-blue">
                  Marketplace
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
              <li>
                <a href="#" className="text-gray-400 hover:text-sui-blue">
                  Blockchain Glossary
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
              <li>
                <a href="#" className="text-gray-400 hover:text-sui-blue">
                  Cookie Preferences
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
  )
}

export default Footer
