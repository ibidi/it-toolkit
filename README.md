# 🛠️ IT Toolkit - Bilgi İşlem Araçları

Bilgi işlem profesyonelleri için günlük işlerde kullanılabilecek pratik araçlar koleksiyonu. Ağ yönetimi, sistem kontrolü, güvenlik testleri ve otomasyon scriptleri içerir.

## 📦 İçerik

### 🌐 Network Tools (Ağ Araçları)
- **ip_scanner.py** - Ağdaki aktif IP adreslerini tarayan araç
- **ping_checker.bat** - Hızlı ping testi için basit batch scripti
- **mac_scanner.py** - ARP tablosundan MAC adreslerini listeler
- **dns_lookup.py** - Domain DNS sorguları ve IP çözümleme
- **bandwidth_test.py** - İnternet hızı test aracı (speedtest-cli)
- **latency_monitor.bat** - Ağ gecikmesi izleme aracı

### 💻 System Tools (Sistem Araçları)
- **system_info.py** - Detaylı sistem bilgilerini görüntüler (OS, CPU, RAM)
- **service_restart.bat** - Windows servislerini yeniden başlatma aracı
- **disk_analyzer.py** - Disk kullanım analizi ve görselleştirme
- **process_manager.py** - Çalışan işlemleri listeler ve sonlandırır
- **startup_manager.bat** - Başlangıç programları yöneticisi
- **temp_cleaner.bat** - Geçici dosya temizleyici

### 🔒 Security Tools (Güvenlik Araçları)
- **port_scanner.py** - TCP port tarama aracı (yaygın portları kontrol eder)
- **password_audit.bat** - Basit parola güvenlik kontrolü
- **ssl_checker.py** - SSL sertifika kontrolü ve geçerlilik süresi
- **hash_generator.py** - Dosya/metin hash oluşturma ve doğrulama (MD5, SHA256, vb.)
- **login_monitor.py** - Brute force koruması ve login izleme sistemi
- **firewall_checker.bat** - Windows Firewall kural yöneticisi

### ⚙️ Automation Scripts (Otomasyon Scriptleri)
- **backup_creator.py** - Klasör yedekleme aracı (ZIP formatında)
- **log_cleaner.bat** - Log dosyalarını toplu temizleme
- **report_generator.py** - Otomatik HTML sistem raporu oluşturucu
- **bulk_renamer.py** - Toplu dosya yeniden adlandırma aracı
- **task_scheduler.bat** - Windows görev zamanlayıcı yardımcısı
- **email_notifier.py** - SMTP email bildirim gönderici

## 🚀 Kullanım

### Python Scriptleri
```bash
# Gerekli kütüphaneleri yükleyin
pip install psutil speedtest-cli

# Herhangi bir Python scriptini çalıştırın
python network-tools/ip_scanner.py
python system-tools/system_info.py
python security-tools/hash_generator.py
python automation-scripts/report_generator.py
```

### Batch Scriptleri (Windows)
```cmd
# Batch dosyalarını doğrudan çalıştırın (bazıları yönetici yetkisi gerektirir)
automation-scripts\log_cleaner.bat
network-tools\ping_checker.bat
system-tools\temp_cleaner.bat
security-tools\firewall_checker.bat
```

## 📋 Gereksinimler

- **Python 3.x** (Python scriptleri için)
- **psutil** kütüphanesi (sistem araçları için)
- **speedtest-cli** kütüphanesi (bandwidth_test.py için)
- **Windows** (Batch scriptleri için)
- **Yönetici hakları** (bazı araçlar için gerekli)

### Kurulum
```bash
# Tüm Python bağımlılıklarını yükle
pip install psutil speedtest-cli
```

## ⚠️ Uyarılar

- Port tarama ve ağ tarama araçlarını yalnızca kendi ağınızda veya izniniz olan sistemlerde kullanın
- Bazı araçlar yönetici/root yetkisi gerektirebilir
- Üretim ortamlarında kullanmadan önce test ortamında deneyin

## 🎯 Kullanım Senaryoları

### Network Yönetimi
- Ağdaki aktif cihazları ve MAC adreslerini tespit etme
- DNS sorguları ve domain çözümleme
- İnternet hızı ve ağ gecikmesi ölçümü
- Port tarama ve güvenlik kontrolü

### Sistem Yönetimi
- Sistem kaynaklarını izleme (CPU, RAM, Disk)
- Çalışan işlemleri yönetme ve sonlandırma
- Başlangıç programlarını kontrol etme
- Geçici dosyaları ve disk alanını temizleme

### Güvenlik
- SSL sertifikalarını kontrol etme
- Dosya bütünlüğü doğrulama (hash)
- Brute force saldırılarına karşı koruma
- Firewall kurallarını yönetme
- Parola güvenliği denetimi

### Otomasyon
- Otomatik sistem raporları oluşturma
- Düzenli yedekleme işlemleri
- Toplu dosya işlemleri
- Zamanlanmış görevler oluşturma
- Email bildirimleri gönderme

## 👨‍💻 Geliştirici

**İhsan Baki Doğan**

- 🌐 Website: [ihsanbakidogan.com](https://ihsanbakidogan.com)
- 💻 GitHub: [@ibidi](https://github.com/ibidi)
- 📸 Instagram: [@ihsanbakidogannx](https://instagram.com/ihsanbakidogannx)
- 🐦 X (Twitter): [@ibidicodes](https://x.com/ibidicodes)

## 📝 Lisans

Bu proje eğitim ve öğrenme amaçlıdır. Kendi sorumluluğunuzda kullanın.

## 🤝 Katkıda Bulunma

Katkılarınızı bekliyorum! Pull request göndermekten çekinmeyin.

---

⭐ Projeyi beğendiyseniz yıldız vermeyi unutmayın!
