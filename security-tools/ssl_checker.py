"""
SSL Sertifika Kontrolcüsü
Web sitelerinin SSL sertifikalarını kontrol eder.
"""
import ssl
import socket
from datetime import datetime

def check_ssl(hostname, port=443):
    try:
        context = ssl.create_default_context()
        
        with socket.create_connection((hostname, port), timeout=5) as sock:
            with context.wrap_socket(sock, server_hostname=hostname) as ssock:
                cert = ssock.getpeercert()
                
                print("\n" + "="*60)
                print(f"         SSL SERTİFİKA BİLGİLERİ - {hostname}")
                print("="*60)
                
                # Subject bilgileri
                subject = dict(x[0] for x in cert['subject'])
                print(f"\n[+] Subject:")
                for key, value in subject.items():
                    print(f"    {key}: {value}")
                
                # Issuer bilgileri
                issuer = dict(x[0] for x in cert['issuer'])
                print(f"\n[+] Issuer:")
                for key, value in issuer.items():
                    print(f"    {key}: {value}")
                
                # Tarih bilgileri
                print(f"\n[+] Geçerlilik:")
                not_before = datetime.strptime(cert['notBefore'], '%b %d %H:%M:%S %Y %Z')
                not_after = datetime.strptime(cert['notAfter'], '%b %d %H:%M:%S %Y %Z')
                
                print(f"    Başlangıç: {not_before.strftime('%d.%m.%Y %H:%M:%S')}")
                print(f"    Bitiş: {not_after.strftime('%d.%m.%Y %H:%M:%S')}")
                
                # Kalan gün
                days_left = (not_after - datetime.now()).days
                print(f"    Kalan Gün: {days_left}")
                
                if days_left < 30:
                    print(f"    [!] UYARI: Sertifika {days_left} gün içinde sona erecek!")
                elif days_left < 0:
                    print(f"    [!] HATA: Sertifika süresi dolmuş!")
                else:
                    print(f"    [✓] Sertifika geçerli")
                
                # Version
                print(f"\n[+] Sertifika Versiyonu: {cert['version']}")
                print(f"[+] Serial Number: {cert['serialNumber']}")
                
                # SSL/TLS versiyonu
                print(f"[+] SSL/TLS Versiyonu: {ssock.version()}")
                
    except ssl.SSLError as e:
        print(f"[!] SSL Hatası: {e}")
    except socket.gaierror:
        print(f"[!] Host çözümlenemedi: {hostname}")
    except Exception as e:
        print(f"[!] Hata: {e}")

if __name__ == "__main__":
    host = input("Kontrol edilecek domain (örnek: google.com): ")
    check_ssl(host)
