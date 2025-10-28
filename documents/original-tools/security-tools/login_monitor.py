"""
Login Denemesi İzleyici
Başarısız login denemelerini simüle eder ve brute force koruması gösterir.
"""
import time
from datetime import datetime, timedelta
from collections import defaultdict

class LoginMonitor:
    def __init__(self, max_attempts=5, lockout_time=300):
        self.max_attempts = max_attempts
        self.lockout_time = lockout_time  # saniye
        self.failed_attempts = defaultdict(list)
        self.locked_accounts = {}
    
    def is_locked(self, username):
        """Hesap kilitli mi kontrol et"""
        if username in self.locked_accounts:
            unlock_time = self.locked_accounts[username]
            if datetime.now() < unlock_time:
                remaining = (unlock_time - datetime.now()).seconds
                return True, remaining
            else:
                # Kilit süresi dolmuş
                del self.locked_accounts[username]
                self.failed_attempts[username] = []
        return False, 0
    
    def record_failed_attempt(self, username, ip):
        """Başarısız denemeyi kaydet"""
        locked, remaining = self.is_locked(username)
        
        if locked:
            print(f"[!] Hesap kilitli! {remaining} saniye sonra tekrar deneyin.")
            return False
        
        # Eski denemeleri temizle (son 5 dakika)
        cutoff_time = datetime.now() - timedelta(seconds=300)
        self.failed_attempts[username] = [
            attempt for attempt in self.failed_attempts[username]
            if attempt['time'] > cutoff_time
        ]
        
        # Yeni denemeyi ekle
        self.failed_attempts[username].append({
            'time': datetime.now(),
            'ip': ip
        })
        
        attempt_count = len(self.failed_attempts[username])
        
        print(f"[!] Başarısız login denemesi: {username} ({ip})")
        print(f"[!] Deneme sayısı: {attempt_count}/{self.max_attempts}")
        
        if attempt_count >= self.max_attempts:
            unlock_time = datetime.now() + timedelta(seconds=self.lockout_time)
            self.locked_accounts[username] = unlock_time
            print(f"[✗] HESAP KİLİTLENDİ! {self.lockout_time} saniye boyunca erişim engellendi.")
            return False
        
        return True
    
    def record_successful_login(self, username):
        """Başarılı login'i kaydet"""
        if username in self.failed_attempts:
            del self.failed_attempts[username]
        if username in self.locked_accounts:
            del self.locked_accounts[username]
        print(f"[✓] Başarılı login: {username}")

# Demo
if __name__ == "__main__":
    monitor = LoginMonitor(max_attempts=3, lockout_time=60)
    
    print("\n" + "="*60)
    print("         LOGIN İZLEME SİSTEMİ - DEMO")
    print("="*60)
    print("\nBu demo brute force korumasını gösterir.")
    print(f"Maksimum deneme: {monitor.max_attempts}")
    print(f"Kilit süresi: {monitor.lockout_time} saniye\n")
    
    # Simülasyon
    test_user = "admin"
    test_ip = "192.168.1.100"
    
    print("[+] Başarısız login denemeleri simüle ediliyor...\n")
    
    for i in range(5):
        time.sleep(1)
        monitor.record_failed_attempt(test_user, test_ip)
        print()
    
    print("\n[+] Kilitli hesapla login denemesi...\n")
    monitor.record_failed_attempt(test_user, test_ip)
