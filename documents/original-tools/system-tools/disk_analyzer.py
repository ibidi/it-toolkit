"""
Disk Kullanım Analizi
Disk bölümlerinin kullanım durumunu gösterir.
"""
import psutil
import os

def get_size(bytes):
    """Byte'ı okunabilir formata çevirir"""
    for unit in ['B', 'KB', 'MB', 'GB', 'TB']:
        if bytes < 1024:
            return f"{bytes:.2f} {unit}"
        bytes /= 1024

def disk_usage():
    print("\n" + "="*70)
    print("                    DİSK KULLANIM ANALİZİ")
    print("="*70)
    
    partitions = psutil.disk_partitions()
    
    for partition in partitions:
        print(f"\n[+] Disk: {partition.device}")
        print(f"    Mount Point: {partition.mountpoint}")
        print(f"    Dosya Sistemi: {partition.fstype}")
        
        try:
            usage = psutil.disk_usage(partition.mountpoint)
            print(f"    Toplam: {get_size(usage.total)}")
            print(f"    Kullanılan: {get_size(usage.used)}")
            print(f"    Boş: {get_size(usage.free)}")
            print(f"    Kullanım Oranı: {usage.percent}%")
            
            # Görsel bar
            bar_length = 40
            filled = int(bar_length * usage.percent / 100)
            bar = '█' * filled + '░' * (bar_length - filled)
            print(f"    [{bar}] {usage.percent}%")
            
        except PermissionError:
            print("    [!] Erişim izni yok")

if __name__ == "__main__":
    disk_usage()
