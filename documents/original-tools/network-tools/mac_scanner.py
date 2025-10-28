"""
MAC Adres Tarayıcı
Ağdaki cihazların MAC adreslerini listeler (ARP tablosu)
"""
import subprocess
import platform
import re

def get_arp_table():
    system = platform.system().lower()
    
    try:
        if system == "windows":
            output = subprocess.check_output("arp -a", shell=True).decode()
        else:
            output = subprocess.check_output("arp -n", shell=True).decode()
        
        print("\n" + "="*60)
        print("         ARP TABLOSU - MAC ADRESLERİ")
        print("="*60)
        
        if system == "windows":
            pattern = r"(\d+\.\d+\.\d+\.\d+)\s+([\w-]+)"
        else:
            pattern = r"(\d+\.\d+\.\d+\.\d+).*?([\w:]+)\s"
        
        matches = re.findall(pattern, output)
        
        if matches:
            print(f"{'IP Adresi':<20} {'MAC Adresi':<20}")
            print("-"*60)
            for ip, mac in matches:
                if mac != "ff-ff-ff-ff-ff-ff" and mac != "incomplete":
                    print(f"{ip:<20} {mac:<20}")
        else:
            print("[!] Hiç cihaz bulunamadı.")
            
    except Exception as e:
        print(f"[!] Hata: {e}")

if __name__ == "__main__":
    get_arp_table()
