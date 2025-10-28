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
  isPending?: boolean
}

// Pending tools'u yükle
let pendingTools: Tool[] = []
try {
  // eslint-disable-next-line @typescript-eslint/no-require-imports
  pendingTools = require('./pending-tools.json')
} catch {
  // Dosya yoksa boş array
}

const staticTools: Tool[] = [
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
    id: 'ping-monitor',
    name: 'Ping Monitor',
    category: 'network',
    description: 'Sürekli ping izleme aracı. Ağ bağlantısını izler ve kesintileri loglar.',
    fileName: 'ping_monitor.py',
    language: 'python',
    features: [
      'Sürekli ping izleme',
      'Kesinti tespiti',
      'Log kayıt',
      'İstatistik gösterimi'
    ],
    usage: 'python network-tools/ping_monitor.py',
    code: `"""
Ping İzleme Aracı
Sürekli ping atarak ağ bağlantısını izler.
"""
import subprocess
import time
from datetime import datetime

def ping_monitor(host, interval=1):
    print(f"[+] {host} izleniyor... (Ctrl+C ile durdurun)")
    
    success_count = 0
    fail_count = 0
    
    while True:
        try:
            result = subprocess.run(
                ['ping', '-n' if os.name == 'nt' else '-c', '1', host],
                capture_output=True,
                timeout=5
            )
            
            timestamp = datetime.now().strftime("%H:%M:%S")
            
            if result.returncode == 0:
                success_count += 1
                print(f"[{timestamp}] ✓ {host} - Başarılı ({success_count}/{success_count + fail_count})")
            else:
                fail_count += 1
                print(f"[{timestamp}] ✗ {host} - Başarısız! ({fail_count} kesinti)")
            
            time.sleep(interval)
            
        except KeyboardInterrupt:
            print(f"\\n[+] İzleme durduruldu")
            print(f"Toplam: {success_count + fail_count}, Başarılı: {success_count}, Başarısız: {fail_count}")
            break

if __name__ == "__main__":
    host = input("İzlenecek host: ")
    ping_monitor(host)`,
    example: `$ python ping_monitor.py
İzlenecek host: 8.8.8.8
[+] 8.8.8.8 izleniyor... (Ctrl+C ile durdurun)
[14:30:01] ✓ 8.8.8.8 - Başarılı (1/1)
[14:30:02] ✓ 8.8.8.8 - Başarılı (2/2)
[14:30:03] ✗ 8.8.8.8 - Başarısız! (1 kesinti)`
  },
  {
    id: 'system-monitor',
    name: 'System Monitor',
    category: 'system',
    description: 'Gerçek zamanlı sistem izleme aracı. CPU, RAM, Disk kullanımını sürekli gösterir.',
    fileName: 'system_monitor.py',
    language: 'python',
    features: [
      'Gerçek zamanlı izleme',
      'CPU, RAM, Disk metrikleri',
      'Renkli çıktı',
      'Uyarı sistemi'
    ],
    usage: 'python system-tools/system_monitor.py',
    code: `"""
Sistem İzleme Aracı
Gerçek zamanlı sistem metriklerini gösterir.
"""
import psutil
import time
import os

def clear_screen():
    os.system('cls' if os.name == 'nt' else 'clear')

def get_bar(percent, length=20):
    filled = int(length * percent / 100)
    return '█' * filled + '░' * (length - filled)

def monitor():
    print("[+] Sistem izleniyor... (Ctrl+C ile durdurun)\\n")
    
    try:
        while True:
            clear_screen()
            
            # CPU
            cpu = psutil.cpu_percent(interval=1)
            print(f"CPU:    [{get_bar(cpu)}] {cpu}%")
            
            # RAM
            mem = psutil.virtual_memory()
            print(f"RAM:    [{get_bar(mem.percent)}] {mem.percent}%")
            
            # Disk
            disk = psutil.disk_usage('/')
            print(f"Disk:   [{get_bar(disk.percent)}] {disk.percent}%")
            
            # Uyarılar
            if cpu > 80:
                print("\\n⚠️  CPU kullanımı yüksek!")
            if mem.percent > 80:
                print("⚠️  RAM kullanımı yüksek!")
            
            time.sleep(2)
            
    except KeyboardInterrupt:
        print("\\n[+] İzleme durduruldu")

if __name__ == "__main__":
    monitor()`,
    example: `$ python system_monitor.py
[+] Sistem izleniyor... (Ctrl+C ile durdurun)

CPU:    [████████░░░░░░░░░░░░] 42%
RAM:    [██████████████░░░░░░] 68%
Disk:   [███████████░░░░░░░░░] 55%`
  },
  {
    id: 'file-encryptor',
    name: 'File Encryptor',
    category: 'security',
    description: 'Dosya şifreleme ve şifre çözme aracı. AES-256 şifreleme kullanır.',
    fileName: 'file_encryptor.py',
    language: 'python',
    features: [
      'AES-256 şifreleme',
      'Dosya şifreleme/çözme',
      'Güvenli anahtar yönetimi',
      'Toplu dosya işleme'
    ],
    usage: 'python security-tools/file_encryptor.py',
    code: `"""
Dosya Şifreleme Aracı
AES-256 ile dosya şifreler ve çözer.
"""
from cryptography.fernet import Fernet
import os

def generate_key():
    """Şifreleme anahtarı oluşturur"""
    key = Fernet.generate_key()
    with open('secret.key', 'wb') as key_file:
        key_file.write(key)
    print("[+] Anahtar oluşturuldu: secret.key")
    return key

def load_key():
    """Anahtarı yükler"""
    return open('secret.key', 'rb').read()

def encrypt_file(filename, key):
    """Dosyayı şifreler"""
    f = Fernet(key)
    
    with open(filename, 'rb') as file:
        file_data = file.read()
    
    encrypted_data = f.encrypt(file_data)
    
    with open(filename + '.encrypted', 'wb') as file:
        file.write(encrypted_data)
    
    print(f"[+] {filename} şifrelendi")

def decrypt_file(filename, key):
    """Dosyanın şifresini çözer"""
    f = Fernet(key)
    
    with open(filename, 'rb') as file:
        encrypted_data = file.read()
    
    decrypted_data = f.decrypt(encrypted_data)
    
    with open(filename.replace('.encrypted', ''), 'wb') as file:
        file.write(decrypted_data)
    
    print(f"[+] {filename} şifresi çözüldü")

if __name__ == "__main__":
    print("[1] Şifrele")
    print("[2] Şifre Çöz")
    choice = input("Seçim: ")
    
    if choice == "1":
        key = generate_key()
        file = input("Dosya: ")
        encrypt_file(file, key)
    elif choice == "2":
        key = load_key()
        file = input("Dosya: ")
        decrypt_file(file, key)`,
    example: `$ python file_encryptor.py
[1] Şifrele
[2] Şifre Çöz
Seçim: 1
Dosya: document.txt
[+] Anahtar oluşturuldu: secret.key
[+] document.txt şifrelendi`
  },
  {
    id: 'log-analyzer',
    name: 'Log Analyzer',
    category: 'automation',
    description: 'Log dosyalarını analiz eder. Hata tespiti, istatistik ve rapor oluşturur.',
    fileName: 'log_analyzer.py',
    language: 'python',
    features: [
      'Log dosyası analizi',
      'Hata tespiti',
      'İstatistik oluşturma',
      'Filtreleme'
    ],
    usage: 'python automation-scripts/log_analyzer.py',
    code: `"""
Log Analiz Aracı
Log dosyalarını analiz eder ve rapor oluşturur.
"""
import re
from collections import Counter
from datetime import datetime

def analyze_log(filename):
    print(f"[+] {filename} analiz ediliyor...\\n")
    
    errors = []
    warnings = []
    info = []
    timestamps = []
    
    with open(filename, 'r') as f:
        for line in f:
            # Zaman damgası
            time_match = re.search(r'\\d{2}:\\d{2}:\\d{2}', line)
            if time_match:
                timestamps.append(time_match.group())
            
            # Log seviyeleri
            if 'ERROR' in line.upper():
                errors.append(line.strip())
            elif 'WARNING' in line.upper():
                warnings.append(line.strip())
            elif 'INFO' in line.upper():
                info.append(line.strip())
    
    # Rapor
    print("="*60)
    print("                  LOG ANALİZ RAPORU")
    print("="*60)
    print(f"Toplam Satır: {len(errors) + len(warnings) + len(info)}")
    print(f"Hata: {len(errors)}")
    print(f"Uyarı: {len(warnings)}")
    print(f"Bilgi: {len(info)}")
    
    if errors:
        print(f"\\n[!] Son 5 Hata:")
        for error in errors[-5:]:
            print(f"  - {error[:80]}...")

if __name__ == "__main__":
    file = input("Log dosyası: ")
    analyze_log(file)`,
    example: `$ python log_analyzer.py
Log dosyası: app.log
[+] app.log analiz ediliyor...

============================================================
                  LOG ANALİZ RAPORU
============================================================
Toplam Satır: 1523
Hata: 12
Uyarı: 45
Bilgi: 1466

[!] Son 5 Hata:
  - [14:30:15] ERROR: Database connection failed...
  - [14:35:22] ERROR: File not found: config.json...`
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
  },
  {
    id: 'network-speed-test',
    name: 'Network Speed Test',
    category: 'network',
    description: 'İnternet hızı test aracı. Download, upload ve ping değerlerini ölçer.',
    fileName: 'speed_test.py',
    language: 'python',
    features: [
      'Download hızı ölçümü',
      'Upload hızı ölçümü',
      'Ping ve jitter testi',
      'Sunucu seçimi'
    ],
    usage: 'python network-tools/speed_test.py',
    code: `"""
İnternet Hızı Test Aracı
Download, upload ve ping değerlerini ölçer.
"""
import speedtest

def test_speed():
    print("[+] Hız testi başlatılıyor...\\n")
    
    st = speedtest.Speedtest()
    
    print("[+] En iyi sunucu seçiliyor...")
    st.get_best_server()
    
    print("[+] Download hızı ölçülüyor...")
    download = st.download() / 1_000_000  # Mbps
    
    print("[+] Upload hızı ölçülüyor...")
    upload = st.upload() / 1_000_000  # Mbps
    
    print("[+] Ping ölçülüyor...")
    ping = st.results.ping
    
    print("\\n" + "="*60)
    print("              İNTERNET HIZ TESTİ")
    print("="*60)
    print(f"Download: {download:.2f} Mbps")
    print(f"Upload:   {upload:.2f} Mbps")
    print(f"Ping:     {ping:.2f} ms")
    print("="*60)

if __name__ == "__main__":
    test_speed()`,
    example: `$ python speed_test.py
[+] Hız testi başlatılıyor...
[+] En iyi sunucu seçiliyor...
[+] Download hızı ölçülüyor...
[+] Upload hızı ölçülüyor...
[+] Ping ölçülüyor...

============================================================
              İNTERNET HIZ TESTİ
============================================================
Download: 125.43 Mbps
Upload:   45.67 Mbps
Ping:     12.34 ms
============================================================`
  },
  {
    id: 'cpu-temp-monitor',
    name: 'CPU Temperature Monitor',
    category: 'system',
    description: 'CPU sıcaklık izleme aracı. Sıcaklık değerlerini gösterir ve uyarı verir.',
    fileName: 'cpu_temp.py',
    language: 'python',
    features: [
      'CPU sıcaklık izleme',
      'Çekirdek bazlı ölçüm',
      'Uyarı sistemi',
      'Gerçek zamanlı güncelleme'
    ],
    usage: 'python system-tools/cpu_temp.py',
    code: `"""
CPU Sıcaklık İzleyici
CPU sıcaklık değerlerini gösterir.
"""
import psutil
import time

def monitor_temperature():
    print("[+] CPU sıcaklığı izleniyor...\\n")
    
    try:
        while True:
            temps = psutil.sensors_temperatures()
            
            if not temps:
                print("[!] Sıcaklık sensörü bulunamadı")
                break
            
            print("="*60)
            print("           CPU SICAKLIK İZLEME")
            print("="*60)
            
            for name, entries in temps.items():
                print(f"\\n{name}:")
                for entry in entries:
                    temp = entry.current
                    status = "🔥" if temp > 80 else "⚠️" if temp > 60 else "✓"
                    print(f"  {entry.label}: {temp}°C {status}")
            
            time.sleep(2)
            
    except KeyboardInterrupt:
        print("\\n[+] İzleme durduruldu")

if __name__ == "__main__":
    monitor_temperature()`,
    example: `$ python cpu_temp.py
[+] CPU sıcaklığı izleniyor...

============================================================
           CPU SICAKLIK İZLEME
============================================================

coretemp:
  Core 0: 45°C ✓
  Core 1: 48°C ✓
  Core 2: 52°C ✓
  Core 3: 50°C ✓`
  },
  {
    id: 'password-generator',
    name: 'Password Generator',
    category: 'security',
    description: 'Güçlü şifre oluşturucu. Özelleştirilebilir uzunluk ve karakter seçenekleri.',
    fileName: 'password_generator.py',
    language: 'python',
    features: [
      'Güçlü şifre oluşturma',
      'Özelleştirilebilir uzunluk',
      'Karakter seçenekleri',
      'Toplu şifre oluşturma'
    ],
    usage: 'python security-tools/password_generator.py',
    code: `"""
Güçlü Şifre Oluşturucu
Rastgele güçlü şifreler oluşturur.
"""
import random
import string

def generate_password(length=16, use_upper=True, use_lower=True, 
                     use_digits=True, use_special=True):
    chars = ''
    
    if use_lower:
        chars += string.ascii_lowercase
    if use_upper:
        chars += string.ascii_uppercase
    if use_digits:
        chars += string.digits
    if use_special:
        chars += string.punctuation
    
    if not chars:
        print("[!] En az bir karakter tipi seçilmeli!")
        return None
    
    password = ''.join(random.choice(chars) for _ in range(length))
    return password

def generate_multiple(count=5, length=16):
    print(f"\\n[+] {count} adet şifre oluşturuluyor...\\n")
    print("="*60)
    
    for i in range(count):
        pwd = generate_password(length)
        print(f"{i+1}. {pwd}")
    
    print("="*60)

if __name__ == "__main__":
    print("[1] Tek şifre")
    print("[2] Çoklu şifre")
    choice = input("Seçim: ")
    
    if choice == "1":
        length = int(input("Uzunluk (varsayılan 16): ") or 16)
        pwd = generate_password(length)
        print(f"\\nŞifre: {pwd}")
    elif choice == "2":
        count = int(input("Kaç adet: "))
        length = int(input("Uzunluk: "))
        generate_multiple(count, length)`,
    example: `$ python password_generator.py
[1] Tek şifre
[2] Çoklu şifre
Seçim: 2
Kaç adet: 5
Uzunluk: 16

[+] 5 adet şifre oluşturuluyor...

============================================================
1. K9#mP2$xL5@nQ8w
2. R7&tY4!vB3*hN6z
3. M2@pL9#xK5$wQ8r
4. T6!nH3&yV7*mB4k
5. P8$xL2#rN9@wK5t
============================================================`
  },
  {
    id: 'network-mapper',
    name: 'Network Mapper',
    category: 'network',
    description: 'Ağ haritası oluşturur. Cihazları, IP\'leri ve bağlantıları görselleştirir.',
    fileName: 'network_mapper.py',
    language: 'python',
    features: [
      'Ağ haritası oluşturma',
      'Cihaz tespiti',
      'Bağlantı analizi',
      'Görselleştirme'
    ],
    usage: 'python network-tools/network_mapper.py',
    code: `"""
Ağ Haritası Oluşturucu
Ağdaki cihazları tespit eder ve harita oluşturur.
"""
import subprocess
import re

def scan_network(base_ip):
    devices = []
    
    print(f"[+] {base_ip}.0/24 ağı taranıyor...\\n")
    
    for i in range(1, 255):
        ip = f"{base_ip}.{i}"
        result = subprocess.run(
            ['ping', '-n', '1', '-w', '100', ip],
            capture_output=True,
            text=True
        )
        
        if result.returncode == 0:
            devices.append(ip)
            print(f"[✓] Cihaz bulundu: {ip}")
    
    return devices

def create_map(devices):
    print("\\n" + "="*60)
    print("                  AĞ HARİTASI")
    print("="*60)
    print(f"\\nToplam {len(devices)} cihaz bulundu:\\n")
    
    for i, device in enumerate(devices, 1):
        print(f"{i}. {device}")
        print("   └─ Aktif")

if __name__ == "__main__":
    base = input("Ağ aralığı (örn: 192.168.1): ")
    devices = scan_network(base)
    create_map(devices)`,
    example: `$ python network_mapper.py
Ağ aralığı (örn: 192.168.1): 192.168.1
[+] 192.168.1.0/24 ağı taranıyor...

[✓] Cihaz bulundu: 192.168.1.1
[✓] Cihaz bulundu: 192.168.1.10
[✓] Cihaz bulundu: 192.168.1.15

============================================================
                  AĞ HARİTASI
============================================================

Toplam 3 cihaz bulundu:

1. 192.168.1.1
   └─ Aktif
2. 192.168.1.10
   └─ Aktif`
  },
  {
    id: 'service-monitor',
    name: 'Service Monitor',
    category: 'system',
    description: 'Windows servislerini izler ve yönetir. Servis durumunu kontrol eder.',
    fileName: 'service_monitor.py',
    language: 'python',
    features: [
      'Servis listeleme',
      'Durum kontrolü',
      'Başlatma/Durdurma',
      'Otomatik yeniden başlatma'
    ],
    usage: 'python system-tools/service_monitor.py',
    code: `"""
Servis İzleme Aracı
Windows servislerini izler ve yönetir.
"""
import psutil

def list_services():
    print("\\n" + "="*80)
    print("                    SERVİS LİSTESİ")
    print("="*80)
    print(f"{'Servis Adı':<40} {'Durum':<15} {'PID':<10}")
    print("-"*80)
    
    for service in psutil.win_service_iter():
        try:
            info = service.as_dict()
            name = info['name'][:39]
            status = info['status']
            pid = info['pid'] or 'N/A'
            
            status_icon = "✓" if status == "running" else "✗"
            print(f"{name:<40} {status_icon} {status:<13} {pid:<10}")
            
        except Exception:
            pass

def check_service(service_name):
    try:
        service = psutil.win_service_get(service_name)
        info = service.as_dict()
        
        print(f"\\n[+] Servis: {info['name']}")
        print(f"Durum: {info['status']}")
        print(f"Başlangıç: {info['start_type']}")
        
    except Exception as e:
        print(f"[!] Hata: {e}")

if __name__ == "__main__":
    list_services()`,
    example: `$ python service_monitor.py
================================================================================
                    SERVİS LİSTESİ
================================================================================
Servis Adı                               Durum           PID       
--------------------------------------------------------------------------------
Spooler                                  ✓ running       1234      
Themes                                   ✓ running       5678      
W32Time                                  ✓ running       9012`
  },
  {
    id: 'firewall-manager',
    name: 'Firewall Manager',
    category: 'security',
    description: 'Windows Firewall kurallarını yönetir. Kural ekleme, silme ve listeleme.',
    fileName: 'firewall_manager.bat',
    language: 'batch',
    features: [
      'Firewall kuralları listeleme',
      'Yeni kural ekleme',
      'Kural silme',
      'Port yönetimi'
    ],
    usage: 'firewall_manager.bat',
    code: `@echo off
echo ========================================
echo     WINDOWS FIREWALL YONETICI
echo ========================================
echo.

echo [1] Firewall Durumunu Goster
echo [2] Firewall Kurallarini Listele
echo [3] Yeni Kural Ekle
echo [4] Kural Sil
echo [5] Cikis
echo.

set /p choice="Seciminiz: "

if "%choice%"=="1" (
    netsh advfirewall show allprofiles
)

if "%choice%"=="2" (
    netsh advfirewall firewall show rule name=all
)

if "%choice%"=="3" (
    set /p rulename="Kural adi: "
    set /p port="Port: "
    netsh advfirewall firewall add rule name="%rulename%" dir=in action=allow protocol=TCP localport=%port%
    echo [+] Kural eklendi
)

pause`,
    example: `> firewall_manager.bat
========================================
     WINDOWS FIREWALL YONETICI
========================================

[1] Firewall Durumunu Goster
[2] Firewall Kurallarini Listele
[3] Yeni Kural Ekle
[4] Kural Sil
[5] Cikis

Seciminiz: 1
Domain Profile: ON
Private Profile: ON
Public Profile: ON`
  },
  {
    id: 'registry-backup',
    name: 'Registry Backup',
    category: 'automation',
    description: 'Windows Registry yedekleme aracı. Kritik registry anahtarlarını yedekler.',
    fileName: 'registry_backup.bat',
    language: 'batch',
    features: [
      'Registry yedekleme',
      'Otomatik tarih damgası',
      'Seçili anahtar yedekleme',
      'Geri yükleme'
    ],
    usage: 'registry_backup.bat',
    code: `@echo off
echo ========================================
echo     REGISTRY YEDEKLEME ARACI
echo ========================================
echo.

set timestamp=%date:~-4%%date:~3,2%%date:~0,2%_%time:~0,2%%time:~3,2%
set timestamp=%timestamp: =0%

set backup_folder=registry_backup_%timestamp%
mkdir %backup_folder%

echo [+] Registry yedekleniyor...
echo.

echo [+] HKEY_CURRENT_USER yedekleniyor...
reg export HKCU %backup_folder%\\HKCU.reg /y

echo [+] HKEY_LOCAL_MACHINE\\SOFTWARE yedekleniyor...
reg export "HKLM\\SOFTWARE" %backup_folder%\\HKLM_SOFTWARE.reg /y

echo.
echo [+] Yedekleme tamamlandi: %backup_folder%
echo.

pause`,
    example: `> registry_backup.bat
========================================
     REGISTRY YEDEKLEME ARACI
========================================

[+] Registry yedekleniyor...

[+] HKEY_CURRENT_USER yedekleniyor...
[+] HKEY_LOCAL_MACHINE\\SOFTWARE yedekleniyor...

[+] Yedekleme tamamlandi: registry_backup_20251028_1430`
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

// Static tools ile pending tools'u birleştir
export const tools: Tool[] = [...staticTools, ...pendingTools]
