import Link from 'next/link'
import { Code2, Github } from 'lucide-react'
import ThemeToggle from './ThemeToggle'

export default function Header() {
  return (
    <header className="sticky top-0 z-50 bg-white dark:bg-gray-900 border-b-2 border-black dark:border-white">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 hover:opacity-80 transition-opacity">
            <Code2 className="w-8 h-8 text-black dark:text-white" />
            <span className="text-xl font-bold text-black dark:text-white">IT Toolkit</span>
          </Link>

          {/* Navigation */}
          <nav className="hidden md:flex items-center gap-6">
            <Link href="/#tools" className="text-black dark:text-white hover:text-gray-600 dark:hover:text-gray-400 transition-colors font-medium">
              Araçlar
            </Link>
            <Link href="/category/network" className="text-black dark:text-white hover:text-gray-600 dark:hover:text-gray-400 transition-colors font-medium">
              Network
            </Link>
            <Link href="/category/system" className="text-black dark:text-white hover:text-gray-600 dark:hover:text-gray-400 transition-colors font-medium">
              System
            </Link>
            <Link href="/category/security" className="text-black dark:text-white hover:text-gray-600 dark:hover:text-gray-400 transition-colors font-medium">
              Security
            </Link>
            <Link href="/category/automation" className="text-black dark:text-white hover:text-gray-600 dark:hover:text-gray-400 transition-colors font-medium">
              Automation
            </Link>
          </nav>

          {/* Actions */}
          <div className="flex items-center gap-3">
            <ThemeToggle />
            <Link
              href="/submit-tool"
              className="bg-white dark:bg-gray-800 text-black dark:text-white border-2 border-black dark:border-white px-4 py-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors font-semibold text-sm"
            >
              Araç Öner
            </Link>
            <a
              href="https://github.com/ibidi/it-toolkit"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 bg-black dark:bg-white text-white dark:text-black px-4 py-2 rounded-lg hover:bg-gray-800 dark:hover:bg-gray-200 transition-colors"
            >
              <Github size={18} />
              <span className="hidden sm:inline">GitHub</span>
            </a>
          </div>
        </div>
      </div>
    </header>
  )
}
