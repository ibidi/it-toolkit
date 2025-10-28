@echo off
:: Windows Hizmet Yeniden Başlatma
echo =====================================
echo      SERVIS YENIDEN BASLAT
echo =====================================
set /p service=Servis adı girin: 
net stop %service%
net start %service%
pause
