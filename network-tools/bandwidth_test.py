"""
Basit Bandwidth Test Aracı
İnternet hızını test eder (speedtest-cli kullanır)
"""
try:
    import speedtest
except ImportError:
    print("[!] speedtest-cli modülü bulunamadı.")
    print("Yüklemek için: pip install speedtest-cli")
    exit()

def test_speed():
    print("\n[+] İnternet hızı test ediliyor...")
    print("[!] Bu işlem biraz zaman alabilir...\n")
    
    st = speedtest.Speedtest()
    
    print("[+] En iyi sunucu seçiliyor...")
    st.get_best_server()
    
    print("[+] Download hızı ölçülüyor...")
    download = st.download() / 1_000_000  # Mbps'ye çevir
    
    print("[+] Upload hızı ölçülüyor...")
    upload = st.upload() / 1_000_000  # Mbps'ye çevir
    
    ping = st.results.ping
    
    print("\n" + "="*40)
    print("         SONUÇLAR")
    print("="*40)
    print(f"Download: {download:.2f} Mbps")
    print(f"Upload: {upload:.2f} Mbps")
    print(f"Ping: {ping:.2f} ms")
    print("="*40)

if __name__ == "__main__":
    test_speed()
