export default function StructuredData() {
  const structuredData = {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: 'IT Toolkit',
    description: 'Bilgi İşlem Araçları Koleksiyonu - Ağ yönetimi, sistem kontrolü, güvenlik testleri ve otomasyon araçları',
    url: 'https://it.socialin.net',
    author: {
      '@type': 'Person',
      name: 'İhsan Baki Doğan',
      url: 'https://ihsanbakidogan.com',
    },
    publisher: {
      '@type': 'Person',
      name: 'İhsan Baki Doğan',
    },
    inLanguage: 'tr-TR',
    potentialAction: {
      '@type': 'SearchAction',
      target: 'https://it.socialin.net/?q={search_term_string}',
      'query-input': 'required name=search_term_string',
    },
  }

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
    />
  )
}
