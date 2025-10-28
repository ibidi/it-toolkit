# 🛠️ IT Toolkit Showcase

Modern, minimal ve responsive bir web sitesi ile IT araçlarını sergileyin. Python ve Batch scriptlerinden oluşan IT Toolkit koleksiyonunu görsel olarak sunar.

![Next.js](https://img.shields.io/badge/Next.js-15-black)
![TypeScript](https://img.shields.io/badge/TypeScript-5-blue)
![Tailwind CSS](https://img.shields.io/badge/Tailwind-3-38bdf8)
![License](https://img.shields.io/badge/License-MIT-green)

## 🎯 Özellikler

- ✅ **Modern Tasarım** - Minimal siyah-beyaz tema
- ✅ **Responsive** - Mobil, tablet, desktop uyumlu
- ✅ **Kod Gösterimi** - Syntax highlighting ve kopyalama özelliği
- ✅ **Kategorize Edilmiş** - Network, System, Security, Automation
- ✅ **SEO Optimized** - Static site generation
- ✅ **Hızlı** - Next.js 15 ile optimize edilmiş

## 🚀 Hızlı Başlangıç

```bash
# Bağımlılıkları yükle
npm install

# Geliştirme sunucusunu başlat
npm run dev

# Tarayıcıda aç
http://localhost:3000
```

## 📦 Kurulum

```bash
# Repository'yi klonla
git clone https://github.com/ibidi/it-toolkit.git
cd it-toolkit

# Bağımlılıkları yükle
npm install

# Geliştirme modunda çalıştır
npm run dev

# Production build
npm run build
npm start
```

## 📁 Proje Yapısı

```
.
├── app/                        # Next.js App Router
│   ├── page.tsx               # Ana sayfa
│   ├── tool/[id]/             # Araç detay sayfaları
│   └── category/[slug]/       # Kategori sayfaları
├── components/                 # React bileşenleri
│   └── CodeBlock.tsx          # Kod gösterimi
├── lib/                       # Yardımcı fonksiyonlar
│   └── tools-data.ts          # Araç verileri
├── documents/                 # Dokümantasyon
│   └── original-tools/        # Orijinal Python/Batch araçları
└── public/                    # Statik dosyalar
```

## 🎨 Sergilenen Araçlar

### 🌐 Network Tools
- **IP Scanner** - Ağdaki aktif IP'leri tarar
- **DNS Lookup** - Domain DNS sorguları
- **Bandwidth Test** - İnternet hızı testi

### 💻 System Tools
- **Disk Analyzer** - Disk kullanım analizi
- **Process Manager** - İşlem yönetimi

### � Security oTools
- **Hash Generator** - MD5, SHA256 vb. hash oluşturma
- **Port Scanner** - TCP port tarama
- **Login Monitor** - Brute force koruması

### ⚙️ Automation
- **Backup Creator** - Klasör yedekleme
- **Report Generator** - HTML rapor oluşturma

## 🔧 Teknolojiler

- **Framework**: [Next.js 15](https://nextjs.org/)
- **Language**: [TypeScript](https://www.typescriptlang.org/)
- **Styling**: [Tailwind CSS](https://tailwindcss.com/)
- **Icons**: [Lucide React](https://lucide.dev/)
- **Deployment**: [Vercel](https://vercel.com/)

## 📝 Yeni Araç Ekleme

`lib/tools-data.ts` dosyasını düzenleyin:

```typescript
{
  id: 'yeni-arac',
  name: 'Yeni Araç',
  category: 'network', // network, system, security, automation
  description: 'Kısa açıklama',
  fileName: 'script.py',
  language: 'python', // python veya batch
  features: ['Özellik 1', 'Özellik 2'],
  usage: 'python script.py',
  code: `// Kaynak kod`,
  example: `// Örnek çıktı`
}
```

## 🚀 Deployment

### Vercel (Önerilen)

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/ibidi/it-toolkit)

### Manuel Deployment

```bash
# Build
npm run build

# Start
npm start
```

## 📸 Ekran Görüntüleri

### Ana Sayfa
Modern, minimal tasarım ile tüm araçları sergiler.

### Araç Detay Sayfası
- Detaylı açıklama
- Özellikler listesi
- Tam kaynak kod (kopyalama özelliği ile)
- Örnek çıktı
- Benzer araçlar

## 🤝 Katkıda Bulunma

Katkılarınızı bekliyoruz! Pull request göndermekten çekinmeyin.

1. Fork edin
2. Feature branch oluşturun (`git checkout -b feature/amazing-feature`)
3. Commit edin (`git commit -m 'feat: Add amazing feature'`)
4. Push edin (`git push origin feature/amazing-feature`)
5. Pull Request açın

## 📄 Lisans

Bu proje MIT lisansı altında lisanslanmıştır. Detaylar için [LICENSE](LICENSE) dosyasına bakın.

## 👨‍💻 Geliştirici

**İhsan Baki Doğan**

- 🌐 Website: [ihsanbakidogan.com](https://ihsanbakidogan.com)
- 💻 GitHub: [@ibidi](https://github.com/ibidi)
- 📸 Instagram: [@ihsanbakidogannx](https://instagram.com/ihsanbakidogannx)
- 🐦 X (Twitter): [@ibidicodes](https://x.com/ibidicodes)

## 🙏 Teşekkürler

Bu proje açık kaynak topluluğu için geliştirilmiştir.

---

⭐ Projeyi beğendiyseniz yıldız vermeyi unutmayın!

**Made with ❤️ by İhsan Baki Doğan**
