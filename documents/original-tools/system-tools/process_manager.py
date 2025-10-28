"""
Process Yöneticisi
Çalışan işlemleri listeler ve sonlandırma imkanı sunar.
"""
import psutil
import sys

def list_processes():
    print("\n" + "="*80)
    print("                         ÇALIŞAN İŞLEMLER")
    print("="*80)
    print(f"{'PID':<10} {'İsim':<30} {'CPU %':<10} {'RAM (MB)':<15}")
    print("-"*80)
    
    processes = []
    for proc in psutil.process_iter(['pid', 'name', 'cpu_percent', 'memory_info']):
        try:
            info = proc.info
            mem_mb = info['memory_info'].rss / (1024 * 1024)
            processes.append({
                'pid': info['pid'],
                'name': info['name'],
                'cpu': info['cpu_percent'],
                'mem': mem_mb
            })
        except (psutil.NoSuchProcess, psutil.AccessDenied):
            pass
    
    # CPU kullanımına göre sırala
    processes.sort(key=lambda x: x['cpu'], reverse=True)
    
    # İlk 20 işlemi göster
    for proc in processes[:20]:
        print(f"{proc['pid']:<10} {proc['name']:<30} {proc['cpu']:<10.1f} {proc['mem']:<15.2f}")

def kill_process(pid):
    try:
        proc = psutil.Process(pid)
        proc.terminate()
        print(f"[+] İşlem {pid} sonlandırıldı.")
    except psutil.NoSuchProcess:
        print(f"[!] İşlem {pid} bulunamadı.")
    except psutil.AccessDenied:
        print(f"[!] İşlem {pid} için yetki yok. Yönetici olarak çalıştırın.")

if __name__ == "__main__":
    list_processes()
    print("\n")
    choice = input("İşlem sonlandırmak ister misiniz? (e/h): ")
    if choice.lower() == 'e':
        pid = int(input("Sonlandırılacak PID: "))
        kill_process(pid)
