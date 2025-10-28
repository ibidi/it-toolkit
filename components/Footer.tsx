import Link from 'next/link'
import { Code2, Globe, Github, Instagram, X } from 'lucide-react'

export default function Footer() {
  return (
    <footer className="bg-white mt-20">
      <div className="container mx-auto px-4 py-12">
        <div className="grid md:grid-cols-4 gap-8 mb-8">
          {/* Brand */}
          <div>
            <Link href="/" className="flex items-center gap-2 mb-4">
              <Code2 className="w-8 h-8 text-black" />
              <span className="text-xl font-bold text-black">IT Toolkit</span>
            </Link>
            <p className="text-gray-600 text-sm">
              Modern web showcase for IT tools - Network, System, Security & Automation scripts
            </p>
          </div>

          {/* Kategoriler */}
          <div>
            <h3 className="font-bold text-black mb-4">Kategoriler</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/category/network" className="text-gray-600 hover:text-black transition-colors">
                  Network Tools
                </Link>
              </li>
              <li>
                <Link href="/category/system" className="text-gray-600 hover:text-black transition-colors">
                  System Tools
                </Link>
              </li>
              <li>
                <Link href="/category/security" className="text-gray-600 hover:text-black transition-colors">
                  Security Tools
                </Link>
              </li>
              <li>
                <Link href="/category/automation" className="text-gray-600 hover:text-black transition-colors">
                  Automation
                </Link>
              </li>
            </ul>
          </div>

          {/* Linkler */}
          <div>
            <h3 className="font-bold text-black mb-4">Linkler</h3>
            <ul className="space-y-2">
              <li>
                <a href="https://github.com/ibidi/it-toolkit" target="_blank" rel="noopener noreferrer" className="text-gray-600 hover:text-black transition-colors">
                  GitHub Repository
                </a>
              </li>
              <li>
                <a href="https://github.com/ibidi/it-toolkit/issues" target="_blank" rel="noopener noreferrer" className="text-gray-600 hover:text-black transition-colors">
                  Issues
                </a>
              </li>
              <li>
                <a href="https://github.com/ibidi/it-toolkit/blob/main/CONTRIBUTING.md" target="_blank" rel="noopener noreferrer" className="text-gray-600 hover:text-black transition-colors">
                  Contributing
                </a>
              </li>
              <li>
                <a href="https://github.com/ibidi/it-toolkit/blob/main/LICENSE" target="_blank" rel="noopener noreferrer" className="text-gray-600 hover:text-black transition-colors">
                  License (MIT)
                </a>
              </li>
            </ul>
          </div>

          {/* Geliştirici */}
          <div>
            <h3 className="font-bold text-black mb-4">Geliştirici</h3>
            <p className="text-gray-600 mb-4">İhsan Baki Doğan</p>
            <div className="flex flex-col gap-2">
              <a href="https://ihsanbakidogan.com" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-gray-600 hover:text-black transition-colors">
                <Globe size={18} />
                Website
              </a>
              <a href="https://github.com/ibidi" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-gray-600 hover:text-black transition-colors">
                <Github size={18} />
                GitHub
              </a>
              <a href="https://instagram.com/ihsanbakidogann" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-gray-600 hover:text-black transition-colors">
                <Instagram size={18} />
                Instagram
              </a>
              <a href="https://x.com/ibidicodes" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-gray-600 hover:text-black transition-colors">
                <X size={18} />
                X
              </a>
            </div>
          </div>
        </div>

        {/* Copyright */}
        <div className="border-t border-gray-200 pt-8 text-center">
          <p className="text-gray-600">
            © {new Date().getFullYear()} IT Toolkit. Made with ❤️ by{' '}
            <a href="https://ihsanbakidogan.com" target="_blank" rel="noopener noreferrer" className="text-black font-semibold hover:underline">
              İhsan Baki Doğan
            </a>
          </p>
        </div>
      </div>
    </footer>
  )
}
