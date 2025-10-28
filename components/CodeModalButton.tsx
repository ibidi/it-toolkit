'use client'

import { useState } from 'react'
import { Eye } from 'lucide-react'
import CodeModal from './CodeModal'

interface CodeModalButtonProps {
  code: string
  title: string
}

export default function CodeModalButton({ code, title }: CodeModalButtonProps) {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <>
      <button
        onClick={() => setIsOpen(true)}
        className="w-full bg-black text-white py-4 px-6 rounded-lg hover:bg-gray-800 transition-colors flex items-center justify-center gap-2 font-semibold"
      >
        <Eye size={20} />
        Kaynak Kodu Görüntüle
      </button>

      <CodeModal
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        code={code}
        title={title}
      />
    </>
  )
}
