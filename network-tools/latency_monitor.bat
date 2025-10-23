@echo off
:: Network Latency Monitor
:: Belirli bir hedefe sürekli ping atarak gecikmeyi izler

echo =====================================
echo    NETWORK LATENCY MONITOR
echo =====================================
echo.

set /p target=Hedef adres (ornek: 8.8.8.8): 
set /p count=Ping sayisi (ornek: 100): 

echo.
echo [+] %target% adresine %count% kez ping atiliyor...
echo [+] Ortalama gecikme hesaplanacak...
echo.

ping -n %count% %target%

echo.
echo Test tamamlandi!
pause
