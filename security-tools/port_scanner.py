"""
Basit TCP Port Tarayıcı
"""
import socket

def scan_ports(target, ports):
    print(f"\n{target} üzerinde portlar taranıyor...")
    for port in ports:
        sock = socket.socket(socket.AF_INET, socket.SOCK_STREAM)
        sock.settimeout(0.5)
        result = sock.connect_ex((target, port))
        if result == 0:
            print(f"[+] Port {port} açık")
        sock.close()

if __name__ == "__main__":
    hedef = input("Hedef IP veya Domain: ")
    scan_ports(hedef, [21, 22, 80, 443, 445, 3389])
