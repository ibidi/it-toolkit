"""
Email Bildirim Gönderici
SMTP üzerinden email bildirimi gönderir.
"""
import smtplib
from email.mime.text import MIMEText
from email.mime.multipart import MIMEMultipart
from datetime import datetime

class EmailNotifier:
    def __init__(self, smtp_server, smtp_port, username, password):
        self.smtp_server = smtp_server
        self.smtp_port = smtp_port
        self.username = username
        self.password = password
    
    def send_email(self, to_email, subject, body, html=False):
        """Email gönder"""
        try:
            # Email oluştur
            msg = MIMEMultipart('alternative')
            msg['From'] = self.username
            msg['To'] = to_email
            msg['Subject'] = subject
            msg['Date'] = datetime.now().strftime("%a, %d %b %Y %H:%M:%S +0000")
            
            # İçerik ekle
            if html:
                part = MIMEText(body, 'html')
            else:
                part = MIMEText(body, 'plain')
            
            msg.attach(part)
            
            # SMTP bağlantısı
            print(f"[+] {self.smtp_server}:{self.smtp_port} bağlanılıyor...")
            
            if self.smtp_port == 465:
                server = smtplib.SMTP_SSL(self.smtp_server, self.smtp_port)
            else:
                server = smtplib.SMTP(self.smtp_server, self.smtp_port)
                server.starttls()
            
            print("[+] Giriş yapılıyor...")
            server.login(self.username, self.password)
            
            print("[+] Email gönderiliyor...")
            server.send_message(msg)
            server.quit()
            
            print(f"[✓] Email başarıyla gönderildi: {to_email}")
            return True
            
        except Exception as e:
            print(f"[!] Hata: {e}")
            return False
    
    def send_system_alert(self, to_email, alert_type, message):
        """Sistem uyarısı gönder"""
        subject = f"🚨 Sistem Uyarısı: {alert_type}"
        
        html_body = f"""
        <html>
        <head>
            <style>
                body {{ font-family: Arial, sans-serif; }}
                .container {{ max-width: 600px; margin: 0 auto; padding: 20px; }}
                .header {{ background: #dc3545; color: white; padding: 20px; border-radius: 5px; }}
                .content {{ background: #f8f9fa; padding: 20px; margin-top: 20px; border-radius: 5px; }}
                .footer {{ text-align: center; margin-top: 20px; color: #6c757d; font-size: 12px; }}
            </style>
        </head>
        <body>
            <div class="container">
                <div class="header">
                    <h2>🚨 Sistem Uyarısı</h2>
                    <p>{alert_type}</p>
                </div>
                <div class="content">
                    <h3>Detaylar:</h3>
                    <p>{message}</p>
                    <p><strong>Zaman:</strong> {datetime.now().strftime("%d.%m.%Y %H:%M:%S")}</p>
                </div>
                <div class="footer">
                    <p>Bu email otomatik olarak IT Toolkit tarafından gönderilmiştir.</p>
                </div>
            </div>
        </body>
        </html>
        """
        
        return self.send_email(to_email, subject, html_body, html=True)

# Örnek kullanım
if __name__ == "__main__":
    print("\n" + "="*60)
    print("            EMAIL BİLDİRİM GÖNDERİCİ")
    print("="*60)
    print("\n[!] SMTP ayarlarınızı girin:")
    
    # SMTP ayarları
    smtp_server = input("SMTP sunucusu (örn: smtp.gmail.com): ")
    smtp_port = int(input("SMTP portu (465 veya 587): "))
    username = input("Email adresiniz: ")
    password = input("Email şifreniz/app password: ")
    
    notifier = EmailNotifier(smtp_server, smtp_port, username, password)
    
    print("\n[1] Basit email gönder")
    print("[2] Sistem uyarısı gönder")
    
    choice = input("\nSeçiminiz: ")
    to_email = input("Alıcı email: ")
    
    if choice == "1":
        subject = input("Konu: ")
        body = input("Mesaj: ")
        notifier.send_email(to_email, subject, body)
    elif choice == "2":
        alert_type = input("Uyarı tipi (örn: Yüksek CPU Kullanımı): ")
        message = input("Mesaj: ")
        notifier.send_system_alert(to_email, alert_type, message)
    
    print("\n[!] Not: Gmail kullanıyorsanız 'App Password' oluşturmanız gerekebilir.")
