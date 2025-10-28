@echo off
:: Windows Firewall Kural Kontrolcüsü
:: Firewall kurallarını listeler ve yönetir

echo =====================================
echo   WINDOWS FIREWALL KONTROLCU
echo =====================================
echo.

:menu
echo [1] Firewall durumunu goster
echo [2] Gelen baglanti kurallarini listele
echo [3] Giden baglanti kurallarini listele
echo [4] Belirli bir port icin kural ekle
echo [5] Firewall'u ac
echo [6] Firewall'u kapat
echo [7] Cikis
echo.

set /p choice=Seciminiz: 

if "%choice%"=="1" goto status
if "%choice%"=="2" goto inbound
if "%choice%"=="3" goto outbound
if "%choice%"=="4" goto addrule
if "%choice%"=="5" goto enable
if "%choice%"=="6" goto disable
if "%choice%"=="7" exit /b

:status
echo.
echo [+] Firewall durumu:
netsh advfirewall show allprofiles state
echo.
pause
goto menu

:inbound
echo.
echo [+] Gelen baglanti kurallari:
netsh advfirewall firewall show rule name=all dir=in
echo.
pause
goto menu

:outbound
echo.
echo [+] Giden baglanti kurallari:
netsh advfirewall firewall show rule name=all dir=out
echo.
pause
goto menu

:addrule
echo.
set /p rulename=Kural adi: 
set /p port=Port numarasi: 
set /p protocol=Protokol (TCP/UDP): 

netsh advfirewall firewall add rule name="%rulename%" dir=in action=allow protocol=%protocol% localport=%port%
echo [+] Kural eklendi!
echo.
pause
goto menu

:enable
echo.
netsh advfirewall set allprofiles state on
echo [+] Firewall acildi!
echo.
pause
goto menu

:disable
echo.
echo [!] UYARI: Firewall'u kapatmak guvenlik riski olusturur!
set /p confirm=Devam etmek istiyor musunuz? (E/H): 
if /i "%confirm%"=="E" (
    netsh advfirewall set allprofiles state off
    echo [+] Firewall kapatildi!
)
echo.
pause
goto menu
