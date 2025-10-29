import { tools, categories } from '@/lib/tools-data'
import { notFound } from 'next/navigation'
import Link from 'next/link'
import { ArrowLeft, Terminal, FileCode, Check } from 'lucide-react'
import CodeModalButton from '@/components/CodeModalButton'
import LanguageIcon from '@/components/LanguageIcon'
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter'
import { vscDarkPlus } from 'react-syntax-highlighter/dist/esm/styles/prism'

export function generateStaticParams() {
  return tools.map((tool) => ({
    id: tool.id,
  }))
}

export async function generateMetadata({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  const tool = tools.find(t => t.id === id)

  if (!tool) {
    return {}
  }

  const category = categories[tool.category]

  return {
    title: `${tool.name} - ${category.name}`,
    description: `${tool.description} ${tool.language} ile yazılmış ${category.name} aracı.`,
    keywords: [tool.name, tool.language, category.name, tool.category, 'IT tools', ...tool.features],
    openGraph: {
      title: `${tool.name} - IT Toolkit`,
      description: tool.description,
      type: 'article',
    },
  }
}

export default async function ToolPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  const tool = tools.find(t => t.id === id)

  if (!tool) {
    notFound()
  }

  const category = categories[tool.category]

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
        <div className="bg-white dark:bg-gray-800 rounded-xl p-4 md:p-8 border-2 border-black dark:border-white mb-8">
          <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4 mb-6">
            <div className="flex-1">
              <div className="flex items-center gap-3 mb-4">
                <span className="text-4xl md:text-5xl">{category.icon}</span>
                <div>
                  <h1 className="text-2xl md:text-4xl font-bold text-black dark:text-white">{tool.name}</h1>
                  <p className="text-gray-600 dark:text-gray-400 mt-1 md:mt-2 text-sm md:text-base">{category.name}</p>
                </div>
              </div>
              <p className="text-base md:text-xl text-gray-700 dark:text-gray-300">
                {tool.description}
              </p>
            </div>
            <div className="flex flex-row md:flex-col gap-2">
              <span className="px-3 md:px-4 py-2 bg-gray-200 dark:bg-gray-800 text-black dark:text-white rounded-lg text-xs md:text-sm font-medium whitespace-nowrap flex items-center gap-2">
                <LanguageIcon language={tool.language} size={16} />
                {tool.language}
              </span>
              <span className="px-3 md:px-4 py-2 bg-black dark:bg-white text-white dark:text-black rounded-lg text-xs md:text-sm font-medium text-center break-all md:break-normal">
                {tool.fileName}
              </span>
            </div>
          </div>

          {/* Features */}
          <div className="grid md:grid-cols-2 gap-4 mt-6">
            {tool.features.map((feature, i) => (
              <div key={i} className="flex items-start gap-3">
                <Check className="text-black dark:text-white flex-shrink-0 mt-1" size={20} />
                <span className="text-gray-700 dark:text-gray-300">{feature}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Usage */}
        <div className="bg-white dark:bg-gray-800 rounded-xl p-8 border-2 border-black dark:border-white mb-8">
          <div className="flex items-center gap-3 mb-4">
            <Terminal className="text-black dark:text-white" size={24} />
            <h2 className="text-2xl font-bold text-black dark:text-white">Kullanım</h2>
          </div>
          <div className="bg-black dark:bg-gray-950 rounded-lg p-4 font-mono text-sm">
            <code className="text-green-400">$ {tool.usage}</code>
          </div>
        </div>

        {/* Code */}
        <div className="bg-white dark:bg-gray-800 rounded-xl p-8 border-2 border-black dark:border-white mb-8">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-3">
              <FileCode className="text-black dark:text-white" size={24} />
              <h2 className="text-2xl font-bold text-black dark:text-white">Kaynak Kod</h2>
            </div>
          </div>
          <CodeModalButton code={tool.code} title={`${tool.name} - Kaynak Kod`} language={tool.language} />
        </div>

        {/* Example Output */}
        <div className="bg-white dark:bg-gray-900 rounded-xl p-8 border-2 border-black dark:border-white">
          <div className="flex items-center gap-3 mb-4">
            <Terminal className="text-black dark:text-white" size={24} />
            <h2 className="text-2xl font-bold text-black dark:text-white">Örnek Çıktı</h2>
          </div>
          <SyntaxHighlighter
            language="bash"
            style={vscDarkPlus}
            customStyle={{
              margin: 0,
              borderRadius: '0.5rem',
              fontSize: '0.875rem',
            }}
          >
            {tool.example}
          </SyntaxHighlighter>
        </div>

        {/* Related Tools */}
        <div className="mt-12">
          <h2 className="text-2xl font-bold text-black dark:text-white mb-6">Benzer Araçlar</h2>
          <div className="grid md:grid-cols-3 gap-6">
            {tools
              .filter(t => t.category === tool.category && t.id !== tool.id)
              .slice(0, 3)
              .map((relatedTool) => (
                <Link
                  key={relatedTool.id}
                  href={`/tool/${relatedTool.id}`}
                  className="group bg-white dark:bg-gray-800 rounded-xl p-6 border-2 border-black dark:border-white hover:bg-black dark:hover:bg-white hover:text-white dark:hover:text-black transition-all"
                >
                  <h3 className="text-xl font-bold text-black dark:text-white group-hover:text-white dark:group-hover:text-black mb-2">
                    {relatedTool.name}
                  </h3>
                  <p className="text-gray-600 dark:text-gray-400 group-hover:text-gray-300 dark:group-hover:text-gray-600 text-sm line-clamp-2">
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
