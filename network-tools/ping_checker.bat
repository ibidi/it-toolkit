@echo off
:: Basit Ping Test Aracı
echo =====================================
echo        PING TEST ARACI
echo =====================================
set /p host=Ping atılacak adres: 
ping %host%
pause
