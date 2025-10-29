'use client'

import { X, Copy, Check } from 'lucide-react'
import { useState, useEffect } from 'react'
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter'
import { vscDarkPlus } from 'react-syntax-highlighter/dist/esm/styles/prism'

interface CodeModalProps {
  isOpen: boolean
  onClose: () => void
  code: string
  title: string
  language?: string
}

export default function CodeModal({ isOpen, onClose, code, title, language = 'python' }: CodeModalProps) {
  const [copied, setCopied] = useState(false)

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = 'unset'
    }
    return () => {
      document.body.style.overflow = 'unset'
    }
  }, [isOpen])

  const copyToClipboard = () => {
    navigator.clipboard.writeText(code)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 animate-fadeIn">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-black bg-opacity-50 animate-fadeIn"
        onClick={onClose}
      />
      
      {/* Modal */}
      <div className="relative bg-white dark:bg-gray-900 rounded-xl border-2 border-black dark:border-white max-w-4xl w-full max-h-[90vh] flex flex-col animate-slideUp">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b-2 border-black dark:border-white">
          <h3 className="text-xl font-bold text-black dark:text-white">{title}</h3>
          <div className="flex items-center gap-2">
            <button
              onClick={copyToClipboard}
              className="p-2 bg-white dark:bg-gray-800 border-2 border-black dark:border-white hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors"
              title="Kodu kopyala"
            >
              {copied ? (
                <Check className="text-green-600" size={20} />
              ) : (
                <Copy className="text-black dark:text-white" size={20} />
              )}
            </button>
            <button
              onClick={onClose}
              className="p-2 bg-white dark:bg-gray-800 border-2 border-black dark:border-white hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors"
              title="Kapat"
            >
              <X className="text-black dark:text-white" size={20} />
            </button>
          </div>
        </div>

        {/* Code Content */}
        <div className="flex-1 overflow-auto p-6">
          <SyntaxHighlighter
            language={language}
            style={vscDarkPlus}
            customStyle={{
              margin: 0,
              borderRadius: '0.5rem',
              fontSize: '0.875rem',
            }}
            showLineNumbers
          >
            {code}
          </SyntaxHighlighter>
        </div>
      </div>
    </div>
  )
}
