import { tools, categories } from '@/lib/tools-data'
import { notFound } from 'next/navigation'
import Link from 'next/link'
import { ArrowLeft, ArrowRight } from 'lucide-react'
import LanguageIcon from '@/components/LanguageIcon'

export function generateStaticParams() {
  return Object.keys(categories).map((slug) => ({
    slug,
  }))
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const category = categories[slug as keyof typeof categories]
  
  if (!category) {
    return {}
  }

  const categoryTools = tools.filter(t => t.category === slug)

  return {
    title: `${category.name} - IT Toolkit`,
    description: `${category.description} ${categoryTools.length} araç mevcut.`,
    keywords: [category.name, 'IT tools', slug, 'bilgi işlem araçları'],
    openGraph: {
      title: `${category.name} - IT Toolkit`,
      description: category.description,
      type: 'website',
    },
  }
}

export default async function CategoryPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const category = categories[slug as keyof typeof categories]
  
  if (!category) {
    notFound()
  }

  const categoryTools = tools.filter(t => t.category === slug)

  return (
    <div className="min-h-screen bg-white dark:bg-gray-900">
      <div className="container mx-auto px-4 py-12">
        {/* Back Button */}
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-gray-600 dark:text-gray-400 hover:text-black dark:hover:text-white transition-colors mb-8"
        >
          <ArrowLeft size={20} />
          Ana Sayfaya Dön
        </Link>

        {/* Header */}
        <div className="text-center mb-16">
          <div className="text-8xl mb-6">{category.icon}</div>
          <h1 className="text-5xl font-bold text-black dark:text-white mb-4">
            {category.name}
          </h1>
          <p className="text-xl text-gray-700 dark:text-gray-300 max-w-2xl mx-auto mb-6">
            {category.description}
          </p>
          <div className="inline-block px-6 py-2 bg-black dark:bg-white text-white dark:text-black rounded-full">
            <span>{categoryTools.length} araç mevcut</span>
          </div>
        </div>

        {/* Tools Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {categoryTools.map((tool) => (
            <Link
              key={tool.id}
              href={`/tool/${tool.id}`}
              className="group bg-white dark:bg-gray-800 rounded-xl p-6 border-2 border-black dark:border-white hover:bg-black dark:hover:bg-white hover:text-white dark:hover:text-black transition-all hover:scale-105 relative"
            >
              {tool.isNew && (
                <div className="absolute -top-2 -right-2 bg-gradient-to-r from-green-500 to-emerald-600 text-white text-xs font-bold px-3 py-1 rounded-full shadow-lg animate-pulse">
                  YENİ
                </div>
              )}
              <div className="flex items-start justify-between mb-4">
                <div>
                  <h3 className="text-2xl font-bold text-black dark:text-white group-hover:text-white dark:group-hover:text-black mb-2">
                    {tool.name}
                  </h3>
                  <span className="text-xs px-3 py-1 bg-gray-200 dark:bg-gray-700 group-hover:bg-gray-700 dark:group-hover:bg-gray-200 text-black dark:text-white group-hover:text-white dark:group-hover:text-black rounded-full flex items-center gap-1">
                    <LanguageIcon language={tool.language} size={14} />
                    {tool.language}
                  </span>
                </div>
              </div>
              
              <p className="text-gray-600 dark:text-gray-400 group-hover:text-gray-300 dark:group-hover:text-gray-600 mb-4">
                {tool.description}
              </p>

              <div className="space-y-2 mb-4">
                {tool.features.slice(0, 3).map((feature, i) => (
                  <div key={i} className="flex items-start gap-2">
                    <span className="text-black dark:text-white group-hover:text-white dark:group-hover:text-black text-xs mt-1">✓</span>
                    <span className="text-sm text-gray-600 dark:text-gray-400 group-hover:text-gray-300 dark:group-hover:text-gray-600">{feature}</span>
                  </div>
                ))}
              </div>

              <div className="flex items-center text-sm font-medium text-black dark:text-white group-hover:text-white dark:group-hover:text-black">
                Detayları Gör
                <ArrowRight className="ml-2 group-hover:translate-x-2 transition-transform" size={16} />
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  )
}
