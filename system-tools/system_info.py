"""
Sistem Bilgisi Görüntüleme Aracı
"""
import platform
import psutil

def system_info():
    print("\n=== Sistem Bilgileri ===")
    print(f"İşletim Sistemi: {platform.system()} {platform.release()}")
    print(f"Bilgisayar Adı: {platform.node()}")
    print(f"İşlemci: {platform.processor()}")
    print(f"RAM: {round(psutil.virtual_memory().total / (1024 ** 3), 2)} GB")

if __name__ == "__main__":
    system_info()
