@echo off
:: Windows Görev Zamanlayıcı Yardımcısı
:: Zamanlanmış görevler oluşturur ve yönetir

echo =====================================
echo    GOREV ZAMANLAYICI YARDIMCISI
echo =====================================
echo.

:menu
echo [1] Mevcut gorevleri listele
echo [2] Yeni gorev olustur (gunluk)
echo [3] Yeni gorev olustur (haftalik)
echo [4] Gorev sil
echo [5] Gorev Zamanlayici'yi ac
echo [6] Cikis
echo.

set /p choice=Seciminiz: 

if "%choice%"=="1" goto list
if "%choice%"=="2" goto daily
if "%choice%"=="3" goto weekly
if "%choice%"=="4" goto delete
if "%choice%"=="5" goto open
if "%choice%"=="6" exit /b

:list
echo.
echo [+] Zamanlanmis gorevler:
schtasks /query /fo LIST
echo.
pause
goto menu

:daily
echo.
echo [+] Gunluk gorev olustur
echo.
set /p taskname=Gorev adi: 
set /p program=Calistirilacak program/script yolu: 
set /p time=Saat (HH:MM formatinda, ornek: 09:00): 

schtasks /create /tn "%taskname%" /tr "%program%" /sc daily /st %time%

if %errorlevel%==0 (
    echo [+] Gorev basariyla olusturuldu!
) else (
    echo [!] Gorev olusturulamadi!
)
echo.
pause
goto menu

:weekly
echo.
echo [+] Haftalik gorev olustur
echo.
set /p taskname=Gorev adi: 
set /p program=Calistirilacak program/script yolu: 
set /p day=Gun (MON/TUE/WED/THU/FRI/SAT/SUN): 
set /p time=Saat (HH:MM formatinda): 

schtasks /create /tn "%taskname%" /tr "%program%" /sc weekly /d %day% /st %time%

if %errorlevel%==0 (
    echo [+] Gorev basariyla olusturuldu!
) else (
    echo [!] Gorev olusturulamadi!
)
echo.
pause
goto menu

:delete
echo.
set /p taskname=Silinecek gorev adi: 
schtasks /delete /tn "%taskname%" /f

if %errorlevel%==0 (
    echo [+] Gorev silindi!
) else (
    echo [!] Gorev silinemedi!
)
echo.
pause
goto menu

:open
echo [+] Gorev Zamanlayici aciliyor...
taskschd.msc
goto menu
