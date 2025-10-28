@echo off
:: Log Dosyası Temizleyici
set /p folder=Log dosyalarının olduğu klasör yolu: 
del /s /q "%folder%\*.log"
echo Tüm .log dosyaları temizlendi.
pause
