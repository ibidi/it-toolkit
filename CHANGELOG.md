# Changelog

Tüm önemli değişiklikler bu dosyada belgelenecektir.

## [1.1.0] - 2025-10-28

### Added (Eklenenler)
- 🆕 5 yeni araç eklendi (toplam 13 araç)
  - MAC Scanner (Network) - ARP tablosu MAC adresleri
  - SSL Checker (Security) - SSL sertifika kontrolü
  - Process Manager (System) - İşlem yönetimi
  - Bulk Renamer (Automation) - Toplu dosya yeniden adlandırma
  - Email Notifier (Automation) - SMTP email gönderici

### Changed (Değişiklikler)
- 📄 Ana sayfa "Öne Çıkan Araçlar" → "Tüm Araçlar" (13 araç gösteriliyor)
- 🎨 Header border ince gri yapıldı (daha minimal)
- 🎨 Footer border ince gri yapıldı (daha minimal)
- 🔄 Footer Twitter ikonu → X ikonu güncellendi
- 📊 Sayfa sayısı 16 → 21'e çıktı

### Technical
- Build: ✅ Başarılı
- TypeScript: ✅ Hatasız
- Araç sayısı: 8 → 13 (+5)
- Sayfa sayısı: 16 → 21 (+5)

---

## [1.0.0] - 2025-10-28

### ✨ İlk Sürüm

#### Added (Eklenenler)
- 🎨 Modern siyah-beyaz minimal tasarım
- 📱 Tam responsive tasarım (mobil, tablet, desktop)
- 🔍 8 IT aracı showcase
- 📂 4 kategori (Network, System, Security, Automation)
- 💻 Kod modal penceresi ile kaynak kod görüntüleme
- 🚀 Next.js 15 ile SSG (Static Site Generation)
- ⚡ Hızlı ve optimize edilmiş performans
- 🎯 Header component (sticky navigation)
- 📄 Footer component (4 kolonlu)
- 🔗 GitHub repository linki güncellendi

#### Araçlar
**Network Tools:**
- IP Scanner - Ağdaki aktif IP'leri tarar
- DNS Lookup - Domain DNS sorguları
- Bandwidth Test - İnternet hızı testi

**System Tools:**
- Disk Analyzer - Disk kullanım analizi
- Process Manager - İşlem yönetimi

**Security Tools:**
- Hash Generator - MD5, SHA256 vb. hash oluşturma
- Port Scanner - TCP port tarama
- Login Monitor - Brute force koruması

**Automation:**
- Backup Creator - Klasör yedekleme
- Report Generator - HTML rapor oluşturma

#### Teknik
- Next.js 15 (App Router)
- TypeScript 5
- Tailwind CSS 4
- Lucide React icons
- Responsive design
- SEO optimized
- GitHub Actions CI/CD

#### Components
- `Header.tsx` - Sticky navigation bar
- `Footer.tsx` - 4 kolonlu footer (Brand, Kategoriler, Linkler, Geliştirici)
- `CodeModal.tsx` - Kod görüntüleme modal penceresi
- `CodeModalButton.tsx` - Modal açma butonu
- `CodeBlock.tsx` - Kod gösterimi (deprecated)

#### Pages
- `/` - Ana sayfa (Hero + Öne Çıkan Araçlar)
- `/category/[slug]` - Kategori sayfaları
- `/tool/[id]` - Araç detay sayfaları

### Changed (Değişiklikler)

#### Ana Sayfa
- İstatistik kartları kaldırıldı (8 Araç, 4 Kategori, vb.)
- Kategori kartları kaldırıldı
- Daha minimal ve temiz görünüm
- Sadece Hero section ve Öne Çıkan Araçlar

#### Footer
- Emoji ikonlar → Lucide React ikonları
- Globe, Github, Instagram, Twitter ikonları eklendi
- Daha profesyonel görünüm

#### Kategori Sayfaları
- Tool başlıkları siyah (gri değil)
- Checkmark işaretleri siyah
- "Detayları Gör" yazısı siyah
- Hover efektleri beyaz

#### Araç Detay Sayfaları
- Kaynak kod artık modal pencerede açılıyor
- "Kaynak Kodu Görüntüle" butonu eklendi
- Daha iyi kullanıcı deneyimi

### Fixed (Düzeltmeler)
- Next.js 15 params hatası düzeltildi (async/await)
- Ana sayfada proje isimlerinin rengi düzeltildi (gri → siyah)
- Instagram handle düzeltildi (@ihsanbakidogannx)
- Repository URL güncellendi (github.com/ibidi/it-toolkit)

### Technical Details

#### Dependencies
```json
{
  "next": "16.0.0",
  "react": "19.2.0",
  "typescript": "^5",
  "tailwindcss": "^4",
  "lucide-react": "^0.548.0"
}
```

#### Build
- ✅ Build başarılı
- ✅ TypeScript hatasız
- ✅ 16 sayfa oluşturuldu (SSG)
- ✅ Responsive tasarım

#### Repository
- **URL**: https://github.com/ibidi/it-toolkit
- **Lisans**: MIT
- **Versiyon**: 1.0.0

---

## Versiyon Formatı

Bu proje [Semantic Versioning](https://semver.org/) kullanır:
- **MAJOR**: Uyumsuz API değişiklikleri
- **MINOR**: Geriye uyumlu yeni özellikler
- **PATCH**: Geriye uyumlu bug düzeltmeleri

## Kategoriler

- `Added` - Yeni özellikler
- `Changed` - Mevcut özelliklerde değişiklikler
- `Deprecated` - Yakında kaldırılacak özellikler
- `Removed` - Kaldırılan özellikler
- `Fixed` - Bug düzeltmeleri
- `Security` - Güvenlik güncellemeleri

---

**Geliştirici**: İhsan Baki Doğan
- 🌐 [ihsanbakidogan.com](https://ihsanbakidogan.com)
- 💻 [@ibidi](https://github.com/ibidi)
