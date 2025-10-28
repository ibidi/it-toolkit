# 🤝 Katkıda Bulunma Rehberi

IT Toolkit Showcase projesine katkıda bulunmak istediğiniz için teşekkürler!

## 🚀 Nasıl Katkıda Bulunabilirsiniz?

### 1. Yeni Araç Ekleme

`lib/tools-data.ts` dosyasına yeni araç ekleyin:

```typescript
{
  id: 'arac-id',
  name: 'Araç Adı',
  category: 'network', // network, system, security, automation
  description: 'Detaylı açıklama',
  fileName: 'script.py',
  language: 'python',
  features: [
    'Özellik 1',
    'Özellik 2',
    'Özellik 3'
  ],
  usage: 'python script.py',
  code: `// Tam kaynak kod buraya`,
  example: `// Örnek çıktı buraya`
}
```

### 2. Tasarım İyileştirmeleri

- Tailwind CSS kullanarak stil güncellemeleri
- Responsive tasarım iyileştirmeleri
- Animasyon ve geçiş efektleri

### 3. Yeni Özellikler

- Arama fonksiyonu
- Filtreleme seçenekleri
- Dark/Light mode toggle
- Dil desteği (i18n)

### 4. Bug Düzeltmeleri

- Issue açın
- Sorunu detaylı açıklayın
- Mümkünse çözüm önerisi sunun

## 📝 Pull Request Süreci

1. **Fork** edin
2. **Feature branch** oluşturun
   ```bash
   git checkout -b feature/amazing-feature
   ```
3. **Commit** edin
   ```bash
   git commit -m 'feat: Add amazing feature'
   ```
4. **Push** edin
   ```bash
   git push origin feature/amazing-feature
   ```
5. **Pull Request** açın

## 📋 Commit Mesajları

Conventional Commits formatını kullanın:

- `feat:` - Yeni özellik
- `fix:` - Bug düzeltmesi
- `docs:` - Dokümantasyon
- `style:` - Kod formatı
- `refactor:` - Kod yeniden yapılandırma
- `test:` - Test ekleme
- `chore:` - Diğer değişiklikler

Örnekler:
```
feat: Add search functionality
fix: Resolve mobile menu issue
docs: Update README with new features
style: Format code with Prettier
```

## 🧪 Test Etme

Pull request göndermeden önce:

```bash
# Build test
npm run build

# Lint kontrol
npm run lint

# Geliştirme modunda test
npm run dev
```

## 📖 Kod Standartları

- TypeScript kullanın
- ESLint kurallarına uyun
- Tailwind CSS kullanın
- Component'leri küçük ve yeniden kullanılabilir tutun
- Anlamlı değişken ve fonksiyon isimleri kullanın

## 🎨 Tasarım Kuralları

- Siyah-beyaz minimal tema
- 2px border kalınlığı
- Smooth transitions (300ms)
- Responsive breakpoints:
  - Mobile: 320px+
  - Tablet: 768px+
  - Desktop: 1024px+

## 📞 İletişim

Sorularınız için:
- Issue açın
- Email: [GitHub profili üzerinden]
- Twitter: [@ibidicodes](https://x.com/ibidicodes)

## 🙏 Teşekkürler

Katkılarınız için teşekkür ederiz! Her katkı, projeyi daha iyi hale getirir.

---

**Happy Coding! 🚀**
