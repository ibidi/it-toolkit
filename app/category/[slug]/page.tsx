import { tools, categories } from '@/lib/tools-data'
import { notFound } from 'next/navigation'
import Link from 'next/link'
import { ArrowLeft, ArrowRight } from 'lucide-react'

export function generateStaticParams() {
  return Object.keys(categories).map((slug) => ({
    slug,
  }))
}

export default async function CategoryPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const category = categories[slug as keyof typeof categories]
  
  if (!category) {
    notFound()
  }

  const categoryTools = tools.filter(t => t.category === slug)

  return (
    <div className="min-h-screen bg-white">
      <div className="container mx-auto px-4 py-12">
        {/* Back Button */}
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-gray-600 hover:text-black transition-colors mb-8"
        >
          <ArrowLeft size={20} />
          Ana Sayfaya Dön
        </Link>

        {/* Header */}
        <div className="text-center mb-16">
          <div className="text-8xl mb-6">{category.icon}</div>
          <h1 className="text-5xl font-bold text-black mb-4">
            {category.name}
          </h1>
          <p className="text-xl text-gray-700 max-w-2xl mx-auto mb-6">
            {category.description}
          </p>
          <div className="inline-block px-6 py-2 bg-black text-white rounded-full">
            <span>{categoryTools.length} araç mevcut</span>
          </div>
        </div>

        {/* Tools Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {categoryTools.map((tool) => (
            <Link
              key={tool.id}
              href={`/tool/${tool.id}`}
              className="group bg-white rounded-xl p-6 border-2 border-black hover:bg-black hover:text-white transition-all hover:scale-105"
            >
              <div className="flex items-start justify-between mb-4">
                <div>
                  <h3 className="text-2xl font-bold mb-2">
                    {tool.name}
                  </h3>
                  <span className="text-xs px-3 py-1 bg-gray-200 group-hover:bg-gray-700 text-black group-hover:text-white rounded-full">
                    {tool.language}
                  </span>
                </div>
              </div>
              
              <p className="text-gray-600 group-hover:text-gray-300 mb-4">
                {tool.description}
              </p>

              <div className="space-y-2 mb-4">
                {tool.features.slice(0, 3).map((feature, i) => (
                  <div key={i} className="flex items-start gap-2">
                    <span className="text-xs mt-1">✓</span>
                    <span className="text-sm text-gray-600 group-hover:text-gray-300">{feature}</span>
                  </div>
                ))}
              </div>

              <div className="flex items-center text-sm font-medium">
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
