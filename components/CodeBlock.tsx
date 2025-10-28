'use client'

import { useState } from 'react'
import { Copy, Check } from 'lucide-react'

interface CodeBlockProps {
  code: string
  language: string
}

export default function CodeBlock({ code }: CodeBlockProps) {
  const [copied, setCopied] = useState(false)

  const copyToClipboard = () => {
    navigator.clipboard.writeText(code)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <div className="relative">
      <button
        onClick={copyToClipboard}
        className="absolute top-4 right-4 p-2 bg-white border-2 border-black hover:bg-gray-100 rounded-lg transition-colors z-10"
        title="Kodu kopyala"
      >
        {copied ? (
          <Check className="text-green-600" size={20} />
        ) : (
          <Copy className="text-black" size={20} />
        )}
      </button>
      
      <div className="bg-black rounded-lg p-6 overflow-x-auto">
        <pre className="text-sm">
          <code className="text-green-400 font-mono whitespace-pre">
            {code}
          </code>
        </pre>
      </div>
    </div>
  )
}
