"""
DNS Sorgu Aracı
Domain adreslerinin IP bilgilerini ve DNS kayıtlarını sorgular.
"""
import socket
import sys

def dns_lookup(domain):
    try:
        print(f"\n[+] {domain} için DNS sorgusu yapılıyor...\n")
        
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
    dns_lookup(domain)
