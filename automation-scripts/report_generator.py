"""
Otomatik Sistem Raporu Oluşturucu
Sistem bilgilerini toplayıp HTML rapor oluşturur.
"""
import psutil
import platform
from datetime import datetime
import socket

def get_size(bytes):
    for unit in ['B', 'KB', 'MB', 'GB', 'TB']:
        if bytes < 1024:
            return f"{bytes:.2f} {unit}"
        bytes /= 1024

def generate_report():
    timestamp = datetime.now().strftime("%Y%m%d_%H%M%S")
    filename = f"sistem_raporu_{timestamp}.html"
    
    # Sistem bilgilerini topla
    uname = platform.uname()
    cpu_percent = psutil.cpu_percent(interval=1)
    memory = psutil.virtual_memory()
    disk = psutil.disk_usage('/')
    
    # HTML rapor oluştur
    html = f"""
<!DOCTYPE html>
<html lang="tr">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Sistem Raporu - {datetime.now().strftime("%d.%m.%Y %H:%M")}</title>
    <style>
        body {{
            font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
            max-width: 1200px;
            margin: 0 auto;
            padding: 20px;
            background: #f5f5f5;
        }}
        .header {{
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            color: white;
            padding: 30px;
            border-radius: 10px;
            margin-bottom: 20px;
        }}
        .section {{
            background: white;
            padding: 20px;
            margin-bottom: 20px;
            border-radius: 10px;
            box-shadow: 0 2px 5px rgba(0,0,0,0.1);
        }}
        .section h2 {{
            color: #667eea;
            border-bottom: 2px solid #667eea;
            padding-bottom: 10px;
        }}
        .info-row {{
            display: flex;
            justify-content: space-between;
            padding: 10px 0;
            border-bottom: 1px solid #eee;
        }}
        .label {{
            font-weight: bold;
            color: #555;
        }}
        .value {{
            color: #333;
        }}
        .progress-bar {{
            width: 100%;
            height: 30px;
            background: #eee;
            border-radius: 15px;
            overflow: hidden;
            margin: 10px 0;
        }}
        .progress-fill {{
            height: 100%;
            background: linear-gradient(90deg, #667eea 0%, #764ba2 100%);
            display: flex;
            align-items: center;
            justify-content: center;
            color: white;
            font-weight: bold;
        }}
        .warning {{
            background: #fff3cd;
            border-left: 4px solid #ffc107;
            padding: 10px;
            margin: 10px 0;
        }}
        .success {{
            background: #d4edda;
            border-left: 4px solid #28a745;
            padding: 10px;
            margin: 10px 0;
        }}
    </style>
</head>
<body>
    <div class="header">
        <h1>🖥️ Sistem Durum Raporu</h1>
        <p>Oluşturulma: {datetime.now().strftime("%d.%m.%Y %H:%M:%S")}</p>
    </div>
    
    <div class="section">
        <h2>💻 Sistem Bilgileri</h2>
        <div class="info-row">
            <span class="label">İşletim Sistemi:</span>
            <span class="value">{uname.system} {uname.release}</span>
        </div>
        <div class="info-row">
            <span class="label">Bilgisayar Adı:</span>
            <span class="value">{uname.node}</span>
        </div>
        <div class="info-row">
            <span class="label">İşlemci:</span>
            <span class="value">{uname.processor}</span>
        </div>
        <div class="info-row">
            <span class="label">Mimari:</span>
            <span class="value">{uname.machine}</span>
        </div>
    </div>
    
    <div class="section">
        <h2>⚡ CPU Kullanımı</h2>
        <div class="progress-bar">
            <div class="progress-fill" style="width: {cpu_percent}%">
                {cpu_percent}%
            </div>
        </div>
        <div class="info-row">
            <span class="label">Çekirdek Sayısı:</span>
            <span class="value">{psutil.cpu_count(logical=False)} Fiziksel / {psutil.cpu_count(logical=True)} Mantıksal</span>
        </div>
    </div>
    
    <div class="section">
        <h2>💾 Bellek Kullanımı</h2>
        <div class="progress-bar">
            <div class="progress-fill" style="width: {memory.percent}%">
                {memory.percent}%
            </div>
        </div>
        <div class="info-row">
            <span class="label">Toplam RAM:</span>
            <span class="value">{get_size(memory.total)}</span>
        </div>
        <div class="info-row">
            <span class="label">Kullanılan:</span>
            <span class="value">{get_size(memory.used)}</span>
        </div>
        <div class="info-row">
            <span class="label">Boş:</span>
            <span class="value">{get_size(memory.available)}</span>
        </div>
        {'<div class="warning">⚠️ Bellek kullanımı yüksek!</div>' if memory.percent > 80 else '<div class="success">✓ Bellek kullanımı normal</div>'}
    </div>
    
    <div class="section">
        <h2>💿 Disk Kullanımı</h2>
        <div class="progress-bar">
            <div class="progress-fill" style="width: {disk.percent}%">
                {disk.percent}%
            </div>
        </div>
        <div class="info-row">
            <span class="label">Toplam:</span>
            <span class="value">{get_size(disk.total)}</span>
        </div>
        <div class="info-row">
            <span class="label">Kullanılan:</span>
            <span class="value">{get_size(disk.used)}</span>
        </div>
        <div class="info-row">
            <span class="label">Boş:</span>
            <span class="value">{get_size(disk.free)}</span>
        </div>
        {'<div class="warning">⚠️ Disk alanı azalıyor!</div>' if disk.percent > 80 else '<div class="success">✓ Disk kullanımı normal</div>'}
    </div>
    
    <div class="section">
        <h2>🌐 Ağ Bilgileri</h2>
        <div class="info-row">
            <span class="label">Hostname:</span>
            <span class="value">{socket.gethostname()}</span>
        </div>
        <div class="info-row">
            <span class="label">IP Adresi:</span>
            <span class="value">{socket.gethostbyname(socket.gethostname())}</span>
        </div>
    </div>
    
    <div class="section" style="text-align: center; color: #999;">
        <p>Bu rapor otomatik olarak oluşturulmuştur.</p>
        <p>IT Toolkit - İhsan Baki Doğan</p>
    </div>
</body>
</html>
"""
    
    with open(filename, 'w', encoding='utf-8') as f:
        f.write(html)
    
    print(f"[+] Rapor oluşturuldu: {filename}")
    print(f"[+] Tarayıcınızda açmak için: {filename}")
    
    return filename

if __name__ == "__main__":
    print("\n[+] Sistem raporu oluşturuluyor...")
    generate_report()
