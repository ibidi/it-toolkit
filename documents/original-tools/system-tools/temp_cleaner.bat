@echo off
:: Geçici Dosya Temizleyici
:: Windows temp klasörlerini temizler

echo =====================================
echo    GECICI DOSYA TEMIZLEYICI
echo =====================================
echo.
echo [!] Bu islem yonetici yetkisi gerektirebilir.
echo.

set /p confirm=Devam etmek istiyor musunuz? (E/H): 
if /i not "%confirm%"=="E" (
    echo Islem iptal edildi.
    pause
    exit /b
)

echo.
echo [+] Temp klasorleri temizleniyor...
echo.

:: Kullanıcı temp
echo [+] Kullanici temp klasoru temizleniyor...
del /f /s /q "%TEMP%\*.*" 2>nul
rd /s /q "%TEMP%" 2>nul
mkdir "%TEMP%"

:: Windows temp
echo [+] Windows temp klasoru temizleniyor...
del /f /s /q "C:\Windows\Temp\*.*" 2>nul
rd /s /q "C:\Windows\Temp" 2>nul
mkdir "C:\Windows\Temp"

:: Prefetch
echo [+] Prefetch temizleniyor...
del /f /s /q "C:\Windows\Prefetch\*.*" 2>nul

:: Recycle Bin
echo [+] Geri donusum kutusu bosaltiliyor...
rd /s /q "C:\$Recycle.Bin" 2>nul

echo.
echo [✓] Temizlik tamamlandi!
echo.
pause
