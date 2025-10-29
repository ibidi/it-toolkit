'use client'

import Link from 'next/link'
import { useState } from 'react'
import { categories, tools } from '@/lib/tools-data'
import { ArrowRight, Github, Code2, ChevronLeft, ChevronRight } from 'lucide-react'
import { LayoutTextFlip } from '@/components/ui/layout-text-flip'
import { TextGenerateEffect } from '@/components/ui/text-generate-effect'
import LanguageIcon from '@/components/LanguageIcon'

export default function Home() {
  const [currentPage, setCurrentPage] = useState(1)
  const toolsPerPage = 9
  const totalPages = Math.ceil(tools.length / toolsPerPage)

  const indexOfLastTool = currentPage * toolsPerPage
  const indexOfFirstTool = indexOfLastTool - toolsPerPage
  const currentTools = tools.slice(indexOfFirstTool, indexOfLastTool)

  return (
    <div className="min-h-screen bg-white dark:bg-gray-900">
      {/* Hero Section */}
      <div className="container mx-auto px-4 py-20">
        <div className="text-center mb-16">
          <div className="inline-block mb-6">
            <Code2 className="w-20 h-20 text-black dark:text-white mx-auto" />
          </div>
          <h1 className="text-6xl font-bold text-black dark:text-white mb-6">
            IT Toolkit
          </h1>
          <div className="flex flex-col items-center justify-center gap-4 mb-6">
            <LayoutTextFlip
              text=""
              words={["Ağ Yönetimi", "Sistem Kontrolü", "Güvenlik Testleri", "Otomasyon"]}
              duration={2500}
            />
          </div>
          <p className="text-2xl text-gray-700 dark:text-gray-300 mb-8">
            Bilgi İşlem Profesyonelleri için Pratik Araçlar
          </p>
          <div className="max-w-3xl mx-auto mb-12">
            <TextGenerateEffect
              words="Ağ yönetimi, sistem kontrolü, güvenlik testleri ve otomasyon için kullanıma hazır Python ve Batch scriptleri koleksiyonu"
              className="text-center"
            />
          </div>

          <div className="flex gap-4 justify-center">
            <a
              href="https://github.com/ibidi"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 bg-black dark:bg-white text-white dark:text-black px-8 py-4 rounded-lg font-semibold hover:bg-gray-800 dark:hover:bg-gray-200 transition-colors"
            >
              <Github size={20} />
              GitHub&apos;da Görüntüle
            </a>
            <Link
              href="#tools"
              className="inline-flex items-center gap-2 bg-white dark:bg-gray-800 text-black dark:text-white border-2 border-black dark:border-white px-8 py-4 rounded-lg font-semibold hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
            >
              Araçları Keşfet
              <ArrowRight size={20} />
            </Link>
          </div>
        </div>

        {/* Featured Tools */}
        <div id="tools">
          <h2 className="text-4xl font-bold text-black dark:text-white text-center mb-12">
            Tüm Araçlar
          </h2>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
            {currentTools.map((tool) => (
              <Link
                key={tool.id}
                href={`/tool/${tool.id}`}
                className="group bg-white dark:bg-gray-800 rounded-xl p-6 border-2 border-black dark:border-white hover:bg-black dark:hover:bg-white hover:text-white dark:hover:text-black transition-all"
              >
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <h3 className="text-xl font-bold text-black dark:text-white group-hover:text-white dark:group-hover:text-black mb-2">
                      {tool.name}
                    </h3>
                    <span className="text-xs px-3 py-1 bg-gray-200 dark:bg-gray-700 group-hover:bg-gray-700 dark:group-hover:bg-gray-200 text-black dark:text-white group-hover:text-white dark:group-hover:text-black rounded-full flex items-center gap-1">
                      <LanguageIcon language={tool.language} size={14} />
                      {tool.language}
                    </span>
                  </div>
                  <span className="text-3xl">{categories[tool.category].icon}</span>
                </div>
                <p className="text-gray-600 dark:text-gray-400 group-hover:text-gray-300 dark:group-hover:text-gray-600 text-sm mb-4 line-clamp-2">
                  {tool.description}
                </p>
                <div className="flex items-center text-sm font-medium text-black dark:text-white group-hover:text-white dark:group-hover:text-black">
                  Detayları Gör
                  <ArrowRight className="ml-2 group-hover:translate-x-2 transition-transform" size={16} />
                </div>
              </Link>
            ))}
          </div>

          {/* Pagination */}
          {totalPages > 1 && (
            <div className="flex justify-center items-center gap-2">
              <button
                onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                disabled={currentPage === 1}
                className="p-2 rounded-lg border-2 border-black dark:border-white text-black dark:text-white disabled:opacity-30 disabled:cursor-not-allowed hover:bg-black dark:hover:bg-white hover:text-white dark:hover:text-black transition-colors"
              >
                <ChevronLeft size={20} className="stroke-current" />
              </button>

              {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                <button
                  key={page}
                  onClick={() => setCurrentPage(page)}
                  className={`px-4 py-2 rounded-lg border-2 border-black dark:border-white font-semibold transition-colors ${currentPage === page
                    ? 'bg-black dark:bg-white text-white dark:text-black'
                    : 'bg-white dark:bg-gray-800 text-black dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700'
                    }`}
                >
                  {page}
                </button>
              ))}

              <button
                onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                disabled={currentPage === totalPages}
                className="p-2 rounded-lg border-2 border-black dark:border-white text-black dark:text-white disabled:opacity-30 disabled:cursor-not-allowed hover:bg-black dark:hover:bg-white hover:text-white dark:hover:text-black transition-colors"
              >
                <ChevronRight size={20} className="stroke-current" />
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
