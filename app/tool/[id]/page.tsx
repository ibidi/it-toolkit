import { tools, categories } from '@/lib/tools-data'
import { notFound } from 'next/navigation'
import Link from 'next/link'
import { ArrowLeft, Terminal, FileCode, Check } from 'lucide-react'
import CodeModalButton from '@/components/CodeModalButton'

export function generateStaticParams() {
  return tools.map((tool) => ({
    id: tool.id,
  }))
}

export default async function ToolPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  const tool = tools.find(t => t.id === id)
  
  if (!tool) {
    notFound()
  }

  const category = categories[tool.category]

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
        <div className="bg-white rounded-xl p-4 md:p-8 border-2 border-black mb-8">
          <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4 mb-6">
            <div className="flex-1">
              <div className="flex items-center gap-3 mb-4">
                <span className="text-4xl md:text-5xl">{category.icon}</span>
                <div>
                  <h1 className="text-2xl md:text-4xl font-bold text-black">{tool.name}</h1>
                  <p className="text-gray-600 mt-1 md:mt-2 text-sm md:text-base">{category.name}</p>
                </div>
              </div>
              <p className="text-base md:text-xl text-gray-700">
                {tool.description}
              </p>
            </div>
            <div className="flex flex-row md:flex-col gap-2">
              <span className="px-3 md:px-4 py-2 bg-gray-200 text-black rounded-lg text-xs md:text-sm font-medium whitespace-nowrap">
                {tool.language}
              </span>
              <span className="px-3 md:px-4 py-2 bg-black text-white rounded-lg text-xs md:text-sm font-medium text-center break-all md:break-normal">
                {tool.fileName}
              </span>
            </div>
          </div>

          {/* Features */}
          <div className="grid md:grid-cols-2 gap-4 mt-6">
            {tool.features.map((feature, i) => (
              <div key={i} className="flex items-start gap-3">
                <Check className="text-black flex-shrink-0 mt-1" size={20} />
                <span className="text-gray-700">{feature}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Usage */}
        <div className="bg-white rounded-xl p-8 border-2 border-black mb-8">
          <div className="flex items-center gap-3 mb-4">
            <Terminal className="text-black" size={24} />
            <h2 className="text-2xl font-bold text-black">Kullanım</h2>
          </div>
          <div className="bg-black rounded-lg p-4 font-mono text-sm">
            <code className="text-green-400">$ {tool.usage}</code>
          </div>
        </div>

        {/* Code */}
        <div className="bg-white rounded-xl p-8 border-2 border-black mb-8">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-3">
              <FileCode className="text-black" size={24} />
              <h2 className="text-2xl font-bold text-black">Kaynak Kod</h2>
            </div>
          </div>
          <CodeModalButton code={tool.code} title={`${tool.name} - Kaynak Kod`} />
        </div>

        {/* Example Output */}
        <div className="bg-white rounded-xl p-8 border-2 border-black">
          <div className="flex items-center gap-3 mb-4">
            <Terminal className="text-black" size={24} />
            <h2 className="text-2xl font-bold text-black">Örnek Çıktı</h2>
          </div>
          <div className="bg-black rounded-lg p-6 font-mono text-sm">
            <pre className="text-green-400 whitespace-pre-wrap">{tool.example}</pre>
          </div>
        </div>

        {/* Related Tools */}
        <div className="mt-12">
          <h2 className="text-2xl font-bold text-black mb-6">Benzer Araçlar</h2>
          <div className="grid md:grid-cols-3 gap-6">
            {tools
              .filter(t => t.category === tool.category && t.id !== tool.id)
              .slice(0, 3)
              .map((relatedTool) => (
                <Link
                  key={relatedTool.id}
                  href={`/tool/${relatedTool.id}`}
                  className="group bg-white rounded-xl p-6 border-2 border-black hover:bg-black hover:text-white transition-all"
                >
                  <h3 className="text-xl font-bold text-black group-hover:text-white mb-2">
                    {relatedTool.name}
                  </h3>
                  <p className="text-gray-600 group-hover:text-gray-300 text-sm line-clamp-2">
                    {relatedTool.description}
                  </p>
                </Link>
              ))}
          </div>
        </div>
      </div>
    </div>
  )
}
