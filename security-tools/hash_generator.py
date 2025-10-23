"""
Hash Generator/Checker
Dosya veya metin için hash değerleri üretir ve doğrular.
"""
import hashlib
import os

def hash_text(text):
    """Metin için hash değerleri üretir"""
    print("\n" + "="*60)
    print("                  HASH DEĞERLERİ")
    print("="*60)
    
    algorithms = ['md5', 'sha1', 'sha256', 'sha512']
    
    for algo in algorithms:
        h = hashlib.new(algo)
        h.update(text.encode())
        print(f"{algo.upper():<10}: {h.hexdigest()}")

def hash_file(filepath):
    """Dosya için hash değerleri üretir"""
    if not os.path.exists(filepath):
        print("[!] Dosya bulunamadı!")
        return
    
    print(f"\n[+] {filepath} için hash değerleri hesaplanıyor...\n")
    print("="*60)
    
    algorithms = ['md5', 'sha1', 'sha256', 'sha512']
    
    for algo in algorithms:
        h = hashlib.new(algo)
        with open(filepath, 'rb') as f:
            while chunk := f.read(8192):
                h.update(chunk)
        print(f"{algo.upper():<10}: {h.hexdigest()}")

def verify_hash(filepath, expected_hash, algorithm='sha256'):
    """Hash değerini doğrular"""
    if not os.path.exists(filepath):
        print("[!] Dosya bulunamadı!")
        return
    
    h = hashlib.new(algorithm)
    with open(filepath, 'rb') as f:
        while chunk := f.read(8192):
            h.update(chunk)
    
    calculated = h.hexdigest()
    
    if calculated.lower() == expected_hash.lower():
        print(f"[✓] Hash doğrulandı! Dosya bütünlüğü sağlanmış.")
    else:
        print(f"[✗] Hash eşleşmedi! Dosya değiştirilmiş olabilir.")
        print(f"Beklenen: {expected_hash}")
        print(f"Hesaplanan: {calculated}")

if __name__ == "__main__":
    print("\n[1] Metin hash'le")
    print("[2] Dosya hash'le")
    print("[3] Hash doğrula")
    
    choice = input("\nSeçiminiz: ")
    
    if choice == "1":
        text = input("Metin girin: ")
        hash_text(text)
    elif choice == "2":
        filepath = input("Dosya yolu: ")
        hash_file(filepath)
    elif choice == "3":
        filepath = input("Dosya yolu: ")
        expected = input("Beklenen hash: ")
        algo = input("Algoritma (md5/sha1/sha256/sha512) [sha256]: ") or "sha256"
        verify_hash(filepath, expected, algo)
