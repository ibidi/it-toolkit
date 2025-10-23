# Kullanım Kılavuzu

Bu proje, sistem yönetimi ve ağ operasyonları için çeşitli araçlar içermektedir.

## Klasör Yapısı

### 📁 automation-scripts
Otomasyon ve görev yönetimi araçları:
- `backup_creator.py` - Yedekleme oluşturma
- `bulk_renamer.py` - Toplu dosya yeniden adlandırma
- `email_notifier.py` - E-posta bildirimleri
- `log_cleaner.bat` - Log dosyalarını temizleme
- `report_generator.py` - Rapor oluşturma
- `task_scheduler.bat` - Görev zamanlayıcı

### 📁 network-tools
Ağ analiz ve test araçları:
- `bandwidth_test.py` - Bant genişliği testi
- `dns_lookup.py` - DNS sorguları
- `ip_scanner.py` - IP tarama
- `latency_monitor.bat` - Gecikme izleme
- `mac_scanner.py` - MAC adresi tarama
- `ping_checker.bat` - Ping kontrolü

### 📁 security-tools
Güvenlik ve denetim araçları:
- `firewall_checker.bat` - Güvenlik duvarı kontrolü
- `hash_generator.py` - Hash oluşturma
- `login_monitor.py` - Oturum açma izleme
- `password_audit.bat` - Şifre denetimi
- `port_scanner.py` - Port tarama
- `ssl_checker.py` - SSL sertifika kontrolü

### 📁 system-tools
Sistem yönetimi araçları:
- `disk_analyzer.py` - Disk analizi
- `process_manager.py` - İşlem yönetimi
- `service_restart.bat` - Servis yeniden başlatma
- `sorgu.bat` - Kapsamlı Windows sistem bilgi aracı
- `startup_manager.bat` - Başlangıç yönetimi
- `system_info.py` - Sistem bilgileri
- `temp_cleaner.bat` - Geçici dosya temizleme

## Gereksinimler

Python betikleri için gerekli kütüphaneleri yüklemek için:

```bash
pip install -r requirements.txt
```

## Kullanım

### Python Betikleri
```bash
python <klasor>/<betik_adi>.py
```

### Batch Dosyaları (Windows)
```cmd
<klasor>\<betik_adi>.bat
```

veya dosyaya çift tıklayarak çalıştırabilirsiniz.

## Notlar

- Batch dosyaları (.bat) yalnızca Windows sistemlerde çalışır
- Python betikleri (.py) platformlar arası çalışabilir
- Bazı araçlar yönetici (administrator) yetkisi gerektirebilir
- Güvenlik araçlarını kullanırken yerel yasalara ve kurumsal politikalara uygun hareket edin
