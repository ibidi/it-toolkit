'use client'

import { X, Copy, Check } from 'lucide-react'
import { useState, useEffect } from 'react'

interface CodeModalProps {
  isOpen: boolean
  onClose: () => void
  code: string
  title: string
}

export default function CodeModal({ isOpen, onClose, code, title }: CodeModalProps) {
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
      <div className="relative bg-white rounded-xl border-2 border-black max-w-4xl w-full max-h-[90vh] flex flex-col animate-slideUp">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b-2 border-black">
          <h3 className="text-xl font-bold text-black">{title}</h3>
          <div className="flex items-center gap-2">
            <button
              onClick={copyToClipboard}
              className="p-2 bg-white border-2 border-black hover:bg-gray-100 rounded-lg transition-colors"
              title="Kodu kopyala"
            >
              {copied ? (
                <Check className="text-green-600" size={20} />
              ) : (
                <Copy className="text-black" size={20} />
              )}
            </button>
            <button
              onClick={onClose}
              className="p-2 bg-white border-2 border-black hover:bg-gray-100 rounded-lg transition-colors"
              title="Kapat"
            >
              <X className="text-black" size={20} />
            </button>
          </div>
        </div>

        {/* Code Content */}
        <div className="flex-1 overflow-auto p-6">
          <div className="bg-black rounded-lg p-6 overflow-x-auto">
            <pre className="text-sm">
              <code className="text-green-400 font-mono whitespace-pre">
                {code}
              </code>
            </pre>
          </div>
        </div>
      </div>
    </div>
  )
}
