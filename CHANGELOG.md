# Changelog

Tüm önemli değişiklikler bu dosyada belgelenecektir.

## [2.3.0] - 2025-10-29

### 🎨 Dark Mode & UI İyileştirmeleri

#### Added (Eklenenler)
- 🌙 **Dark Mode Desteği** - Tam dark mode implementasyonu
  - ThemeProvider ile next-themes entegrasyonu
  - System tema desteği (otomatik light/dark)
  - ThemeToggle butonu (Header'da)
  - Tüm sayfalarda dark mode desteği
  - Smooth geçişler (disableTransitionOnChange)
- 🎯 **Loading Bar Sistemi** - Sayfa geçişlerinde modern loading
  - NProgress kütüphanesi entegrasyonu
  - Gradient animasyonlu loading bar
  - Dark mode uyumlu (siyah/beyaz)
  - Browser back/forward desteği
  - Suspense boundary ile SSG uyumlu
  - Smooth animasyonlar ve blur efektleri
- 🎨 **Dil İkonları** - Programlama dilleri için SVG ikonlar
  - Python, JavaScript, Batch, Bash, PowerShell ikonları
  - Ana sayfa ve kategori sayfalarında görünüyor
  - Dark mode uyumlu renkler

#### Changed (Değişiklikler)
- 🌙 **Tüm Sayfalar Dark Mode**
  - Ana sayfa (Hero, araç kartları, pagination)
  - Kategori sayfaları (başlık, araç kartları)
  - Araç detay sayfaları
  - Araç öner formu (tüm input'lar)
  - Footer (sosyal medya ikonları)
  - Header (navigasyon linkleri)
- 🎨 **TextGenerateEffect**
  - Dark mode'da text-gray-300 (daha okunabilir)
  - Light mode'da text-gray-600
- 🔧 **ThemeToggle İyileştirmesi**
  - resolvedTheme desteği (system tema için)
  - setTimeout ile setState (lint uyumlu)
  - Icon renkleri dark mode'da doğru

#### Fixed (Düzeltmeler)
- ✅ Footer dark mode geçişi ('use client' eklendi)
- ✅ ThemeToggle icon renkleri düzeltildi
- ✅ Category sayfası dark mode desteği eklendi
- ✅ Ana sayfa açıklama metni dark mode'da okunabilir
- ✅ Araç öner formu dark mode desteği
- ✅ ThemeToggle lint hatası (setState in effect)
- ✅ PageLoadingBar Suspense boundary eklendi

#### Technical
- 📦 Yeni bağımlılıklar:
  - `next-themes` - Dark mode yönetimi
  - `nprogress` - Loading bar
  - `@types/nprogress` - TypeScript types
- 🎨 Yeni componentler:
  - `components/ThemeProvider.tsx` - Theme context
  - `components/ThemeToggle.tsx` - Theme switch button
  - `components/PageLoadingBar.tsx` - Loading bar
  - `components/NavigationEvents.tsx` - Navigation listener
  - `components/LanguageIcon.tsx` - Language icons
- 🎨 Yeni CSS:
  - `app/nprogress.css` - Loading bar styles
  - Gradient animations
  - Dark mode variants

---

## [2.2.0] - 2025-10-29

### 🚀 Major Features

#### Added (Eklenenler)
- 🤖 **Araç İstek Sistemi** - Telegram Bot Entegrasyonu
  - `/submit-tool` sayfası ile kullanıcılar araç önerisi gönderebilir
  - Form alanları: İsim, Kategori, Dil, Açıklama, Kullanım, Özellikler, Kod
  - Telegram'a otomatik bildirim gönderimi
  - Inline keyboard ile ✅ Onayla / ❌ Reddet butonları
  - Başarı ekranı ve hata yönetimi
- 📄 **Pagination Sistemi** - Ana sayfada sayfalama
  - 9 araç/sayfa gösterimi
  - Sayfa numaraları ile geçiş
  - İleri/Geri ok butonları
  - Responsive tasarım
- ✨ **Text Generate Effect** - Hero section animasyonu
  - Kelime kelime animasyonlu metin
  - Blur efekti ile yumuşak geçiş
  - Açıklama metni için kullanıldı
- 📱 **Mobil Optimizasyonlar**
  - Tool detay sayfasında etiketler responsive
  - Mobilde yan yana, masaüstünde alt alta
  - Uzun dosya isimleri için break-all
  - Padding ve font boyutları optimize edildi
- 🎨 **Footer Yenilendi**
  - Minimal tek satır tasarım
  - Sosyal medya ikonları (GitHub, Website, Instagram, X)
  - SVG ikonlar ile daha profesyonel görünüm
  - Copyright ve lisans bilgileri

#### Changed (Değişiklikler)
- 🎯 **Header Güncellendi**
  - "Araç Öner" butonu eklendi
  - GitHub butonu ile yan yana
  - Daha iyi navigasyon
- 🎨 **Ana Sayfa**
  - "IT Toolkit" başlığı sabit
  - Dönen kelimeler ayrı component
  - Text generate effect ile açıklama
  - Pagination ile daha düzenli görünüm
- 🔧 **Form Placeholder'ları**
  - Tüm placeholder'lar gri renk (text-gray-400)
  - Daha iyi okunabilirlik
  - Tutarlı görünüm

#### Technical
- 📦 Yeni API endpoint:
  - `/api/submit-tool` - POST endpoint
  - Telegram API entegrasyonu
  - Form validation
  - Error handling
- 🎨 Yeni sayfalar:
  - `/submit-tool` - Araç istek formu
  - Başarı ekranı
  - Loading states
- 📝 Environment variables:
  - `TELEGRAM_BOT_TOKEN` - Bot token
  - `TELEGRAM_CHAT_ID` - Chat ID
  - `.env.example` dosyası eklendi
- 🔧 Yeni componentler:
  - `components/ui/text-generate-effect.tsx`
  - Pagination butonları (inline)

#### Fixed (Düzeltmeler)
- ✅ Pagination ok renkleri düzeltildi (text-black eklendi)
- ✅ Mobilde tool detay etiketleri sığmama sorunu çözüldü
- ✅ Form placeholder renkleri düzeltildi
- ✅ Text generate effect useEffect dependency uyarısı giderildi

#### Documentation
- 📚 README güncellendi:
  - Telegram bot kurulum talimatları
  - Environment variables açıklaması
  - Yeni özellikler eklendi
  - Proje yapısı güncellendi
- 📝 CHANGELOG detaylandırıldı

---

## [2.1.0] - 2025-10-29

### 🎨 UI/UX İyileştirmeleri

#### Added (Eklenenler)
- ✨ **Animasyonlu Hero Section** - Framer Motion ile dinamik metin animasyonu
  - "IT Toolkit - " sabit metin
  - Dönen kelimeler: "Ağ Yönetimi", "Sistem Kontrolü", "Güvenlik Testleri", "Otomasyon"
  - Yumuşak geçiş efektleri (blur + slide)
- 🎭 **Modal Animasyonları** - Kaynak kod modal penceresi için açılış animasyonları
  - Fade-in efekti (backdrop)
  - Slide-up efekti (modal)
  - 0.2s-0.3s yumuşak geçişler
- 📱 **Mobil İyileştirmesi** - Kod bloklarında yatay kaydırma desteği
  - `overflow-x-auto` ile mobilde sağa kaydırma
  - Daha iyi kod görüntüleme deneyimi

#### Changed (Değişiklikler)
- 🔤 **Font Denemeleri** - Farklı pixel fontlar test edildi
  - Press Start 2P (çok pixel)
  - VT323 (çok küçük)
  - Pixelify Sans (el yazısı gibi)
  - Silkscreen (çok geometrik)
  - **Sonuç**: Inter fontunda karar kılındı (okunabilir ve modern)

#### Technical
- 📦 Yeni bağımlılıklar:
  - `framer-motion` - Animasyon kütüphanesi
  - `clsx` - Koşullu className yönetimi
  - `tailwind-merge` - Tailwind class birleştirme
- 🎨 Yeni componentler:
  - `components/ui/layout-text-flip.tsx` - Animasyonlu metin componenti
  - `lib/utils.ts` - cn() utility fonksiyonu
- 🎬 Yeni animasyonlar (globals.css):
  - `@keyframes fadeIn` - Opacity geçişi
  - `@keyframes slideUp` - Yukarı kayma efekti
  - `.animate-fadeIn` ve `.animate-slideUp` sınıfları

#### Fixed (Düzeltmeler)
- ✅ Kod modal penceresinde mobil kaydırma sorunu düzeltildi
- ✅ Modal açılış animasyonları eklendi (daha profesyonel görünüm)

---

## [2.0.0] - 2025-10-28

### 🎉 Major Update - Web Platform

#### Added (Eklenenler)
- 🌐 Modern web platformu (Next.js 15 + TypeScript)
- 🎨 Minimal siyah-beyaz tasarım
- 📱 Tam responsive tasarım
- 🔍 SEO optimized
- 🎯 Header component (sticky navigation)
- 💻 Kod modal penceresi (popup ile kaynak kod görüntüleme)
- 🔗 GitHub Actions CI/CD
- 📄 Issue ve PR templates
- 🆕 5 yeni araç eklendi (toplam 13 araç)
  - MAC Scanner (Network) - ARP tablosu MAC adresleri
  - SSL Checker (Security) - SSL sertifika kontrolü
  - Process Manager (System) - İşlem yönetimi
  - Bulk Renamer (Automation) - Toplu dosya yeniden adlandırma
  - Email Notifier (Automation) - SMTP email gönderici

#### Changed (Değişiklikler)
- 📄 Ana sayfa sadeleştirildi (istatistik ve kategori kartları kaldırıldı)
- 📄 "Öne Çıkan Araçlar" → "Tüm Araçlar" (13 araç gösteriliyor)
- 🎨 Header border minimal yapıldı
- 🔄 Footer kaldırıldı (daha minimal görünüm)
- 🔄 Sosyal medya ikonları güncellendi (Twitter → X)
- 📊 Sayfa sayısı 16 → 21'e çıktı
- 🎨 Tüm başlıklar siyah yapıldı (gri değil)

#### Removed (Kaldırılanlar)
- ❌ Footer component (minimal tasarım için)
- ❌ İstatistik kartları (8 Araç, 4 Kategori, vb.)
- ❌ Kategori kartları (ana sayfadan)

### Technical
- Framework: Next.js 15 (App Router)
- Language: TypeScript 5
- Styling: Tailwind CSS 4
- Icons: Lucide React
- Build: ✅ Başarılı
- TypeScript: ✅ Hatasız
- Araç sayısı: 8 → 13 (+5)
- Sayfa sayısı: 16 → 21 (+5)

---

## [1.0.0] - 2025-10-27

### 🎉 İlk Sürüm (Python/Batch Scriptleri)

#### Added (Eklenenler)
- 📦 29 farklı IT aracı
- 🌐 Network Tools (6 araç)
- 💻 System Tools (7 araç)
- 🔒 Security Tools (6 araç)
- ⚙️ Automation (6 araç)
- 📚 Türkçe dokümantasyon
- 🆓 MIT Lisansı

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
