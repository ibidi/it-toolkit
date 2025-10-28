"""
Toplu Dosya Yeniden Adlandırıcı
Bir klasördeki dosyaları toplu olarak yeniden adlandırır.
"""
import os
import re

def list_files(directory, extension="*"):
    """Klasördeki dosyaları listele"""
    if not os.path.exists(directory):
        print("[!] Klasör bulunamadı!")
        return []
    
    files = []
    for file in os.listdir(directory):
        filepath = os.path.join(directory, file)
        if os.path.isfile(filepath):
            if extension == "*" or file.endswith(extension):
                files.append(file)
    
    return sorted(files)

def rename_with_prefix(directory, prefix, extension="*"):
    """Dosyalara prefix ekle"""
    files = list_files(directory, extension)
    
    if not files:
        print("[!] Dosya bulunamadı!")
        return
    
    print(f"\n[+] {len(files)} dosya bulundu.")
    print("[+] Önizleme:")
    
    for i, file in enumerate(files, 1):
        new_name = f"{prefix}_{file}"
        print(f"  {file} -> {new_name}")
    
    confirm = input("\nDevam etmek istiyor musunuz? (e/h): ")
    if confirm.lower() != 'e':
        print("[!] İşlem iptal edildi.")
        return
    
    for file in files:
        old_path = os.path.join(directory, file)
        new_path = os.path.join(directory, f"{prefix}_{file}")
        os.rename(old_path, new_path)
    
    print(f"[+] {len(files)} dosya yeniden adlandırıldı!")

def rename_with_numbering(directory, base_name, extension="*"):
    """Dosyaları numaralandırarak yeniden adlandır"""
    files = list_files(directory, extension)
    
    if not files:
        print("[!] Dosya bulunamadı!")
        return
    
    print(f"\n[+] {len(files)} dosya bulundu.")
    print("[+] Önizleme:")
    
    for i, file in enumerate(files, 1):
        ext = os.path.splitext(file)[1]
        new_name = f"{base_name}_{i:03d}{ext}"
        print(f"  {file} -> {new_name}")
    
    confirm = input("\nDevam etmek istiyor musunuz? (e/h): ")
    if confirm.lower() != 'e':
        print("[!] İşlem iptal edildi.")
        return
    
    for i, file in enumerate(files, 1):
        old_path = os.path.join(directory, file)
        ext = os.path.splitext(file)[1]
        new_path = os.path.join(directory, f"{base_name}_{i:03d}{ext}")
        os.rename(old_path, new_path)
    
    print(f"[+] {len(files)} dosya yeniden adlandırıldı!")

def replace_in_names(directory, old_text, new_text, extension="*"):
    """Dosya adlarında metin değiştir"""
    files = list_files(directory, extension)
    
    if not files:
        print("[!] Dosya bulunamadı!")
        return
    
    matching_files = [f for f in files if old_text in f]
    
    if not matching_files:
        print(f"[!] '{old_text}' içeren dosya bulunamadı!")
        return
    
    print(f"\n[+] {len(matching_files)} dosya bulundu.")
    print("[+] Önizleme:")
    
    for file in matching_files:
        new_name = file.replace(old_text, new_text)
        print(f"  {file} -> {new_name}")
    
    confirm = input("\nDevam etmek istiyor musunuz? (e/h): ")
    if confirm.lower() != 'e':
        print("[!] İşlem iptal edildi.")
        return
    
    for file in matching_files:
        old_path = os.path.join(directory, file)
        new_name = file.replace(old_text, new_text)
        new_path = os.path.join(directory, new_name)
        os.rename(old_path, new_path)
    
    print(f"[+] {len(matching_files)} dosya yeniden adlandırıldı!")

if __name__ == "__main__":
    print("\n" + "="*60)
    print("         TOPLU DOSYA YENİDEN ADLANDIRICI")
    print("="*60)
    
    print("\n[1] Prefix ekle")
    print("[2] Numaralandırarak yeniden adlandır")
    print("[3] Metin değiştir")
    
    choice = input("\nSeçiminiz: ")
    directory = input("Klasör yolu: ")
    extension = input("Dosya uzantısı (* = tümü): ")
    
    if choice == "1":
        prefix = input("Eklenecek prefix: ")
        rename_with_prefix(directory, prefix, extension)
    elif choice == "2":
        base_name = input("Temel isim: ")
        rename_with_numbering(directory, base_name, extension)
    elif choice == "3":
        old_text = input("Değiştirilecek metin: ")
        new_text = input("Yeni metin: ")
        replace_in_names(directory, old_text, new_text, extension)
