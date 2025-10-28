import Link from 'next/link'
import { categories, tools } from '@/lib/tools-data'
import { ArrowRight, Github, Code2 } from 'lucide-react'

export default function Home() {
  const toolsByCategory = {
    network: tools.filter(t => t.category === 'network'),
    system: tools.filter(t => t.category === 'system'),
    security: tools.filter(t => t.category === 'security'),
    automation: tools.filter(t => t.category === 'automation'),
  }

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <div className="container mx-auto px-4 py-20">
        <div className="text-center mb-16">
          <div className="inline-block mb-6">
            <Code2 className="w-20 h-20 text-black mx-auto" />
          </div>
          <h1 className="text-6xl font-bold text-black mb-6">
            IT Toolkit
          </h1>
          <p className="text-2xl text-gray-700 mb-8">
            Bilgi İşlem Profesyonelleri için Pratik Araçlar
          </p>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto mb-12">
            Ağ yönetimi, sistem kontrolü, güvenlik testleri ve otomasyon için
            kullanıma hazır Python ve Batch scriptleri koleksiyonu
          </p>
          
          <div className="flex gap-4 justify-center">
            <a
              href="https://github.com/ibidi"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 bg-black text-white px-8 py-4 rounded-lg font-semibold hover:bg-gray-800 transition-colors"
            >
              <Github size={20} />
              GitHub'da Görüntüle
            </a>
            <Link
              href="#tools"
              className="inline-flex items-center gap-2 bg-white text-black border-2 border-black px-8 py-4 rounded-lg font-semibold hover:bg-gray-50 transition-colors"
            >
              Araçları Keşfet
              <ArrowRight size={20} />
            </Link>
          </div>
        </div>

        {/* Featured Tools */}
        <div id="tools">
          <h2 className="text-4xl font-bold text-black text-center mb-12">
            Öne Çıkan Araçlar
          </h2>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {tools.slice(0, 6).map((tool) => (
              <Link
                key={tool.id}
                href={`/tool/${tool.id}`}
                className="group bg-white rounded-xl p-6 border-2 border-black hover:bg-black hover:text-white transition-all"
              >
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <h3 className="text-xl font-bold text-black group-hover:text-white mb-2">
                      {tool.name}
                    </h3>
                    <span className="text-xs px-3 py-1 bg-gray-200 group-hover:bg-gray-700 text-black group-hover:text-white rounded-full">
                      {tool.language}
                    </span>
                  </div>
                  <span className="text-3xl">{categories[tool.category].icon}</span>
                </div>
                <p className="text-gray-600 group-hover:text-gray-300 text-sm mb-4 line-clamp-2">
                  {tool.description}
                </p>
                <div className="flex items-center text-sm font-medium text-black group-hover:text-white">
                  Detayları Gör
                  <ArrowRight className="ml-2 group-hover:translate-x-2 transition-transform" size={16} />
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
