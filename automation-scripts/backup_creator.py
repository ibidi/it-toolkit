"""
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
    create_backup(folder)
