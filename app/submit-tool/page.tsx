'use client'

import { useState } from 'react'
import Link from 'next/link'
import { ArrowLeft, Send, CheckCircle } from 'lucide-react'

export default function SubmitToolPage() {
  const [formData, setFormData] = useState({
    name: '',
    category: 'network',
    description: '',
    language: 'python',
    code: '',
    usage: '',
    features: '',
  })
  const [loading, setLoading] = useState(false)
  const [success, setSuccess] = useState(false)
  const [error, setError] = useState('')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError('')

    try {
      const response = await fetch('/api/submit-tool', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.error || 'Bir hata oluştu')
      }

      setSuccess(true)
      setFormData({
        name: '',
        category: 'network',
        description: '',
        language: 'python',
        code: '',
        usage: '',
        features: '',
      })
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Bir hata oluştu')
    } finally {
      setLoading(false)
    }
  }

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    })
  }

  if (success) {
    return (
      <div className="min-h-screen bg-white">
        <div className="container mx-auto px-4 py-12">
          <div className="max-w-2xl mx-auto text-center">
            <CheckCircle className="w-20 h-20 text-green-600 mx-auto mb-6" />
            <h1 className="text-4xl font-bold text-black mb-4">
              İsteğiniz Gönderildi!
            </h1>
            <p className="text-xl text-gray-600 mb-8">
              Araç isteğiniz başarıyla alındı. En kısa sürede değerlendirilecek ve size geri dönüş yapılacaktır.
            </p>
            <div className="flex gap-4 justify-center">
              <Link
                href="/"
                className="inline-flex items-center gap-2 bg-black text-white px-8 py-4 rounded-lg font-semibold hover:bg-gray-800 transition-colors"
              >
                Ana Sayfaya Dön
              </Link>
              <button
                onClick={() => setSuccess(false)}
                className="inline-flex items-center gap-2 bg-white text-black border-2 border-black px-8 py-4 rounded-lg font-semibold hover:bg-gray-50 transition-colors"
              >
                Yeni İstek Gönder
              </button>
            </div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-white">
      <div className="container mx-auto px-4 py-12">
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-gray-600 hover:text-black transition-colors mb-8"
        >
          <ArrowLeft size={20} />
          Ana Sayfaya Dön
        </Link>

        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold text-black mb-4">
              Araç İsteği Gönder
            </h1>
            <p className="text-xl text-gray-600">
              Yeni bir IT aracı öneriniz mi var? Formu doldurun, biz değerlendirelim!
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Name */}
            <div>
              <label htmlFor="name" className="block text-sm font-bold text-black mb-2">
                Araç İsmi *
              </label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
                className="w-full px-4 py-3 border-2 border-black rounded-lg focus:outline-none focus:ring-2 focus:ring-black placeholder:text-gray-400"
                placeholder="Örn: IP Scanner"
              />
            </div>

            {/* Category */}
            <div>
              <label htmlFor="category" className="block text-sm font-bold text-black mb-2">
                Kategori *
              </label>
              <select
                id="category"
                name="category"
                value={formData.category}
                onChange={handleChange}
                required
                className="w-full px-4 py-3 border-2 border-black rounded-lg focus:outline-none focus:ring-2 focus:ring-black text-black"
              >
                <option value="network">Ağ Araçları</option>
                <option value="system">Sistem Araçları</option>
                <option value="security">Güvenlik Araçları</option>
                <option value="automation">Otomasyon</option>
              </select>
            </div>

            {/* Language */}
            <div>
              <label htmlFor="language" className="block text-sm font-bold text-black mb-2">
                Programlama Dili *
              </label>
              <select
                id="language"
                name="language"
                value={formData.language}
                onChange={handleChange}
                required
                className="w-full px-4 py-3 border-2 border-black rounded-lg focus:outline-none focus:ring-2 focus:ring-black text-black"
              >
                <option value="python">Python</option>
                <option value="batch">Batch</option>
                <option value="bash">Bash</option>
                <option value="javascript">JavaScript</option>
                <option value="other">Diğer</option>
              </select>
            </div>

            {/* Description */}
            <div>
              <label htmlFor="description" className="block text-sm font-bold text-black mb-2">
                Açıklama *
              </label>
              <textarea
                id="description"
                name="description"
                value={formData.description}
                onChange={handleChange}
                required
                rows={3}
                className="w-full px-4 py-3 border-2 border-black rounded-lg focus:outline-none focus:ring-2 focus:ring-black placeholder:text-gray-400"
                placeholder="Aracın ne işe yaradığını kısaca açıklayın"
              />
            </div>

            {/* Usage */}
            <div>
              <label htmlFor="usage" className="block text-sm font-bold text-black mb-2">
                Kullanım Komutu
              </label>
              <input
                type="text"
                id="usage"
                name="usage"
                value={formData.usage}
                onChange={handleChange}
                className="w-full px-4 py-3 border-2 border-black rounded-lg focus:outline-none focus:ring-2 focus:ring-black placeholder:text-gray-400"
                placeholder="Örn: python ip_scanner.py"
              />
            </div>

            {/* Features */}
            <div>
              <label htmlFor="features" className="block text-sm font-bold text-black mb-2">
                Özellikler (Her satıra bir özellik)
              </label>
              <textarea
                id="features"
                name="features"
                value={formData.features}
                onChange={handleChange}
                rows={4}
                className="w-full px-4 py-3 border-2 border-black rounded-lg focus:outline-none focus:ring-2 focus:ring-black placeholder:text-gray-400"
                placeholder="Ağdaki aktif IP'leri tarar&#10;Hızlı tarama&#10;Detaylı rapor"
              />
            </div>

            {/* Code */}
            <div>
              <label htmlFor="code" className="block text-sm font-bold text-black mb-2">
                Kaynak Kod *
              </label>
              <textarea
                id="code"
                name="code"
                value={formData.code}
                onChange={handleChange}
                required
                rows={12}
                className="w-full px-4 py-3 border-2 border-black rounded-lg focus:outline-none focus:ring-2 focus:ring-black font-mono text-sm placeholder:text-gray-400"
                placeholder="Kodunuzu buraya yapıştırın..."
              />
            </div>

            {error && (
              <div className="bg-red-50 border-2 border-red-500 text-red-700 px-4 py-3 rounded-lg">
                {error}
              </div>
            )}

            {/* Submit */}
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-black text-white px-8 py-4 rounded-lg font-semibold hover:bg-gray-800 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
            >
              {loading ? (
                <>
                  <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  Gönderiliyor...
                </>
              ) : (
                <>
                  <Send size={20} />
                  İsteği Gönder
                </>
              )}
            </button>
          </form>
        </div>
      </div>
    </div>
  )
}
