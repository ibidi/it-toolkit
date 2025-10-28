export interface Tool {
  id: string
  name: string
  category: 'network' | 'system' | 'security' | 'automation'
  description: string
  fileName: string
  language: 'python' | 'batch'
  features: string[]
  usage: string
  code: string
  example: string
}

export const tools: Tool[] = [
  // Network Tools
  {
    id: 'ip-scanner',
    name: 'IP Scanner',
    category: 'network',
    description: 'Ağdaki aktif IP adreslerini tarayan araç. Belirtilen IP aralığında ping atarak hangi cihazların aktif olduğunu tespit eder.',
    fileName: 'ip_scanner.py',
    language: 'python',
    features: [
      'Ağ aralığı tarama (örn: 192.168.1.0/24)',
      'Ping ile aktif cihaz tespiti',
      'Hızlı tarama',
      'Cross-platform (Windows/Linux/Mac)'
    ],
    usage: 'python network-tools/ip_scanner.py',
    code: `"""
Basit IP tarayıcı
Belirli bir ağ aralığında ping atarak aktif IP'leri listeler.
"""

import os
import platform
import subprocess

def ping(host):
    param = "-n" if platform.system().lower() == "windows" else "-c"
    command = ["ping", param, "1", host]
    return subprocess.call(command, stdout=subprocess.DEVNULL) == 0

def scan_network(base_ip):
    print(f"[+] {base_ip}.0/24 ağı taranıyor...")
    for i in range(1, 255):
        ip = f"{base_ip}.{i}"
        if ping(ip):
            print(f"[✅] Aktif: {ip}")

if __name__ == "__main__":
    base = input("Taranacak ağ (örnek: 192.168.1): ")
    scan_network(base)`,
    example: `$ python ip_scanner.py
Taranacak ağ (örnek: 192.168.1): 192.168.1
[+] 192.168.1.0/24 ağı taranıyor...
[✅] Aktif: 192.168.1.1
[✅] Aktif: 192.168.1.10
[✅] Aktif: 192.168.1.15`
  },
  {
    id: 'dns-lookup',
    name: 'DNS Lookup',
    category: 'network',
    description: 'Domain adreslerinin IP bilgilerini ve DNS kayıtlarını sorgular. IPv4, hostname ve alias bilgilerini gösterir.',
    fileName: 'dns_lookup.py',
    language: 'python',
    features: [
      'Domain to IP çözümleme',
      'Hostname bilgisi',
      'Alias listesi',
      'Tüm IP adreslerini gösterme'
    ],
    usage: 'python network-tools/dns_lookup.py google.com',
    code: `"""
DNS Sorgu Aracı
Domain adreslerinin IP bilgilerini ve DNS kayıtlarını sorgular.
"""
import socket
import sys

def dns_lookup(domain):
    try:
        print(f"\\n[+] {domain} için DNS sorgusu yapılıyor...\\n")
        
        # A kaydı (IPv4)
        ip = socket.gethostbyname(domain)
        print(f"IPv4 Adresi: {ip}")
        
        # Tüm IP adresleri
        all_ips = socket.gethostbyname_ex(domain)
        print(f"Hostname: {all_ips[0]}")
        print(f"Aliases: {', '.join(all_ips[1]) if all_ips[1] else 'Yok'}")
        print(f"Tüm IP'ler: {', '.join(all_ips[2])}")
        
    except socket.gaierror:
        print(f"[!] Hata: {domain} çözümlenemedi.")
    except Exception as e:
        print(f"[!] Hata: {e}")

if __name__ == "__main__":
    if len(sys.argv) > 1:
        domain = sys.argv[1]
    else:
        domain = input("Domain adı girin: ")
    dns_lookup(domain)`,
    example: `$ python dns_lookup.py google.com
[+] google.com için DNS sorgusu yapılıyor...

IPv4 Adresi: 142.250.185.46
Hostname: google.com
Aliases: Yok
Tüm IP'ler: 142.250.185.46`
  },
  {
    id: 'port-scanner',
    name: 'Port Scanner',
    category: 'security',
    description: 'TCP port tarama aracı. Yaygın portları (21, 22, 80, 443, vb.) kontrol eder ve açık portları tespit eder.',
    fileName: 'port_scanner.py',
    language: 'python',
    features: [
      'TCP port tarama',
      'Yaygın portları kontrol',
      'Hızlı tarama',
      'Açık/Kapalı port tespiti'
    ],
    usage: 'python security-tools/port_scanner.py',
    code: `"""
Basit TCP Port Tarayıcı
"""
import socket

def scan_ports(target, ports):
    print(f"\\n{target} üzerinde portlar taranıyor...")
    for port in ports:
        sock = socket.socket(socket.AF_INET, socket.SOCK_STREAM)
        sock.settimeout(0.5)
        result = sock.connect_ex((target, port))
        if result == 0:
            print(f"[+] Port {port} açık")
        sock.close()

if __name__ == "__main__":
    hedef = input("Hedef IP veya Domain: ")
    scan_ports(hedef, [21, 22, 80, 443, 445, 3389])`,
    example: `$ python port_scanner.py
Hedef IP veya Domain: 192.168.1.1

192.168.1.1 üzerinde portlar taranıyor...
[+] Port 80 açık
[+] Port 443 açık`
  },
  {
    id: 'hash-generator',
    name: 'Hash Generator',
    category: 'security',
    description: 'Dosya veya metin için hash değerleri üretir ve doğrular. MD5, SHA1, SHA256, SHA512 algoritmalarını destekler.',
    fileName: 'hash_generator.py',
    language: 'python',
    features: [
      'Çoklu algoritma desteği (MD5, SHA1, SHA256, SHA512)',
      'Metin hash oluşturma',
      'Dosya hash oluşturma',
      'Hash doğrulama'
    ],
    usage: 'python security-tools/hash_generator.py',
    code: `"""
Hash Generator/Checker
Dosya veya metin için hash değerleri üretir ve doğrular.
"""
import hashlib
import os

def hash_text(text):
    """Metin için hash değerleri üretir"""
    print("\\n" + "="*60)
    print("                  HASH DEĞERLERİ")
    print("="*60)
    
    algorithms = ['md5', 'sha1', 'sha256', 'sha512']
    
    for algo in algorithms:
        h = hashlib.new(algo)
        h.update(text.encode())
        print(f"{algo.upper():<10}: {h.hexdigest()}")`,
    example: `$ python hash_generator.py
[1] Metin hash'le
Seçiminiz: 1
Metin girin: Hello World

============================================================
                  HASH DEĞERLERİ
============================================================
MD5       : b10a8db164e0754105b7a99be72e3fe5
SHA1      : 0a4d55a8d778e5022fab701977c5d840bbc486d0
SHA256    : a591a6d40bf420404a011733cfb7b190d62c65bf0bcda32b57b277d9ad9f146e
SHA512    : 2c74fd17edafd80e8447b0d46741ee243b7eb74dd2149a0ab1b9246fb30382f27e853d8585719e0e67cbda0daa8f51671064615d645ae27acb15bfb1447f459b`
  },
  {
    id: 'login-monitor',
    name: 'Login Monitor',
    category: 'security',
    description: 'Brute force koruması ve login izleme sistemi. Başarısız login denemelerini takip eder ve hesap kilitleme yapar.',
    fileName: 'login_monitor.py',
    language: 'python',
    features: [
      'Başarısız login takibi',
      'Otomatik hesap kilitleme',
      'IP bazlı izleme',
      'Zaman bazlı kilit açma'
    ],
    usage: 'python security-tools/login_monitor.py',
    code: `"""
Login Denemesi İzleyici
Başarısız login denemelerini simüle eder ve brute force koruması gösterir.
"""
import time
from datetime import datetime, timedelta
from collections import defaultdict

class LoginMonitor:
    def __init__(self, max_attempts=5, lockout_time=300):
        self.max_attempts = max_attempts
        self.lockout_time = lockout_time  # saniye
        self.failed_attempts = defaultdict(list)
        self.locked_accounts = {}
    
    def record_failed_attempt(self, username, ip):
        """Başarısız denemeyi kaydet"""
        # Eski denemeleri temizle
        cutoff_time = datetime.now() - timedelta(seconds=300)
        self.failed_attempts[username] = [
            attempt for attempt in self.failed_attempts[username]
            if attempt['time'] > cutoff_time
        ]
        
        # Yeni denemeyi ekle
        self.failed_attempts[username].append({
            'time': datetime.now(),
            'ip': ip
        })
        
        attempt_count = len(self.failed_attempts[username])
        
        if attempt_count >= self.max_attempts:
            unlock_time = datetime.now() + timedelta(seconds=self.lockout_time)
            self.locked_accounts[username] = unlock_time
            print(f"[✗] HESAP KİLİTLENDİ!")`,
    example: `$ python login_monitor.py
============================================================
         LOGIN İZLEME SİSTEMİ - DEMO
============================================================

[!] Başarısız login denemesi: admin (192.168.1.100)
[!] Deneme sayısı: 1/3

[!] Başarısız login denemesi: admin (192.168.1.100)
[!] Deneme sayısı: 2/3

[!] Başarısız login denemesi: admin (192.168.1.100)
[!] Deneme sayısı: 3/3
[✗] HESAP KİLİTLENDİ! 60 saniye boyunca erişim engellendi.`
  },
  {
    id: 'disk-analyzer',
    name: 'Disk Analyzer',
    category: 'system',
    description: 'Disk bölümlerinin kullanım durumunu gösterir. Toplam, kullanılan ve boş alan bilgilerini görsel olarak sunar.',
    fileName: 'disk_analyzer.py',
    language: 'python',
    features: [
      'Tüm disk bölümlerini listeleme',
      'Kullanım yüzdesi gösterimi',
      'Görsel progress bar',
      'Dosya sistemi bilgisi'
    ],
    usage: 'python system-tools/disk_analyzer.py',
    code: `"""
Disk Kullanım Analizi
Disk bölümlerinin kullanım durumunu gösterir.
"""
import psutil

def get_size(bytes):
    """Byte'ı okunabilir formata çevirir"""
    for unit in ['B', 'KB', 'MB', 'GB', 'TB']:
        if bytes < 1024:
            return f"{bytes:.2f} {unit}"
        bytes /= 1024

def disk_usage():
    print("\\n" + "="*70)
    print("                    DİSK KULLANIM ANALİZİ")
    print("="*70)
    
    partitions = psutil.disk_partitions()
    
    for partition in partitions:
        print(f"\\n[+] Disk: {partition.device}")
        print(f"    Mount Point: {partition.mountpoint}")
        
        usage = psutil.disk_usage(partition.mountpoint)
        print(f"    Toplam: {get_size(usage.total)}")
        print(f"    Kullanılan: {get_size(usage.used)}")
        print(f"    Boş: {get_size(usage.free)}")
        print(f"    Kullanım Oranı: {usage.percent}%")
        
        # Görsel bar
        bar_length = 40
        filled = int(bar_length * usage.percent / 100)
        bar = '█' * filled + '░' * (bar_length - filled)
        print(f"    [{bar}] {usage.percent}%")`,
    example: `$ python disk_analyzer.py
======================================================================
                    DİSK KULLANIM ANALİZİ
======================================================================

[+] Disk: C:\\
    Mount Point: C:\\
    Toplam: 500.00 GB
    Kullanılan: 234.50 GB
    Boş: 265.50 GB
    Kullanım Oranı: 47%
    [███████████████████░░░░░░░░░░░░░░░░░░░░░] 47%`
  },
  {
    id: 'backup-creator',
    name: 'Backup Creator',
    category: 'automation',
    description: 'Belirtilen klasörü ZIP formatında yedekler. Tarih damgalı yedekleme dosyası oluşturur.',
    fileName: 'backup_creator.py',
    language: 'python',
    features: [
      'ZIP formatında yedekleme',
      'Otomatik tarih damgası',
      'Klasör yedekleme',
      'Basit kullanım'
    ],
    usage: 'python automation-scripts/backup_creator.py',
    code: `"""
Belirtilen klasörü yedekleyen basit araç.
"""
import shutil
import os
from datetime import datetime

def create_backup(source_folder):
    if not os.path.exists(source_folder):
        print("Kaynak klasör bulunamadı!")
        return
    timestamp = datetime.now().strftime("%Y%m%d_%H%M%S")
    backup_name = f"backup_{timestamp}"
    shutil.make_archive(backup_name, "zip", source_folder)
    print(f"[+] {backup_name}.zip oluşturuldu.")

if __name__ == "__main__":
    folder = input("Yedeklenecek klasör yolunu girin: ")
    create_backup(folder)`,
    example: `$ python backup_creator.py
Yedeklenecek klasör yolunu girin: C:\\Documents
[+] backup_20251028_143052.zip oluşturuldu.`
  },
  {
    id: 'mac-scanner',
    name: 'MAC Scanner',
    category: 'network',
    description: 'ARP tablosundan MAC adreslerini listeler ve cihaz bilgilerini gösterir.',
    fileName: 'mac_scanner.py',
    language: 'python',
    features: [
      'ARP tablosu okuma',
      'MAC adresi listeleme',
      'Cihaz bilgisi gösterme',
      'Network interface tespiti'
    ],
    usage: 'python network-tools/mac_scanner.py',
    code: `"""
MAC Adresi Tarayıcı
ARP tablosundan MAC adreslerini listeler.
"""
import subprocess
import platform

def get_arp_table():
    system = platform.system().lower()
    if system == "windows":
        cmd = ["arp", "-a"]
    else:
        cmd = ["arp", "-n"]
    
    result = subprocess.run(cmd, capture_output=True, text=True)
    return result.stdout

def parse_arp_table(arp_output):
    print("\\n" + "="*60)
    print("              MAC ADRESLERİ")
    print("="*60)
    
    for line in arp_output.split('\\n'):
        if '.' in line and ':' in line or '-' in line:
            print(line.strip())

if __name__ == "__main__":
    arp_data = get_arp_table()
    parse_arp_table(arp_data)`,
    example: `$ python mac_scanner.py
============================================================
              MAC ADRESLERİ
============================================================
192.168.1.1    00-11-22-33-44-55    dynamic
192.168.1.10   AA-BB-CC-DD-EE-FF    dynamic`
  },
  {
    id: 'ssl-checker',
    name: 'SSL Checker',
    category: 'security',
    description: 'SSL sertifika kontrolü ve geçerlilik süresi kontrolü yapar.',
    fileName: 'ssl_checker.py',
    language: 'python',
    features: [
      'SSL sertifika kontrolü',
      'Geçerlilik süresi kontrolü',
      'Sertifika detayları',
      'Güvenlik uyarıları'
    ],
    usage: 'python security-tools/ssl_checker.py',
    code: `"""
SSL Sertifika Kontrolü
Domain SSL sertifikasını kontrol eder.
"""
import ssl
import socket
from datetime import datetime

def check_ssl(hostname, port=443):
    context = ssl.create_default_context()
    
    try:
        with socket.create_connection((hostname, port), timeout=10) as sock:
            with context.wrap_socket(sock, server_hostname=hostname) as ssock:
                cert = ssock.getpeercert()
                
                print(f"\\n[+] SSL Sertifika Bilgileri: {hostname}")
                print("="*60)
                
                # Geçerlilik tarihleri
                not_before = datetime.strptime(cert['notBefore'], '%b %d %H:%M:%S %Y %Z')
                not_after = datetime.strptime(cert['notAfter'], '%b %d %H:%M:%S %Y %Z')
                
                print(f"Başlangıç: {not_before}")
                print(f"Bitiş: {not_after}")
                
                # Kalan gün
                days_left = (not_after - datetime.now()).days
                print(f"Kalan Gün: {days_left}")
                
                if days_left < 30:
                    print("⚠️  Sertifika yakında sona erecek!")
                else:
                    print("✓ Sertifika geçerli")
                    
    except Exception as e:
        print(f"[!] Hata: {e}")

if __name__ == "__main__":
    domain = input("Domain adı: ")
    check_ssl(domain)`,
    example: `$ python ssl_checker.py
Domain adı: google.com

[+] SSL Sertifika Bilgileri: google.com
============================================================
Başlangıç: 2024-10-01 00:00:00
Bitiş: 2025-12-31 23:59:59
Kalan Gün: 428
✓ Sertifika geçerli`
  },
  {
    id: 'process-manager',
    name: 'Process Manager',
    category: 'system',
    description: 'Çalışan işlemleri listeler, CPU ve RAM kullanımını gösterir, işlem sonlandırma özelliği.',
    fileName: 'process_manager.py',
    language: 'python',
    features: [
      'İşlem listeleme',
      'CPU kullanımı gösterme',
      'RAM kullanımı gösterme',
      'İşlem sonlandırma'
    ],
    usage: 'python system-tools/process_manager.py',
    code: `"""
Process Manager
Çalışan işlemleri listeler ve yönetir.
"""
import psutil

def list_processes():
    print("\\n" + "="*80)
    print("                    ÇALIŞAN İŞLEMLER")
    print("="*80)
    print(f"{'PID':<10} {'İsim':<30} {'CPU %':<10} {'RAM (MB)':<10}")
    print("-"*80)
    
    for proc in psutil.process_iter(['pid', 'name', 'cpu_percent', 'memory_info']):
        try:
            pid = proc.info['pid']
            name = proc.info['name'][:29]
            cpu = proc.info['cpu_percent']
            memory = proc.info['memory_info'].rss / 1024 / 1024
            
            print(f"{pid:<10} {name:<30} {cpu:<10.1f} {memory:<10.1f}")
        except (psutil.NoSuchProcess, psutil.AccessDenied):
            pass

def kill_process(pid):
    try:
        proc = psutil.Process(pid)
        proc.terminate()
        print(f"[+] İşlem {pid} sonlandırıldı")
    except Exception as e:
        print(f"[!] Hata: {e}")

if __name__ == "__main__":
    list_processes()`,
    example: `$ python process_manager.py
================================================================================
                    ÇALIŞAN İŞLEMLER
================================================================================
PID        İsim                           CPU %      RAM (MB)   
--------------------------------------------------------------------------------
1234       chrome.exe                     15.2       2048.5     
5678       python.exe                     5.3        512.3      
9012       explorer.exe                   2.1        1024.8`
  },
  {
    id: 'bulk-renamer',
    name: 'Bulk Renamer',
    category: 'automation',
    description: 'Toplu dosya yeniden adlandırma aracı. Prefix, suffix ekleme ve numara verme özellikleri.',
    fileName: 'bulk_renamer.py',
    language: 'python',
    features: [
      'Toplu dosya yeniden adlandırma',
      'Prefix/Suffix ekleme',
      'Numara verme',
      'Güvenli yeniden adlandırma'
    ],
    usage: 'python automation-scripts/bulk_renamer.py',
    code: `"""
Toplu Dosya Yeniden Adlandırma
Klasördeki dosyaları toplu olarak yeniden adlandırır.
"""
import os

def bulk_rename(folder, prefix="", suffix="", start_num=1):
    if not os.path.exists(folder):
        print("[!] Klasör bulunamadı!")
        return
    
    files = [f for f in os.listdir(folder) if os.path.isfile(os.path.join(folder, f))]
    
    print(f"[+] {len(files)} dosya bulundu")
    
    for i, filename in enumerate(files, start=start_num):
        name, ext = os.path.splitext(filename)
        new_name = f"{prefix}{i:03d}{suffix}{ext}"
        
        old_path = os.path.join(folder, filename)
        new_path = os.path.join(folder, new_name)
        
        os.rename(old_path, new_path)
        print(f"[+] {filename} -> {new_name}")
    
    print(f"\\n[✓] {len(files)} dosya yeniden adlandırıldı")

if __name__ == "__main__":
    folder = input("Klasör yolu: ")
    prefix = input("Prefix (opsiyonel): ")
    suffix = input("Suffix (opsiyonel): ")
    
    bulk_rename(folder, prefix, suffix)`,
    example: `$ python bulk_renamer.py
Klasör yolu: C:\\Photos
Prefix (opsiyonel): photo_
Suffix (opsiyonel): _2024

[+] 5 dosya bulundu
[+] IMG001.jpg -> photo_001_2024.jpg
[+] IMG002.jpg -> photo_002_2024.jpg
[+] IMG003.jpg -> photo_003_2024.jpg

[✓] 5 dosya yeniden adlandırıldı`
  },
  {
    id: 'email-notifier',
    name: 'Email Notifier',
    category: 'automation',
    description: 'SMTP ile email bildirim gönderici. Otomatik bildirimler ve raporlar için kullanılır.',
    fileName: 'email_notifier.py',
    language: 'python',
    features: [
      'SMTP email gönderimi',
      'HTML email desteği',
      'Ek dosya gönderme',
      'Toplu gönderim'
    ],
    usage: 'python automation-scripts/email_notifier.py',
    code: `"""
Email Bildirim Gönderici
SMTP ile email gönderir.
"""
import smtplib
from email.mime.text import MIMEText
from email.mime.multipart import MIMEMultipart

def send_email(to_email, subject, message):
    # SMTP ayarları (örnek: Gmail)
    smtp_server = "smtp.gmail.com"
    smtp_port = 587
    sender_email = "your-email@gmail.com"
    password = "your-app-password"
    
    msg = MIMEMultipart()
    msg['From'] = sender_email
    msg['To'] = to_email
    msg['Subject'] = subject
    
    msg.attach(MIMEText(message, 'plain'))
    
    try:
        server = smtplib.SMTP(smtp_server, smtp_port)
        server.starttls()
        server.login(sender_email, password)
        server.send_message(msg)
        server.quit()
        
        print(f"[✓] Email gönderildi: {to_email}")
    except Exception as e:
        print(f"[!] Hata: {e}")

if __name__ == "__main__":
    to = input("Alıcı email: ")
    subject = input("Konu: ")
    message = input("Mesaj: ")
    
    send_email(to, subject, message)`,
    example: `$ python email_notifier.py
Alıcı email: user@example.com
Konu: Test Bildirimi
Mesaj: Bu bir test mesajıdır.

[✓] Email gönderildi: user@example.com`
  },
  {
    id: 'report-generator',
    name: 'Report Generator',
    category: 'automation',
    description: 'Sistem bilgilerini toplayıp HTML rapor oluşturur. CPU, RAM, Disk kullanımı ve ağ bilgilerini içerir.',
    fileName: 'report_generator.py',
    language: 'python',
    features: [
      'HTML rapor oluşturma',
      'Sistem metrikleri',
      'Görsel grafikler',
      'Otomatik tarih damgası'
    ],
    usage: 'python automation-scripts/report_generator.py',
    code: `"""
Otomatik Sistem Raporu Oluşturucu
Sistem bilgilerini toplayıp HTML rapor oluşturur.
"""
import psutil
import platform
from datetime import datetime

def generate_report():
    timestamp = datetime.now().strftime("%Y%m%d_%H%M%S")
    filename = f"sistem_raporu_{timestamp}.html"
    
    # Sistem bilgilerini topla
    uname = platform.uname()
    cpu_percent = psutil.cpu_percent(interval=1)
    memory = psutil.virtual_memory()
    disk = psutil.disk_usage('/')
    
    # HTML rapor oluştur
    html = f"""
<!DOCTYPE html>
<html>
<head>
    <title>Sistem Raporu</title>
</head>
<body>
    <h1>Sistem Durum Raporu</h1>
    <p>Tarih: {datetime.now().strftime("%d.%m.%Y %H:%M")}</p>
    
    <h2>Sistem Bilgileri</h2>
    <p>İşletim Sistemi: {uname.system}</p>
    <p>CPU Kullanımı: {cpu_percent}%</p>
    <p>RAM Kullanımı: {memory.percent}%</p>
</body>
</html>
"""
    
    with open(filename, 'w') as f:
        f.write(html)
    
    print(f"[+] Rapor oluşturuldu: {filename}")`,
    example: `$ python report_generator.py
[+] Sistem raporu oluşturuluyor...
[+] Rapor oluşturuldu: sistem_raporu_20251028_143052.html`
  }
]

export const categories = {
  network: {
    name: 'Network Tools',
    description: 'Ağ analiz ve test araçları',
    icon: '🌐',
    color: 'blue'
  },
  system: {
    name: 'System Tools',
    description: 'Sistem izleme ve yönetim araçları',
    icon: '💻',
    color: 'green'
  },
  security: {
    name: 'Security Tools',
    description: 'Güvenlik ve denetim araçları',
    icon: '🔒',
    color: 'red'
  },
  automation: {
    name: 'Automation',
    description: 'Otomasyon ve görev yönetimi',
    icon: '⚙️',
    color: 'purple'
  }
}
