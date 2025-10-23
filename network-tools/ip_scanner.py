"""
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
    scan_network(base)
