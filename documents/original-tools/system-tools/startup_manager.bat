@echo off
:: Başlangıç Programları Yöneticisi
:: Windows başlangıç programlarını listeler

echo =====================================
echo   BASLANGIC PROGRAMLARI YONETICISI
echo =====================================
echo.

:menu
echo [1] Baslangic programlarini listele
echo [2] Baslangic klasorunu ac
echo [3] Registry baslangic anahtarini ac
echo [4] Task Manager'i ac
echo [5] Cikis
echo.

set /p choice=Seciminiz: 

if "%choice%"=="1" goto list
if "%choice%"=="2" goto openfolder
if "%choice%"=="3" goto openreg
if "%choice%"=="4" goto taskmgr
if "%choice%"=="5" exit /b

:list
echo.
echo [+] Baslangic programlari:
echo.
wmic startup get caption,command
echo.
pause
goto menu

:openfolder
echo [+] Baslangic klasoru aciliyor...
start shell:startup
goto menu

:openreg
echo [+] Registry Editor aciliyor...
reg query "HKEY_CURRENT_USER\Software\Microsoft\Windows\CurrentVersion\Run"
echo.
pause
goto menu

:taskmgr
echo [+] Task Manager aciliyor...
start taskmgr
goto menu
